import { MsalProvider } from '@azure/msal-react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { msalInstance } from './auth/msalConfig.ts'
import './index.css'
import authService from './services/authService.ts'

async function initializeApp() {
  try {
    await authService.initialize();
  } catch (error) {
    console.error("Application initialization failed:", error);
    throw error;
  }
}

initializeApp().then(() => {
  createRoot(document.getElementById('root')!).render(
    <MsalProvider instance={msalInstance}>
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>
    </MsalProvider>
  );
}).catch(() => {

  createRoot(document.getElementById('root')!).render(
    <div className="root-applicationFailed">
      <h2>Application Failed to Start</h2>
      <p>Please refresh the page or contact support if the problem persists.</p>
      <button onClick={() => window.location.reload()} className="root-button-applicationFailed">
        Refresh Page
      </button>
    </div>
  );
});