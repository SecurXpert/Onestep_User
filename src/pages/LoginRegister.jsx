import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import registerImage from '../assets/login page.png'; // Main image for all screens

const LoginRegister = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Assuming login is provided by AuthContext
  const [activeTab, setActiveTab] = useState('login');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    name: '',
    number: '',
    dob: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsDialog, setShowTermsDialog] = useState(false);
  const [step, setStep] = useState('form'); // Registration steps: form, otp
  const [otpId, setOtpId] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [showForgot, setShowForgot] = useState(false); // Forgot password toggle
  const [forgotStep, setForgotStep] = useState('phone'); // Forgot password steps: phone, otp
  const [forgotPhone, setForgotPhone] = useState('');
  const [forgotOtpId, setForgotOtpId] = useState('');
  const [forgotCode, setForgotCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Reset error when switching tabs
  useEffect(() => {
    setError('');
  }, [activeTab]);

  // Login form handlers
  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await login(loginForm.email, loginForm.password);

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
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid username or password');
    }
  };

  // Register form handlers
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name' && value && !/^[A-Za-z\s]*$/.test(value)) {
      return;
    }
    if (name === 'number' && value && !/^\d*$/.test(value)) {
      return;
    }
    setRegisterForm({ ...registerForm, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, number, dob, email, password, confirmPassword } = registerForm;

    if (!name || !number || !dob || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (!/^\d{10}$/.test(number)) {
      setError('Phone number must be 10 digits');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid email format');
      return;
    }

    const today = new Date();
    const dobDate = new Date(dob);
    if (dobDate > today) {
      setError('Date of birth cannot be in the future');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!termsAccepted) {
      setError('You must accept the Terms and Conditions');
      return;
    }

    const phone = `+91${number}`;
    const signup_payload = {
      name,
      email,
      password,
      phone_number: phone,
      dob,
    };

    try {
      const res = await fetch('https://api.onestepmedi.com:8000/auth/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          purpose: 'signup',
          role: 'patient',
          signup_payload,
        }),
      });
      const data = await res.json();
      if (data.otp_id) {
        setOtpId(data.otp_id);
        setStep('otp');
      } else {
        if (data.detail && data.detail.includes('Twilio error 21608')) {
          setError('Phone number is unverified. Please verify it with Twilio or contact support.');
        } else {
          setError('Failed to send OTP');
        }
      }
    } catch (err) {
      setError('Error sending OTP');
      console.error(err);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otpCode) {
      setError('OTP code is required');
      return;
    }

    try {
      const res = await fetch('https://api.onestepmedi.com:8000/auth/patient/signup/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp_id: otpId, code: otpCode }),
      });
      const data = await res.json();
      if (data.message === 'Signup completed') {
        alert('Registration successful! Please login.');
        setActiveTab('login');
        setStep('form');
        setOtpCode('');
        setOtpId('');
        setRegisterForm({
          name: '',
          number: '',
          dob: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      } else {
        setError('Invalid OTP');
      }
    } catch (err) {
      setError('Error verifying OTP');
      console.error(err);
    }
  };

  // Forgot password handlers
  const handleSendForgotOtp = async (e) => {
    e.preventDefault();
    if (!forgotPhone || !/^\d{10}$/.test(forgotPhone)) {
      setError('Phone number must be 10 digits');
      return;
    }

    const phone = `+91${forgotPhone}`;

    try {
      const res = await fetch('https://api.onestepmedi.com:8000/auth/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, purpose: 'reset', role: 'patient' }),
      });
      const data = await res.json();
      if (data.otp_id) {
        setForgotOtpId(data.otp_id);
        setForgotStep('otp');
      } else {
        if (data.detail && data.detail.includes('Twilio error 21608')) {
          setError('Phone number is unverified. Please verify it with Twilio or contact support.');
        } else {
          setError('Failed to send OTP');
        }
      }
    } catch (err) {
      setError('Error sending OTP');
      console.error(err);
    }
  };

  const handleConfirmForgot = async (e) => {
    e.preventDefault();
    if (!forgotCode || !newPassword || !confirmNewPassword) {
      setError('All fields are required');
      return;
    }
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match');
      return;
    }

    const phone = `+91${forgotPhone}`;

    try {
      const res = await fetch('https://api.onestepmedi.com:8000/auth/forgot-password/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          role: 'patient',
          otp_id: forgotOtpId,
          code: forgotCode,
          new_password: newPassword,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert('Password reset successful! Please login.');
        setShowForgot(false);
        setForgotStep('phone');
        setForgotPhone('');
        setForgotOtpId('');
        setForgotCode('');
        setNewPassword('');
        setConfirmNewPassword('');
      } else {
        setError('Invalid OTP or error resetting password');
      }
    } catch (err) {
      setError('Error resetting password');
      console.error(err);
    }
  };

  const handleTermsClick = () => {
    setShowTermsDialog(true);
  };

  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    setShowTermsDialog(false);
  };

  const handleCloseDialog = () => {
    setShowTermsDialog(false);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 2xs:p-6 xs:p-8 2sm:p-10 sm:p-12 md:p-16 md800:p-18 md900:p-20 lg:p-20 xl:p-24 2xl:p-28 3xl:p-32">
      <div className="flex flex-col md:flex-row max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-full md:w-1/2 h-64 2xs:h-72 xs:h-80 2sm:h-96 sm:h-[400px] md:h-[500px] md800:h-[550px] md900:h-[600px] lg:h-[600px] xl:h-[650px] 2xl:h-[700px] 3xl:h-[750px]">
          <img src={registerImage} alt="Register" className="w-full h-full object-cover" />
        </div>
        <div className="w-full md:w-1/2 p-4 2xs:p-5 xs:p-6 2sm:p-7 sm:p-8 md:p-10 md800:p-11 md900:p-12 lg:p-12 xl:p-14 2xl:p-16 3xl:p-18">
          <div className="flex justify-center mb-4 2xs:mb-5 xs:mb-6 2sm:mb-6 sm:mb-6 md:mb-6 md800:mb-7 md900:mb-8 lg:mb-8 xl:mb-9 2xl:mb-10 3xl:mb-12">
            <button
              onClick={() => setActiveTab('login')}
              className={`px-3 py-1.5 2xs:px-3.5 2xs:py-1.5 xs:px-4 xs:py-2 2sm:px-4 2sm:py-2 sm:px-4 sm:py-2 md:px-4 md:py-2 md800:px-5 md800:py-2.5 md900:px-5 md900:py-2.5 lg:px-5 lg:py-2.5 xl:px-6 xl:py-3 2xl:px-6 2xl:py-3 3xl:px-7 3xl:py-3.5 rounded-l-lg w-1/2 text-center transition-colors duration-200 text-sm 2xs:text-sm xs:text-base 2sm:text-base sm:text-base md:text-base md800:text-lg md900:text-lg lg:text-lg xl:text-xl 2xl:text-xl 3xl:text-2xl ${
                activeTab === 'login' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`px-3 py-1.5 2xs:px-3.5 2xs:py-1.5 xs:px-4 xs:py-2 2sm:px-4 2sm:py-2 sm:px-4 sm:py-2 md:px-4 md:py-2 md800:px-5 md800:py-2.5 md900:px-5 md900:py-2.5 lg:px-5 lg:py-2.5 xl:px-6 xl:py-3 2xl:px-6 2xl:py-3 3xl:px-7 3xl:py-3.5 rounded-r-lg w-1/2 text-center transition-colors duration-200 text-sm 2xs:text-sm xs:text-base 2sm:text-base sm:text-base md:text-base md800:text-lg md900:text-lg lg:text-lg xl:text-xl 2xl:text-xl 3xl:text-2xl ${
                activeTab === 'register' ? 'bg-purple-700 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Register
            </button>
          </div>

          {error && (
            <p className="text-red-600 mb-3 text-center text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base xl:text-lg 2xl:text-lg 3xl:text-xl">
              {error}
            </p>
          )}

          {activeTab === 'login' ? (
            <div>
              <h2 className="text-lg 2xs:text-lg xs:text-xl 2sm:text-xl sm:text-xl md:text-xl md800:text-2xl md900:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl 3xl:text-4xl font-bold mb-4 text-center">
                {showForgot ? 'Forgot Password' : 'Login'}
              </h2>
              {!showForgot ? (
                <>
                  <form onSubmit={handleLogin} className="space-y-3 2xs:space-y-3.5 xs:space-y-4 2sm:space-y-4 sm:space-y-4 md:space-y-4 md800:space-y-5 md900:space-y-5 lg:space-y-5 xl:space-y-6 2xl:space-y-6 3xl:space-y-7">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={loginForm.email}
                      onChange={handleLoginChange}
                      className="border p-2 rounded w-full text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base xl:text-lg 2xl:text-lg 3xl:text-xl"
                      required
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={loginForm.password}
                      onChange={handleLoginChange}
                      className="border p-2 rounded w-full text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base xl:text-lg 2xl:text-lg 3xl:text-xl"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded w-full text-sm 2xs:text-sm xs:text-base 2sm:text-base sm:text-base md:text-base md800:text-lg md900:text-lg lg:text-lg xl:text-xl 2xl:text-xl 3xl:text-2xl"
                    >
                      Login
                    </button>
                  </form>
                  <p className="mt-3 2xs:mt-3.5 xs:mt-4 2sm:mt-4 sm:mt-4 md:mt-4 md800:mt-5 md900:mt-5 lg:mt-5 xl:mt-6 2xl:mt-6 3xl:mt-7 text-center text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base xl:text-lg 2xl:text-lg 3xl:text-xl text-gray-600">
                    Forgot Password?{' '}
                    <span
                      onClick={() => setShowForgot(true)}
                      className="text-blue-600 hover:underline cursor-pointer"
                    >
                      Reset
                    </span>
                  </p>
                  <p className="mt-3 2xs:mt-3.5 xs:mt-4 2sm:mt-4 sm:mt-4 md:mt-4 md800:mt-5 md900:mt-5 lg:mt-5 xl:mt-6 2xl:mt-6 3xl:mt-7 text-center text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base xl:text-lg 2xl:text-lg 3xl:text-xl text-gray-600">
                    Don’t have an account?{' '}
                    <span
                      onClick={() => setActiveTab('register')}
                      className="text-purple-700 hover:underline cursor-pointer"
                    >
                      Register
                    </span>
                  </p>
                </>
              ) : (
                <>
                  {forgotStep === 'phone' ? (
                    <form
                      onSubmit={handleSendForgotOtp}
                      className="space-y-3 2xs:space-y-3.5 xs:space-y-4 2sm:space-y-4 sm:space-y-4 md:space-y-4 md800:space-y-5 md900:space-y-5 lg:space-y-5 xl:space-y-6 2xl:space-y-6 3xl:space-y-7"
                    >
                      <input
                        type="text"
                        placeholder="Phone Number (10 digits)"
                        value={forgotPhone}
                        onChange={(e) => setForgotPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className="border p-2 rounded w-full text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base xl:text-lg 2xl:text-lg 3xl:text-xl"
                        required
                      />
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded w-full text-sm 2xs:text-sm xs:text-base 2sm:text-base sm:text-base md:text-base md800:text-lg md900:text-lg lg:text-lg xl:text-xl 2xl:text-xl 3xl:text-2xl"
                      >
                        Send OTP
                      </button>
                    </form>
                  ) : (
                    <form
                      onSubmit={handleConfirmForgot}
                      className="space-y-3 2xs:space-y-3.5 xs:space-y-4 2sm:space-y-4 sm:space-y-4 md:space-y-4 md800:space-y-5 md900:space-y-5 lg:space-y-5 xl:space-y-6 2xl:space-y-6 3xl:space-y-7"
                    >
                      <input
                        type="text"
                        placeholder="OTP Code"
                        value={forgotCode}
                        onChange={(e) => setForgotCode(e.target.value)}
                        className="border p-2 rounded w-full text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base xl:text-lg 2xl:text-lg 3xl:text-xl"
                        required
                      />
                      <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="border p-2 rounded w-full text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base xl:text-lg 2xl:text-lg 3xl:text-xl"
                        required
                      />
                      <input
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        className="border p-2 rounded w-full text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base xl:text-lg 2xl:text-lg 3xl:text-xl"
                        required
                      />
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded w-full text-sm 2xs:text-sm xs:text-base 2sm:text-base sm:text-base md:text-base md800:text-lg md900:text-lg lg:text-lg xl:text-xl 2xl:text-xl 3xl:text-2xl"
                      >
                        Confirm Reset
                      </button>
                    </form>
                  )}
                  <p className="mt-3 2xs:mt-3.5 xs:mt-4 2sm:mt-4 sm:mt-4 md:mt-4 md800:mt-5 md900:mt-5 lg:mt-5 xl:mt-6 2xl:mt-6 3xl:mt-7 text-center text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base xl:text-lg 2xl:text-lg 3xl:text-xl text-gray-600">
                    <span
                      onClick={() => {
                        setShowForgot(false);
                        setForgotStep('phone');
                        setError('');
                      }}
                      className="text-blue-600 hover:underline cursor-pointer"
                    >
                      Back to Login
                    </span>
                  </p>
                </>
              )}
            </div>
          ) : (
            <div>
              <h2 className="text-lg 2xs:text-lg xs:text-xl 2sm:text-xl sm:text-xl md:text-xl md800:text-2xl md900:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl 3xl:text-4xl font-bold mb-4 text-center">
                Register
              </h2>
              {step === 'form' ? (
                <form
                  onSubmit={handleRegister}
                  className="space-y-3 2xs:space-y-3.5 xs:space-y-4 2sm:space-y-4 sm:space-y-4 md:space-y-4 md800:space-y-5 md900:space-y-5 lg:space-y-5 xl:space-y-6 2xl:space-y-6 3xl:space-y-7"
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={registerForm.name}
                    onChange={handleRegisterChange}
                    className="border p-2 rounded w-full text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base xl:text-lg 2xl:text-lg 3xl:text-xl"
                    required
                    pattern="[A-Za-z\s]*"
                    title="Name should only contain letters and spaces"
                  />
                  <input
                    type="text"
                    name="number"
                    placeholder="Phone Number (10 digits)"
                    value={registerForm.number}
                    onChange={handleRegisterChange}
                    className="border p-2 rounded w-full text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base xl:text-lg 2xl:text-lg 3xl:text-xl"
                    required
                    pattern="\d*"
                    title="Phone number should only contain digits"
                  />
                  <input
                    type="date"
                    name="dob"
                    placeholder="Date of Birth"
                    value={registerForm.dob}
                    onChange={handleRegisterChange}
                    className="border p-2 rounded w-full text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base xl:text-lg 2xl:text-lg 3xl:text-xl"
                    required
                    max={today}
                    title="Date of birth cannot be in the future"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={registerForm.email}
                    onChange={handleRegisterChange}
                    className="border p-2 rounded w-full text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base xl:text-lg 2xl:text-lg 3xl:text-xl"
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={registerForm.password}
                    onChange={handleRegisterChange}
                    className="border p-2 rounded w-full text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base xl:text-lg 2xl:text-lg 3xl:text-xl"
                    required
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={registerForm.confirmPassword}
                    onChange={handleRegisterChange}
                    className="border p-2 rounded w-full text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base xl:text-lg 2xl:text-lg 3xl:text-xl"
                    required
                  />
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={termsAccepted}
                      onChange={() => {}}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      required
                    />
                    <label
                      htmlFor="terms"
                      className="text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base xl:text-lg 2xl:text-lg 3xl:text-xl text-gray-700"
                    >
                      I agree to the{' '}
                      <span
                        onClick={handleTermsClick}
                        className="text-blue-600 hover:underline cursor-pointer"
                      >
                        Terms and Conditions
                      </span>
                      <span className="text-red-600">*</span>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="bg-purple-700 text-white px-4 py-2 rounded w-full text-sm 2xs:text-sm xs:text-base 2sm:text-base sm:text-base md:text-base md800:text-lg md900:text-lg lg:text-lg xl:text-xl 2xl:text-xl 3xl:text-2xl"
                  >
                    Send OTP
                  </button>
                </form>
              ) : (
                <form
                  onSubmit={handleVerifyOtp}
                  className="space-y-3 2xs:space-y-3.5 xs:space-y-4 2sm:space-y-4 sm:space-y-4 md:space-y-4 md800:space-y-5 md900:space-y-5 lg:space-y-5 xl:space-y-6 2xl:space-y-6 3xl:space-y-7"
                >
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="border p-2 rounded w-full text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base xl:text-lg 2xl:text-lg 3xl:text-xl"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-purple-700 text-white px-4 py-2 rounded w-full text-sm 2xs:text-sm xs:text-base 2sm:text-base sm:text-base md:text-base md800:text-lg md900:text-lg lg:text-lg xl:text-xl 2xl:text-xl 3xl:text-2xl"
                  >
                    Verify OTP
                  </button>
                </form>
              )}
              <p className="mt-3 2xs:mt-3.5 xs:mt-4 2sm:mt-4 sm:mt-4 md:mt-4 md800:mt-5 md900:mt-5 lg:mt-5 xl:mt-6 2xl:mt-6 3xl:mt-7 text-center text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base xl:text-lg 2xl:text-lg 3xl:text-xl text-gray-600">
                Already have an account?{' '}
                <span
                  onClick={() => setActiveTab('login')}
                  className="text-purple-700 hover:underline cursor-pointer"
                >
                  Login
                </span>
              </p>
            </div>
          )}
        </div>
      </div>

      {showTermsDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">Terms and Conditions</h3>
            <p className="text-sm text-gray-700 mb-4">
              By using our services, you agree to the following terms and conditions:
              <ul className="list-disc pl-5">
                <li>You must provide accurate and complete information during registration.</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                <li>Unauthorized use of this service is prohibited.</li>
                <li>We reserve the right to modify these terms at any time without prior notice.</li>
                <li>Your use of the service is at your sole risk, and we are not liable for any damages resulting from your use.</li>
              </ul>
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCloseDialog}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Close
              </button>
              <button
                onClick={handleAcceptTerms}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginRegister;