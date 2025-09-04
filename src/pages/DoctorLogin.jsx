import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email) {
      alert('Please enter an email.');
      return;
    }
    if (!password) {
      alert('Please enter a password.');
      return;
    }

    try {
      const response = await fetch('https://api.onestepmedi.com:8000/doctors/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('loggedInDoctorId', data.doctorId || email); // Adjust based on API response
        localStorage.setItem('authToken', `Bearer ${data.token}`); // Store Bearer token
        navigate('/doctor-dashboard');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Invalid credentials. Please check your email or password.');
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Doctor Login</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Enter email"
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Enter password"
        />
      </div>
      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition shadow-md hover:scale-105"
      >
        Log In
      </button>
    </div>
  );
};

export default DoctorLogin;