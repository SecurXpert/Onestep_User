import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const pharmacyAccounts = [
  { id: 'pharm1', name: 'City Pharmacy', password: 'city123' },
  { id: 'pharm2', name: 'HealthPlus Pharmacy', password: 'health456' },
  { id: 'pharm3', name: 'MediCare Pharmacy', password: 'medicare789' },
];

const PharmacyLogin = () => {
  const [selectedPharmacy, setSelectedPharmacy] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!selectedPharmacy) {
      alert('Please select a pharmacy.');
      return;
    }
    if (!password) {
      alert('Please enter a password.');
      return;
    }

    const pharmacy = pharmacyAccounts.find((pharm) => pharm.id === selectedPharmacy);
    if (pharmacy && pharmacy.password === password) {
      localStorage.setItem('loggedInPharmacyId', selectedPharmacy);
      navigate('/pharmacy-dashboard');
    } else {
      alert('Invalid credentials. Please check the pharmacy selection or password.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Pharmacy Login</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Pharmacy</label>
        <select
          value={selectedPharmacy}
          onChange={(e) => setSelectedPharmacy(e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Pharmacy</option>
          {pharmacyAccounts.map((pharm) => (
            <option key={pharm.id} value={pharm.id}>
              {pharm.name} ({pharm.id})
            </option>
          ))}
        </select>
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

export default PharmacyLogin;