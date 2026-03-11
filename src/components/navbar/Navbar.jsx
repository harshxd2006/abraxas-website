import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [shouldShow, setShouldShow] = useState(false);
    const [activeSection, setActiveSection] = useState('Home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const lastScrollTop = useRef(0);
    const location = useLocation();

    // Show navbar after intro animation finishes
    useEffect(() => {
        const timer = setTimeout(() => setShouldShow(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    // Hide on scroll down, show on scroll up
    // Using a ref for lastScrollTop so handler never gets stale closure value
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Always show at top
            if (scrollTop <= 10) {
                setIsVisible(true);
                lastScrollTop.current = 0;
                return;
            }

            if (scrollTop > lastScrollTop.current + 5) {
                setIsVisible(false); // scrolling down
            } else if (scrollTop < lastScrollTop.current - 5) {
                setIsVisible(true); // scrolling up
            }

            lastScrollTop.current = scrollTop;

            // Detect active section
            const sections = document.querySelectorAll('section[id]');
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 80 && rect.bottom >= 80) {
                    setActiveSection(section.id);
                }
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []); // empty deps — ref keeps value fresh

    // Set active from route
    useEffect(() => {
        const map = { '/': 'Home', '/Team': 'Team', '/Gallery': 'Gallery' };
        if (map[location.pathname]) setActiveSection(map[location.pathname]);
    }, [location.pathname]);

    const navigationItems = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/#About' },
        { name: 'Projects', path: '/#Projects' },
        { name: 'Events', path: '/#Events' },
        { name: 'Gallery', path: '/Gallery' },
        { name: 'Timeline', path: '/#Timeline' },
        { name: 'Team', path: '/Team' },
        { name: 'Contact', path: '/#Contact' },
    ];

    if (!shouldShow) return null;

    return (
        <motion.div
            className="fixed top-0 z-50 w-full flex justify-center items-start px-2 pointer-events-none"
            initial={{ y: -80, opacity: 0 }}
            animate={{
                y: isVisible ? 0 : -80,
                opacity: isVisible ? 1 : 0,
            }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        >
            <nav className="pointer-events-auto w-full max-w-[95%] sm:max-w-[90%] lg:max-w-[85%] mt-3
                rounded-2xl backdrop-blur-md bg-black/70 border border-white/10 shadow-lg">
                <div className="px-3 lg:px-5 py-2.5 sm:py-3">
                    <div className="flex items-center justify-between">

                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
                            <img src="/AbraxasLogo.png" className="h-7 sm:h-8 lg:h-9 rounded-full" alt="Logo" />
                            <span
                                style={{ fontFamily: "'Syne', sans-serif" }}
                                className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-widest"
                            >
                                ABRAXAS
                            </span>
                        </Link>

                        {/* Desktop nav */}
                        <ul className="hidden lg:flex items-center gap-1">
                            {navigationItems.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        to={item.path}
                                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                                        className={`block px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                                            ${activeSection === item.name
                                                ? 'bg-white/10 text-white border border-white/20'
                                                : 'text-white/50 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setIsMenuOpen(prev => !prev)}
                            className="lg:hidden p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Mobile menu */}
                    {isMenuOpen && (
                        <ul className="lg:hidden flex flex-col gap-1 mt-3 pb-1">
                            {navigationItems.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        to={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                                        className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                                            ${activeSection === item.name
                                                ? 'bg-white/10 text-white border border-white/20'
                                                : 'text-white/50 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </nav>
        </motion.div>
    );
};

export default Navbar;