// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { FaSpinner, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

// const PaymentPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [order] = useState(location.state?.order || null);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleConfirmPayment = () => {
//     if (!order) {
//       setError("No order data available. Please try again.");
//       return;
//     }

//     if (!window.confirm("Are you sure you want to confirm the payment?")) {
//       return;
//     }

//     setIsProcessing(true);
//     setError("");
//     setSuccess("");

//     try {
//       if (order.type === "pharmacy") {
//         // Handle pharmacy order payment 
//         const allOrders = JSON.parse(localStorage.getItem("pharmacyOrders") || "[]");
//         const newOrder = {
//           id: `order-${Date.now()}`,
//           ...order,
//           status: "Order Placed",
//           date: new Date().toLocaleDateString("en-IN"),
//           timestamp: new Date().toISOString(),
//         };
//         allOrders.push(newOrder);
//         localStorage.setItem("pharmacyOrders", JSON.stringify(allOrders));

//         // Create notification for pharmacy
//         const allNotifications = JSON.parse(localStorage.getItem("notifications") || "[]");
//         const newNotification = {
//           id: `notification-${Date.now()}`,
//           patientEmail: order.patientEmail,
//           message: `New pharmacy order placed for prescription ${order.prescriptionId} by ${order.patientEmail}.`,
//           timestamp: new Date().toISOString(),
//           read: false,
//           appointmentId: order.appointmentId,
//           doctorId: order.doctorId,
//         };
//         allNotifications.push(newNotification);
//         localStorage.setItem("notifications", JSON.stringify(allNotifications));

//         // Dispatch events
//         const orderEvent = new Event("pharmacyOrderUpdated");
//         window.dispatchEvent(orderEvent);
//         const notificationEvent = new Event("notificationUpdated");
//         window.dispatchEvent(notificationEvent);

//         setTimeout(() => {
//           setIsProcessing(false);
//           setSuccess("Payment successful! Your pharmacy order has been confirmed.");
//           setTimeout(() => navigate("/user-dash"), 2000);
//         }, 1000);
//       } else if (order.type === "appointment") {
//         // Handle doctor appointment payment
//         const allBookings = JSON.parse(localStorage.getItem("doctorBookings") || "[]");
//         const newBooking = {
//           id: `booking-${Date.now()}`,
//           patientEmail: order.patientEmail,
//           doctorId: order.doctorId,
//           doctorName: order.doctorName,
//           fee: order.fee,
//           subtotal: order.subtotal,
//           gst: order.gst,
//           total: order.total,
//           status: "Scheduled",
//           date: new Date().toLocaleDateString("en-IN"),
//           timestamp: new Date().toISOString(),
//           appointmentTime: order.appointmentTime,
//         };
//         allBookings.push(newBooking);
//         localStorage.setItem("doctorBookings", JSON.stringify(allBookings));

//         // Create notification for appointment
//         const allNotifications = JSON.parse(localStorage.getItem("notifications") || "[]");
//         const newNotification = {
//           id: `notification-${Date.now()}`,
//           patientEmail: order.patientEmail,
//           message: `Appointment booked with Dr. ${order.doctorName} at ${order.appointmentTime}.`,
//           timestamp: new Date().toISOString(),
//           read: false,
//           doctorId: order.doctorId,
//         };
//         allNotifications.push(newNotification);
//         localStorage.setItem("notifications", JSON.stringify(allNotifications));

//         // Dispatch events
//         const bookingEvent = new Event("doctorBookingUpdated");
//         window.dispatchEvent(bookingEvent);
//         const notificationEvent = new Event("notificationUpdated");
//         window.dispatchEvent(notificationEvent);

//         setTimeout(() => {
//           setIsProcessing(false);
//           setSuccess("Payment successful! Your appointment has been booked.");
//           setTimeout(() => navigate("/myappointment"), 2000);
//         }, 1000);
//       }
//     } catch (error) {
//       console.error("Error processing payment:", error);
//       setError("Failed to process payment. Please try again.");
//       setIsProcessing(false);
//     }
//   };

