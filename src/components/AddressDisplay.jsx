import React from 'react';

const AddressDisplay = ({ patientInfo, setPatientInfo }) => (
  <input
    type="text"
    name="address"
    placeholder="Enter your full address for home visit"
    value={patientInfo.address || ''}
    onChange={(e) => setPatientInfo({ ...patientInfo, address: e.target.value })}
    className="w-full p-3 border border-purple-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
    required
  />
);

export default AddressDisplay;
