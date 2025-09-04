// import React, { useState, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);

//   const [form, setForm] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const result = await login(form.email, form.password);

//       if (result.success) {
//         const accessToken = result.data?.access_token;
//         if (!accessToken) {
//           throw new Error('Access token not found in response');
//         }

//         const userRole = result.data.user?.role || 'user';
//         if (userRole === 'admin') {
//           navigate('/admin/dashboard');
//         } else {
//           navigate('/');
//         }
//       } else {
//         setError(result.message || 'Login failed. Please check your credentials.');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setError('An error occurred during login. Please try again.');
//     }
//   };

//   return (
//     <div className="p-10 max-w-md mx-auto">
//       <h2 className="text-xl font-bold mb-4">Login</h2>
//       {error && <p className="text-red-600 mb-3">{error}</p>}
//       <form onSubmit={handleLogin} className="space-y-4">
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           className="border p-2 rounded w-full"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           className="border p-2 rounded w-full"
//           required
//         />
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
//           Login
//         </button>
//       </form>
//       <p className="mt-4 text-center text-sm text-gray-600">
//         Don’t have an account?{' '}
//         <Link to="/register" className="text-purple-700 hover:underline">
//           Register
//         </Link>
//       </p>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await login(form.email, form.password);

      if (result.success) {
        const accessToken = result.data?.access_token;
        if (!accessToken) {
          throw new Error('Access token not found in response');
        }

        const userRole = result.data.user?.role || 'user';
        if (userRole === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      } else {
        setError(result.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="p-10 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-600 mb-3">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
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
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Login
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Don’t have an account?{' '}
        <Link to="/register" className="text-purple-700 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;