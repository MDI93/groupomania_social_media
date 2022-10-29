import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/index.scss'
import App from './App';
import { AuthUserProvider } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthUserProvider>
        <App />
  </AuthUserProvider>
)