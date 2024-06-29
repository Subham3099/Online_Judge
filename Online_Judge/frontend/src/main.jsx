import ReactDOM from 'react-dom/client'
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // For navigation
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
)
