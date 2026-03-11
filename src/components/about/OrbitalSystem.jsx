import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const OrbitalSystem = () => {
    const [isPaused, setIsPaused] = useState(false);
    const [isMoonPaused, setIsMoonPaused] = useState(false);

    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        // Start playing when top of section crosses bottom of viewport
        // Finish playing slowly as it hits the upper 1/3 bracket, granting a larger overall scroll curve
        offset: ["start end", "start 10%"]
    });

    // Transforms based on scroll progress
    // Not using useSpring here to avoid the "pause" / "lingering" tail effect
    // We bind directly 1:1 to the user's scroll bar for immediate smooth snappiness
    const centerScale = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
    const ring1Scale = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
    const ring2Scale = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);

    const centerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
    const moonsOpacity = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);

    return (
        <section
            ref={sectionRef}
            className="flex justify-center items-center w-full"
            style={{
                minHeight: '100vh',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            {/* Orbital container — centered */}
            <div
                className="relative flex justify-center items-center bg-black"
                style={{ width: '450px', height: '450px' }}
            >
                {/* Center Logo with White Glow */}
                <motion.div
                    className="absolute flex justify-center items-center z-10 rounded-full overflow-hidden w-full h-full"
                    style={{
                        width: '120px',
                        height: '120px',
                        boxShadow: '0 0 15px rgba(255,255,255,0.6)',
                        scale: centerScale,
                        opacity: centerOpacity,
                        transformOrigin: 'center center',
                        willChange: 'transform, opacity'
                    }}
                >
                    <img
                        src="/abraxas.jpeg"
                        alt="Center Logo"
                        onError={(e) => e.target.style.display = 'none'}
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Inner Orbit Ring */}
                <motion.div
                    className="absolute rounded-full z-20 pointer-events-none w-full h-full"
                    style={{
                        width: '360px',
                        height: '360px',
                        scale: ring1Scale,
                        transformOrigin: 'center center'
                    }}
                >
                    <div
                        className="w-full h-full rounded-full"
                        style={{
                            border: '2px solid rgba(255,255,255,0.9)',
                            boxShadow: '0 0 8px rgba(255,255,255,0.4)',
                            animation: 'orbit 10s linear infinite',
                            animationPlayState: isPaused ? 'paused' : 'running'
                        }}
                    >
                        {/* Orbiting Badge — Abraxas Logo */}
                        <motion.div
                            className="absolute group flex justify-center items-center cursor-pointer pointer-events-auto"
                            style={{
                                top: '0%',
                                left: '50%',
                                marginTop: '-35px',
                                marginLeft: '-35px',
                                width: '70px',
                                height: '70px',
                                opacity: moonsOpacity
                            }}
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                        >
                            <div
                                className="w-full h-full relative"
                                style={{
                                    animation: 'orbit 10s linear infinite reverse',
                                    animationPlayState: isPaused ? 'paused' : 'running'
                                }}
                            >
                                <img
                                    src="/AbraxasLogo.png"
                                    alt="Abraxas Orbital Badge"
                                    onError={(e) => e.target.style.display = 'none'}
                                    className="w-full h-full rounded-full object-cover"
                                    style={{ filter: 'invert(1) brightness(2)' }}
                                />
                                {/* Tooltip */}
                                <div
                                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50"
                                    style={{
                                        fontSize: '11px',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        fontFamily: "'DM Sans', sans-serif"
                                    }}
                                >
                                    Abraxas
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Outer Moon Ring */}
                <motion.div
                    className="absolute rounded-full z-[8] pointer-events-none w-full h-full"
                    style={{
                        width: '520px',
                        height: '520px',
                        scale: ring2Scale,
                        transformOrigin: 'center center'
                    }}
                >
                    <div
                        className="w-full h-full rounded-full"
                        style={{
                            border: '1px solid rgba(255,255,255,0.3)',
                            animation: 'orbit 12s linear infinite reverse',
                            animationPlayState: isMoonPaused ? 'paused' : 'running',
                            willChange: 'transform'
                        }}
                    >
                        {/* Moon 1 — left side */}
                        <motion.div
                            className="absolute flex justify-center items-center cursor-pointer pointer-events-auto"
                            style={{
                                top: '50%',
                                left: '0%',
                                marginTop: '-15px',
                                marginLeft: '-15px',
                                width: '30px',
                                height: '30px',
                                opacity: moonsOpacity
                            }}
                            onMouseEnter={() => setIsMoonPaused(true)}
                            onMouseLeave={() => setIsMoonPaused(false)}
                        >
                            <div
                                className="w-full h-full relative"
                                style={{
                                    animation: 'orbit 12s linear infinite',
                                    animationPlayState: isMoonPaused ? 'paused' : 'running'
                                }}
                            >
                                <div style={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    background: 'radial-gradient(circle at 35% 35%, #ffffff, #cccccc)',
                                    boxShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.4)'
                                }} />
                            </div>
                        </motion.div>

                        {/* Moon 2 — right side */}
                        <motion.div
                            className="absolute flex justify-center items-center cursor-pointer pointer-events-auto"
                            style={{
                                top: '50%',
                                left: '100%',
                                marginTop: '-15px',
                                marginLeft: '-15px',
                                width: '30px',
                                height: '30px',
                                opacity: moonsOpacity
                            }}
                            onMouseEnter={() => setIsMoonPaused(true)}
                            onMouseLeave={() => setIsMoonPaused(false)}
                        >
                            <div
                                className="w-full h-full relative"
                                style={{
                                    animation: 'orbit 12s linear infinite',
                                    animationPlayState: isMoonPaused ? 'paused' : 'running'
                                }}
                            >
                                <div style={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    background: 'radial-gradient(circle at 35% 35%, #ffffff, #cccccc)',
                                    boxShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.4)'
                                }} />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                <style>{`
                    @keyframes orbit {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        </section>
    );
};

export default OrbitalSystem;