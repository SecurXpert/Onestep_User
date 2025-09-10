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
      result = result.filter((record) => record.type === activeTab);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (record) =>
          record.title.toLowerCase().includes(q) ||
          record.doctor.toLowerCase().includes(q) ||
          record.description.toLowerCase().includes(q)
      );
    }

    setFilteredRecords(result);
  }, [searchQuery, activeTab, records]);

  const getIconForType = (type) => {
    switch (type) {
      case 'prescription':
        return <FaPills className="text-blue-600" />;
      case 'lab-report':
        return <FaFlask className="text-green-600" />;
      case 'consultation':
        return <FaFileMedical className="text-purple-600" />;
      case 'scan':
        return <FaProcedures className="text-orange-600" />;
      default:
        return <FaFileMedical className="text-gray-500" />;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Header (design only, content unchanged) */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-500 to-blue-500 opacity-90" />
        <svg
          className="absolute -top-12 -right-10 w-[360px] sm:w-[420px] opacity-20"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fill="#ffffff"
            d="M46.3,-60.4C58.5,-52.6,65.7,-39.2,70.8,-24.9C75.8,-10.6,78.6,4.7,73.7,17.5C68.7,30.4,56,40.7,42.5,51.8C29,62.8,14.5,74.5,-0.4,75.1C-15.3,75.7,-30.6,65.1,-44.7,53.7C-58.9,42.4,-71.9,30.4,-77,15.3C-82.1,0.3,-79.4,-18,-70.9,-31.7C-62.4,-45.4,-48.1,-54.6,-33.6,-62.9C-19.1,-71.2,-9.6,-78.6,3.1,-83.1C15.7,-87.6,31.5,-89.1,46.3,-60.4Z"
          />
        </svg>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-white text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                My Health Records
              </h1>
              <p className="mt-3 text-indigo-100 text-base sm:text-lg">
                Search, filter, and download your prescriptions, reports, consultations, and scans.
              </p>
            </div>
            <button
              className="inline-flex items-center justify-center rounded-lg bg-white/10 backdrop-blur px-4 py-2 text-white font-semibold shadow-sm hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60 transition"
              onClick={() => console.log('Upload New Record')}
            >
              <FiPlus className="mr-2" />
              Upload New Record
            </button>
          </div>
        </div>
      </section>

      {/* Page Container */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Search & Filter (same functionality) */}
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search records..."
                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 text-gray-600 text-sm">
                <FiFilter className="text-gray-500" />
                Filter
              </span>
              <select
                className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition"
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

        {/* Records List (same logic, enhanced visuals) */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <p className="text-gray-500 text-lg">No records found</p>
            <button
              className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
              onClick={() => console.log('Upload your first record')}
            >
              Upload your first record
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecords.map((record) => (
              <div
                key={record.id}
                className="group bg-white rounded-2xl shadow-sm overflow-hidden ring-1 ring-gray-100 hover:shadow-lg hover:ring-indigo-100 transition"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="p-3 bg-indigo-50 rounded-xl mr-4 ring-1 ring-indigo-100">
                        {getIconForType(record.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800 leading-tight">
                          {record.title}
                        </h3>
                        <p className="text-sm text-gray-500">{record.doctor}</p>
                      </div>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full capitalize">
                      {record.type.replace('-', ' ')}
                    </span>
                  </div>

                  <p className="mt-3 text-gray-600 text-sm">{record.description}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-500">{formatDate(record.date)}</span>
                    <button
                      className="inline-flex items-center text-indigo-600 hover:text-indigo-700 text-sm font-medium transition"
                      onClick={() => console.log('Download', record.id)}
                    >
                      <FiDownload className="mr-1" />
                      Download
                    </button>
                  </div>
                </div>

                {/* Subtle bottom accent on hover */}
                <div className="h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        )}

        {/* Statistics / Summary (content unchanged, styled) */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Health Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-xl p-4 bg-indigo-50 ring-1 ring-indigo-100">
              <h3 className="text-gray-600 text-sm">Total Records</h3>
              <p className="text-2xl font-bold text-indigo-700">24</p>
            </div>
            <div className="rounded-xl p-4 bg-green-50 ring-1 ring-green-100">
              <h3 className="text-gray-600 text-sm">Prescriptions</h3>
              <p className="text-2xl font-bold text-green-700">8</p>
            </div>
            <div className="rounded-xl p-4 bg-purple-50 ring-1 ring-purple-100">
              <h3 className="text-gray-600 text-sm">Lab Reports</h3>
              <p className="text-2xl font-bold text-purple-700">10</p>
            </div>
            <div className="rounded-xl p-4 bg-orange-50 ring-1 ring-orange-100">
              <h3 className="text-gray-600 text-sm">Consultations</h3>
              <p className="text-2xl font-bold text-orange-700">6</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HealthRecords;
