import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import config from '../config';

export default function Register(){
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    if (!username || !email || !password || !confirmPass){
        setError('Please fill up all fields!')
        return false;
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        setError('Please enter a valid email address!');
        return false;
    }

    setError('');
    return true;
  }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        if (password != confirmPass) {
            setError("Passwords do not match");
            return;
        }

        try {
            await axios.post(`${config.API_URL}/api/auth/register`, {
                name: username,
                email: email,
                password: password
            });
            navigate('/login')

        } catch (error) {
            console.debug(error)
            const msg = error.response.data.detail;
            setError(msg)
        }
    };
return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-6 sm:p-10 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Create a password"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Confirm your password"
          />
        </div>

        {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-xl hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}