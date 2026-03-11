import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

const TeamCard = ({ photo, name, social }) => {
    return (
        <motion.div
            className="group relative rounded-xl overflow-hidden flex-shrink-0"
            style={{ width: '320px', height: '400px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Background image */}
            <div className="absolute inset-0 w-full h-full">
                <img
                    src={photo || 'https://placehold.co/200x260/111/333?text=No+Photo'}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-end p-3">
                <motion.h2
                    style={{ fontFamily: "'Syne', sans-serif" }}
                    className="text-sm font-bold text-white mb-2 text-center leading-tight"
                >
                    {name}
                </motion.h2>

                <div className="flex justify-center space-x-4">
                    {[
                        { icon: FaLinkedin, link: social.linkedin, color: "hover:text-blue-500" },
                        { icon: FaGithub, link: social.github, color: "hover:text-purple-400" },
                        { icon: FaInstagram, link: social.instagram, color: "hover:text-pink-500" }
                    ].map((item, index) => (
                        item.link ? (
                            <motion.a
                                key={index}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-white/70 transition-colors duration-300 ${item.color}`}
                                whileHover={{ scale: 1.2, rotate: 360, transition: { duration: 0.3 } }}
                            >
                                <item.icon size={16} />
                            </motion.a>
                        ) : null
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default TeamCard;