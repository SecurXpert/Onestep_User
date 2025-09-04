import React, { createContext, useState, useEffect } from 'react';
import { fetchWithAuth } from '../utils/api';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [topdoctors, setTopDoctors] = useState([]);


  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetchWithAuth('https://api.onestepmedi.com:8000/doctors/all', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (response.ok) {
          console.log('Fetched doctors:', data); // Debug log
          setTopDoctors(data);
        } else {
          console.error('Failed to fetch doctors:', data.detail || 'Unknown error');
        }
      } catch (error) {
        console.error('Error fetching doctors:', error.message);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <AppContext.Provider value={{ topdoctors }}>
      {children}
    </AppContext.Provider>
  );
};
