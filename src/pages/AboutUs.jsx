import React, { useState, useRef, useEffect } from 'react';
import aboutus from '../assets/about us-b.png';
import about from '../assets/aboutus2.png';
import security from '../assets/security.jpg';
import doctor1 from '../assets/doctor1.png';
import {
  IoMedkitOutline,
  IoPeopleOutline,
  IoCartOutline,
  IoCashOutline,
  IoHeadsetOutline,
  IoPulseOutline,
} from 'react-icons/io5';

const AboutUs = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  const testimonials = [
    {
      id: 1,
      name: "Dr. Arvind Reddy",
      specialty: "Cardiologist",
      quote: "With this platform, I can focus more on patient care rather than managing appointments.",
      image: doctor1
    },
    {
      id: 2,
      name: "Dr. Sneha Dasari",
      specialty: "Dermatologist",
      quote: "It's refreshing to see a system that connects doctors and patients so seamlessly.",
      image: doctor1
    },
    {
      id: 3,
      name: "Dr. Rahul Varma",
      specialty: "Pediatrician",
      quote: "This platform has transformed how I manage my practice.",
      image: doctor1
    },
    {
      id: 4,
      name: "Dr. Keerthi Iyer",
      specialty: "Gynaecologist",
      quote: "I appreciate how user-friendly and secure the platform is.",
      image: doctor1
    },
    {
      id: 5,
      name: "Dr. Mahesh Alluri",
      specialty: "Orthopedic Surgeon",
      quote: "The quick access to patient records has improved my consultations.",
      image: doctor1
    }
  ];
  const patientTestimonials = [
    {
      id: 1,
      name: "Ravi Kumar",
      quote: "One Step Medi made it easy to find the right specialist near me. The clinic visit was comfortable and well-organized.",
      image: doctor1
    },
    {
      id: 2,
      name: "Ananya Sharma",
      quote: "I liked how clear the booking process was on One Step Medi. I got reminders and my in-clinic consultation went smoothly.",
      image: doctor1
    },
    {
      id: 3,
      name: "Vikram Singh",
      quote: "With One Step Medi, I didn’t have to worry about missing out on a doctor’s slot. The appointment was confirmed quickly, and the doctor gave me good care.",
      image: doctor1
    },
    {
      id: 4,
      name: "Priya Menon",
      quote: "I used One Step Medi for a video consultation when I couldn’t visit the clinic. The doctor explained everything clearly, and it felt just like meeting in person.",
      image: doctor1
    },
    {
      id: 5,
      name: "Amit Patel",
      quote: "When I needed an emergency appointment, One Step Medi helped me find an available doctor immediately. The service was very reliable.",
      image: doctor1
    }
  ];
  
  const handleViewAll = () => {
    navigate('/doctors');
  };
  // Scroll to a card by reading its actual offset (works at all widths)
  const scrollToTestimonial = (index) => {
    const container = containerRef.current;
    const card = cardRefs.current[index];
    if (container && card) {
      const left = card.offsetLeft - container.offsetLeft;
      container.scrollTo({ left, behavior: 'smooth' });
    }
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev === 0 ? testimonials.length - 1 : prev - 1;
      scrollToTestimonial(newIndex);
      return newIndex;
    });
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev === testimonials.length - 1 ? 0 : prev + 1;
      scrollToTestimonial(newIndex);
      return newIndex;
    });
  };

  // Keep the selected card aligned after window resize
  useEffect(() => {
    const onResize = () => scrollToTestimonial(currentIndex);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  return (
    <div className="w-full bg-white flex flex-col items-center relative overflow-hidden">
      {/* Banner Section - Full Width */}
      <div className="w-full min-h-[40vh] mx-auto bg-b3d8e4-gradient">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col-reverse md:flex-row items-center gap-6 md:gap-10">
          {/* Left Content */}
          <div className="w-full md:w-3/4 text-left md:text-center">
            <h2
              className="text-3xl sm:text-4xl md:text-4xl text-custom-blue font-bold text-blue-600 mb-3 sm:mb-4"
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
            >
              One Step Medi
            </h2>
            <h1
              className="text-2xl sm:text-2xl md:text-2xl text-custom-blue font-bold text-blue-600 mb-3 sm:mb-4"
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
            >
             India’s Most Trusted All-in-One Digital Healthcare Platform
            </h1>
            <p className="text-custom-blue font-medium text-sm sm:text-base md:text-lg mb-3 sm:mb-4">
            We bring medical care to your fingertips, including in-clinic doctor appointments, home visits, emergency appointments and video consultations.
            </p>
            {/* <p className="text-custom-blue font-medium text-sm sm:text-base md:text-lg mb-4 md:mb-6">
              Find Your Trusted Doctor In Just One Step – Only At OneStep Medi.
            </p> */}
            <button
          onClick={handleViewAll}
          className="self-end 2sm:self-auto px-3 2xs:px-3.5 xs:px-4 2sm:px-5 sm:px-5 md:px-5 md800:px-5 md900:px-5.5 lg:px-5 xl:px-6 2xl:px-6 3xl:px-6 py-1 2xs:py-1 xs:py-1.5 2sm:py-2 sm:py-2 md:py-2 md800:py-2 md900:py-2.25 lg:py-2 xl:py-2 2xl:py-2 3xl:py-2 bg-custom-blue text-white font-semibold rounded-full hover:bg-opacity-90 transition-colors duration-300 mb-4 text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-sm md900:text-sm lg:text-sm xl:text-base 2xl:text-base 3xl:text-base"
          aria-label="View all doctors"
        >
          Specialists
        </button>
          </div>

          {/* Right Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img src={about} alt="Healthcare" className="max-w-full h-auto max-h-[50vh]" />
          </div>
        </div>
      </div>

      {/* Decorative Line Element */}
      <div className="absolute top-0 left-1/2 w-1/2 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform -translate-x-1/2" />

      <div className="max-w-7xl w-full relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="mb-12 animate-fade-in pt-10">
          {/* Grid Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="relative rounded-2xl overflow-hidden shadow-[0_6px_20px_rgba(59,130,246,0.1)] hover:shadow-[0_10px_30px_rgba(147,51,234,0.15)] transition-shadow duration-300 group">
              <img
                src={aboutus}
                alt="About Us"
                className="w-full h-56 sm:h-64 md:h-72 object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 border-4 border-blue-500/20 rounded-2xl group-hover:border-purple-600/30 transition-colors duration-300" />
            </div>

            {/* Text Section */}
            <div className="flex justify-center px-0 md:px-4">
              <div className="max-w-3xl text-left">
                <h2 className="text-xl sm:text-2xl font-bold text-custom-blue mb-4">
                  One Step Medi – India’s Most Trusted All-in-One Digital Healthcare Platform
                </h2>

                <p className="text-gray-600 font-medium leading-relaxed mb-4 text-sm sm:text-base">
                  OneStep Medi is a unified digital healthcare platform that connects patients with verified
                  doctors and essential medical services. We simplify access to doctor consultations,
                  and secure digital records—all in one place.
                </p>

                <p className="text-gray-600 font-medium leading-relaxed text-sm sm:text-base">
                  Each user is assigned a unique Patient ID to ensure seamless tracking of prescriptions,
                  reports, and medical history. With timely alerts and convenient at-home services, OneStep Medi
                  brings quality healthcare within everyone’s reach.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-custom-blue mb-6 sm:mb-10 text-center tracking-tight animate-fade-in-up">
            Why Choose Us?
          </h2>

          <h3 className="text-center text-gray-700 font-medium text-base sm:text-lg mb-8 sm:mb-10">
            <span className="font-semibold text-purple-600">One Step Medi</span> — Every Step Towards Better Health
            <br />
            Our mission is to make healthcare services available for everyone.
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <IoPeopleOutline className="text-4xl sm:text-5xl text-custom-blue mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">Verified Doctors</h3>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">130+</h3>
              <p className="text-gray-600 text-sm">
                All physicians are certified, background-checked, and patient-reviewed, ensuring trusted medical care every time.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <IoMedkitOutline className="text-4xl sm:text-5xl text-custom-blue mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">Trusted Pharmacy</h3>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">100+</h3>
              <p className="text-gray-600 text-sm">
                We provide 100% certified medicines delivered safely with professional verification.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <IoCartOutline className="text-4xl sm:text-5xl text-custom-blue mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">Diagnostics Tie Up</h3>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">10+</h3>
              <p className="text-gray-600 text-sm">
                Medicine and lab sample collection delivered quickly and on time.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <IoCashOutline className="text-4xl sm:text-5xl text-custom-blue mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">Affordable Pricing</h3>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Upto 80% Discount</h3>
              <p className="text-gray-600 text-sm">
                No hidden charges, no additional taxes — clear costs for consultations, tests, and deliveries every time.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <IoHeadsetOutline className="text-4xl sm:text-5xl text-custom-blue mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">24/7 Call and Chat Support</h3>
              <p className="text-gray-600 text-sm">
                We’re always available to assist you anytime via calls and chats.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <IoPulseOutline className="text-4xl sm:text-5xl text-custom-blue mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Branches</h3>
              <p className="text-gray-600 text-sm flex items-center justify-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" fill="red">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z" />
                </svg>
                Telangana
              </p>
              <p className="text-gray-600 text-sm flex items-center justify-center gap-3 ml-6">
                <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" fill="red">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z" />
                </svg>
                Andhra Pradesh
              </p>
            </div>
          </div>

          {/* What Makes Us Different from Others Section */}
          <div className="mt-10 sm:mt-12">
            <h2
              className="text-3xl sm:text-4xl font-extrabold mb-6 sm:mb-10 text-center tracking-tight animate-fade-in-up"
              style={{ color: 'rgb(1, 79, 134)' }} /* fixed typo: colo -> color */
            >
              What Makes Us Different from Others?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {/* Card 1: Trust */}
              <div
                className="rounded-2xl p-6 text-center text-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                style={{ backgroundColor: 'rgb(1, 79, 134)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto mb-4"
                  width="48" height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Trust</h3>
                <p className="text-sm">Verified doctors, honest reviews you can rely on.</p>
              </div>

              {/* Card 2: Support */}
              <div
                className="rounded-2xl p-6 text-center text-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                style={{ backgroundColor: 'rgb(1, 79, 134)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto mb-4"
                  width="48" height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M3 13v-2a9 9 0 0 1 18 0v2" />
                  <path d="M21 16a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2z" />
                  <path d="M3 16a2 2 0 0 0 2 2h1v-6H5a2 2 0 0 0-2 2z" />
                  <path d="M12 20v-4" />
                </svg>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Support</h3>
                <p className="text-sm">Post-consultation follow-ups, reminders, and help.</p>
              </div>

              {/* Card 3: Access */}
              <div
                className="rounded-2xl p-6 text-center text-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                style={{ backgroundColor: 'rgb(1, 79, 134)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto mb-4"
                  width="48" height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Access</h3>
                <p className="text-sm">From appointments to reports, anytime, anywhere.</p>
              </div>

              {/* Card 4: Care */}
              <div
                className="rounded-2xl p-6 text-center text-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                style={{ backgroundColor: 'rgb(1, 79, 134)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto mb-4"
                  width="48" height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M3 14s1 0 2-1 3-3 5-3 3 1 4 2 3 3 4 4 2 2 3 2" />
                  <path d="M12 21c-4.5-2-6.5-5.5-6.5-8.5 0-1.5 1-3.5 3.5-3.5 1.5 0 2.5 1 3 2 0.5-1 1.5-2 3-2 2.5 0 3.5 2 3.5 3.5 0 3-2 6.5-6.5 8.5z" />
                </svg>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Care</h3>
                <p className="text-sm">Designed around real patient needs, not just features.</p>
              </div>
            </div>
          </div>

          {/* Security / Privacy */}
          <div className="bg-gray-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row items-center max-w-7xl mx-auto mt-10 gap-4">
            <div className="md:w-1/2 w-full p-2 sm:p-4">
              <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3 sm:mb-4">Your Data, Fully Protected</h3>
              <h3 className="font-bold p-2">We prioritize your privacy and security at every level.</h3>
              <ul className="text-gray-600 text-sm mb-4 pl-5 space-y-2">
                <li className="flex items-start text-blue-500 font-bold">
                  <span className="text-green-500 mr-2 text-bold">✓</span> Advanced Security Protocols
                </li>
                <p className="text-gray-600 ml-6">Robust, multi-layered protection to keep your data safe.</p>
                <li className="flex items-start text-blue-500 font-bold">
                  <span className="text-green-500 mr-2">✓</span> Automated Data Backups
                </li>
                <p className="text-gray-600 ml-6">Frequent backups ensure your information is never lost.</p>
                <li className="flex items-start text-blue-500 font-bold">
                  <span className="text-green-500 mr-2">✓</span> Strict Privacy Policies
                </li>
                <p className="text-gray-600 ml-6">Your data is handled with the highest confidentiality standards.</p>
              </ul>
              <a
                href="/private"
                className="inline-block bg-blue-500 text-white px-5 sm:px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 ml-2 sm:ml-3"
              >
                Read More
              </a>
            </div>
            <div className="md:w-1/2 w-full p-2 sm:p-4 flex justify-center">
              <img
                src={security}
                alt="Data Security Illustration"
                className="w-full h-auto object-contain max-h-[360px]"
              />
            </div>
          </div>

          {/* What Doctor Say About Us */}
          <div className="bg-gray-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 max-w-7xl mx-auto mt-8 mb-8">
            <div className="w-full p-2 sm:p-4">
              <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3 text-center">What Doctor Say About Us?</h3>
              <p className="font-bold mb-3 text-center">Trusted by healthcare professionals across India.</p>
              <p className="text-gray-600 text-sm mb-2 text-center">
                "OneStep Medi has revolutionized how I connect with my patients. The platform's seamless integration and reliable support make it a game-changer for healthcare delivery."
              </p>
              <p className="text-gray-600 text-sm mb-2 text-center">
                "The ease of managing patient records and scheduling consultations has saved me hours every week. Highly recommend it!"
              </p>
            </div>

            {/* Testimonials Carousel */}
            <div className="w-full p-2 sm:p-4 mt-4 relative">
              {/* Left Arrow */}
              <button
                onClick={prevTestimonial}
                className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
                aria-label="Previous testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Testimonial Container */}
              <div
                ref={containerRef}
                className="flex overflow-x-hidden sm:mx-6 md:mx-10 scroll-smooth snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none' }}
              >
                <div className="flex transition-all duration-300">
                  {testimonials.map((testimonial, idx) => (
                    <div
                      key={testimonial.id}
                      ref={(el) => (cardRefs.current[idx] = el)}
                      className="flex flex-col bg-white p-4 rounded-lg shadow-md w-[80vw] xs:w-[70vw] sm:w-[300px] md:w-[320px] h-auto min-h-[180px] mx-2 sm:mx-4 flex-shrink-0 snap-start"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <img
                          src={testimonial.image}
                          alt="Doctor Profile"
                          className="w-10 h-10 object-cover rounded-full"
                        />
                        <div>
                          <p className="text-gray-800 font-semibold text-sm sm:text-base">{testimonial.name}</p>
                          <p className="text-gray-600 text-xs">{testimonial.specialty}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm italic flex-grow">"{testimonial.quote}"</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Arrow */}
              <button
                onClick={nextTestimonial}
                className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
                aria-label="Next testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      scrollToTestimonial(index);
                    }}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`w-2 h-2 mx-1 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="bg-gray-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 max-w-7xl mx-auto mt-8 mb-8">
            <div className="w-full p-2 sm:p-4">
              <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3 text-center">What Doctor Say About Us?</h3>
              <p className="font-bold mb-3 text-center">Trusted by healthcare professionals across India.</p>
              <p className="text-gray-600 text-sm mb-2 text-center">
                "OneStep Medi has revolutionized how I connect with my patients. The platform's seamless integration and reliable support make it a game-changer for healthcare delivery."
              </p>
              <p className="text-gray-600 text-sm mb-2 text-center">
                "The ease of managing patient records and scheduling consultations has saved me hours every week. Highly recommend it!"
              </p>
            </div>

            {/* Testimonials Carousel */}
            <div className="w-full p-2 sm:p-4 mt-4 relative">
              {/* Left Arrow */}
              <button
                onClick={prevTestimonial}
                className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
                aria-label="Previous testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Testimonial Container */}
              <div
                ref={containerRef}
                className="flex overflow-x-hidden sm:mx-6 md:mx-10 scroll-smooth snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none' }}
              >
                <div className="flex transition-all duration-300">
                  {patientTestimonials.map((testimonial, idx) => (
                    <div
                      key={testimonial.id}
                      ref={(el) => (cardRefs.current[idx] = el)}
                      className="flex flex-col bg-white p-4 rounded-lg shadow-md w-[80vw] xs:w-[70vw] sm:w-[300px] md:w-[320px] h-auto min-h-[180px] mx-2 sm:mx-4 flex-shrink-0 snap-start"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <img
                          src={testimonial.image}
                          alt="Doctor Profile"
                          className="w-10 h-10 object-cover rounded-full"
                        />
                        <div>
                          <p className="text-gray-800 font-semibold text-sm sm:text-base">{testimonial.name}</p>
                          <p className="text-gray-600 text-xs">{testimonial.specialty}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm italic flex-grow">"{testimonial.quote}"</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Arrow */}
              <button
                onClick={nextTestimonial}
                className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
                aria-label="Next testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      scrollToTestimonial(index);
                    }}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`w-2 h-2 mx-1 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
