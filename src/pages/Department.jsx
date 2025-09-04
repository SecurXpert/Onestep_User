import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaInfoCircle } from 'react-icons/fa';
import defaultBanner from '../assets/banner.jpg';
import entBanner from '../assets/ENTp.png';
import eyeBanner from '../assets/optomo.png';
import nurseBanner from '../assets/nurse.png';
import homeopathyBanner from '../assets/homeo.png';
import physioBanner from '../assets/physio.png';
import gynicBanner from '../assets/gyna.png';
import dentistBanner from '../assets/dent.png';
import thyroidBanner from '../assets/endo.png';
import cardioBanner from '../assets/card.png';
import dermaBanner from '../assets/cosm.png';
import nutritionBanner from '../assets/diet.png';
import generalBanner from '../assets/general.png';
import pilesBanner from '../assets/proct.png';
import psychiatristBanner from '../assets/psych.png';
import pediaBanner from '../assets/pedia.png';
import cosmetologistBanner from '../assets/cosm.png';
import neuroBanner from '../assets/neuro.png';
import orthoBanner from '../assets/ortho.png';
import tip from '../assets/nutrition-4.jpg';
import tip1 from '../assets/teethtip1.png';
import tip2 from '../assets/teethtip2.png';
import tip3 from '../assets/teethtip3.png';
import skintip1 from '../assets/skintip1.png';
import skintip2 from '../assets/skintip2.png';
import skintip3 from '../assets/skintip3.png';
import pilestips1 from '../assets/pilestips1.png';
import pilestips2 from '../assets/pilestips2.png';
import pilestips3 from '../assets/pilestips3.png';
import gynictip1 from '../assets/gynictip1.png';
import gynictip2 from '../assets/gynictip2.png';
import gynictip3 from '../assets/gynictip3.png';
import genraltrail1 from '../assets/genraltrail1.png';
import genraltrail2 from '../assets/genraltrail2.png';
import genraltrail3 from '../assets/genraltrail3.png';
import jointtip1 from '../assets/jointtip1.png';
import jointtip2 from '../assets/jointtip2.png';
import jointtip3 from '../assets/jointtip3.png';
import thyroidtip1 from '../assets/thyroidtip1.png';
import thyroidtip2 from '../assets/thyroidtip2.png';
import thyroidtip3 from '../assets/thyroidtip3.png';
import nutritiontip1 from '../assets/nutritiontip1.png';
import nutritiontip2 from '../assets/nutritiontip2.png';
import nutritiontip3 from '../assets/nutritiontip3.png';
import physiotip1 from '../assets/physiotip1.png';
import physiotip2 from '../assets/physiotip2.png';
import physiotip3 from '../assets/physiotip3.png';
import nurse1 from '../assets/nurse1.png';
import nurse2 from '../assets/nurse2.png';
import nurse3 from '../assets/nurse3.png';
import cardiotip1 from '../assets/cardiotip1.png';
import cardiotip2 from '../assets/cardiotip2.png';
import cardiotip3 from '../assets/cardiotip3.png';
import pediatip1 from '../assets/pediatip1.png';
import pediatip2 from '../assets/pediatip2.png';
import pediatip3 from '../assets/pediatip3.png';
import neurotip1 from '../assets/neurotip1.png';
import neurotip2 from '../assets/neurotip2.png';
import neurotip3 from '../assets/neurotip3.png';
import derma1 from '../assets/derma1.png';
import derma2 from '../assets/derma2.png';
import derma3 from '../assets/derma3.png';
import psychairtisttip1 from '../assets/psychairtisttip1.png';
import psychairtisttip2 from '../assets/psychairtisttip2.png';
import psychairtisttip3 from '../assets/psychairtisttip3.png';
import eyetip1 from '../assets/eyetip1.png';
import eyetip2 from '../assets/eyetip2.png';
import eyetip3 from '../assets/eyetip3.png';
import homeotip1 from '../assets/homeotip1.png';
import homeotip2 from '../assets/homeotip2.png';
import homeotip3 from '../assets/homeotip3.png';
import ent1 from '../assets/ENT1.png';
import ent2 from '../assets/ENT2.png';
import ent3 from '../assets/ENT3.png';

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

