import { MsalProvider } from '@azure/msal-react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { msalInstance } from './auth/msalConfig.ts'
import './index.css'
import { IdToken } from './models/IdToken.ts'
import authService from './services/authService.ts'
import { AZURE_B2C, SESSION_VALUES } from './utils/constants.ts'
import { CustomStorage } from './utils/customStorage.ts'

const customStorage = new CustomStorage();

async function initializeMsal() {
  await msalInstance.initialize();

  msalInstance.handleRedirectPromise().then((response) => {

    if (response?.account) {
      msalInstance.setActiveAccount(response.account);

      customStorage.setItem(SESSION_VALUES.azure_b2c_accessToken, response.accessToken);
      customStorage.setItem(SESSION_VALUES.azure_b2c_idToken, response.idToken);
      customStorage.setItem(SESSION_VALUES.azure_isAuthenticated, true.toString());

      const idClaim = response.idTokenClaims as IdToken;
      customStorage.setItem(SESSION_VALUES.azure_name, idClaim.name ?? "");
      customStorage.setItem(SESSION_VALUES.azure_b2c_userId, idClaim.sub ?? "");
      customStorage.setItem(SESSION_VALUES.azure_b2c_family_name, idClaim.family_name ?? "");
      customStorage.setItem(SESSION_VALUES.azure_b2c_given_name, idClaim.given_name ?? "");

      const redirectUrl = customStorage.getItem(SESSION_VALUES.postLoginRedirectUrl);
      customStorage.removeItem(SESSION_VALUES.postLoginRedirectUrl);
      if (redirectUrl && redirectUrl === "/") {
        window.location.href = "/dashboard";
      }
    }
  }).catch((error) => {
    if (error.errorMessage?.includes("AADB2C90118")) {
      console.warn("Redirecting user to Forgot Password flow...");
      msalInstance.loginRedirect({
        authority: `${AZURE_B2C.AUTHORITY}/${AZURE_B2C.PASSWORD_RESET_POLICY}`,
        scopes: authService.loginRequest.scopes
      }).then(() => {
        console.log("Redirected user to Forgot Password flow.");
      }).catch((error) => {
        console.error("Redirect to Forgot Password flow failed:", error);
      });
    } else {
      console.error("Login failed:", error);
    }

  });
}

initializeMsal().then(() => {
  createRoot(document.getElementById('root')!).render(
    <MsalProvider instance={msalInstance}>
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>
    </MsalProvider>
  );
}).catch((error) => {
  console.error("MSAL initialization failed:", error);
});