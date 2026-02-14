import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { AuthProvider } from '../context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </CookiesProvider>
  </Router>
)
