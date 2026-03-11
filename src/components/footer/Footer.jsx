import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black border-t border-white/10 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                {/* About */}
                <div>
                    <div className="flex items-center mb-4">
                        <img src="/abraxas.jpeg" alt="Abraxas Logo" className="h-10 w-10 sm:h-11 sm:w-11 rounded-full object-cover" />
                        <h2 style={{ fontFamily: "'Syne', sans-serif" }} className="text-white ml-3 text-xl sm:text-2xl font-bold tracking-widest">
                            ABRAXAS
                        </h2>
                    </div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-white/40 text-sm leading-relaxed font-light">
                        The engineering physics branch's departmental club — a vibrant community fuelled by passion, creativity, and technology.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="mt-2 sm:mt-0">
                    <h2 style={{ fontFamily: "'Syne', sans-serif" }} className="font-semibold text-sm mb-4 text-white uppercase tracking-widest">Quick Links</h2>
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            { label: 'Home', href: '/#' },
                            { label: 'About', href: '/#About' },
                            { label: 'Projects', href: '/#Projects' },
                            { label: 'Events', href: '/#Events' },
                            { label: 'Gallery', href: '/Gallery' },
                            { label: 'Timeline', href: '/#Timeline' },
                            { label: 'Team', href: '/Team' },
                            { label: 'Contact', href: '/#Contact' },
                        ].map((link) => (
                            <a key={link.label} href={link.href}
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                                className="text-white/30 hover:text-white text-sm transition-colors duration-200 py-1">
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Contact Info */}
                <div className="mt-2 sm:mt-0">
                    <h2 style={{ fontFamily: "'Syne', sans-serif" }} className="font-semibold text-sm mb-4 text-white uppercase tracking-widest">Location</h2>
                    <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-white/40 text-sm">
                        <strong className="block text-white/60 text-sm mb-1">Dept. of Physics and Photonics Science</strong>
                        <p>NIT Hamirpur — 177005, Hamirpur (H.P.)</p>
                        <div className="mt-4 w-full">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4711.614329452839!2d76.5232916401509!3d31.707890413851345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3904d414dbcbe5a9%3A0xc507ee79945d6bd6!2sPhysics%20Department!5e1!3m2!1sen!2sin!4v1720333486211!5m2!1sen!2sin"
                                className="w-full h-32 sm:h-40 border border-white/10 rounded-lg"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 sm:mt-10 pt-6 border-t border-white/5 text-center">
                <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-white/20 text-xs tracking-wider">
                    © {new Date().getFullYear()} ABRAXAS. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;