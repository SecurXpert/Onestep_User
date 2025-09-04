import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

/* ---------- Bot options (UNCHANGED CONTENT) ---------- */
const botOptions = {
  mainMenu: {
    message: "",
    options: [
      { id: "consultation", label: "Book a Consultation" },
      { id: "appointments", label: "View My Appointments" },
      { id: "records", label: "Access My Medical Records" },
      { id: "doctors", label: "Explore Doctors" },
      { id: "tips", label: "Health Tips" },
      { id: "support", label: "Help & Support" },
    ],
  },
  consultation: {
    message: "🔹 Please choose your consultation type:",
    options: [
      { id: "emergency", label: "Emergency Appointment" },
      { id: "virtual", label: "Virtual Appointment" },
      { id: "clinic", label: "In-Clinic Appointment" },
      { id: "home", label: "Home Visit" },
    ],
  },
  emergency: {
    message:
      "⚠️ Is this an emergency? Please confirm to proceed with emergency appointment booking.",
    options: [{ id: "confirmEmergency", label: "Confirm Emergency" }],
  },
  confirmEmergency: {
    message: "🚨 Please start the emergency booking process.",
    options: [{ id: "startEmergency", label: "Start Emergency Booking" }],
  },
  virtual: {
    message: "🔹 Please select a department for your virtual appointment:",
    options: [
      { id: "virtualDentist", label: "Dentist" },
      { id: "virtualGynecologist", label: "Gynecologist" },
      { id: "virtualPediatrician", label: "Pediatrician" },
      { id: "virtualEndocrinologist", label: "Endocrinologist" },
      { id: "virtualOrthopedic", label: "Orthopedic" },
      { id: "virtualCardiologist", label: "Cardiologist" },
      { id: "virtualCosmetologist", label: "Cosmetologist" },
      { id: "virtualNeurologist", label: "Neurologist" },
      { id: "virtualDermatologist", label: "Dermatologist" },
      { id: "virtualDietitian", label: "Dietitian/Nutritionist" },
      { id: "virtualGeneralPhysician", label: "General Physician" },
      { id: "virtualPsychiatrist", label: "Psychiatrist" },
    ],
  },
  clinic: {
    message: "🔹 Please select a department for your in-clinic appointment:",
    options: [
      { id: "clinicDentist", label: "Dentist" },
      { id: "clinicDermatologist", label: "Dermatologist" },
      { id: "clinicENT", label: "ENT Specialist" },
      { id: "clinicOphthalmologist", label: "Ophthalmologist" },
    ],
  },
  home: {
    message: "🔹 Please select a service for your home visit:",
    options: [
      { id: "homePhysiotherapist", label: "Physiotherapist" },
      { id: "homeNutritionist", label: "Nutritionist / Dietitian" },
      { id: "homeHomeopathy", label: "Homeopathy" },
      { id: "homeNurse", label: "Nurse / First Aid" },
    ],
  },
  appointments: {
    message: "🔹 Would you like to cancel or reschedule your appointment?",
    options: [{ id: "viewAppointments", label: "Go to My Appointments" }],
  },
  records: {
    message:
      "🔹 You can view and manage all your medical records here (including prescriptions, lab reports, and history).",
    options: [{ id: "viewRecords", label: "Go to Medical Records" }],
  },
  doctors: {
    message:
      "🔹 Please select the department you need help with (e.g., Cardiology, Dermatology, etc.).",
    options: [{ id: "chooseDept", label: "Choose Department" }],
  },
  tips: {
    message: "🔹 Which department do you want health tips for?",
    options: [
      { id: "cardioTips", label: "Cardiology" },
      { id: "gynoTips", label: "Gynecology" },
      { id: "neuroTips", label: "Neurology" },
      { id: "pediaTips", label: "Pediatrics" },
    ],
  },
  support: {
    message:
      "🔹 Need assistance? Our toll-free support number is 1800-123-456. Would you like to contact support?",
    options: [
      { id: "callSupport", label: "Call Support" },
      { id: "visitContact", label: "Visit Contact Page" },
    ],
  },
  callSupport: {
    message: "📞 Please contact our support team at: 7993256679",
    options: [{ id: "mainMenu", label: "Back to Main Menu" }],
  },
};

