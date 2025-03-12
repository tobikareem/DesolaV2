import { MsalProvider } from '@azure/msal-react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { msalInstance } from './auth/msalConfig.ts'
import './index.css'
import authService from './services/authService.ts'

async function initializeMsal() {
  await msalInstance.initialize();

  msalInstance.handleRedirectPromise().then((response) => {
    authService.handleTokenResponse(response);
  }).catch((error) => {
    authService.handleTokenError(error);
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