// Specialty-specific banner images
const specialtyBanners = {
  entspecialist: entBanner,
  ophthalmologist: eyeBanner,
  nurse: nurseBanner,
  homeopathy: homeopathyBanner,
  physiotherapist: physioBanner,
  gynecologist: gynicBanner,
  dentist: dentistBanner,
  endocrinologist: thyroidBanner,
  cardiologist: cardioBanner,
  dermatologist: dermaBanner,
  nutritionist: nutritionBanner,
  generalphysician: generalBanner,
  proctologist: pilesBanner,
  psychiatrist: psychiatristBanner,
  pediatrician: pediaBanner,
  cosmetologist: cosmetologistBanner,
  neurologist: neuroBanner,
  orthopedic: orthoBanner,
};

// Specialty-specific tips
const specialtyTips = {
  entspecialist: [
    {
      id: 1,
      title: 'Saline Nasal Rinse',
      content: 'Use a saline nasal rinse twice daily to clear mucus, soothe inflamed sinuses, and reduce congestion.',
      image: ent1,
    },
    {
      id: 2,
      title: 'Steam Inhalation Relief',
      content: 'Inhale warm steam for 5–10 minutes (bowl of hot water or hot shower) to loosen chest and nasal mucus and relieve ear‑throat pressure.',
      image: ent2,
    },
    {
      id: 3,
      title: 'Avoid Irritants',
      content: 'Identify and avoid triggers like smoke, strong perfumes, and allergens to prevent sinus and throat flare‑ups.',
      image: ent3,
    },
  ],
  ophthalmologist: [
    {
      id: 1,
      title: 'Prevent Digital Eye Strain',
      content: 'Follow the 20‑20‑20 rule: every 20 minutes of screen time, look 20 feet away for 20 seconds to prevent digital eye strain.',
      image: eyetip1,
    },
    {
      id: 2,
      title: 'UV Protection for Eyes',
      content: 'Wear sunglasses blocking 100% UVA/UVB whenever outdoors to protect against cataracts and macular degeneration.',
      image: eyetip2,
    },
    {
      id: 3,
      title: 'Nutrients for Vision',
      content: 'Snack on lutein‑ and zeaxanthin‑rich foods (spinach, kale, eggs) to support retina health and slow age‑related vision decline.',
      image: eyetip3,
    },
  ],
  nurse: [
    {
      id: 1,
      title: 'First-Aid Essentials',
      content: 'Keep a home first-aid kit stocked with bandages, antiseptic wipes, gauze, and a thermometer for quick care of cuts, scrapes, or fevers.',
      image: nurse1,
    },
    {
      id: 2,
      title: 'Smart Medication Management',
      content: 'Organize medications in a weekly pill box and set phone alarms to avoid missed or double doses.',
      image: nurse2,
    },
    {
      id: 3,
      title: 'Monitor Vitals When Sick',
      content: 'Monitor and log your temperature, blood pressure, and resting pulse daily when unwell to track recovery and share accurate data with your healthcare team.',
      image: nurse3,
    },
  ],
  homeopathy: [
    {
      id: 1,
      title: 'Drink Water from Copper Vessel',
      content: 'Storing water in a copper container overnight helps balance pH levels and supports digestion—an age-old wellness practice aligned with homeopathy’s natural approach.',
      image: homeotip1,
    },
    {
      id: 2,
      title: 'Wake Up with Sunlight',
      content: 'Natural morning light boosts your mood, aligns your body clock, and supports your body’s natural healing rhythm.',
      image: homeotip2,
    },
    {
      id: 3,
      title: 'Walk Barefoot on Grass',
      content: 'Walking barefoot on natural surfaces like grass or soil (earthing) helps reduce stress, improve sleep, and connect you to natural healing energies.',
      image: homeotip3,
    },
  ],
  physiotherapist: [
    {
      id: 1,
      title: 'Relieve Neck Tension',
      content: 'Gently tilt your head side to side ear to shoulder holding each stretch for 15 seconds to relieve neck tension.',
      image: physiotip1,
    },
    {
      id: 2,
      title: 'Massage with a Ball',
      content: 'Squeeze a small massage ball (or tennis ball) under your foot or along your shoulder blade to work out knots.',
      image: physiotip2,
    },
    {
      id: 3,
      title: 'Stretch with Bands',
      content: 'Stretch with resistance bands looped around your feet or hands for gentle pulls that build strength without strain.',
      image: physiotip3,
    },
  ],
  gynecologist: [
    {
      id: 1,
      title: 'Ease Period Cramps',
      content: 'Drink ginger or chamomile tea during your period to naturally reduce cramps and inflammation. These teas help relax your body, calm your mood, and ease discomfort without needing painkillers.',
      image: gynictip1,
    },
    {
      id: 2,
      title: 'Nourish Skin During Pregnancy',
      content: 'Gently massage your belly with almond or coconut oil daily to reduce dryness, ease itching, and support skin elasticity. It keeps your skin nourished and comfortable as your body changes.',
      image: gynictip2,
    },
    {
      id: 3,
      title: 'Post-Period Stretching',
      content: 'Do 5 minutes of gentle stretching after your period ends to boost energy, ease lingering cramps, and improve pelvic blood flow for a smoother cycle recovery.',
      image: gynictip3,
    },
  ],
  dentist: [
    {
      id: 1,
      title: 'Natural Teeth Cleanser',
      content: 'Crunchy fruits like apples gently scrub your teeth, making them a tasty, natural cleanser after snacks.',
      image: tip2,
    },
    {
      id: 2,
      title: 'Prevent Staining',
      content: 'Love tea or coffee? Rinse with water afterward to help prevent staining while still enjoying your favorite sips.',
      image: tip3,
    },
    {
      id: 3,
      title: 'Freshen Breath Naturally',
      content: 'Chew a few fennel seeds or fresh parsley after meals to naturally freshen breath and aid digestion without masking odors like gum or mints do.',
      image: tip1,
    },
  ],
  endocrinologist: [
    {
      id: 1,
      title: 'Support Thyroid Health',
      content: 'Snack on 2–3 Brazil nuts weekly to support healthy thyroid function and balance hormones naturally.',
      image: thyroidtip1,
    },
    {
      id: 2,
      title: 'Reduce Chemical Exposure',
      content: 'Use glass or steel containers instead of plastic to reduce chemical exposure that can affect your hormones.',
      image: thyroidtip2,
    },
    {
      id: 3,
      title: 'Prioritize Deep Sleep',
      content: 'Focus on deep sleep, not just long sleep. Quality rest keeps your energy steady and hormones in sync.',
      image: thyroidtip3,
    },
  ],
  cardiologist: [
    {
      id: 1,
      title: 'Improve Circulation',
      content: 'Stand and stretch every hour, especially if you sit for long hours, to improve circulation and lower blood pressure.',
      image: cardiotip1,
    },
    {
      id: 2,
      title: 'Morning Walk for Heart Health',
      content: 'A brisk walk right after waking up can improve circulation, lower early-morning blood pressure spikes, and reduce your risk of heart attack over time.',
      image: cardiotip2,
    },
    {
      id: 3,
      title: 'Heart-Healthy Snacks',
      content: 'Choose walnuts or almonds over salty snacks. They nourish your heart and help reduce bad cholesterol.',
      image: cardiotip3,
    },
  ],
  dermatologist: [
    {
      id: 1,
      title: 'Lock in Hydration',
      content: 'Apply moisturizer on damp skin to lock in hydration more effectively than applying it on dry skin.',
      image: derma1,
    },
    {
      id: 2,
      title: 'Hydrate from Within',
      content: 'Add water-rich foods like cucumbers and oranges to your diet. They boost skin elasticity and help maintain a natural, dewy glow.',
      image: derma2,
    },
    {
      id: 3,
      title: 'Daily Sunscreen',
      content: 'Wear sunscreen daily, not just in summer. Even indoor light and screens can cause pigmentation and aging.',
      image: derma3,
    },
  ],
  nutritionist: [
    {
      id: 1,
      title: 'Balanced Meal Rule',
      content: 'Follow the 3-2-1 rule for every meal: 3 parts vegetables, 2 parts protein, and 1 part whole grain for balanced nutrition and steady energy.',
      image: nutritiontip1,
    },
    {
      id: 2,
      title: 'Mindful Chewing',
      content: 'Chew each bite 20–30 times to eat less, digest better, and avoid post-meal bloating.',
      image: nutritiontip2,
    },
    {
      id: 3,
      title: 'Smart Carb Pairing',
      content: 'Pair carbs with protein and fiber, like brown rice with lentils and sautéed veggies, for steady energy and better weight control.',
      image: nutritiontip3,
    },
  ],
  generalphysician: [
    {
      id: 1,
      title: 'Annual Health Check',
      content: 'Schedule one preventive health check every year, even when you feel healthy. Prevention is easier than cure.',
      image: genraltrail1,
    },
    {
      id: 2,
      title: 'Digital Health Records',
      content: 'Keep digital health records easily accessible to help doctors diagnose faster and more accurately during visits.',
      image: genraltrail2,
    },
    {
      id: 3,
      title: 'Know Your Vitals',
      content: 'Knowing your normal body temperature, pulse, and blood pressure empowers you to detect early warning signs.',
      image: genraltrail3,
    },
  ],
  proctologist: [
    {
      id: 1,
      title: 'Reduce Rectal Pressure',
      content: 'If you sit for long periods, stretch or stand for at least 5 minutes every hour to reduce rectal pressure and improve blood flow.',
      image: pilestips1,
    },
    {
      id: 2,
      title: 'Increase Fiber Gradually',
      content: 'Increase fiber gradually with foods like soaked raisins or oats to avoid gas while easing bowel movements.',
      image: pilestips2,
    },
    {
      id: 3,
      title: 'Address Rectal Bleeding',
      content: 'Never ignore rectal bleeding. It could be minor or the first sign of a larger issue best caught early.',
      image: pilestips3,
    },
  ],
  psychiatrist: [
    {
      id: 1,
      title: 'Track Your Mood',
      content: 'Keep a daily mood log for two weeks to help you and your doctor identify hidden patterns and emotional triggers.',
      image: psychairtisttip1,
    },
    {
      id: 2,
      title: 'Limit Late-Night Screens',
      content: 'Screen time after 10 p.m. can disrupt melatonin and worsen anxiety. Try journaling or deep breathing instead.',
      image: psychairtisttip2,
    },
    {
      id: 3,
      title: 'Therapy for Wellbeing',
      content: 'Therapy isn’t just for crisis—it’s like regular fitness for emotional wellbeing and self-awareness.',
      image: psychairtisttip3,
    },
  ],
  pediatrician: [
    {
      id: 1,
      title: 'Introduce Foods Safely',
      content: 'Introduce new foods to your baby one at a time and wait 2–3 days to spot allergies or sensitivities.',
      image: pediatip1,
    },
    {
      id: 2,
      title: 'Encourage Sensory Play',
      content: 'Let children engage in messy, sensory-rich play to boost brain development and emotional intelligence.',
      image: pediatip2,
    },
    {
      id: 3,
      title: 'Track Vaccinations',
      content: 'Track your child’s vaccinations digitally to ensure on-time shots protect against serious illnesses.',
      image: pediatip3,
    },
  ],
  cosmetologist: [
    {
      id: 1,
      title: 'Sleep for Skin Health',
      content: 'Sleep 7–8 hours a night—your skin repairs itself best during deep sleep, boosting collagen and reducing inflammation.',
      image: skintip2,
    },
    {
      id: 2,
      title: 'Clean Makeup Brushes',
      content: 'Clean your makeup brushes every week to prevent bacterial buildup that causes clogged pores and breakouts.',
      image: skintip1,
    },
    {
      id: 3,
      title: 'Limit Exfoliation',
      content: 'Over-exfoliation damages your skin barrier. Limit scrubs or acids to 2–3 times a week based on your skin type.',
      image: skintip3,
    },
  ],
  neurologist: [
    {
      id: 1,
      title: 'Boost Brain Agility',
      content: 'Add coordination games like juggling or memory puzzles to your routine to boost brain agility and focus.',
      image: neurotip1,
    },
    {
      id: 2,
      title: 'Stay Hydrated',
      content: 'Stay hydrated with electrolytes by adding a pinch of pink Himalayan salt or a splash of coconut water to maintain nerve conductivity and prevent migraine triggers.',
      image: neurotip2,
    },
    {
      id: 3,
      title: 'Screen Time Breaks',
      content: 'Take a 15-minute break after every hour of screen time to reset your nervous system and reduce brain fog.',
      image: neurotip3,
    },
  ],
  orthopedic: [
    {
      id: 1,
      title: 'Build Bone Density',
      content: 'Climbing stairs or brisk walking daily builds bone density and reduces the risk of osteoporosis with age.',
      image: jointtip1,
    },
    {
      id: 2,
      title: 'Foot-Elevation Breaks',
      content: 'If you stand or walk for long hours, take a 5-minute foot-elevation break every hour to improve circulation and ease joint stress.',
      image: jointtip2,
    },
    {
      id: 3,
      title: 'Maintain Good Posture',
      content: 'Sit with a straight back and feet flat while working—good posture now prevents long-term spinal stress later.',
      image: jointtip3,
    },
  ],
};

