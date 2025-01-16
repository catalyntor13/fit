import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLogin } from '../services/useLogin';
import { useUser } from '../services/useUser';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email, password});

  const { isAuthenticated } = useUser();
  const navigate = useNavigate();
  const { loginApi, isLoading, error } = useLogin();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/welcome');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      // Handle Supabase error response
      setErrors({
        email: error.email || '',
        password: error.password || ''
      });
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Client-side validation
    if (!email.trim()) {
      newErrors.email = 'Username-ul nu poate fi gol';
    }
    if (!password.trim()) {
      newErrors.password = 'Parola nu poate fi goală';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors and attempt login
    setErrors({});
    loginApi({ email, password });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-center text-gray-800">ActiveFit</h1>
            <p className="text-center text-gray-600 mt-2">Bine ai revenit!</p>
          </div>
  
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
  
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Parolă
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
          </div>
  
          <div className="mt-4 text-right">
            <NavLink className="text-sm font-medium text-sky-600 hover:text-sky-500" to='/autentificare/forgot-password'>
            Ai uitat parola?
            
            </NavLink> 
             
            
          </div>
  
          <button
            className="mt-6 w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
            disabled={isLoading}
          >
            {!isLoading ? 'Autentificare' : <Spinner/>}
          </button>
  
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Nu ai cont?{' '}
              <NavLink 
                to="/autentificare/register" 
                className="font-medium text-sky-600 hover:text-sky-500"
              >
                Înregistrează-te
              </NavLink>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
