import React, { useEffect, useState } from 'react';

// Utility function to fetch with authentication
const fetchWithAuth = async (url, options = {}) => {
  const token = sessionStorage.getItem('access_token');
  if (!token) {
    throw new Error('No access token found. Please log in.');
  }

  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response;
};

const RazorpayEmergency = ({ appointmentId, amount, onSuccess, doctorName, patientEmail }) => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'; // Fixed typo (httpss -> https)
    script.async = true;
    script.onload = () => console.log('Razorpay SDK loaded');
    script.onerror = () => setError('Failed to load Razorpay SDK.');
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if (!window.Razorpay) {
      setError('Razorpay SDK failed to load. Please try again.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Step 1: Create order
      console.log('Creating order with:', { emergency_appointment_id: appointmentId, amount: amount * 100 });
      const res = await fetchWithAuth('https://api.onestepmedi.com:8000/emergency/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emergency_appointment_id: appointmentId,
          amount: amount * 100, // Convert to paise
        }),
      });

      const data = await res.json();
      console.log('Create order response:', data);
      if (!res.ok) throw new Error(data.detail || 'Failed to create order');
      if (!data.order_id || !data.order_id.startsWith('order_')) {
        throw new Error('Invalid order_id format received from backend');
      }

      // Step 2: Initialize Razorpay
      const options = {
        key: data.key || 'YOUR_RAZORPAY_KEY', // Fallback to hardcoded key if needed
        amount: data.amount,
        currency: data.currency || 'INR',
        name: 'DoctorHub',
        description: `Payment for appointment with ${doctorName}`,
        order_id: data.order_id,
        handler: async function (response) {
          console.log('Razorpay response:', response);
          try {
            // Step 3: Verify payment
            const verifyRes = await fetchWithAuth('https://api.onestepmedi.com:8000/emergency/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                appointment_id: appointmentId,
              }),
            });

            const verifyData = await verifyRes.json();
            console.log('Verify payment response:', verifyData);
            if (verifyRes.ok) {
              onSuccess();
            } else {
              setError(verifyData.detail || 'Payment verification failed');
            }
          } catch (verifyError) {
            console.error('Verification error:', verifyError);
            setError('Payment verification failed: ' + verifyError.message);
          }
        },
        prefill: {
          name: doctorName || 'Your Name',
          email: patientEmail || 'your@email.com',
        },
        theme: {
          color: '#6B46C1', // Purple to match Emergencyappointment
        },
      };

      const razor = new window.Razorpay(options);
      razor.on('payment.error', (error) => {
        setError('Payment failed: ' + error.error.description);
      });
      razor.open();
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'Something went wrong with payment');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4">
      {isLoading && (
        <p className="text-purple-600 text-xs md:text-sm mb-2">Initiating payment...</p>
      )}
      {error && (
        <p className="text-red-600 text-xs md:text-sm mb-2">{error}</p>
      )}
      <button
        onClick={handlePayment}
        disabled={isLoading}
        className={`w-full max-w-[200px] md:max-w-xs p-2.5 md:p-3 rounded-lg font-semibold text-xs md:text-sm ${
          isLoading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        Proceed to Pay ₹{amount}
      </button>
    </div>
  );
};

export default RazorpayEmergency;