//   if (!order) {
//     return (
//       <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg text-center">
//         <FaExclamationCircle className="text-red-500 text-3xl mb-2" />
//         <p className="text-red-500">Invalid order data. Please try again.</p>
//         <button
//           onClick={() => navigate("/user-dash")}
//           className="mt-4 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition"
//         >
//           Back to Dashboard
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
//         <FaCheckCircle className="text-green-500 mr-2" />
//         Payment
//       </h2>
//       {error && (
//         <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm flex items-center">
//           <FaExclamationCircle className="mr-2" />
//           {error}
//         </div>
//       )}
//       {success && (
//         <div className="mb-4 p-2 bg-green-100 text-green-700 rounded-md text-sm flex items-center">
//           <FaCheckCircle className="mr-2" />
//           {success}
//         </div>
//       )}
//       <div className="mb-4">
//         {order.type === "pharmacy" ? (
//           <>
//             <p className="text-sm font-medium text-gray-700">Order Summary:</p>
//             <table className="w-full text-sm text-gray-600 mt-2">
//               <thead>
//                 <tr>
//                   <th className="text-left">Medication</th>
//                   <th className="text-right">Qty</th>
//                   <th className="text-right">Cost (INR)</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {order.billItems.map((item, index) => (
//                   <tr key={index}>
//                     <td>{item.medication}</td>
//                     <td className="text-right">{item.quantity}</td>
//                     <td className="text-right">{item.cost.toFixed(2)}</td>
//                   </tr>
//                 ))}
//                 <tr>
//                   <td colSpan="2" className="text-right font-medium">Subtotal:</td>
//                   <td className="text-right">{order.subtotal.toFixed(2)}</td>
//                 </tr>
//                 <tr>
//                   <td colSpan="2" className="text-right font-medium">GST (18%):</td>
//                   <td className="text-right">{order.gst.toFixed(2)}</td>
//                 </tr>
//                 <tr>
//                   <td colSpan="2" className="text-right font-bold">Total:</td>
//                   <td className="text-right font-bold">{order.total.toFixed(2)}</td>
//                 </tr>
//               </tbody>
//             </table>
//             <p className="text-sm text-gray-600 mt-2">
//               <span className="font-medium">Delivery Address:</span> {order.address}
//             </p>
//           </>
//         ) : (
//           <>
//             <p className="text-sm font-medium text-gray-700">Appointment Summary:</p>
//             <table className="w-full text-sm text-gray-600 mt-2">
//               <tbody>
//                 <tr>
//                   <td className="text-left">Doctor</td>
//                   <td className="text-right">{order.doctorName}</td>
//                 </tr>
//                 <tr>
//                   <td className="text-left">Appointment Time</td>
//                   <td className="text-right">{order.appointmentTime}</td>
//                 </tr>
//                 <tr>
//                   <td className="text-left font-medium">Fee:</td>
//                   <td className="text-right">{order.subtotal.toFixed(2)}</td>
//                 </tr>
//                 <tr>
//                   <td className="text-left font-medium">GST (18%):</td>
//                   <td className="text-right">{order.gst.toFixed(2)}</td>
//                 </tr>
//                 <tr>
//                   <td className="text-left font-bold">Total:</td>
//                   <td className="text-right font-bold">{order.total.toFixed(2)}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </>
//         )}
//       </div>
//       <button
//         onClick={handleConfirmPayment}
//         disabled={isProcessing}
//         className={`w-full py-2 rounded-lg text-white flex items-center justify-center ${
//           isProcessing ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
//         } transition`}
//       >
//         {isProcessing ? (
//           <>
//             <FaSpinner className="animate-spin mr-2" />
//             Processing...
//           </>
//         ) : (
//           "Confirm Payment"
//         )}
//       </button>
//       <button
//         onClick={() => navigate("/myappointment")}
//         className="w-full mt-2 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition"
//       >
//         Cancel
//       </button>
//     </div>
//   );
// };

// export default PaymentPage;

// import React from "react";
// import axios from "axios";
 
// const PaymentPage = ({ appointmentId }) => {
//   const handlePayment = async () => {
//     try {
//       // Step 1: Create Razorpay order from backend
//       const res = await axios.post("http://localhost:8000/payment/create-order", {
//         appointment_id: appointmentId,
//         amount: 10, // ₹10 for testing
//       });
 
//       const { order_id, amount, key } = res.data;
 
//       // Step 2: Razorpay options
//       const options = {
//         key: key,
//         amount: amount * 100,
//         currency: "INR",
//         name: "DoctorHUB",
//         description: "Consultation Fee",
//         order_id: order_id,
//         handler: async function (response) {
//           try {
//             // Step 3: Verify payment on backend
//             const verifyRes = await axios.post("http://localhost:8000/payment/verify", {
//               order_id: order_id,
//               payment_id: response.razorpay_payment_id,
//               signature: response.razorpay_signature,
//             });
//             alert("Payment Successful");
//           } catch (err) {
//             alert("Payment Verification Failed");
//           }
//         },
//         prefill: {
//           name: "Guest Patient",
//           email: "guest@example.com",
//           contact: "9999999999",
//         },
//         theme: {
//           color: "#00b894",
//         },
//       };
 
//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error("Error initiating payment:", error);
//       alert("Failed to initiate payment");
//     }
//   };
 
//   return (
// <div className="payment-container">
// <h2>Appointment Confirmed</h2>
// <p>Click below to proceed with ₹10 consultation fee payment.</p>
// <button onClick={handlePayment} style={{ padding: "10px 20px", fontSize: "16px" }}>
//         Proceed to Payment
// </button>
// </div>
//   );
// };
 
// export default PaymentPage;