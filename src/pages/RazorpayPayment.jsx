import React, { useEffect } from 'react';

const RazorpayPayment = ({ appointmentId, amount, onSuccess, doctorName, patientEmail }) => {
  // Load Razorpay SDK dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'; // Fixed typo in URL (httpss -> https)
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup on unmount
    };
  }, []);

  const handlePayment = async () => {
    // Check if Razorpay is available
    if (!window.Razorpay) {
      alert('Razorpay SDK failed to load. Please check your internet connection or try again later.');
      return;
    }

    try {
      // Retrieve access token from sessionStorage
      const token = sessionStorage.getItem('access_token');
      if (!token) {
        throw new Error('Please Login/Register to continue.');
      }

      // Step 1: Create order from backend
      const res = await fetch('https://api.onestepmedi.com:8000/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ appointment_id: appointmentId, amount: amount }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Failed to create order');

      const options = {
        key: data.key,
        amount: data.amount * 100,
        currency: data.currency,
        name: 'DoctorHub',
        description: 'Appointment Payment',
        order_id: data.order_id,
        handler: async function (response) {
          try {
            // Step 2: Verify payment
            const verifyRes = await fetch('https://api.onestepmedi.com:8000/payment/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify({
                appointment_id: appointmentId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok) {
              if (onSuccess) onSuccess();
            } else {
              alert(verifyData.detail || 'Payment verification failed');
            }
          } catch (verifyError) {
            alert('Payment verification failed: ' + verifyError.message);
          }
        },
        prefill: {
          name: doctorName || 'Your Name',
          email: patientEmail || 'your@email.com',
        },
        theme: {
          color: '#6366F1',
        },
      };

      const razor = new window.Razorpay(options);
      razor.on('payment.error', (error) => {
        alert('Payment failed: ' + error.description);
      });
      razor.open();
    } catch (err) {
      alert(err.message || 'Something went wrong with payment');
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition duration-150"
    >
      Proceed to Pay
    </button>
  );
};

export default RazorpayPayment;