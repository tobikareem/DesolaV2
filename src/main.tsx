import { MsalProvider } from '@azure/msal-react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { msalInstance } from './auth/msalConfig.ts'
import './index.css'

async function initializeMsal() {
  await msalInstance.initialize();
  console.log("MSAL Initialized Successfully");
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