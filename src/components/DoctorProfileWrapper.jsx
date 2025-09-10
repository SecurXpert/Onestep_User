import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FaHospitalAlt, FaCheckCircle, FaMapMarkerAlt, FaUserMd,
  FaLanguage, FaRegThumbsUp, FaUsers, FaRegCommentDots
} from 'react-icons/fa';
import { MdLocationCity } from 'react-icons/md';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

const DoctorProfileWrapper = () => {
  const { doctor_id } = useParams(); // Get doctor_id from URL
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const [doctorData, setDoctorData] = useState(null);
  const [sections, setSections] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [expertise, setExpertise] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState('experience');
  const navigate = useNavigate();

  const scrollToCard = (index) => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = 320 + 24;
    const centerOffset = (container.offsetWidth - cardWidth) / 2;
    container.scrollTo({
      left: index * cardWidth - centerOffset,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    scrollToCard(activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    const fetchDoctorData = async () => {
      if (!doctor_id) {
        setError('Doctor ID is missing in the URL.');
        return;
      }

      try {
        const token = sessionStorage.getItem('access_token');
        if (!token) {
          throw new Error('No access token found. Please log in.');
        }

        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        };

        setError(null);
        const [
          doctorRes,
          sectionsRes,
          clinicsRes,
          expertiseRes,
          reviewsRes,
          videosRes
        ] = await Promise.all([
          axios.get(`https://api.onestepmedi.com:8000/doctors/${doctor_id}`, { headers }),
          axios.get(`https://api.onestepmedi.com:8000/doctors/sections/${doctor_id}`, { headers }),
          axios.get(`https://api.onestepmedi.com:8000/doctors/clinics/${doctor_id}`, { headers }),
          axios.get(`https://api.onestepmedi.com:8000/doctors/expertise/${doctor_id}`, { headers }),
          axios.get(`https://api.onestepmedi.com:8000/doctors/reviews/${doctor_id}`, { headers }),
          axios.get(`https://api.onestepmedi.com:8000/doctors/videos/${doctor_id}`, { headers })
        ]);

        setDoctorData(doctorRes.data);
        setSections(Array.isArray(sectionsRes.data) ? sectionsRes.data : []);
        setClinics(clinicsRes.data);
        setExpertise(expertiseRes.data);
        setReviews(reviewsRes.data);
        setVideos(videosRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(`Failed to fetch doctor data: ${error.message}`);
        setSections([]);
      }
    };

    fetchDoctorData();
  }, [doctor_id]);

  const ArticleCard = ({ art, idx, isActive }) => (
    <div
      className={`w-[320px] shrink-0 rounded-2xl transition-all duration-300 p-0 bg-white/80 backdrop-blur
      flex flex-col h-[220px] relative border border-white/60
      ${isActive ? 'scale-105 shadow-xl ring-1 ring-blue-300/40' : 'scale-95 opacity-85 shadow-md'}`}
      style={{
        boxShadow: isActive
          ? '0 12px 24px rgba(30, 64, 175, 0.18)'
          : '0 8px 16px rgba(30, 64, 175, 0.10)'
      }}
    >
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <img
          src="https://lh3.googleusercontent.com/ogw/AF2bZyz2p4g2z7i0b5X3gY1vL1z2K8y1r4v6z7g1s2q=s32-c"
          alt="author"
          className="w-8 h-8 rounded-full object-cover"
        />
        <div>
          <span className="text-xs font-bold text-gray-800">{art.author || 'Dr. Anita S'}</span>
          <p className="text-[11px] text-gray-400 pt-0.5">17 hours ago</p>
        </div>
        <span className="ml-auto">
          <span className="inline-flex items-center text-[11px] font-semibold px-2 py-1 rounded-full bg-amber-400/15 text-amber-600 ring-1 ring-amber-400/30">
            {art.tag || 'Cardio'}
          </span>
        </span>
      </div>

      <img
        src="https://lh3.googleusercontent.com/ogw/AF2bZyz2p4g2z7i0b5X3gY1vL1z2K8y1r4v6z7g1s2q=s32-c"
        alt="article visual"
        className="mx-4 mt-1 mb-2 rounded-lg object-cover h-[70px] w-[95%]"
      />

      <div className="px-4">
        <p className="font-semibold text-[15px] leading-snug mb-0 text-gray-800 line-clamp-2">
          {art.title || '10 Early Signs of Heart Disease'}
        </p>
        <p className="text-xs text-gray-500 mb-2 line-clamp-2">
          {art.desc || 'When I was studying...'}
        </p>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-red-50 text-red-700 border border-red-200 rounded-xl px-6 py-4 shadow">
          {error}
        </div>
      </div>
    );
  }

  if (!doctorData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-3xl">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-slate-200 rounded w-1/3" />
            <div className="h-4 bg-slate-200 rounded w-1/2" />
            <div className="h-48 bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen font-sans"
      style={{
        background:
          'radial-gradient(75% 75% at 20% 10%, #e9f2ff 0%, #f7fafd 45%, #ffffff 100%)'
      }}
    >
      {/* Local CSS for effects (no new deps) */}
      <style>{`
        @keyframes floatY { 0%{ transform: translateY(0)} 50%{ transform: translateY(-4px)} 100%{ transform: translateY(0)} }
        .float-slow { animation: floatY 6s ease-in-out infinite; }
        .snap-x-mandatory { scroll-snap-type: x mandatory; }
        .snap-center { scroll-snap-align: center; }
        .soft-shadow { box-shadow: 0 6px 18px rgba(21, 101, 192, .12); }
      `}</style>

      {/* Profile Header Section */}
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6 md:px-10">
        <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-blue-200 via-blue-100 to-white soft-shadow">
          <div className="bg-white/90 backdrop-blur rounded-2xl md:flex gap-8 p-6 sm:p-8">
            <div className="flex-1 flex flex-col justify-center">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-700 tracking-tight">
                {doctorData.name}
              </h1>
              <p className="text-base sm:text-lg text-gray-700">{doctorData.specialization}</p>
              <p className="text-gray-500 font-semibold mt-1">
                {doctorData.experience_years}+ years of experience
              </p>

              {doctorData.quote && (
                <q className="text-gray-600 italic block my-3 sm:my-4">{doctorData.quote}</q>
              )}

              <div className="flex flex-wrap items-center gap-4 mt-3">
                <div className="flex items-center gap-2">
                  <FaHospitalAlt className="text-orange-500" />
                  <span className="font-medium">{doctorData.hospital}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUsers className="text-blue-500" />
                  <span>{doctorData.total_patients}+ patients</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-600" />
                  <span className="text-green-700">
                    {doctorData.status ? 'Available' : 'Not Available'}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-5">
                <button
                  className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/appointment/${doctorData.doctor_id}`);
                  }}
                >
                  Book Appointment
                </button>
              </div>
            </div>

            <div className="mt-6 md:mt-0 md:block flex-shrink-0 self-center">
              <img
                src={doctorData.profile_img_right}
                alt="Doctor"
                className="w-44 sm:w-56 h-[220px] sm:h-[250px] object-cover rounded-xl shadow-lg float-slow"
              />
            </div>
          </div>
        </div>

        {/* Info icons row */}
        <div className="mt-5 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { icon: <FaUserMd size={22} className="text-blue-500" />, label: doctorData.label1 },
            { icon: <FaLanguage size={22} className="text-orange-500" />, label: doctorData.label2 },
            { icon: <FaRegThumbsUp size={22} className="text-green-500" />, label: doctorData.label3 }
          ].map((mode, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 bg-white/90 backdrop-blur px-5 py-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition"
            >
              {mode.icon}
              <span className="font-semibold text-gray-700">{mode.label}</span>
            </div>
          ))}
        </div>

        {/* About Section */}
        <div className="mt-8 rounded-2xl bg-white/95 backdrop-blur shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 flex flex-col items-center">
              <img
                src={doctorData.profile_img_left}
                alt="Doctor"
                className="w-36 sm:w-44 h-36 sm:h-44 rounded-xl object-cover mb-2 shadow"
              />
            </div>

            <div className="md:w-2/3">
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-400 text-white font-semibold px-5 py-2 rounded-xl shadow">
                <span className="bg-white text-gray-900 px-2 py-0.5 rounded-md font-semibold">About</span>
                <span>Dr. {doctorData.name}</span>
              </span>

              <div className="bg-white rounded-xl mt-3 px-3 py-3 ring-1 ring-blue-50">
                <p className="text-gray-700 leading-relaxed">{doctorData.about}</p>

                <div className="mt-4">
                  <div className="flex flex-wrap gap-3">
                    {Array.isArray(sections) && sections.length > 0 ? (
                      sections.map((tab) => {
                        const active = tab.section_type === selectedTab;
                        const red = tab.section_type === 'experience';
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setSelectedTab(tab.section_type)}
                            className={`px-4 py-1.5 rounded-full font-semibold text-sm transition shadow-sm
                              ${active
                                ? red
                                  ? 'bg-red-200 text-red-700 ring-1 ring-red-300'
                                  : 'bg-blue-200 text-blue-700 ring-1 ring-blue-300'
                                : red
                                  ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                              }`}
                          >
                            {tab.section_type}
                          </button>
                        );
                      })
                    ) : (
                      <p className="text-gray-500">No sections available</p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 mt-4">
                    {Array.isArray(sections) && sections.length > 0 ? (
                      sections
                        .filter((hosp) => hosp.section_type === selectedTab)
                        .map((hosp, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg ring-1 ring-gray-100 hover:ring-blue-200 transition"
                          >
                            <img
                              src={hosp.image_url}
                              alt={hosp.section_type}
                              className="w-10 h-10 object-contain"
                            />
                          </div>
                        ))
                    ) : (
                      <p className="text-gray-500">No affiliations available</p>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow">
                    Consult Now
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow">
                    Know More !
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clinic Location */}
        <div className="mt-8 rounded-2xl bg-white/95 backdrop-blur shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Clinic Location</h2>

          <div className="space-y-6">
            {clinics.map((loc, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="flex-1">
                  <p className="font-bold">Fortis Hospital</p>

                  <div className="flex items-center gap-2 mt-1">
                    <FaMapMarkerAlt className="text-red-500" />
                    <span className="font-semibold">Address:</span>
                    <span>{loc.address}</span>
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <MdLocationCity className="text-orange-500" />
                    <span className="font-semibold">City:</span>
                    <span>{loc.city}</span>
                  </div>

                  <button className="mt-3 bg-red-100 text-red-600 font-semibold px-4 py-2 rounded-lg shadow-sm hover:shadow transition">
                    Contact Now
                  </button>
                </div>

                <div className="flex justify-center">
                  <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.30966200977!2d${loc.longitude}!3d${loc.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91b9b6c2e3e7%3A0x2e2b0e1c8f3f3e53!2sKrishna%20Towers%2C%20Madhapur%2C%20Hyderabad%2C%20Telangana%20500081!5e0!3m2!1sen!2sin!4v1625582550000!5m2!1sen!2sin`}
                    title="Clinic Location"
                    width="100%"
                    height="220"
                    className="rounded-xl border border-gray-200 shadow"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clinic Images */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {clinics.map((loc, idx) =>
            loc.images && loc.images.length > 0 ? (
              loc.images.map((image, imgIdx) => (
                <img
                  key={`${idx}-${imgIdx}`}
                  src={image}
                  alt={`Clinic ${idx + 1} Image ${imgIdx + 1}`}
                  className="w-full h-48 object-cover rounded-xl shadow hover:scale-[1.01] transition"
                />
              ))
            ) : (
              <p key={idx} className="text-gray-500 col-span-full">
                No images available for Clinic {idx + 1}
              </p>
            )
          )}
        </div>

        {/* Medical Expertise */}
        <div className="mt-8 rounded-2xl bg-white/95 backdrop-blur shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Medical Expertise</h2>
          <div className="flex flex-wrap gap-4">
            {expertise.map((expert, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center w-28 sm:w-32 bg-gray-50 rounded-xl py-3 shadow border hover:shadow-md transition"
              >
                <img
                  src={expert.image_url}
                  alt="Expert"
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover mb-2 ring-2 ring-white shadow"
                />
                <span className="font-semibold text-xs sm:text-sm">Expert {idx + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback/Patients Section */}
        <div className="mt-8 rounded-2xl bg-white/95 backdrop-blur shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">
            Our Patients Feedback About <span className="text-blue-700">Dr {doctorData.name}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((feed, idx) => (
              <div
                key={idx}
                className="bg-gray-50 rounded-xl p-4 shadow border hover:shadow-md transition"
              >
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src="https://lh3.googleusercontent.com/ogw/AF2bZyz2p4g2z7i0b5X3gY1vL1z2K8y1r4v6z7g1s2q=s32-c"
                    alt={feed.patient_name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-bold">{feed.patient_name}</span>
                  <span className="flex gap-1 ml-2">
                    {[...Array(feed.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{feed.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Articles and Solutions */}
       <div
  className="mt-6 rounded-xl p-4 shadow-md"
  style={{
    background:
      "linear-gradient(90deg, #6ec1e4 0%, #b8d8f5 55%, #f7fafd 100%)",
  }}
>
  <div className="flex flex-col md:flex-row gap-6 md:gap-6 items-center md:items-start">
    {/* ---------- Slider Section ---------- */}
    <div className="flex-[1.5] relative flex items-center w-full min-h-[200px]">
      {/* Left Button */}
      <button
        onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
        className="absolute left-[-10px] sm:left-[-16px] top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-1.5 rounded-full shadow-md z-10 border border-blue-200"
      >
        <ChevronLeft className="w-4 h-4 text-blue-700" />
      </button>

      {/* Articles */}
      <div
        ref={scrollRef}
        className="flex overflow-x-hidden gap-4 px-2 py-2 snap-x-mandatory w-full"
      >
        {[
          {
            author: "Dr. Anita S",
            title: "10 Early Signs of Heart Disease...",
            desc: "When I was studying...",
            tag: "Cardio",
          },
          {
            author: "Dr. Anita S",
            title: "10 Early Signs of Heart Disease...",
            desc: "When I was studying...",
            tag: "UX",
          },
          {
            author: "Dr. James S",
            title: "10 Early Signs of Heart Disease...",
            desc: "When I was studying...",
            tag: "Cardio",
          },
        ].map((art, idx) => (
          <div key={idx} className="snap-center flex-shrink-0 scale-95">
            <ArticleCard art={art} idx={idx} isActive={idx === activeIndex} />
          </div>
        ))}
      </div>

      {/* Right Button */}
      <button
        onClick={() =>
          setActiveIndex((prev) => Math.min(prev + 1, 2))
        }
        className="absolute right-[-10px] sm:right-[-16px] top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-1.5 rounded-full shadow-md z-10 border border-blue-200"
      >
        <ChevronRight className="w-4 h-4 text-blue-700" />
      </button>
    </div>

    {/* ---------- Steps Section ---------- */}
    <div className="md:w-[300px] w-full flex flex-col items-center md:items-start text-center md:text-left">
      <h3 className="text-xl font-semibold mb-3 text-gray-900">
        Easy Steps and Get Your Solution
      </h3>

      <ul className="list-decimal list-inside text-sm text-gray-800/90 mb-4 space-y-1">
        {[
          "Identify the Issue",
          "Reach Out to the Expert",
          "Share Your Concerns",
          "Receive a Personalized Plan",
          "Follow Up and Stay Consistent",
        ].map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ul>

      <div className="flex gap-2 w-full justify-center md:justify-start">
        <button className="bg-amber-500 hover:bg-amber-500 text-white font-medium px-4 py-1 rounded-lg transition shadow">
          Read More
        </button>
        <button className="bg-[#186cc3] hover:bg-[#1559a5] text-white font-medium px-4 py-1 rounded-lg transition shadow">
          Consult Later
        </button>
        <button className="bg-[#209c38] hover:bg-[#157a29] text-white font-medium px-4 py-1 rounded-lg transition shadow">
          Connect Now
        </button>
      </div>
    </div>
  </div>
</div>


        {/* Video and Health Tips */}
        <div className="mt-8 mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex-1">
            <h3 className="font-bold mb-2">Dr {doctorData.name}'s Intro</h3>
            <div className="w-full rounded-xl overflow-hidden shadow">
              <iframe
                src={(videos[0]?.video_url || '').replace('watch?v=', 'embed/')}
                title={`Dr ${doctorData.name}'s Intro`}
                width="100%"
                height="260"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-[220px] sm:h-[260px]"
              />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <FaRegCommentDots className="text-red-500" /> Health and Tips
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {videos.map((tip, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow border p-2 hover:shadow-md transition">
                  <img
                    src="https://lh3.googleusercontent.com/ogw/AF2bZyz2p4g2z7i0b5X3gY1vL1z2K8y1r4v6z7g1s2q=s32-c"
                    alt="Health Tip"
                    className="w-full h-20 rounded object-cover mb-2"
                  />
                  <div className="text-xs font-semibold">Health Tip {idx + 1}</div>
                  <div className="text-[10px] text-gray-400">2.{idx + 4}M Views</div>
                  <button className="bg-yellow-400 text-white px-2 py-1 rounded text-xs mt-2 w-full">
                    Watch More!
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );  
};

export default DoctorProfileWrapper;
