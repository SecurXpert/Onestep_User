import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import { GiMedicinePills } from "react-icons/gi";
import { FaFlask } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";

const services = [
  {
    title: "Pharmacy Delivery",
    description:
      "Get your medicines delivered fast and safely to your doorstep. Trusted brands and verified pharmacists ensure genuine products.",
    icon: <GiMedicinePills className="text-blue-600 w-16 h-16 mb-6" />,
    // link: "/pharmacy", // target page on click
  },
  {
    title: "Lab Test Services",
    description:
      "Comprehensive lab tests available with certified labs. Book tests online with detailed reports and expert consultation.",
    icon: <FaFlask className="text-purple-600 w-16 h-16 mb-6" />,
    // link: "/lab-tests",
  },
  {
    title: "Offline Sample Collection",
    description:
      "Prefer home sample collection? Our trained technicians visit your home to collect samples safely with hygiene protocols.",
    icon: <MdBloodtype className="text-red-600 w-16 h-16 mb-6" />,
    // link: "/sample-collection",
  },
];

const PharmacyLabLanding = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-out-back", once: true });
  }, []);

  return (
    <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold text-purple-700 mb-4">
          Your Trusted Health Partner
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Providing seamless pharmacy delivery, reliable lab tests, and safe offline sample collection to keep you healthy and worry-free.
        </p>
      </div>

      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 max-w-7xl mx-auto">
        {services.map(({ title, description, icon, link }, index) => (
          <div
            key={title}
            data-aos="zoom-in"
            data-aos-delay={index * 200}
            onClick={() => navigate(link)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") navigate(link);
            }}
            className="bg-white rounded-3xl shadow-md p-8 flex flex-col items-center text-center cursor-pointer transition-shadow duration-300
              hover:shadow-lg hover:shadow-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {icon}
            <h3 className="text-xl font-semibold text-purple-800 mb-3">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PharmacyLabLanding;
