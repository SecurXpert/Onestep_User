import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import registerImage from '../assets/manas.png'; // Main image for all screens

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/; // 8-16, letters+digits+special

const LoginRegister = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

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

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [error, setError] = useState(''); // top-level message (API or general)
  const [fieldErrors, setFieldErrors] = useState({}); // per-field errors

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsDialog, setShowTermsDialog] = useState(false);

  const [step, setStep] = useState('form'); // Registration steps: form, otp
  const [otpId, setOtpId] = useState('');
  const [otpCode, setOtpCode] = useState('');

  const [showForgot, setShowForgot] = useState(false);
  const [forgotStep, setForgotStep] = useState('phone'); // phone -> otp
  const [forgotPhone, setForgotPhone] = useState('');
  const [forgotOtpId, setForgotOtpId] = useState('');
  const [forgotCode, setForgotCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Reset error when switching tabs
  useEffect(() => {
    setError('');
    setFieldErrors({});
  }, [activeTab]);

  const clearErrorsOnChange = (name) => {
    setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    setError('');
  };

  // Login handlers
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await login(loginForm.email, loginForm.password);
      if (result.success) {
        const accessToken = result.data?.access_token;
        if (!accessToken) throw new Error('Access token not found in response');

        const userRole = result.data.user?.role || 'user';
        navigate(userRole === 'admin' ? '/admin/dashboard' : '/');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid username or password');
    }
  };

  // Register handlers
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name') {
      if (value && !/^[A-Za-z\s]*$/.test(value)) return; // letters & spaces only
    }

    if (name === 'number') {
      const digits = value.replace(/\D/g, '').slice(0, 10);
      setRegisterForm((prev) => ({ ...prev, number: digits }));
      clearErrorsOnChange('number');
      return;
    }

    setRegisterForm((prev) => ({ ...prev, [name]: value }));
    clearErrorsOnChange(name);
  };

  const validateRegisterForm = () => {
    const { name, number, dob, email, password, confirmPassword } = registerForm;
    const errs = {};

    if (!name) errs.name = 'Name is required.';

    if (!number) {
      errs.number = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(number)) {
      errs.number = 'Phone number must be 10 digits.';
    }

    if (!dob) {
      errs.dob = 'Date of birth is required.';
    } else {
      const dobDate = new Date(dob);
      const today = new Date();
      if (dobDate > today) errs.dob = 'Date of birth cannot be in the future.';
    }

    if (!email) {
      errs.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Invalid email format.';
    }

    if (!password) {
      errs.password = 'Password is required.';
    } else if (!PASSWORD_REGEX.test(password)) {
      errs.password = 'Password must be 8–16 characters and include at least one letter, one number, and one special character (!@#$%^&*).';
    }

    if (!confirmPassword) {
      errs.confirmPassword = 'Confirm Password is required.'; // TC_39
    } else if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.'; // TC_40
    }

    if (!termsAccepted) {
      errs.terms = 'You must accept the Terms and Conditions.';
    }

    setFieldErrors(errs);
    return errs;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    const errs = validateRegisterForm();
    if (Object.keys(errs).length > 0) return; // show inline errors

    const { name, number, dob, email, password } = registerForm;
    const phone = `+91${number}`;

    const signup_payload = { name, email, password, phone_number: phone, dob };

    try {
      const res = await fetch('https://api.onestepmedi.com:8000//auth/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, purpose: 'signup', role: 'patient', signup_payload }),
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
      console.error(err);
      setError('Error sending OTP');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otpCode) {
      setFieldErrors({ otp: 'OTP code is required.' });
      return;
    }

    try {
      const res = await fetch('https://api.onestepmedi.com:8000//auth/patient/signup/confirm', {
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
        setRegisterForm({ name: '', number: '', dob: '', email: '', password: '', confirmPassword: '' });
        setTermsAccepted(false);
        setFieldErrors({});
      } else {
        setFieldErrors({ otp: 'Invalid OTP.' });
      }
    } catch (err) {
      console.error(err);
      setError('Error verifying OTP');
    }
  };

  // Forgot password
  const handleSendForgotOtp = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    if (!forgotPhone || !/^\d{10}$/.test(forgotPhone)) {
      setFieldErrors({ forgotPhone: 'Phone number must be 10 digits.' });
      return;
    }

    const phone = `+91${forgotPhone}`;
    try {
      const res = await fetch('https://api.onestepmedi.com:8000//auth/otp/send', {
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
      console.error(err);
      setError('Error sending OTP');
    }
  };

  const handleConfirmForgot = async (e) => {
    e.preventDefault();
    setError('');
    const errs = {};

    if (!forgotCode) errs.forgotCode = 'OTP code is required.';
    if (!newPassword) {
      errs.newPassword = 'New password is required.';
    } else if (!PASSWORD_REGEX.test(newPassword)) {
      errs.newPassword = 'Password must be 8–16 characters and include at least one letter, one number, and one special character (!@#$%^&*).';
    }
    if (!confirmNewPassword) {
      errs.confirmNewPassword = 'Confirm Password is required.';
    } else if (newPassword !== confirmNewPassword) {
      errs.confirmNewPassword = 'Passwords do not match.';
    }

    if (Object.keys(errs).length) {
      setFieldErrors(errs);
      return;
    }

    const phone = `+91${forgotPhone}`;

    try {
      const res = await fetch('https://api.onestepmedi.com:8000//auth/forgot-password/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, role: 'patient', otp_id: forgotOtpId, code: forgotCode, new_password: newPassword }),
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
        setFieldErrors({});
      } else {
        setError('Invalid OTP or error resetting password');
      }
    } catch (err) {
      console.error(err);
      setError('Error resetting password');
    }
  };

  const handleTermsClick = () => setShowTermsDialog(true);
  const handleAcceptTerms = () => { setTermsAccepted(true); setShowTermsDialog(false); };
  const handleCloseDialog = () => setShowTermsDialog(false);

  const today = new Date().toISOString().split('T')[0];

  // UI helpers
  const InputError = ({ msg }) =>
    msg ? <p className="mt-1 text-xs text-red-600">{msg}</p> : null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-2 sm:p-4 lg:p-6">

      {/* make the card stack on mobile, side-by-side on md+; show image on mobile too */}
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Image (visible on all screens) */}
        <div className="w-full md:w-1/2">
          <img
            src={registerImage}
            alt="Register"
            className="w-full h-40 sm:h-56 md:h-full object-cover"
          />
        </div>

        {/* Right form */}
        <div className="w-full md:w-1/2 p-5 sm:p-8 lg:p-10">
          {/* Tabs */}
          <div className="flex mb-6 rounded-lg overflow-hidden border border-gray-200">
            <button
              onClick={() => setActiveTab('login')}
              className={`w-1/2 px-4 py-2 text-sm sm:text-base font-medium transition-colors ${
                activeTab === 'login' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`w-1/2 px-4 py-2 text-sm sm:text-base font-medium transition-colors ${
                activeTab === 'register' ? 'bg-purple-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Register
            </button>
          </div>

          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700 border border-red-200">{error}</div>
          )}

          {/* LOGIN */}
          {activeTab === 'login' ? (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-center">{showForgot ? 'Forgot Password' : 'Login'}</h2>
              {!showForgot ? (
                <>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={loginForm.email}
                        onChange={handleLoginChange}
                        className="border p-2 rounded w-full text-sm"
                        required
                        autoComplete="email"
                      />
                    </div>
                    <div>
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={loginForm.password}
                        onChange={handleLoginChange}
                        className="border p-2 rounded w-full text-sm"
                        required
                        autoComplete="current-password"
                      />
                    </div>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full text-base">
                      Login
                    </button>
                  </form>
                  <p className="mt-4 text-center text-sm text-gray-600">
                    Forgot Password{' '}
                    <button type="button" onClick={() => setShowForgot(true)} className="text-blue-600 hover:underline">
                      Reset
                    </button>
                  </p>
                  <p className="mt-2 text-center text-sm text-gray-600">
                    Don’t have an account{' '}
                    <button type="button" onClick={() => setActiveTab('register')} className="text-purple-700 hover:underline">
                      Register
                    </button>
                  </p>
                </>
              ) : (
                <>
                  {forgotStep === 'phone' ? (
                    <form onSubmit={handleSendForgotOtp} className="space-y-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Phone Number (10 digits)"
                          value={forgotPhone}
                          onChange={(e) => {
                            setForgotPhone(e.target.value.replace(/\D/g, '').slice(0, 10));
                            setFieldErrors((p) => ({ ...p, forgotPhone: '' }));
                          }}
                          className="border p-2 rounded w-full text-sm"
                          required
                          inputMode="numeric"
                        />
                        <InputError msg={fieldErrors.forgotPhone} />
                      </div>
                      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full text-base">
                        Send OTP
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleConfirmForgot} className="space-y-4">
                      <div>
                        <input
                          type="text"
                          placeholder="OTP Code"
                          value={forgotCode}
                          onChange={(e) => {
                            setForgotCode(e.target.value);
                            setFieldErrors((p) => ({ ...p, forgotCode: '' }));
                          }}
                          className="border p-2 rounded w-full text-sm"
                          required
                        />
                        <InputError msg={fieldErrors.forgotCode} />
                      </div>
                      <div>
                        <div className="relative">
                          <input
                            type={showPass ? 'text' : 'password'}
                            placeholder="New Password"
                            value={newPassword}
                            maxLength={16}
                            onChange={(e) => {
                              setNewPassword(e.target.value);
                              setFieldErrors((p) => ({ ...p, newPassword: '' }));
                            }}
                            className="border p-2 rounded w-full text-sm pr-20"
                            required
                            autoComplete="new-password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPass((s) => !s)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-600"
                          >
                            {showPass ? 'Hide' : 'Show'}
                          </button>
                        </div>
                        <InputError msg={fieldErrors.newPassword} />
                        <p className="mt-1 text-[11px] text-gray-500">8–16 chars, include letters, numbers & !@#$%^&*</p>
                      </div>
                      <div>
                        <div className="relative">
                          <input
                            type={showConfirmPass ? 'text' : 'password'}
                            placeholder="Confirm New Password"
                            value={confirmNewPassword}
                            maxLength={16}
                            onChange={(e) => {
                              setConfirmNewPassword(e.target.value);
                              setFieldErrors((p) => ({ ...p, confirmNewPassword: '' }));
                            }}
                            className="border p-2 rounded w-full text-sm pr-20"
                            required
                            autoComplete="new-password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPass((s) => !s)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-600"
                          >
                            {showConfirmPass ? 'Hide' : 'Show'}
                          </button>
                        </div>
                        <InputError msg={fieldErrors.confirmNewPassword} />
                      </div>
                      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full text-base">
                        Confirm Reset
                      </button>
                    </form>
                  )}
                  <p className="mt-4 text-center text-sm text-gray-600">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForgot(false);
                        setForgotStep('phone');
                        setError('');
                        setFieldErrors({});
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      Back to Login
                    </button>
                  </p>
                </>
              )}
            </div>
          ) : (
            // REGISTER
            <div>
              <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
              {step === 'form' ? (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={registerForm.name}
                      onChange={handleRegisterChange}
                      className="border p-2 rounded w-full text-sm"
                      required
                      pattern="[A-Za-z\\s]*"
                      title="Name should only contain letters and spaces"
                      autoComplete="name"
                    />
                    <InputError msg={fieldErrors.name} />
                  </div>

                  <div>
                    <input
                      type="text"
                      name="number"
                      placeholder="Phone Number (10 digits)"
                      value={registerForm.number}
                      onChange={handleRegisterChange}
                      className="border p-2 rounded w-full text-sm"
                      required
                      inputMode="numeric"
                      maxLength={10}
                    />
                    <InputError msg={fieldErrors.number} />
                  </div>

                  <div>
                    <input
                      type="date"
                      name="dob"
                      placeholder="Date of Birth"
                      value={registerForm.dob}
                      onChange={handleRegisterChange}
                      className="border p-2 rounded w-full text-sm"
                      required
                      max={today}
                      title="Date of birth cannot be in the future"
                    />
                    <InputError msg={fieldErrors.dob} />
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={registerForm.email}
                      onChange={handleRegisterChange}
                      className="border p-2 rounded w-full text-sm"
                      required
                      autoComplete="email"
                    />
                    <InputError msg={fieldErrors.email} />
                  </div>

                  <div>
                    <div className="relative">
                      <input
                        type={showPass ? 'text' : 'password'}
                        name="password"
                        placeholder="Password"
                        value={registerForm.password}
                        onChange={handleRegisterChange}
                        className="border p-2 rounded w-full text-sm pr-20"
                        required
                        maxLength={16}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass((s) => !s)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-600"
                      >
                        {showPass ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    <InputError msg={fieldErrors.password} />
                    <p className="mt-1 text-[11px] text-gray-500">8–16 chars, include letters, numbers & !@#$%^&*</p>
                  </div>

                  <div>
                    <div className="relative">
                      <input
                        type={showConfirmPass ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={registerForm.confirmPassword}
                        onChange={handleRegisterChange}
                        className="border p-2 rounded w-full text-sm pr-20"
                        required
                        maxLength={16}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPass((s) => !s)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-600"
                      >
                        {showConfirmPass ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    <InputError msg={fieldErrors.confirmPassword} />
                  </div>

                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700">
                      I agree to the{' '}
                      <button type="button" onClick={handleTermsClick} className="text-blue-600 hover:underline">
                        Terms and Conditions
                      </button>
                      <span className="text-red-600">*</span>
                    </label>
                  </div>
                  <InputError msg={fieldErrors.terms} />

                  <button type="submit" className="bg-purple-700 text-white px-4 py-2 rounded w-full text-base">
                    Send OTP
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={otpCode}
                      onChange={(e) => {
                        setOtpCode(e.target.value);
                        setFieldErrors((p) => ({ ...p, otp: '' }));
                      }}
                      className="border p-2 rounded w-full text-sm"
                      required
                    />
                    <InputError msg={fieldErrors.otp} />
                  </div>
                  <button type="submit" className="bg-purple-700 text-white px-4 py-2 rounded w-full text-base">
                    Verify OTP
                  </button>
                </form>
              )}
              <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account{' '}
                <button type="button" onClick={() => setActiveTab('login')} className="text-purple-700 hover:underline">
                  Login
                </button>
              </p>
            </div>
          )}
        </div>
      </div>

      {showTermsDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-xl">
            <h3 className="text-lg font-bold mb-4">Terms and Conditions</h3>
            <div className="text-sm text-gray-700 space-y-2">
              <p>By using our services, you agree to the following terms and conditions:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>You must provide accurate and complete information during registration.</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                <li>Unauthorized use of this service is prohibited.</li>
                <li>We reserve the right to modify these terms at any time without prior notice.</li>
                <li>Your use of the service is at your sole risk, and we are not liable for any damages resulting from your use.</li>
              </ul>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={handleCloseDialog} className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200">
                Close
              </button>
              <button onClick={handleAcceptTerms} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
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
