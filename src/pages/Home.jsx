import React, { useState } from 'react';
import Headers from '../components/Headers';
import SpecialityMenu from '../components/SpecialityMenu';
import TopDoctors from '../components/TopDoctors';
import Banner from '../components/Banner';
import AppointmentModesCard from '../components/AppointmentModesCard';
import PharmacyLabLanding from '../components/PharmacyLabLanding';
import Chatbot from './Chatbot';
import botIcon from '../assets/bot1.png';

const Home = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const toggleChatbot = () => setIsChatbotOpen((v) => !v);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Headers />

      <main className="flex-1 w-full mx-auto">
        <SpecialityMenu />
        {/* Keep/restore these sections as needed */}
        {/* <Banner /> */}
        {/* <TopDoctors /> */}
        {/* <AppointmentModesCard /> */}
        {/* <PharmacyLabLanding /> */}
      </main>

      {/* Floating Chat Button (hides when panel open) */}
      <button
        onClick={toggleChatbot}
        aria-label="Open OneStep Medi Chatbot"
        aria-expanded={isChatbotOpen}
        className={[
          "fixed z-40 rounded-full shadow-lg transition-transform duration-200",
          "bg-blue-600 hover:bg-blue-700 text-white",
          "p-3 sm:p-3 md:p-4",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2",
          isChatbotOpen
            ? "scale-90 opacity-0 pointer-events-none"
            : "opacity-100",
        ].join(" ")}
        style={{
          bottom: "max(env(safe-area-inset-bottom), 1rem)",
          right: "max(env(safe-area-inset-right), 1rem)",
        }}
      >
        <span className="sr-only">Open chatbot</span>
        <img
          src={botIcon}
          alt="Chatbot Icon"
          className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 pointer-events-none select-none"
          draggable={false}
        />
      </button>

      {/* Chatbot Panel */}
      <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </div>
  );
};

export default Home;
