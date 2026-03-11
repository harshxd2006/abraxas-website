import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import projectsData from './Projectslist';

const Projects = () => {
    const [selectedYear, setSelectedYear] = useState('all');
    const [activeIndex, setActiveIndex] = useState(0);

    const groupedData = projectsData.reduce((acc, project) => {
        if (!acc[project.year]) acc[project.year] = [];
        acc[project.year].push(project);
        return acc;
    }, {});

    const getDisplayedProjects = () => {
        if (selectedYear === 'all') {
            return Object.entries(groupedData)
                .sort(([a], [b]) => b.localeCompare(a))
                .flatMap(([year, projects]) => projects.map(p => ({ ...p, year })));
        }
        return (groupedData[selectedYear] || []).map(p => ({ ...p, year: selectedYear }));
    };

    const filteredProjects = getDisplayedProjects();

    useEffect(() => {
        setActiveIndex(0);
    }, [selectedYear]);

    useEffect(() => {
        // STICKY_TOP = navbar height (56px) + filter bar height (~50px) = 106px
        const STICKY_TOP = 106;

        const onScroll = () => {
            const cards = document.querySelectorAll('.project-sticky-card');
            let current = 0;
            cards.forEach((card, i) => {
                const rect = card.getBoundingClientRect();
                if (rect.top <= STICKY_TOP + 1) {
                    current = i;
                }
            });
            setActiveIndex(current);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        // Run once on mount
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, [filteredProjects.length]);

    return (
        <div style={{ background: '#000', width: '100%', paddingTop: '60px' }}>

            {/* Section Header */}
            <div style={{ textAlign: 'center', marginBottom: '24px', padding: '0 20px' }}>
                <h1 style={{
                    fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                    fontWeight: 800,
                    color: 'white',
                    margin: 0,
                    fontFamily: 'Syne, sans-serif',
                }}>
                    Our{' '}
                    <span style={{
                        background: 'linear-gradient(to right, #a855f7, #3b82f6)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>
                        Projects
                    </span>
                </h1>
                <p style={{ color: '#6b7280', fontSize: '1rem', marginTop: '10px', fontFamily: 'DM Sans, sans-serif' }}>
                    Innovations built by Team Abraxas
                </p>
            </div>

            {/* Year Filter — sticky */}
            <div style={{
                position: 'sticky',
                top: 0,
                zIndex: 100,
                background: '#000',
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                flexWrap: 'wrap',
                padding: '12px 20px',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>
                {['all', '2026', '2025', '2024', '2023'].map(year => (
                    <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        style={{
                            padding: '8px 22px',
                            borderRadius: '999px',
                            border: selectedYear === year ? 'none' : '1px solid rgba(255,255,255,0.15)',
                            cursor: 'pointer',
                            fontWeight: 600,
                            fontSize: '13px',
                            fontFamily: 'DM Sans, sans-serif',
                            transition: 'all 0.25s ease',
                            background: selectedYear === year
                                ? 'linear-gradient(to right, #7c3aed, #2563eb)'
                                : 'transparent',
                            color: 'white',
                        }}
                    >
                        {year === 'all' ? 'All Years' : year}
                    </button>
                ))}
            </div>

            {/* Stacked Cards */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedYear}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ paddingBottom: '50vh' }}
                >
                    {filteredProjects.map((project, index) => (
                        <div
                            key={`${project.name}-${index}`}
                            className="project-sticky-card"
                            style={{
                                position: 'sticky',
                                top: '106px',
                                zIndex: index + 1,
                                marginBottom: index < filteredProjects.length - 1 ? '28vh' : '0',
                                height: 'auto',
                            }}
                        >
                            <ProjectCard
                                project={project}
                                index={index}
                                activeIndex={activeIndex}
                            />
                        </div>
                    ))}
                </motion.div>
            </AnimatePresence>

        </div>
    );
};

export default Projects;