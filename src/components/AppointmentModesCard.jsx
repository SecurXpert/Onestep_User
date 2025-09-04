import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {
  FaVideo,
  FaCalendarCheck,
  FaFileMedical,
  FaHeadset,
  FaClock,
  FaComments,
  FaUserMd,
  FaMapMarkerAlt,
  FaStethoscope,
  FaIdCard,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
 
const AppointmentModesCard = () => {
  const navigate = useNavigate();
 
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);
 
  const modes = [
    {
      title: "Connect to Doctors",
      // route: "/doctors",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: <FaVideo className="text-3xl text-custom-blue" />, // Kept FaVideo for virtual consultations
      bgColor: "bg-white",
      textColor: "text-custom-blue",
      points: [
        { icon: <FaVideo />, text: "Call or Video consultation" }, // FaVideo for video/call consultations
        { icon: <FaStethoscope />, text: "Hospital or Clinic Visits" }, // FaStethoscope for in-person medical visits
        { icon: <FaComments />, text: "Follow up with chat or Messages" }, // FaComments for chat/messages
      ],
    },
    {
      title: "Book an Appointment",
      // route: "/doctors",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: <FaCalendarCheck className="text-3xl text-custom-blue" />, // FaCalendarCheck for booking
      bgColor: "bg-white",
      textColor: "text-custom-blue",
      points: [
        { icon: <FaUserMd />, text: "Select Doctor or Service" }, // FaUserMd for selecting doctor
        { icon: <FaClock />, text: "Choose Date & Time" }, // FaClock for scheduling
        { icon: <FaCalendarCheck />, text: "Get Appointment Confirmation" }, // FaCalendarCheck for confirmation
      ],
    },
    {
      title: "Access to Medical Reports",
      // route: "/doctors",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: <FaFileMedical className="text-3xl text-custom-blue" />, // FaFileMedical for medical reports
      bgColor: "bg-white",
      textColor: "text-custom-blue",
      points: [
        { icon: <FaIdCard />, text: "Create Health care Id" }, // FaIdCard for healthcare ID
        { icon: <FaFileMedical />, text: "Access records anytime" }, // FaFileMedical for accessing records
        { icon: <FaMapMarkerAlt />, text: "Use Id across the service" }, // FaMapMarkerAlt for service-wide usage
      ],
    },
  ];
 
  return (
    <div className='bg-b3d8e4-gradient'>
      <div className="max-w-6xl bg-b3d8e4-gradient mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-custom-blue">Our Services</h2>
          <p className="text-gray-600 font-bold mt-2">Choose from our flexible consultation options tailored to your needs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modes.map((mode, index) => (
            <div
              key={index}
              onClick={() => navigate(mode.route)}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              className={`${mode.bgColor} ${mode.textColor} rounded-xl p-6 shadow-sm border border-gray-200 cursor-pointer transition-all hover:scale-105 hover:shadow-lg`}
            >
              <img
                src={mode.image}
                alt={mode.title}
                className="w-full h-40 object-cover rounded-t-xl mb-4"
              />
              <div className="flex items-center gap-3 mb-4">
                {mode.icon}
                <h3 className="text-lg font-semibold">{mode.title}</h3>
              </div>
              <ul className="space-y-3 text-sm">
                {mode.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1">{point.icon}</span>
                    <span>{point.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
 
export default AppointmentModesCard;