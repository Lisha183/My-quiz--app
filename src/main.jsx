import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from 'react-dom';
import { AuthProvider } from '/authContext'; 

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <AuthProvider>
      <App />
      </AuthProvider>
    </StrictMode>
  );
} else {
  console.error('Root element not found');
}