// Sample FAQ data
const faqs = [
  {
    id: 1,
    question: 'How can I book an appointment with the doctor?',
    answer: 'You can book a doctors appointment on the One Step Medi platform by selecting your preferred doctor, entering your symptoms, choosing a date and time and providing details such as your name, age, and gender.',
  },
  {
    id: 2,
    question: 'Can I reschedule or cancel my appointment?',
    answer: 'Yes, you can easily reschedule or cancel your doctor appointment via the One Step Medi platform before the scheduled time.',
  },
  {
    id: 3,
    question: 'What if I miss my scheduled appointment?',
    answer: 'If you miss your appointment, you can rebook a doctor consultation online without any hassle from your dashboard.',
  },
  {
    id: 4,
    question: 'Is online consultation as effective as in-clinic visits?',
    answer: 'Yes, online consultations on One Step Medi are secure, private and effective for most common health concerns, with experienced and verified doctors providing quality care.',
  },
  {
    id: 5,
    question: 'Will I receive a prescription after the consultation?',
    answer: 'Yes, after your online consultation, the doctor will share a digital prescription directly within the One Step Medi platform.',
  },
  {
    id: 6,
    question: 'What if I need help during the booking process?',
    answer: 'You can reach our support team anytime through chatbot, Contact Support or email for quick assistance during the appointment booking process on One Step Medi.',
  },
];

