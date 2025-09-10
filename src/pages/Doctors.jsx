import React, { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import DoctorsHeader from '../components/DoctorsHeader';
import { speciality } from '../assets/assets';
import nurse from '../assets/nurse-4.jpg';
import physio from '../assets/physio-4.jpg';
import genral from '../assets/genral-4.png';
import nutrition from '../assets/nutrition-4.jpg';

const Doctors = () => {
  const { specialty } = useParams();
  const [filterdoc, setFilterDoc] = useState([]);
  const [activeFilter, setActiveFilter] = useState(specialty || "All");
  const [searchParams, setSearchParams] = useState({
    area: '',
    searchTerm: '',
  });
  const { topdoctors } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const doctorsListRef = useRef(null);

  const specialties = [
    "Gynecologist",
    "Dentist",
    "Endocrinologist",
    "Cardiologist",
    "Dermatologist",
    "Nutritionist",
    "GeneralPhysician",
    "Proctologist or General Surgeon",
    "Psychiatrist",
    "Pediatrician",
    "Cosmetologist",
    "Neurologist",
    "Orthopedic Doctor",
  ];

  // Updated to require both fields to enable the search button
  const isSearchEnabled = searchParams.area.trim() !== "" && searchParams.searchTerm.trim() !== "";

  const renderStars = (rating, size = 'text-xs') => {
    const stars = [];
    const rounded = Math.round(rating * 2) / 2;

    for (let i = 1; i <= 5; i++) {
      if (i <= rounded) {
        stars.push(<span key={i} className={`text-yellow-400 ${size}`}>&#9733;</span>);
      } else if (i - 0.5 === rounded) {
        stars.push(<span key={i} className={`text-yellow-400 ${size}`}>&#9733;</span>);
      } else {
        stars.push(<span key={i} className={`text-gray-300 ${size}`}>&#9734;</span>);
      }
    }

    return <div className="flex gap-0.5">{stars}</div>;
  };

  // Apply filter based on activeFilter and searchParams.searchTerm
  const applyFilter = (doctors) => {
    if (!doctors || !Array.isArray(doctors)) {
      setFilterDoc([]);
      return;
    }

    let filtered = activeFilter === "All"
      ? doctors
      : doctors.filter(doc => doc.specialization_name === activeFilter);

    if (searchParams.searchTerm.trim() !== "") {
      const lowerSearch = (searchParams.searchTerm || "").toLowerCase();
      filtered = filtered.filter(doc =>
        (doc.name ? doc.name.toLowerCase().includes(lowerSearch) : false) ||
        (doc.specialization_name ? doc.specialization_name.toLowerCase().includes(lowerSearch) : false)
      );
    }

    setFilterDoc(filtered);
  };

  useEffect(() => {
    if (topdoctors && topdoctors.length > 0) {
      applyFilter(topdoctors);
    } else {
      setFilterDoc([]);
    }
  }, [activeFilter, searchParams.searchTerm, topdoctors]);

  useEffect(() => {
    setActiveFilter(specialty || "All");
  }, [specialty]);

  useEffect(() => {
    applyFilter(topdoctors);
  }, [activeFilter, searchParams.searchTerm, topdoctors]);

  const handleClick = (specialtyName) => {
    const queryString = searchParams.area ? `?area=${encodeURIComponent(searchParams.area)}` : '';
    navigate(`/department/${encodeURIComponent(specialtyName)}${queryString}`, {
      state: { searchParams }
    });
    setActiveFilter(specialtyName);
    setSearchParams((prev) => ({ ...prev, searchTerm: "" }));
    setTimeout(() => {
      if (doctorsListRef.current) {
        doctorsListRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const area = formData.get('area');
    const searchTerm = formData.get('searchTerm');
    setSearchParams({ area, searchTerm });

    if (searchTerm) {
      try {
        const token = sessionStorage.getItem('access_token');
        let url = `https://api.onestepmedi.com:8000/doctors/by-specialization/${encodeURIComponent(searchTerm)}`;
        if (area) {
          url = `http://api.onestepmedi.com:8000/doctors/by-specialization/area_spec/?specialization_name=${encodeURIComponent(searchTerm)}&area=${encodeURIComponent(area)}`;
        }
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }
        const data = await response.json();
        const queryString = area ? `?area=${encodeURIComponent(area)}` : '';
        navigate(`/department/${encodeURIComponent(searchTerm)}${queryString}`, {
          state: { filteredDoctors: data, searchParams: { area, searchTerm } }
        });
      } catch (err) {
        console.error(err);
        setFilterDoc([]);
      }
    } else {
      applyFilter(topdoctors);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 relative overflow-hidden">
      <DoctorsHeader />
      <div className="w-full max-w-6xl relative z-10 animate-fade-in mt-0">
        <h2 className="text-2xl md:text-4xl font-extrabold text-center text-purple-600 mb-6 md:mb-8 tracking-tight animate-fade-in-up">
          Doctor Specialists
        </h2>

        <div className="flex flex-col gap-6">
          {/* Search Form Section */}
          <div className="w-full max-w-7xl mx-auto px-4 mb-8 mt-8">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-center justify-center">
              {/* Combined input container for both fields */}
              <div className="relative w-full md:w-2/3 flex border border-gray-300 rounded-lg overflow-hidden">
                {/* Area Input with icon */}
                <div className="relative w-1/3 border-r border-gray-300">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="area"
                    placeholder="City or Locality"
                    className="w-full pl-10 pr-4 py-3 rounded-l-lg border-0 focus:outline-none focus:ring-2 focus:ring-custom-blue text-gray-700"
                    value={searchParams.area}
                    onChange={(e) => setSearchParams((prev) => ({ ...prev, area: e.target.value }))}
                  />
                </div>

                {/* Specialist Dropdown */}
                <div className="relative w-2/3">
                  <select
                    name="searchTerm"
                    className="w-full px-4 py-3 border-0 border-l border-gray-300 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-custom-blue text-gray-700"
                    value={searchParams.searchTerm}
                    onChange={(e) => setSearchParams((prev) => ({ ...prev, searchTerm: e.target.value }))}
                  >
                    <option value="">Select Specialization</option>
                    {specialties.map((spec) => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                  <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className={`w-full md:w-auto px-6 py-3 rounded-lg text-white transition-colors ${
                  isSearchEnabled ? 'bg-custom-blue hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                }`}
                disabled={!isSearchEnabled}
              >
                Search
              </button>
            </form>
          </div>

          {/* Specialties Carousel Section */}
          <div className="relative w-full flex flex-col items-start">
            <div className="flex justify-between items-center w-full mb-2">
              <h1 className="text-3xl md:text-4xl font-bold text-custom-blue">18+ Specialities</h1>
              <div className="hidden md:block relative w-48">
              </div>
            </div>
            <p className="text-lg md:text-m text-gray-600 mb-6 text-center max-w-2xl">
              Find the right specialist for every health need.
            </p>
       <div className="relative w-full overflow-hidden group rounded-l-full rounded-r-full shadow-[0_4px_15px_rgba(59,130,246,0.2)]">
  <button
    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-custom-blue text-white p-2 rounded-full opacity-70 hover:opacity-100 transition-opacity z-10"
    onClick={() => {
      const container = document.querySelector('.marquee-container');
      container.scrollBy({ left: -300, behavior: 'smooth' });
    }}
  >
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </button>
  <button
    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-custom-blue text-white p-2 rounded-full opacity-70 hover:opacity-100 transition-opacity z-10"
    onClick={() => {
      const container = document.querySelector('.marquee-container');
      container.scrollBy({ left: 300, behavior: 'smooth' });
    }}
  >
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  </button>
  <div
    className="flex marquee-container"
    style={{ overflowX: 'hidden', scrollBehavior: 'smooth' }}
  >
    {speciality.map((specialty, index) => (
      <div
        key={`${specialty.name}-${index}`}
        className="flex flex-col items-center mx-4 cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-2 pt-2"
        style={{ minWidth: '150px' }}
        onClick={() => handleClick(specialty.name)}
      >
        <div className="w-24 h-24 bg-custom-blue md:w-36 md:h-36 rounded-full border-2 border-custom-blue overflow-hidden shadow-md">
          <img
            src={specialty.image}
            alt={specialty.name}
            className="w-full h-full object-cover object-top rounded-full"
          />
        </div>
        <h3 className="text-xs md:text-sm font-semibold text-custom-blue text-center mt-2">
          {specialty.name}
        </h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClick(specialty.name);
          }}
          className="mt-2 px-4 py-1 bg-custom-blue text-white text-xs md:text-sm rounded-lg hover:bg-blue-700 transition-colors"
        >
          Consult Now
        </button>
      </div>
    ))}
  </div>
</div>
          </div>

          {/* Featured Specialists Section */}
          <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-white shadow-md rounded-lg mt-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Expert HealthCare – Right at Your Doorstep</h2>
            <p className="text-gray-600 mb-6">Book trusted specialists nearby for quick consultations and appointments.</p>
            <div className="flex flex-row overflow-x-auto space-x-4 pb-4 snap-x snap-mandatory md:grid md:grid-cols-4 md:gap-6 md:overflow-x-hidden">
              <div
                className="flex flex-col items-center cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-2 min-w-[200px] snap-center"
                onClick={() => handleClick('Physiotherapist')}
              >
                <img
                  src={physio}
                  alt="Physiotherapist"
                  className="w-full h-36 2xs:h-32 object-cover rounded-lg mb-2"
                />
                <h3 className="text-sm 2xs:text-xs font-medium text-gray-800">Physiotherapist</h3>
                <p className="text-xs 2xs:text-[10px] text-gray-600 text-center">for recovery, rehabilitation, and mobility support</p>
              </div>
              <div
                className="flex flex-col items-center cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-2 min-w-[200px] snap-center"
                onClick={() => handleClick('Nutritionist')}
              >
                <img
                  src={nutrition}
                  alt="Nutritionist / Dietitian"
                  className="w-full h-36 2xs:h-32 object-cover rounded-lg mb-2"
                />
                <h3 className="text-sm 2xs:text-xs font-medium text-gray-800">Nutritionist / Dietitian</h3>
                <p className="text-xs 2xs:text-[10px] text-gray-600 text-center">for personalized diet planning and nutrition advice.</p>
              </div>
              <div
                className="flex flex-col items-center cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-2 min-w-[200px] snap-center"
                onClick={() => handleClick('GeneralPhysician')}
              >
                <img
                  src={genral}
                  alt="General Physician"
                  className="w-full h-36 2xs:h-32 object-cover rounded-lg mb-2"
                />
                <h3 className="text-sm 2xs:text-xs font-medium text-gray-800">General Physician</h3>
                <p className="text-xs 2xs:text-[10px] text-gray-600 text-center">for fever, infections, chronic conditions, and elderly care</p>
              </div>
              <div
                className="flex flex-col items-center cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-2 min-w-[200px] snap-center"
                onClick={() => handleClick('Nurse')}
              >
                <img
                  src={nurse}
                  alt="Nurse / Elderly Care Assistant"
                  className="w-full h-36 2xs:h-32 object-cover rounded-lg mb-2"
                />
                <h3 className="text-sm 2xs:text-xs font-medium text-gray-800">Nurse / Elderly Care Assistant</h3>
                <p className="text-xs 2xs:text-[10px] text-gray-600 text-center">for post-surgical care, injections, wound dressing.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;