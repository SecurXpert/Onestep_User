import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../utils/api';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('access_token'));
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Function to calculate age from DOB
  const calculateAge = (dob) => {
    if (!dob) return '';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age.toString();
  };

  // Initialize user from sessionStorage or fetch profile on mount
  useEffect(() => {
    const token = sessionStorage.getItem('access_token');
    const storedProfile = sessionStorage.getItem('userProfile');

    if (token && storedProfile) {
      const parsedProfile = JSON.parse(storedProfile);
      if (parsedProfile.dob && !parsedProfile.age) {
        parsedProfile.age = calculateAge(parsedProfile.dob);
      }
      setUser(parsedProfile);
      setIsLoggedIn(true);
      console.log("Loaded user from sessionStorage:", parsedProfile);
    } else if (token) {
      const fetchProfile = async () => {
        try {
          const response = await fetchWithAuth('https://api.onestepmedi.com:8000/profile/me', {
            method: 'GET',
          });
          if (response.ok) {
            const data = await response.json();
            const formattedProfile = {
              patient_id: data.patient_id || '',
              name: data.name || '',
              email: data.email || '',
              phone: data.phone_number || data.phone || '',
              gender: data.gender || '',
              maritalStatus: data.marital_status || '',
              address: data.address || '',
              bloodGroup: data.blood_group || '',
              region: data.region || '',
              dob: data.dob || '',
              age: data.dob ? calculateAge(data.dob) : data.age || '',
            };
            setUser(formattedProfile);
            sessionStorage.setItem('userProfile', JSON.stringify(formattedProfile));
            console.log("Fetched user profile:", formattedProfile);
            if (!formattedProfile.patient_id) {
              console.warn("No patient_id in profile. User may need to complete profile.");
            }
          } else {
            const errorData = await response.json();
            console.error('Failed to fetch profile:', errorData);
            setIsLoggedIn(false);
            sessionStorage.removeItem('access_token');
            sessionStorage.removeItem('userProfile');
            navigate('/login-register');
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
          setIsLoggedIn(false);
          sessionStorage.removeItem('access_token');
          sessionStorage.removeItem('userProfile');
          navigate('/login-register');
        }
      };
      fetchProfile();
    }
  }, [navigate]);

  const register = async (name, number, dob, email, password) => {
    try {
      const response = await fetch('https://api.onestepmedi.com:8000/patient/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone_number: number,
          dob,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem('access_token', data.access_token);
        if (data.refresh_token) {
          sessionStorage.setItem('refresh_token', data.refresh_token);
        }
        const formattedProfile = {
          patient_id: data.patient_id || '',
          name: data.name || name,
          email: data.email || email,
          phone: data.phone_number || number,
          dob: data.dob || dob,
          age: dob ? calculateAge(dob) : '',
        };
        setUser(formattedProfile);
        setIsLoggedIn(true);
        // sessionStorage.setItem('userProfile', JSON.stringify(formattedProfile));
        console.log("Registered user:", formattedProfile);
        return { success: true, data };
      } else {
        console.error('Registration error response:', data);
        return { success: false, message: data.detail || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: error.message || 'Network error' };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('https://api.onestepmedi.com:8000/patient/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem('access_token', data.access_token);
        if (data.refresh_token) {
          sessionStorage.setItem('refresh_token', data.refresh_token);
        }
        setIsLoggedIn(true);

        // Decode JWT token to check role
        let userRole = '';
        try {
          const decodedToken = jwtDecode(data.access_token);
          console.log("Decoded JWT token:", decodedToken); // Debug token content
          userRole = decodedToken.role ? decodedToken.role.toLowerCase() : '';
          if (!userRole) {
            console.warn("No role found in JWT token. Defaulting to standard user.");
          }
        } catch (error) {
          console.error("Error decoding JWT token:", error);
          userRole = '';
        }

        const profileResponse = await fetchWithAuth('https://api.onestepmedi.com:8000/profile/me', {
          method: 'GET',
        });

        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          const formattedProfile = {
            patient_id: profileData.patient_id || '',
            name: profileData.name || '',
            email: profileData.email || '',
            phone: profileData.phone_number || profileData.phone || '',
            gender: profileData.gender || '',
            maritalStatus: profileData.marital_status || '',
            address: profileData.address || '',
            bloodGroup: profileData.blood_group || '',
            region: profileData.region || '',
            dob: profileData.dob || '',
            age: profileData.dob ? calculateAge(profileData.dob) : profileData.age || '',
          };
          setUser(formattedProfile);
          sessionStorage.setItem('userProfile', JSON.stringify(formattedProfile));
          console.log("Logged in user:", formattedProfile);
          if (!formattedProfile.patient_id) {
            console.warn("No patient_id in profile. User may need to complete profile.");
          }

          // Navigate based on role
          if (userRole === 'superadmin') {
            console.log("Navigating to /super_dashboard for superadmin");
            navigate('/super_dashboard', { replace: true });
          } else {
            console.log("Navigating to /dashboard for non-superadmin");
            navigate('/dashboard', { replace: true });
          }

          return { success: true, data };
        } else {
          console.error('Failed to fetch profile after login:', await profileResponse.json());
          return { success: false, message: 'Failed to fetch user profile' };
        }
      } else {
        console.error('Login error response:', data);
        return { success: false, message: data.detail || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: error.message || 'Network error' };
    }
  };

  const logout = () => {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('userProfile');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/login-register');
  };

  return (
    <AuthContext.Provider value={{ register, login, logout, isLoggedIn, user }}>
      {children}
    </AuthContext.Provider>
  );
};