const Department = () => {
  const { specialtyName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialArea = queryParams.get('area') || location.state?.searchParams?.area || '';

  const [searchParams, setSearchParams] = useState({
    area: initialArea,
    searchTerm: decodeURIComponent(specialtyName || ''),
  });
  const [openFaq, setOpenFaq] = useState(null);
  const [doctors, setDoctors] = useState(location.state?.filteredDoctors || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pincodeError, setPincodeError] = useState(null);

  // Fetch doctors by specialty and area on component mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const token = sessionStorage.getItem('access_token');
        if (!token) {
          throw new Error('No access token found. Please log in.');
        }

        let url = `https://api.onestepmedi.com:8000/doctors/by-specialization/${encodeURIComponent(specialtyName)}`;
        if (searchParams.area) {
          url = `https://api.onestepmedi.com:8000/doctors/by-specialization/area_spec/?specialization_name=${encodeURIComponent(specialtyName)}&area=${encodeURIComponent(searchParams.area)}`;
        }

        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }
        const data = await response.json();
        console.log('Fetched doctors:', data);
        setDoctors(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setDoctors([]);
        setLoading(false);
      }
    };

    if (specialtyName) {
      fetchDoctors();
    }
  }, [specialtyName, searchParams.area]);

  // Scroll to top when specialtyName changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [specialtyName]);

  // Handle search form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    const { area, searchTerm } = searchParams;

    // Validate pincode before proceeding with the search
    if (area && (area.length !== 6 || isNaN(area))) {
      setPincodeError('Please enter a valid 6-digit pincode');
      return;
    }

    if (searchTerm) {
      try {
        setLoading(true);
        const token = sessionStorage.getItem('access_token');
        if (!token) {
          throw new Error('No access token found. Please log in.');
        }

        let url = `https://api.onestepmedi.com:8000/doctors/by-specialization/${encodeURIComponent(searchTerm)}`;
        if (area) {
          url = `https://api.onestepmedi.com:8000/doctors/by-specialization/area_spec/?specialization_name=${encodeURIComponent(searchTerm)}&area=${encodeURIComponent(area)}`;
        }

        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }
        const data = await response.json();
        const queryString = area ? `?area=${encodeURIComponent(area)}` : '';
        navigate(`/department/${encodeURIComponent(searchTerm)}${queryString}`, {
          state: { filteredDoctors: data, searchParams },
        });
        setDoctors(data);
        setLoading(false);
        setPincodeError(null);
      } catch (err) {
        setError(err.message);
        setDoctors([]);
        setLoading(false);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));

    // Validate pincode as the user types
    if (name === 'area') {
      if (value && (value.length !== 6 || isNaN(value))) {
        setPincodeError('Please enter a valid 6-digit pincode');
      } else {
        setPincodeError(null);
      }
    }
  };

  const handleViewAllDoctors = () => {
    navigate('/doctors');
  };

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const decodedSpecialty = specialtyName ? decodeURIComponent(specialtyName) : '';
  const filteredDoctors = doctors;

  // Get tips based on specialty
  const currentTips = specialtyTips[decodedSpecialty.toLowerCase()] || [
    {
      id: 1,
      title: 'General Health Tip',
      content: 'Maintain a balanced lifestyle with proper diet, exercise, and rest for overall wellbeing.',
      image: tip,
    },
  ];

  // Select banner image based on specialty
  const bannerImage = specialtyBanners[decodedSpecialty.toLowerCase()] || defaultBanner;

  const isSearchDisabled = !searchParams.searchTerm;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Banner */}
      <div className="w-full min-h-[40vh] mx-auto bg-b3d8e4-gradient flex flex-col md:flex-row items-center justify-between px-4">
        <div className="md:w-3/4 mb-6 md:mb-0 text-left md:text-center md:pl-32 md:pr-8">
          <h1 className="text-4xl font-bold text-custom-blue mb-4 [text-shadow:_2px_2px_4px_rgba(0,0,0,0.3)]">
            Need a {decodedSpecialty || 'Doctors'}? We’ve Got You.
          </h1>
          <h4 className="text-4xl font-bold text-custom-blue mb-4 [text-shadow:_2px_2px_4px_rgba(0,0,0,0.3)]">
            Your health needs more than a search.
          </h4>
          <p className="text-custom-blue font-bold text-lg mb-4">
            Book appointments with verified {decodedSpecialty || 'Doctors'} who understand your concerns.
          </p>
          <p className="text-custom-blue font-bold text-lg mb-4">
            One Step Medi connects you to top-rated doctors for personalized, hassle-free healthcare—online or in person.
          </p>
        </div>
        <div className="md:w-3/4 flex justify-center">
          <img src={bannerImage} alt={`${decodedSpecialty} Banner`} className="max-w-full h-auto max-h-[30vh] object-cover rounded-lg" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="w-full max-w-7xl mx-auto px-4 mb-8 mt-8">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <div className="relative w-full md:w-2/3 flex border border-gray-300 rounded-lg overflow-hidden">
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
                className="w-full pl-10 pr-4 py-2 rounded-l-lg border-0 focus:outline-none focus:ring-2 focus:ring-custom-blue text-gray-700"
                value={searchParams.area}
                onChange={handleInputChange}
              />
            </div>
            <select
              name="searchTerm"
              className="w-2/3 px-4 py-2 border-0 border-l border-gray-300 focus:outline-none focus:ring-2 focus:ring-custom-blue text-gray-700"
              value={searchParams.searchTerm}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select Specialization
              </option>
              {specialties.map((specialty, index) => (
                <option key={index} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className={`w-full md:w-auto px-6 py-2 rounded-lg text-white transition-colors ${isSearchDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-custom-blue hover:bg-blue-700'}`}
            disabled={isSearchDisabled}
          >
            Search
          </button>
        </form>
        {pincodeError && (
          <p className="text-red-600 text-sm mt-2">{pincodeError}</p>
        )}
      </div>

      {/* Doctor Profile Cards */}
      <div className="w-full max-w-7xl mx-auto px-4 mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Available Doctors</h2>
        {loading ? (
          <p className="text-gray-600">Loading doctors...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : filteredDoctors.length === 0 ? (
          <p className="text-gray-600">No doctors found for this specialty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.doctor_id}
                className="bg-white shadow-md rounded-lg border border-gray-200 p-4 flex items-center cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/doctor/${doctor.doctor_id}`)}
              >
                <div className="w-24 h-24 bg-gray-300 rounded-full overflow-hidden mr-4 flex-shrink-0">
                  {doctor.image ? (
                    <img
                      src={doctor.image}
                      alt={doctor.doctor_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                      No Image
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-bold text-gray-800">{doctor.doctor_name}</h2>
                    <span className="text-blue-500 text-sm font-semibold">✔</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    Specialization: <span className="font-medium">{doctor.specialization_name}</span>
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Qualification: <span className="font-medium">{doctor.degree || 'MD'}</span>
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Experience: <span className="font-medium">{doctor.experience_years} years</span>
                  </p>
                  <p className="text-sm text-green-600 mb-1 flex items-center">
                    <span className="mr-1">✔</span> Available
                  </p>
                  <p className="text-sm text-gray-600 mb-1 flex items-center">
                    <span className="mr-1">📍</span> {doctor.clinic_location || 'Not specified'}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="w-1/2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/doctor/${doctor.doctor_id}`);
                      }}
                    >
                      View Profile
                    </button>
                    <button
                      className="w-1/2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/appointment/${doctor.doctor_id}`);
                      }}
                    >
                      Consult Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video Container */}
      <div className="w-full max-w-7xl mx-auto px-4 mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Health tips</h2>
        <div className="w-full bg-gray-200 rounded-lg overflow-hidden">
          <div className="relative" style={{ paddingBottom: '40%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Health Education Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="w-full max-w-7xl mx-auto px-4 mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Health Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentTips.map((tip) => (
            <div key={tip.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={tip.image}
                alt={tip.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-600">{tip.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full max-w-7xl mx-auto px-4 mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white shadow-md rounded-lg">
              <button
                className="w-full text-left px-4 py-3 flex justify-between items-center"
                onClick={() => toggleFaq(faq.id)}
              >
                <h3 className="text-lg font-medium text-gray-800">{faq.question}</h3>
                <span className="text-gray-600">{openFaq === faq.id ? '-' : '+'}</span>
              </button>
              {openFaq === faq.id && (
                <div className="px-4 py-3 bg-gray-50">
                  <p className="text-sm text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Department;