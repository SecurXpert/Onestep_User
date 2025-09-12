import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { specialitymenu } from '../assets/assets';
import dental from '../assets/dental.jpg';
import ent from '../assets/ENTmain.png';
import Ophthalmologist from '../assets/Ophthalmologist.png';
import derma from '../assets/derma.png';
import Homeopathy from '../assets/Homeopathy.png';
import phys from '../assets/physiotherapist.png';
import nutritionist from '../assets/nutritionist.jpg';
import nurse from '../assets/nurse.png';
import foodskin from '../assets/foodskin.jpg';
import foodeye from '../assets/foodeye.jpg';
import { ArrowRight } from 'lucide-react';

// City options for dropdown
const cityOptions = ['Visakhapatnam', 'Hyderabad'];

const SpecialityMenu = () => {
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const [searchParams, setSearchParams] = useState({
    area: '',
    searchTerm: '',
  });
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

  // Articles data object
  const articles = [
    {
      id: '1',
      title: 'TOP 5 FOODS THAT NATURALLY WHITEN YOUR TEETH',
      category: 'FOOD',
      description: '“Top 5 Foods That Naturally Whiten Your Teeth”',
      author: '',
      image: foodeye,
    },
    {
      id: '2',
      title: 'BEST FERTILITY FOODS FOR WOMEN DURING PREGNANCY',
      category: 'WOMEN DURING PREGNANCY',
      description: `“satisfying cravings and nourishing your baby”`,
      author: '',
      image: foodskin,
    },
  ];
  
  const handleClick = (specialtyName) => {
    // Map problem-based specialties to their corresponding department
    const specialtyMap = {
      'Irregular heartbeats': 'Cardiologist',
      'Thyroid': 'Endocrinologist',
      'Nutritional deficiencies': 'Nutritionist',
      'Cavity': 'Dentist',
      'knee pain': 'Orthopedic',
      'Hairfall': 'Cosmetologist',
      'Skin': 'Cosmetologist',
      'Piles': 'Proctologist',
      'Fertility Specialist': 'Gynecologist',
      'Fever & Cold': 'GeneralPhysician',
      'PCOS': 'Gynecologist',
      'Stress': 'Neurologist',
    };
    const department = specialtyMap[specialtyName] || specialtyName;
    navigate(`/department/${encodeURIComponent(department)}`);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const { area, searchTerm } = searchParams;

    // Only proceed if both fields are filled
    if (area && searchTerm) {
      try {
        // Retrieve access token from sessionStorage
        const token = sessionStorage.getItem('access_token');
        if (!token) {
          throw new Error('Please Login/Register to continue.');
        }

        // Set headers with Bearer token
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        };

        const response = await fetch(
          `https://api.onestepmedi.com:8000/doctors/by-specialization/area_spec/?specialization_name=${encodeURIComponent(searchTerm)}&area=${encodeURIComponent(area)}`,
          {
            method: 'GET',
            headers: headers,
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }
        const data = await response.json();
        // Navigate to department page with filtered doctors
        navigate(`/department/${encodeURIComponent(searchTerm)}`, { 
          state: { filteredDoctors: data, searchParams }
        });
      } catch (err) {
        console.error(err);
        // Navigate with empty results
        navigate(`/department/${encodeURIComponent(searchTerm)}`, { 
          state: { filteredDoctors: [], searchParams }
        });
      }
    }
  };

  const handleViewAll = () => {
    navigate('/doctors');
  };

  const handleSeeAllArticles = () => {
    navigate('/article');
    window.scrollTo(0, 0); // Scroll to top of the page
  };

  const handleArticleClick = (articleTitle) => {
    navigate(`/article/${encodeURIComponent(articleTitle)}`);
  };

  // Check if both fields are filled to enable search button
  const isSearchEnabled = searchParams.area && searchParams.searchTerm;

  return (
    <div className="w-full bg-white py-10">
      {/* Search Bar */}
      <div className="w-full max-w-7xl mx-auto px-4 mb-8">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-center justify-center">
          {/* Combined input container for both fields */}
          <div className="relative w-full md:w-2/3 flex border border-gray-300 rounded-lg overflow-hidden">
            {/* Area Input with icon */}
            <div className="relative w-1/3 border-r border-gray-300">
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
        <svg
          className="h-5 w-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </span>
      <input
        type="text"
        name="area"
        placeholder="City or Locality"
        className="w-full pl-10 pr-4 py-3 rounded-l-lg border-0 focus:outline-none focus:ring-2 focus:ring-custom-blue text-gray-700"
        value={searchParams.area}
        onChange={(e) =>
          setSearchParams((prev) => ({ ...prev, area: e.target.value }))
        }
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Delay to allow click
      />
      {isFocused && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-b-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
              onMouseDown={() => handleSelectSuggestion(suggestion)}
            >
              {suggestion.name} ({suggestion.pincode})
            </li>
          ))}
        </ul>
      )}
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

      <div className="w-full max-w-7xl mx-auto px-2 2xs:px-3 xs:px-4 2sm:px-4 sm:px-4 md:px-4 md800:px-5 md900:px-6 lg:px-6 xl:px-8 2xl:px-10 3xl:px-12 flex flex-col 2sm:flex-row items-start 2sm:items-center justify-between mb-4 2xs:mb-5 xs:mb-6 2sm:mb-6 sm:mb-6 md:mb-6 md800:mb-7 md900:mb-7 lg:mb-8 xl:mb-9 2xl:mb-10 3xl:mb-11 gap-3 2xs:gap-3.5 xs:gap-4">
        <div className="flex flex-col">
          <h2 className="text-lg 2xs:text-xl xs:text-xl 2sm:text-2xl sm:text-2xl md:text-2xl md800:text-2xl md900:text-3xl lg:text-3xl xl:text-4xl 2xl:text-4xl 3xl:text-5xl text-custom-blue font-bold mb-1 2xs:mb-1.5 xs:mb-2 2sm:mb-2 sm:mb-2 md:mb-2 md800:mb-2.5 md900:mb-2.5 lg:mb-2.5 xl:mb-3 2xl:mb-3 3xl:mb-3.5">
            Connect with top doctor specialists for all your healthcare needs
          </h2>
          <p className="text-sm 2xs:text-sm xs:text-base 2sm:text-base sm:text-base md:text-base md800:text-lg md900:text-lg lg:text-lg xl:text-xl 2xl:text-xl 3xl:text-2xl text-custom-blue">
            Schedule online or in-clinic consultations with verified specialists...
          </p>
        </div>
        <button
          onClick={handleViewAll}
          className="self-end 2sm:self-auto px-3 2xs:px-3.5 xs:px-4 2sm:px-5 sm:px-5 md:px-5 md800:px-5 md900:px-5.5 lg:px-5 xl:px-6 2xl:px-6 3xl:px-6 py-1 2xs:py-1 xs:py-1.5 2sm:py-2 sm:py-2 md:py-2 md800:py-2 md900:py-2.25 lg:py-2 xl:py-2 2xl:py-2 3xl:py-2 bg-custom-blue text-white font-semibold rounded-full hover:bg-opacity-90 transition-colors duration-300 text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-sm md900:text-sm lg:text-sm xl:text-base 2xl:text-base 3xl:text-base"
          aria-label="View all doctors"
        >
          View All
        </button>
      </div>

      {/* Marquee Container */}
      <div className="relative overflow-hidden w-full flex justify-center">
        <div className="w-full max-w-7xl mx-auto overflow-hidden group rounded-l-full rounded-r-full">
          <div
            className="flex animate-marquee whitespace-nowrap"
            style={{
              animation: 'marquee 40s linear infinite',
              width: 'max-content',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.animationPlayState = 'paused';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.animationPlayState = 'running';
            }}
          >
            {[...specialitymenu, ...specialitymenu, ...specialitymenu].map((specialty, index) => (
              <div
                key={`${specialty.name}-${index}`}
                className="flex flex-col items-center mx-2 2xs:mx-2.5 xs:mx-3 2sm:mx-3 sm:mx-3 md:mx-3 md800:mx-3.5 md900:mx-4 lg:mx-4 xl:mx-4.5 2xl:mx-5 3xl:mx-6 cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-2 pt-1 2xs:pt-1.5 xs:pt-2 2sm:pt-2 sm:pt-2 md:pt-2 md800:pt-2.5 md900:pt-2.5 lg:pt-2.5 xl:pt-3 2xl:pt-3 3xl:pt-3.5"
                onClick={() => handleClick(specialty.name)}
              >
                <div className="w-16 2xs:w-20 xs:w-24 2sm:w-24 sm:w-24 md:w-28 md800:w-30 md900:w-30 lg:w-30 xl:w-30 2xl:w-30 3xl:w-30 h-16 2xs:h-20 xs:h-24 2sm:h-24 sm:h-24 md:h-28 md800:h-30 md900:h-30 lg:h-30 xl:h-30 2xl:h-30 3xl:h-30 bg-custom-blue rounded-full border-2 border-white overflow-hidden shadow-md">
                  <img
                    src={specialty.image}
                    alt={specialty.name}
                    className="w-full h-full object-cover object-top rounded-full"
                  />
                </div>
                <h3 className="text-xs 2xs:text-xs xs:text-xs 2sm:text-xs sm:text-xs md:text-xs md800:text-xs md900:text-xs lg:text-xs xl:text-sm 2xl:text-sm 3xl:text-base font-semibold text-custom-blue text-center mt-1 2xs:mt-1.5 xs:mt-2 2sm:mt-2 sm:mt-2 md:mt-2 md800:mt-2.5 md900:mt-2.5 lg:mt-2.5 xl:mt-3 2xl:mt-3 3xl:mt-3.5">
                  {specialty.name}
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick(specialty.name);
                  }}
                  className="mt-1 2xs:mt-1.5 xs:mt-2 2sm:mt-2 sm:mt-2 md:mt-2 md800:mt-2 md900:mt-2 lg:mt-2 xl:mt-2.5 2xl:mt-2.5 3xl:mt-3 px-1 2xs:px-1.5 xs:px-2 2sm:px-2 sm:px-2 md:px-2 md800:px-2.5 md900:px-2.5 lg:px-2.5 xl:px-3 2xl:px-3 3xl:px-3.5 py-0.5 2xs:py-0.5 xs:py-0.5 2sm:py-0.5 sm:py-0.5 md:py-0.5 md800:py-0.5 md900:py-0.5 lg:py-0.5 xl:py-0.5 2xl:py-0.5 3xl:py-1 bg-custom-blue text-white text-xs 2xs:text-xs xs:text-xs 2sm:text-xs sm:text-xs md:text-xs md800:text-xs md900:text-xs lg:text-xs xl:text-xs 2xl:text-xs 3xl:text-sm rounded-lg hover:bg-white-700 transition-colors"
                >
                  Consult Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* In-Clinic Consultation Section */}
      <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-white shadow-md rounded-lg mt-8">
        <h2 className="text-base 2xs:text-base xs:text-lg 2sm:text-lg sm:text-lg md:text-lg md800:text-xl md900:text-xl lg:text-xl font-semibold text-gray-700 mb-4">
          Book an in-clinic appointment with our Experienced & Verified Doctors
        </h2>
        <p className="text-gray-600 text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base mb-6">
          Find Nearby Specialists for Your Health Needs – Easy and Fast
        </p>
        <div className="flex flex-row overflow-x-auto space-x-4 pb-4 snap-x snap-mandatory md:grid md:grid-cols-4 md:gap-6 md:overflow-x-hidden">
          <div
            className="flex flex-col items-center cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-2 min-w-[150px] 2xs:min-w-[160px] xs:min-w-[170px] 2sm:min-w-[180px] sm:min-w-[200px] md:min-w-[220px] md800:min-w-[230px] md900:min-w-[240px] lg:min-w-[250px] snap-center relative"
            onClick={() => handleClick('Dentist')}
          >
            <div className="relative w-full group">
              <img
                src={dental}
                alt="Dentist"
                className="w-full h-28 2xs:h-32 xs:h-36 2sm:h-40 sm:h-44 md:h-46 md800:h-46 md900:h-46 lg:h-48 object-cover rounded-lg mb-2 transition-opacity duration-300 group-hover:opacity-75"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-purple-600 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                <button
                  onClick={() => handleClick('Dentist')}
                  className="flex items-center gap-2 bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base hover:bg-purple-100 transition"
                  title="Book Dentist Appointment"
                  aria-label="Book Dentist Appointment"
                >
                  Book Now <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <h3 className="text-sm 2xs:text-sm xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-md md900:text-md lg:text-md font-medium text-gray-800">
              Dentist
            </h3>
            <p className="text-xs 2xs:text-xs xs:text-xs 2sm:text-xs sm:text-xs md:text-xs md800:text-sm md900:text-sm lg:text-sm text-gray-600 text-center">
              for dental care, cleaning, root canal, etc.
            </p>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-2 min-w-[150px] 2xs:min-w-[160px] xs:min-w-[170px] 2sm:min-w-[180px] sm:min-w-[200px] md:min-w-[220px] md800:min-w-[230px] md900:min-w-[240px] lg:min-w-[250px] snap-center relative"
            onClick={() => handleClick('Cosmetologist')}
          >
            <div className="relative w-full group">
              <img
                src={derma}
                alt="Dermatologist"
                className="w-full h-28 2xs:h-32 xs:h-36 2sm:h-40 sm:h-44 md:h-46 md800:h-46 md900:h-46 lg:h-48 object-cover rounded-lg mb-2 transition-opacity duration-300 group-hover:opacity-75"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-purple-600 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                <button
                  onClick={() => handleClick('Cosmetologist')}
                  className="flex items-center gap-2 bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base hover:bg-purple-100 transition"
                  title="Book Dermatologist Appointment"
                  aria-label="Book Dermatologist Appointment"
                >
                  Book Now <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <h3 className="text-sm 2xs:text-sm xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-md md900:text-md lg:text-md font-medium text-gray-800">
              Dermatologist
            </h3>
            <p className="text-xs 2xs:text-xs xs:text-xs 2sm:text-xs sm:text-xs md:text-xs md800:text-sm md900:text-sm lg:text-sm text-gray-600 text-center">
              For skin, hair, and aesthetic treatments
            </p>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-2 min-w-[150px] 2xs:min-w-[160px] xs:min-w-[170px] 2sm:min-w-[180px] sm:min-w-[200px] md:min-w-[220px] md800:min-w-[230px] md900:min-w-[240px] lg:min-w-[250px] snap-center relative"
            onClick={() => handleClick('ENTSpecialist')}
          >
            <div className="relative w-full group">
              <img
                src={ent}
                alt="ENT Specialist"
                className="w-full h-28 2xs:h-32 xs:h-36 2sm:h-40 sm:h-44 md:h-46 md800:h-46 md900:h-46 lg:h-48 object-cover rounded-lg mb-2 transition-opacity duration-300 group-hover:opacity-75"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-purple-600 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                <button
                  onClick={() => handleClick('ENTSpecialist')}
                  className="flex items-center gap-2 bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base hover:bg-purple-100 transition"
                  title="Book ENT Specialist Appointment"
                  aria-label="Book ENT Specialist Appointment"
                >
                  Book Now <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <h3 className="text-sm 2xs:text-sm xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-md md900:text-md lg:text-md font-medium text-gray-800">
              ENT Specialist
            </h3>
            <p className="text-xs 2xs:text-xs xs:text-xs 2sm:text-xs sm:text-xs md:text-xs md800:text-sm md900:text-sm lg:text-sm text-gray-600 text-center">
              For ear, nose, and throat disorders
            </p>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-2 min-w-[150px] 2xs:min-w-[160px] xs:min-w-[170px] 2sm:min-w-[180px] sm:min-w-[200px] md:min-w-[220px] md800:min-w-[230px] md900:min-w-[240px] lg:min-w-[250px] snap-center relative"
            onClick={() => handleClick('Ophthalmologist')}
          >
            <div className="relative w-full group">
              <img
                src={Ophthalmologist}
                alt="Ophthalmologist"
                className="w-full h-28 2xs:h-32 xs:h-36 2sm:h-40 sm:h-44 md:h-46 md800:h-46 md900:h-46 lg:h-48 object-cover rounded-lg mb-2 transition-opacity duration-300 group-hover:opacity-75"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-purple-600 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                <button
                  onClick={() => handleClick('Ophthalmologist')}
                  className="flex items-center gap-2 bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base hover:bg-purple-100 transition"
                  title="Book Ophthalmologist Appointment"
                  aria-label="Book Ophthalmologist Appointment"
                >
                  Book Now <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <h3 className="text-sm 2xs:text-sm xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-md md900:text-md lg:text-md font-medium text-gray-800">
              Ophthalmologist
            </h3>
            <p className="text-xs 2xs:text-xs xs:text-xs 2sm:text-xs sm:text-xs md:text-xs md800:text-sm md900:text-sm lg:text-sm text-gray-600 text-center">
              for eye checkups, vision problems, and surgeries.
            </p>
          </div>
        </div>
      </div>

      {/* Expert Healthcare Section */}
      <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-white shadow-md rounded-lg mt-8">
        <h2 className="text-base 2xs:text-base xs:text-lg 2sm:text-lg sm:text-lg md:text-lg md800:text-xl md900:text-xl lg:text-xl font-semibold text-gray-700 mb-4">
          Expert HealthCare – Right at Your Doorstep
        </h2>
        <p className="text-gray-600 text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base mb-6">
          Book trusted specialists nearby for quick consultations and appointments
        </p>
        <div className="flex flex-row overflow-x-auto space-x-4 pb-4 snap-x snap-mandatory md:grid md:grid-cols-4 md:gap-6 md:overflow-x-hidden">
          <div
            className="flex flex-col items-center cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-2 min-w-[150px] 2xs:min-w-[160px] xs:min-w-[170px] 2sm:min-w-[180px] sm:min-w-[200px] md:min-w-[220px] md800:min-w-[230px] md900:min-w-[240px] lg:min-w-[250px] snap-center relative"
            onClick={() => handleClick('Physiotherapist')}
          >
            <div className="relative w-full group">
              <img
                src={phys}
                alt="Physiotherapist"
                className="w-full h-28 2xs:h-32 xs:h-36 2sm:h-40 sm:h-44 md:h-46 md800:h-46 md900:h-46 lg:h-48 object-cover rounded-lg mb-2 transition-opacity duration-300 group-hover:opacity-75"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-purple-600 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                <button
                  onClick={() => handleClick('Physiotherapist')}
                  className="flex items-center gap-2 bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base hover:bg-purple-100 transition"
                  title="Book Physiotherapist Appointment"
                  aria-label="Book Physiotherapist Appointment"
                >
                  Book Now <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <h3 className="text-sm 2xs:text-sm xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-md md900:text-md lg:text-md font-medium text-gray-800">
              Physiotherapist
            </h3>
            <p className="text-xs 2xs:text-xs xs:text-xs 2sm:text-xs sm:text-xs md:text-xs md800:text-sm md900:text-sm lg:text-sm text-gray-600 text-center">
              for recovery, rehabilitation, and mobility support.
            </p>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-2 min-w-[150px] 2xs:min-w-[160px] xs:min-w-[170px] 2sm:min-w-[180px] sm:min-w-[200px] md:min-w-[220px] md800:min-w-[230px] md900:min-w-[240px] lg:min-w-[250px] snap-center relative"
            onClick={() => handleClick('Nutritionist')}
          >
            <div className="relative w-full group">
              <img
                src={nutritionist}
                alt="Nutritionist / Dietitian"
                className="w-full h-28 2xs:h-32 xs:h-36 2sm:h-40 sm:h-44 md:h-46 md800:h-46 md900:h-46 lg:h-48 object-cover rounded-lg mb-2 transition-opacity duration-300 group-hover:opacity-75"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-purple-600 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                <button
                  onClick={() => handleClick('Nutritionist')}
                  className="flex items-center gap-2 bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base hover:bg-purple-100 transition"
                  title="Book Nutritionist Appointment"
                  aria-label="Book Nutritionist Appointment"
                >
                  Book Now <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <h3 className="text-sm 2xs:text-sm xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-md md900:text-md lg:text-md font-medium text-gray-800">
              Nutritionist / Dietitian
            </h3>
            <p className="text-xs 2xs:text-xs xs:text-xs 2sm:text-xs sm:text-xs md:text-xs md800:text-sm md900:text-sm lg:text-sm text-gray-600 text-center">
              for personalized diet planning and nutrition advice.
            </p>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-2 min-w-[150px] 2xs:min-w-[160px] xs:min-w-[170px] 2sm:min-w-[180px] sm:min-w-[200px] md:min-w-[220px] md800:min-w-[230px] md900:min-w-[240px] lg:min-w-[250px] snap-center relative"
            onClick={() => handleClick('Homeopathy')}
          >
            <div className="relative w-full group">
              <img
                src={Homeopathy}
                alt="Homeopathy"
                className="w-full h-28 2xs:h-32 xs:h-36 2sm:h-40 sm:h-44 md:h-46 md800:h-46 md900:h-46 lg:h-48 object-cover rounded-lg mb-2 transition-opacity duration-300 group-hover:opacity-75"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-purple-600 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                <button
                  onClick={() => handleClick('Homeopathy')}
                  className="flex items-center gap-2 bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base hover:bg-purple-100 transition"
                  title="Book Homeopathy Appointment"
                  aria-label="Book Homeopathy Appointment"
                >
                  Book Now <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <h3 className="text-sm 2xs:text-sm xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-md md900:text-md lg:text-md font-medium text-gray-800">
              Homeopathy
            </h3>
            <p className="text-xs 2xs:text-xs xs:text-xs 2sm:text-xs sm:text-xs md:text-xs md800:text-sm md900:text-sm lg:text-sm text-gray-600 text-center">
              treat conditions like allergies, skin disorders, migraines, digestive issues, anxiety, and chronic pain
            </p>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-2 min-w-[150px] 2xs:min-w-[160px] xs:min-w-[170px] 2sm:min-w-[180px] sm:min-w-[200px] md:min-w-[220px] md800:min-w-[230px] md900:min-w-[240px] lg:min-w-[250px] snap-center relative"
            onClick={() => handleClick('Nurse')}
          >
            <div className="relative w-full group">
              <img
                src={nurse}
                alt="Nurse / Elderly Care Assistant"
                className="w-full h-28 2xs:h-32 xs:h-36 2sm:h-40 sm:h-44 md:h-46 md800:h-46 md900:h-46 lg:h-48 object-cover rounded-lg mb-2 transition-opacity duration-300 group-hover:opacity-75"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-purple-600 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                <button
                  onClick={() => handleClick('Nurse')}
                  className="flex items-center gap-2 bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-base md900:text-base lg:text-base hover:bg-purple-100 transition"
                  title="Book Nurse Appointment"
                  aria-label="Book Nurse Appointment"
                >
                  Book Now <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <h3 className="text-sm 2xs:text-sm xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-md md900:text-md lg:text-md font-medium text-gray-800">
              Nurse / First Aid
            </h3>
            <p className="text-xs 2xs:text-xs xs:text-xs 2sm:text-xs sm:text-xs md:text-xs md800:text-sm md900:text-sm lg:text-sm text-gray-600 text-center">
              for post-surgical care, injections, wound dressing
            </p>
          </div>
        </div>
      </div>

      {/* Articles Section */}
      <div className="w-full max-w-7xl mx-auto px-8 py-8 mt-8 flex flex-col md:flex-row items-start bg-white shadow-md rounded-lg justify-center">
        <div className="md:w-1/3 mb-4 md:mb-0 flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Read top articles from health experts</h2>
          <p className="text-gray-600 mb-4">Health articles that keep you informed about good health practices and achieve your goals.</p>
          <button
            onClick={handleSeeAllArticles}
            className="px-10 py-2 bg-custom-blue text-white rounded-lg hover:bg-blue-700 transition-colors mt-10"
          >
            See all articles
          </button>
        </div>
        <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {articles.map((article) => (
            <div
              key={article.id}
              className="flex flex-col items-start cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-2"
              onClick={() => handleArticleClick(article.title)}
            >
              <img src={article.image} alt={article.title} className="w-full h-48 object-cover rounded-lg mb-2" />
              <h3 className="text-md font-medium text-gray-800">{article.category}</h3>
              <p className="text-sm text-gray-600">{article.description}</p>
              <p className="text-xs text-gray-500">{article.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialityMenu;