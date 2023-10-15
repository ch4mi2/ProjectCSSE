import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { PoliciesContextProvider } from './context/PoliciesContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PoliciesContextProvider>
      <App />
    </PoliciesContextProvider>
  </React.StrictMode>
);
