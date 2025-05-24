import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import { UserContext } from '../UserContext';
import {jwtDecode} from 'jwt-decode';  // Import jwt_decode correctly

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setIsAuthenticated, setUserRole } = useContext(UserContext);

  const navigate = useNavigate();

  const validateForm = () => {
    if (!username || !password) {
      setError('Username and password are required');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    const formDetails = new URLSearchParams();
    formDetails.append('username', username);
    formDetails.append('password', password);

    try {
      const response = await fetch(`${config.API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDetails,
      });

      setLoading(false);

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access_token);  // Store token

        // Decode the JWT token
        const decoded = jwtDecode(data.access_token);
        setUserRole(decoded.role);  // Set user role in context
        setIsAuthenticated(true);  // Set authentication state in context

        navigate('/');  // Redirect to the homepage after successful login
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Authentication failed!');
      }
    } catch (error) {
      setLoading(false);
      setError('User not found, try again');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-6 sm:p-10 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            id="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
          />
        </div>

        {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-xl hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className="text-center mt-6 text-sm">
          <p>Don't have an account yet?</p>
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="text-blue-500 hover:underline mt-1"
          >
            Register here!
          </button>
        </div>
      </form>
    </div>
  );
}
