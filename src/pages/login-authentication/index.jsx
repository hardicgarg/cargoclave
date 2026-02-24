import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';

import LoginForm from './components/LoginForm';
import SSOButton from './components/SSOButton';
import SecurityIndicators from './components/SecurityIndicators';
import SystemStatus from './components/SystemStatus';

const LoginAuthentication = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      navigate('/operations-dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl mb-4 shadow-lg">
              <Icon name="Package2" size="2rem" className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">CargoClave</h1>
            <p className="text-gray-600">Enterprise Logistics Management</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Welcome back</h2>
            <p className="text-sm text-gray-600">Sign in to access your dashboard</p>
          </div>

          <LoginForm />

          <SSOButton />

          <SystemStatus />

          <SecurityIndicators />

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              Protected by enterprise-grade security
            </p>
            <div className="flex items-center justify-center gap-4 mt-3">
              <div className="flex items-center gap-1">
                <Icon name="Shield" size="0.75rem" className="text-gray-400" />
                <span className="text-xs text-gray-500">GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Lock" size="0.75rem" className="text-gray-400" />
                <span className="text-xs text-gray-500">ISO 27001</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Need help? Contact{' '}
            <a href="mailto:support@cargoclave.com" className="text-blue-600 hover:text-blue-700 font-medium">
              support@cargoclave.com
            </a>
          </p>
        </div>

        <div className="mt-8 text-center text-xs text-gray-500">
          <p>&copy; {new Date()?.getFullYear()} CargoClave. All rights reserved.</p>
          <div className="flex items-center justify-center gap-4 mt-2">
            <a href="#" className="hover:text-gray-700 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-700 transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-700 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAuthentication;