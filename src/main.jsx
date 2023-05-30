import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './contexts/AuthContext';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Signin } from './components/Signin';
import { Signup } from './components/Signup';
import  ProtectedRoute from './util/ProtectedRoute';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <AuthProvider>
    <Router>
        <Routes>
          <Route  path='/' element={<ProtectedRoute/>}>
            <Route path='/' element={<App/>}/>
          </Route>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
    </Router>
  </AuthProvider>
  </React.StrictMode>,
)
