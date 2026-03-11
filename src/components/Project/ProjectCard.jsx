import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project, index, activeIndex }) => {
    const [expanded, setExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // How many cards are stacked ON TOP of this one
    const diff = activeIndex - index;
    const isCovered = diff > 0;

    // Scale shrinks slightly per card stacked on top — like PhonePe
    const scale = isCovered ? Math.max(1 - diff * 0.04, 0.82) : 1;
    // Push up slightly when covered
    const y = isCovered ? -diff * 8 : 0;
    // Dim when covered
    const brightness = isCovered ? Math.max(1 - diff * 0.15, 0.4) : 1;
    // Slight blur when far back
    const blur = isCovered && diff > 1 ? `blur(${Math.min((diff - 1) * 1.5, 4)}px)` : 'blur(0px)';

    const shortDesc = project.description?.length > 160
        ? project.description.slice(0, 160) + '...'
        : project.description;

    return (
        <motion.div
            animate={{
                scale,
                y,
                filter: `brightness(${brightness}) ${blur}`,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 35, mass: 0.8 }}
            style={{
                width: '90%',
                maxWidth: '900px',
                margin: '0 auto',
                height: isMobile ? 'auto' : '480px',
                minHeight: isMobile ? '500px' : 'auto',
                borderRadius: '24px',
                background: '#ffffff',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                transformOrigin: 'top center',
                boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* LEFT — Text Content */}
            <div style={{
                flex: isMobile ? 'none' : '0 0 52%',
                width: isMobile ? '100%' : 'auto',
                padding: isMobile ? '30px' : '44px 40px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: '#ffffff',
            }}>
                <div>
                    {/* Year label */}
                    <p style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        color: '#7c3aed',
                        textTransform: 'uppercase',
                        marginBottom: '12px',
                        fontFamily: 'DM Sans, sans-serif',
                    }}>
                        {project.year} Project
                    </p>

                    {/* Title */}
                    <h2 style={{
                        fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                        fontWeight: 800,
                        color: '#0a0a0a',
                        lineHeight: 1.05,
                        marginBottom: '16px',
                        fontFamily: 'Syne, sans-serif',
                        letterSpacing: '-0.02em',
                    }}>
                        {project.name}
                    </h2>

                    {/* Description */}
                    <p style={{
                        fontSize: '15px',
                        lineHeight: 1.65,
                        color: '#4b5563',
                        fontFamily: 'DM Sans, sans-serif',
                        marginBottom: '8px',
                    }}>
                        {expanded ? project.description : shortDesc}
                    </p>

                    {project.description?.length > 160 && (
                        <button
                            onClick={() => setExpanded(!expanded)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#7c3aed',
                                fontSize: '13px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                padding: 0,
                                fontFamily: 'DM Sans, sans-serif',
                            }}
                        >
                            {expanded ? 'Show less ↑' : 'Read more ↓'}
                        </button>
                    )}
                </div>

                {/* Know More button */}
                <div style={{ marginTop: '24px' }}>
                    <button style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 24px',
                        borderRadius: '10px',
                        background: '#0a0a0a',
                        color: '#fff',
                        border: 'none',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontFamily: 'DM Sans, sans-serif',
                        transition: 'background 0.2s',
                    }}
                        onMouseEnter={e => e.currentTarget.style.background = '#7c3aed'}
                        onMouseLeave={e => e.currentTarget.style.background = '#0a0a0a'}
                    >
                        Know More →
                    </button>
                </div>
            </div>

            {/* RIGHT — Image */}
            <div style={{
                flex: isMobile ? 'none' : '0 0 48%',
                width: isMobile ? '100%' : 'auto',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: isMobile ? '0 0 24px 24px' : '0 24px 24px 0',
                height: isMobile ? '200px' : '100%',
                background: '#f0f0f0'
            }}>
                {typeof project.photo === 'string' ? (
                    <img
                        src={project.photo}
                        alt={project.name}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                        }}
                        onError={e => {
                            e.target.src = `https://placehold.co/600x500/1a1a2e/a855f7?text=${encodeURIComponent(project.name)}`;
                        }}
                    />
                ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f0f0" }}>
                        {project.photo}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default ProjectCard;