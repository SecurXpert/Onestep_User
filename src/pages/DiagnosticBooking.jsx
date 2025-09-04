// import React, { useState } from "react";

// const DiagnosticBooking = () => {
//   const [prescriptionFile, setPrescriptionFile] = useState(null);
//   const [testSelected, setTestSelected] = useState("");
//   const [showConsultPrompt, setShowConsultPrompt] = useState(false);
//   const [suggestedDoctors, setSuggestedDoctors] = useState([]);

//   const handleTestBooking = () => {
//     // Simulate condition check
//     if (testSelected) {
//       setShowConsultPrompt(true);

//       // Mock doctor suggestions
//       const mockDoctors = [
//         { name: "Dr. A Sharma", specialty: "Pathologist", rating: 4.7 },
//         { name: "Dr. B Rao", specialty: "General Physician", rating: 4.5 },
//       ];
//       setSuggestedDoctors(mockDoctors);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6 mt-10">
//       <h2 className="text-2xl font-bold text-purple-700">Direct Diagnostic Booking</h2>

//       {/* Test Selection */}
//       <div>
//         <label className="block text-sm font-semibold mb-2 text-gray-700">Select a Lab Test</label>
//         <select
//           value={testSelected}
//           onChange={(e) => setTestSelected(e.target.value)}
//           className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
//         >
//           <option value="">-- Choose a Test --</option>
//           <option value="CBC">CBC (Complete Blood Count)</option>
//           <option value="LFT">Liver Function Test</option>
//           <option value="Thyroid">Thyroid Panel</option>
//         </select>
//       </div>

//       {/* Prescription Upload */}
//       <div>
//         <label className="block text-sm font-semibold mb-2 text-gray-700">
//           Upload External Prescription (Optional)
//         </label>
//         <input
//           type="file"
//           onChange={(e) => setPrescriptionFile(e.target.files[0])}
//           className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"
//         />
//       </div>

//       {/* Book Button */}
//       <button
//         onClick={handleTestBooking}
//         className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition"
//       >
//         Book Test
//       </button>

//       {/* Consultation Prompt */}
//       {showConsultPrompt && (
//         <div className="p-4 mt-4 bg-purple-50 border border-purple-300 rounded-lg">
//           <p className="text-purple-800 font-semibold mb-2">
//             Would you like a doctor consultation based on your test results?
//           </p>

//           <div className="space-y-2">
//             {suggestedDoctors.map((doc, idx) => (
//               <div
//                 key={idx}
//                 className="p-3 bg-white rounded border border-gray-200 shadow-sm flex items-center justify-between"
//               >
//                 <div>
//                   <p className="font-semibold text-gray-800">{doc.name}</p>
//                   <p className="text-sm text-gray-500">{doc.specialty}</p>
//                 </div>
//                 <button className="text-sm bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700">
//                   Book
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DiagnosticBooking;