/* ---------- Safe viewport height (rotation-safe) ---------- */
const useSafeViewportHeight = () => {
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty("--app-svh", `${window.innerHeight}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);
    window.addEventListener("orientationchange", setVh);
    return () => {
      window.removeEventListener("resize", setVh);
      window.removeEventListener("orientationchange", setVh);
    };
  }, []);
};

const Chatbot = ({ isOpen, onClose }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState("mainMenu");
  const scrollRef = useRef(null);

  useSafeViewportHeight();

  useEffect(() => {
    if (isOpen) {
      const token = sessionStorage.getItem("access_token");
      const userProfile = JSON.parse(sessionStorage.getItem("userProfile") || "{}");
      let greeting = "Hey! 👋 Please register for more assistance.";
      if (token && (user?.name || userProfile?.name)) {
        greeting = `Hi ${user?.name || userProfile.name}! 👋 Welcome to One Step Medi – your all-in-one healthcare partner. How may I assist you today?`;
      }
      setMessages([{ sender: "bot", text: greeting }]);
      setCurrentStep("mainMenu");
    }
  }, [isOpen, user]);

  useEffect(() => {
    // Auto-scroll to bottom on new messages
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleOptionClick = (option) => {
    setMessages((prev) => [...prev, { sender: "user", text: option.label }]);

    const token = sessionStorage.getItem("access_token");
    if (!token) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { sender: "bot", text: "Please register for more details" }]);
      }, 500);
      return;
    }

    switch (option.id) {
      case "startEmergency":
        navigate("/emergency"); onClose(); return;
      case "viewAppointments":
        navigate("/myappointment"); onClose(); return;
      case "viewRecords":
        navigate("/user-dash"); onClose(); return;
      case "chooseDept":
        navigate("/doctors"); onClose(); return;
      case "visitContact":
        navigate("/contact"); onClose(); return;
      case "callSupport":
        setTimeout(() => {
          setMessages((prev) => [...prev, { sender: "bot", text: botOptions.callSupport.message }]);
          setCurrentStep("callSupport");
        }, 500);
        return;

      // Virtual + Clinic routes
      case "virtualDentist":
      case "clinicDentist":
        navigate("/department/Dentist"); onClose(); return;
      case "virtualGynecologist":
        navigate("/department/Gynecologist"); onClose(); return;
      case "virtualPediatrician":
        navigate("/department/Pediatrician"); onClose(); return;
      case "virtualEndocrinologist":
        navigate("/department/Endocrinologist"); onClose(); return;
      case "virtualOrthopedic":
        navigate("/department/Orthopedic"); onClose(); return;
      case "virtualCardiologist":
        navigate("/department/Cardiologist"); onClose(); return;
      case "virtualCosmetologist":
        navigate("/department/Cosmetologist"); onClose(); return;
      case "virtualNeurologist":
        navigate("/department/Neurologist"); onClose(); return;
      case "virtualDermatologist":
      case "clinicDermatologist":
        navigate("/department/Dermatologist"); onClose(); return;
      case "virtualDietitian":
        navigate("/department/Dietitian"); onClose(); return;
      case "virtualGeneralPhysician":
        navigate("/department/GeneralPhysician"); onClose(); return;
      case "virtualPsychiatrist":
        navigate("/department/Psychiatrist"); onClose(); return;

      // Clinic-only
      case "clinicENT":
        navigate("/department/ENT"); onClose(); return;
      case "clinicOphthalmologist":
        navigate("/department/Ophthalmologist"); onClose(); return;

      // Home visit
      case "homePhysiotherapist":
        navigate("/department/Physiotherapist"); onClose(); return;
      case "homeNutritionist":
        navigate("/department/Nutritionist"); onClose(); return;
      case "homeHomeopathy":
        navigate("/department/Homeopathy"); onClose(); return;
      case "homeNurse":
        navigate("/department/Nurse"); onClose(); return;

      // Tips
      case "cardioTips":
        navigate("/department/Cardiologist"); onClose(); return;
      case "gynoTips":
        navigate("/department/Gynecologist"); onClose(); return;
      case "neuroTips":
        navigate("/department/Neurologist"); onClose(); return;
      case "pediaTips":
        navigate("/department/Pediatrician"); onClose(); return;

      default:
        if (botOptions[option.id]) {
          setTimeout(() => {
            setMessages((prev) => [...prev, { sender: "bot", text: botOptions[option.id].message }]);
            setCurrentStep(option.id);
          }, 500);
        }
    }
  };

  if (!isOpen) return null;

  // Panel sizing: never exceed safe viewport, respect notches, work in rotation
  const panelStyles = {
    right: "max(env(safe-area-inset-right), 1rem)",
    bottom: "max(env(safe-area-inset-bottom), 1rem)",
    width: "min(92vw, 420px)",
    maxHeight: "min(calc(var(--app-svh) - env(safe-area-inset-bottom) - 1.5rem), 86vh)",
  };

  return (
    <div
      role="dialog"
      aria-label="OneStep Medi Chatbot"
      className="fixed z-50 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
      style={panelStyles}
    >
      <div className="flex flex-col h-full max-h-[inherit]">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 border-b bg-white/90 backdrop-blur">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-blue-600">
            OneStep Medi Chatbot
          </h2>
          <button
            onClick={onClose}
            className="text-base sm:text-lg md:text-xl text-gray-500 hover:text-gray-700 p-1"
            aria-label="Close chatbot"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="min-h-0 flex-1 overflow-y-auto px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 border-b overscroll-contain touch-pan-y"
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 sm:mb-3 p-2 sm:p-3 rounded-lg max-w-[90%] break-words ${
                msg.sender === "bot"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-green-100 text-green-800 ml-auto"
              } text-xs sm:text-sm md:text-base`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Options: 1-col on narrow, 2-col mid, 3-col wide (matrix) */}
        <div className="p-2 sm:p-3 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
            {botOptions[currentStep]?.options?.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleOptionClick(opt)}
                className="w-full text-left p-2 sm:p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xs sm:text-sm md:text-base"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
