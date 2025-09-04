import React, { useState, useEffect } from 'react';
import { FiDownload, FiPlus, FiSearch, FiFilter } from 'react-icons/fi';
import { FaFileMedical, FaPills, FaFlask, FaProcedures } from 'react-icons/fa';

const HealthRecords = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample data - replace with API call
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const sampleRecords = [
        {
          id: 1,
          type: 'prescription',
          title: 'Diabetes Medication',
          date: '2023-05-15',
          doctor: 'Dr. Sharma',
          fileUrl: '#',
          description: 'Metformin 500mg twice daily'
        },
        {
          id: 2,
          type: 'lab-report',
          title: 'Blood Test Results',
          date: '2023-04-10',
          doctor: 'Dr. Patel',
          fileUrl: '#',
          description: 'Complete blood count - All normal ranges'
        },
        {
          id: 3,
          type: 'consultation',
          title: 'Cardiology Consultation',
          date: '2023-03-22',
          doctor: 'Dr. Kumar',
          fileUrl: '#',
          description: 'ECG showed normal sinus rhythm'
        },
        {
          id: 4,
          type: 'scan',
          title: 'X-Ray Report',
          date: '2023-02-18',
          doctor: 'Dr. Gupta',
          fileUrl: '#',
          description: 'Right wrist fracture - healing properly'
        }
      ];
      setRecords(sampleRecords);
      setFilteredRecords(sampleRecords);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter records based on search and active tab
  useEffect(() => {
    let result = records;
    
    if (activeTab !== 'all') {
      result = result.filter(record => record.type === activeTab);
    }
    
    if (searchQuery) {
      result = result.filter(record => 
        record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredRecords(result);
  }, [searchQuery, activeTab, records]);

  const getIconForType = (type) => {
    switch(type) {
      case 'prescription': return <FaPills className="text-blue-500" />;
      case 'lab-report': return <FaFlask className="text-green-500" />;
      case 'consultation': return <FaFileMedical className="text-purple-500" />;
      case 'scan': return <FaProcedures className="text-orange-500" />;
      default: return <FaFileMedical className="text-gray-500" />;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">My Health Records</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
          <FiPlus className="mr-2" />
          Upload New Record
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-grow">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search records..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <FiFilter className="text-gray-500" />
            <select 
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
            >
              <option value="all">All Records</option>
              <option value="prescription">Prescriptions</option>
              <option value="lab-report">Lab Reports</option>
              <option value="consultation">Consultations</option>
              <option value="scan">Scans & Imaging</option>
            </select>
          </div>
        </div>
      </div>

      {/* Records List */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredRecords.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500 text-lg">No records found</p>
          <button className="mt-4 text-blue-600 hover:text-blue-800 font-medium">
            Upload your first record
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecords.map((record) => (
            <div key={record.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-50 rounded-full mr-4">
                      {getIconForType(record.type)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{record.title}</h3>
                      <p className="text-sm text-gray-500">{record.doctor}</p>
                    </div>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {record.type.replace('-', ' ')}
                  </span>
                </div>
                <p className="mt-3 text-gray-600 text-sm">{record.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500">{formatDate(record.date)}</span>
                  <button 
                    className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                    onClick={() => console.log('Download', record.id)}
                  >
                    <FiDownload className="mr-1" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Statistics Section */}
      <div className="mt-12 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Health Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-gray-500 text-sm">Total Records</h3>
            <p className="text-2xl font-bold text-blue-600">24</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-gray-500 text-sm">Prescriptions</h3>
            <p className="text-2xl font-bold text-green-600">8</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-gray-500 text-sm">Lab Reports</h3>
            <p className="text-2xl font-bold text-purple-600">10</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <h3 className="text-gray-500 text-sm">Consultations</h3>
            <p className="text-2xl font-bold text-orange-600">6</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthRecords;