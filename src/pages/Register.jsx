import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const [form, setForm] = useState({ name: '', number: '', dob: '', email: '', password: '', });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, number, dob, email, password } = form;

    if (!name || !number || !dob || !email || !password) {
      setError('All fields are required');
      return;
    }

    // Validate phone number
    if (!/^\d{10}$/.test(number)) {
      setError('Phone number must be 10 digits');
      return;
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid email format');
      return;
    }

    // Validate DOB
    const today = new Date();
    const dobDate = new Date(dob);
    if (dobDate > today) {
      setError('Date of birth cannot be in the future');
      return;
    }

    // Validate password
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    const result = await register(name, number, dob, email, password);
    if (result.success) {
      alert('Registration successful! Please login.');
      navigate('/login-register');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="p-10 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-600 mb-3">{error}</p>}
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="number"
          placeholder="Phone Number"
          value={form.number}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          value={form.dob}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <button type="submit" className="bg-purple-700 text-white px-4 py-2 rounded w-full">
          Register
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login-register" className="text-purple-700 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;