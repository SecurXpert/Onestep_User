import React, { useState } from 'react';

const CaseStudyForm = () => {
  const [message, setMessage] = useState('');
  const [prescriptions, setPrescriptions] = useState([
    { medicine: '', dose: '', duration: '', quantity: '' }
  ]);
  const [tests, setTests] = useState(['']);
  const [submitStatus, setSubmitStatus] = useState(null);

  const addPrescription = () => {
    setPrescriptions([...prescriptions, { medicine: '', dose: '', duration: '', quantity: '' }]);
  };

  const updatePrescription = (index, field, value) => {
    const updatedPrescriptions = [...prescriptions];
    updatedPrescriptions[index][field] = value;
    setPrescriptions(updatedPrescriptions);
  };

  const removePrescription = (index) => {
    setPrescriptions(prescriptions.filter((_, i) => i !== index));
  };

  const addTest = () => {
    setTests([...tests, '']);
  };

  const updateTest = (index, value) => {
    const updatedTests = [...tests];
    updatedTests[index] = value;
    setTests(updatedTests);
  };

  const removeTest = (index) => {
    setTests(tests.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitStatus('Submitting...');
    setTimeout(() => {
      setSubmitStatus('Case study submitted successfully!');
      // Reset form
      setMessage('');
      setPrescriptions([{ medicine: '', dose: '', duration: '', quantity: '' }]);
      setTests(['']);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Patient Case Study Form</h1>
      
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Message to Patient</label>
        <textarea
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message for the patient..."
        />
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Prescriptions</h2>
        {prescriptions.map((prescription, index) => (
          <div key={index} className="border p-4 mb-4 rounded-lg relative">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Medicine Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={prescription.medicine}
                  onChange={(e) => updatePrescription(index, 'medicine', e.target.value)}
                  placeholder="Enter medicine name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Dose at Time</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={prescription.dose}
                  onChange={(e) => updatePrescription(index, 'dose', e.target.value)}
                  placeholder="e.g., 500mg"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Duration (Days)</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={prescription.duration}
                  onChange={(e) => updatePrescription(index, 'duration', e.target.value)}
                  placeholder="e.g., 7"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Quantity</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={prescription.quantity}
                  onChange={(e) => updatePrescription(index, 'quantity', e.target.value)}
                  placeholder="e.g., 14"
                />
              </div>
            </div>
            {prescriptions.length > 1 && (
              <button
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                onClick={() => removePrescription(index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={addPrescription}
        >
          Add Prescription
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Diagnostic Tests</h2>
        {tests.map((test, index) => (
          <div key={index} className="flex items-center mb-3">
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={test}
              onChange={(e) => updateTest(index, e.target.value)}
              placeholder="e.g., Blood Test"
            />
            {tests.length > 1 && (
              <button
                className="ml-2 text-red-500 hover:text-red-700"
                onClick={() => removeTest(index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={addTest}
        >
          Add Test
        </button>
      </div>

      <button
        className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        onClick={handleSubmit}
      >
        Submit Case Study
      </button>

      {submitStatus && (
        <p className="mt-4 text-center text-green-600">{submitStatus}</p>
      )}
    </div>
  );
};

export default CaseStudyForm;