import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useScroll, useMotionValueEvent } from 'framer-motion';
import { Instagram, Linkedin } from 'lucide-react';
import Atom from '../hero/Atom';

const staggerChildren = {
    animate: {
        transition: { delayChildren: 0.8, staggerChildren: 1.2 }
    }
};

const atomAnimation = {
    initial: { y: 100, scale: 0.8, opacity: 0 },
    animate: {
        y: 0, scale: 1, opacity: 1,
        transition: { duration: 2.8, ease: [0.6, 0.05, 0.01, 0.9] }
    }
};

const teamNameAnimation = {
    initial: { y: 100, opacity: 0 },
    animate: {
        y: 0, opacity: 1,
        transition: { duration: 2.8, ease: [0.6, 0.05, 0.01, 0.9], delay: 1.6 }
    }
};

const contentAnimation = {
    initial: { y: 100, opacity: 0 },
    animate: {
        y: 0, opacity: 1,
        transition: { duration: 2.8, ease: [0.6, 0.05, 0.01, 0.9], delay: 2.8 }
    }
};

const AnimatedWord = ({ children, isLit }) => {
    return (
        <motion.span
            animate={{ opacity: isLit ? 1 : 0.15 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ color: "rgba(255, 255, 255, 1)" }}
            className="mr-[0.3em] inline-block"
        >
            {children}
        </motion.span>
    );
};

const quoteText = "the story of abraxas begins with curiosity. we believe individuals who dare to question the universe deserve better: better ideas, better experiments, better futures. this is the standard we hold ourselves to.";
const words = quoteText.split(" ");

// Generated once at module level — not on every render
function generateStars(count) {
    let stars = '';
    for (let i = 0; i < count; i++) {
        const x = Math.floor(Math.random() * 2000);
        const y = Math.floor(Math.random() * 2000);
        stars += `${x}px ${y}px #FFF${i === count - 1 ? '' : ','} `;
    }
    return stars;
}

const STARS_700 = generateStars(200);
const STARS_500 = generateStars(150);
const STARS_300 = generateStars(100);

const Hero = () => {
    const controls = useAnimation();
    const quoteContainerRef = useRef(null);
    const [litWords, setLitWords] = useState([]);

    const { scrollYProgress } = useScroll({
        target: quoteContainerRef,
        offset: ["start start", "end end"]
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const newlyLit = [];
        words.forEach((_, i) => {
            const threshold = i / words.length;
            if (latest >= threshold && !litWords.includes(i)) {
                newlyLit.push(i);
            }
        });
        if (newlyLit.length > 0) {
            setLitWords((prev) => [...new Set([...prev, ...newlyLit])]);
        }
    });

    useEffect(() => {
        controls.start('animate');
    }, [controls]);

    return (
        <React.Fragment>

            <div className="relative h-screen bg-black text-white overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="stars"></div>
                </div>

                <motion.div
                    variants={staggerChildren}
                    initial="initial"
                    animate="animate"
                    className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 -mt-16"
                >
                    <motion.div
                        variants={atomAnimation}
                        className="max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] mb-3 sm:mb-4 md:mb-6"
                    >
                        <Atom />
                    </motion.div>

                    <motion.div
                        variants={teamNameAnimation}
                        className="mb-3 sm:mb-4 md:mb-6 text-center w-full"
                    >
                        <div className="inline-block">
                            <h2 style={{ fontFamily: "'Syne', sans-serif" }} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-widest text-white">
                                TEAM ABRAXAS
                            </h2>
                            <div className="h-px bg-white/30 mt-3"></div>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={contentAnimation}
                        className="text-center w-full max-w-xs sm:max-w-sm md:max-w-xl lg:max-w-2xl px-4"
                    >
                        <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="mb-6 sm:mb-8 text-white/60 text-sm sm:text-base tracking-wide leading-relaxed font-light italic">
                            "Life, much like physics, full of forces acting on you. It's not about avoiding them, but learning how to balance and use them to propel yourself forward."
                        </p>

                        <div className="flex justify-center space-x-6 sm:space-x-8 md:space-x-10">
                            <motion.a
                                href="https://www.instagram.com/team_abraxas"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, y: -5 }}
                                whileTap={{ scale: 0.9 }}
                                className="text-white/60 hover:text-white transition-colors duration-300"
                            >
                                <Instagram className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                            </motion.a>
                            <motion.a
                                href="https://www.linkedin.com/company/abraxas-nith/"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, y: -5 }}
                                whileTap={{ scale: 0.9 }}
                                className="text-white/60 hover:text-white transition-colors duration-300"
                            >
                                <Linkedin className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                            </motion.a>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            <div ref={quoteContainerRef} className="relative z-[5] bg-black h-[120vh] w-full">
                <div className="sticky top-0 h-[100vh] w-full flex items-center justify-start px-[5vw]">
                    <div className="flex flex-col items-start w-full">
                        <div
                            className="text-white uppercase font-sans font-semibold mb-6"
                            style={{ fontSize: "0.75rem", letterSpacing: "0.3em" }}
                        >
                            NOT EVERYONE QUESTIONS WHY.
                        </div>
                        <div
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                                lineHeight: 1.4,
                                maxWidth: "80vw"
                            }}
                            className="text-left lowercase text-white"
                        >
                            {words.map((word, i) => (
                                <AnimatedWord key={i} isLit={litWords.includes(i)}>
                                    {word}
                                </AnimatedWord>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes animStar {
                    from { transform: translateY(0); }
                    to { transform: translateY(-2000px); }
                }
                .stars {
                    width: 1px;
                    height: 1px;
                    background: transparent;
                    box-shadow: ${STARS_700};
                    animation: animStar 50s linear infinite;
                }
                @media (max-width: 768px) {
                    .stars { box-shadow: ${STARS_500}; }
                }
                @media (max-width: 640px) {
                    .stars { box-shadow: ${STARS_300}; }
                }
            `}</style>
        </React.Fragment>
    );
};

export default Hero;