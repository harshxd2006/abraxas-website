import React, { useState, useEffect } from 'react';
import { useAnimation, motion } from 'framer-motion';
import { InView } from 'react-intersection-observer';
import TeamCard from './TeamCard';
import teamData from './teamData.json';
import Starfield from '../star/Starfield';

const Team = () => {
    const controls = useAnimation();
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

    useEffect(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            document.documentElement.style.scrollBehavior = '';
        };
    }, []);

    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const renderTeamSection = (year) => {
        if (!teamData[year]) return null;
        return (
            <section id={year} className="w-full max-w-7xl mx-auto mb-6 scroll-mt-20">
                <h2 style={{ fontFamily: "'Syne', sans-serif" }} className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-2 text-center px-4 tracking-wide">
                    {year.replace(/-/g, ' ')}
                </h2>
                <div className="w-8 h-px bg-white/20 mx-auto mb-3"></div>
                <InView threshold={0.1} onChange={(inView) => inView && controls.start("visible")}>
                    <div className="relative px-4 sm:px-6">
                        <div className="overflow-x-auto hide-scrollbar">
                            <motion.div
                                initial="hidden"
                                animate={controls}
                                variants={variants}
                                style={{
                                    display: 'flex',
                                    gap: '12px',
                                    width: 'fit-content',
                                    minWidth: '100%',
                                    justifyContent: windowWidth < 1024 ? 'flex-start' : 'center',
                                    padding: '0.5rem',
                                }}
                            >
                                {teamData[year].map((member, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex-shrink-0 hover:scale-105 transition-transform duration-300"
                                        variants={variants}
                                    >
                                        <TeamCard photo={member.photo} name={member.name} social={member.social} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </InView>
            </section>
        );
    };

    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; overflow-x: auto; -webkit-overflow-scrolling: touch; }
            .hide-scrollbar::-webkit-scrollbar { display: none; }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    const NavButtons = () => (
        <div className="fixed bottom-3 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-4xl px-4 lg:hidden">
            <div className="bg-black/90 backdrop-blur-sm border border-white/10 rounded-xl p-2 overflow-x-auto hide-scrollbar touch-pan-x">
                <div className="flex flex-row space-x-1 w-max">
                    {["Club-Coordinators", "Our Alumni", "Final-Year", "Coordinators", "Executives", "Volunteers"].map((year) => (
                        <button
                            key={year}
                            onClick={() => document.getElementById(year)?.scrollIntoView({ behavior: 'smooth' })}
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                            className="text-white/40 hover:text-white px-3 py-1.5 text-xs transition-colors duration-200 hover:bg-white/5 rounded-lg whitespace-nowrap"
                        >
                            {year.replace(/-/g, ' ')}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <main className="relative w-full bg-black min-h-screen overflow-x-hidden">
            <div className="fixed inset-0 z-0">
                <Starfield
                    starCount={windowWidth < 768 ? 3000 : 6000}
                    starColor={[255, 255, 255]}
                    speedFactor={0.15}
                    backgroundColor="black"
                />
            </div>
            <NavButtons />
            <div className="relative z-10 pt-10 pb-24">
                <h1 style={{ fontFamily: "'Syne', sans-serif" }} className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-2 px-4 tracking-tight">
                    Our Team
                </h1>
                <div className="w-12 h-px bg-white/20 mx-auto mb-5"></div>
                <div className="space-y-4 mx-4">
                    {renderTeamSection('Club-Coordinators')}
                    {renderTeamSection('Our Alumni')}
                    {renderTeamSection('Final-Year')}
                    {renderTeamSection('Coordinators')}
                    {renderTeamSection('Executives')}
                    {renderTeamSection('Volunteers')}
                </div>
            </div>
        </main>
    );
};

export default Team;