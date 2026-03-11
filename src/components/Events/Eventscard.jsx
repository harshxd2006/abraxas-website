import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Events.css';
import { ArrowLeft } from 'lucide-react';

const EventsCard = () => {
  const [activeTab, setActiveTab] = useState('events');

  const eventCards = [
    {
      id: 'event1',
      title: "Freshmen Interviews",
      image: "https://res.cloudinary.com/djqmxt5rg/image/upload/v1773047800/Screenshot_2026-03-09_144245_m05czs.png",
      description: "Freshmen interview date is 17-18 Jan"
    }
  ];

  const Card = ({ card }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
      <motion.div
        className="relative md:w-[360px] md:h-[470px] w-[300px] h-[400px] perspective-1000 mx-auto mb-12 md:mb-0"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-full h-full relative preserve-3d"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", damping: 20 }}
        >
          {/* Front */}
          <div
            className="absolute w-full h-full opacity-70 backface-hidden rounded-2xl overflow-hidden border border-white/10 hover:opacity-100 transition-all duration-300 cursor-pointer"
            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.85))' }}
          >
            <img src={card.image} alt={card.title} className="absolute w-full h-full object-contain" />
            <div className="absolute bottom-0 w-full p-5 text-white">
              <h2 style={{ fontFamily: "'Syne', sans-serif" }} className="text-xl font-bold mb-2 tracking-tight">{card.title}</h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-sm mb-3 text-white/60 line-clamp-2">{card.description}</p>
              <button
                onClick={(e) => { e.stopPropagation(); setIsFlipped(true); }}
                className="px-4 py-2 bg-white/10 border border-white/20 hover:bg-white/20 rounded-lg text-sm font-medium transition-all duration-200 text-white"
              >
                Read More
              </button>
            </div>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-black/95 border border-white/10 rounded-2xl p-5">
            <div className="text-white h-full flex flex-col">
              <h2 style={{ fontFamily: "'Syne', sans-serif" }} className="text-xl font-bold mb-3 tracking-tight">{card.title}</h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-sm leading-relaxed flex-grow overflow-y-auto text-white/60">{card.description}</p>
              <button
                onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
                className="mt-3 px-4 py-2 bg-white/10 border border-white/20 hover:bg-white/20 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 w-fit text-white"
              >
                <ArrowLeft size={16} />
                Back
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="bg-black relative py-12 px-6 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveTab('events')}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            className={`px-8 py-3 rounded-xl text-sm font-medium transition-all duration-300 border
              ${activeTab === 'events'
                ? 'bg-white/10 text-white border-white/30'
                : 'bg-transparent text-white/40 border-white/10 hover:bg-white/5 hover:text-white/70'}`}
          >
            2026 Events
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8"
          >
            {eventCards.map(card => (
              <Card key={card.id} card={card} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EventsCard;