import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './components/LandingPage';
import { Login, Signup } from './components/Auth';
import Dashboard from './components/Dashboard';
import Blogs from './components/Blogs';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/blogs" element={
              <ProtectedRoute>
                <Blogs />
              </ProtectedRoute>
            } />
            
            {/* 404 route */}
            <Route path="*" element={
              <div className="pt-16 text-center">
                <h1 className="text-4xl font-bold text-gray-900">404</h1>
                <p className="text-gray-600">Page not found</p>
              </div>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;