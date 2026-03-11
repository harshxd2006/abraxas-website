import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaLinkedin as LinkedinIcon, FaInstagram as InstagramIcon } from 'react-icons/fa';
import teamData from './teamData.json';
import Starfield from '../star/Starfield';

const categories = ['Club Coordinators', 'Alumni', 'Final Year', 'Third Year', 'Second Year', 'First Year'];

const categoryConfig = {
    'Club Coordinators': '#a855f7',
    'Alumni': 'rgba(255, 200, 100, 0.9)',
    'Final Year': '#3b82f6',
    'Third Year': '#10b981',
    'Second Year': '#f59e0b',
    'First Year': '#ef4444',
};

const getCategoryName = (key) => {
    switch (key) {
        case 'Club-Coordinators': return 'Club Coordinators';
        case 'Our Alumni': return 'Alumni';
        case 'Final-Year': return 'Final Year';
        case 'Coordinators': return 'Third Year';
        case 'Executives': return 'Second Year';
        case 'Volunteers': return 'First Year';
        default: return null;
    }
};

const allMembers = [];
Object.keys(teamData).forEach(key => {
    const cat = getCategoryName(key);
    if (cat) {
        teamData[key].forEach(m => {
            allMembers.push({
                ...m,
                category: cat,
                position: m.position || m.roleOrName || '',
                linkedin: m.social?.linkedin || null,
                instagram: m.social?.instagram || null,
                badge: cat === 'Alumni' ? 'Alumni' : (m.badge || null),
            });
        });
    }
});

const grouped = categories
    .map(cat => ({
        label: cat,
        accentColor: categoryConfig[cat],
        members: allMembers.filter(m => m.category === cat),
    }))
    .filter(g => g.members.length > 0);

const MemberCard = ({ member, accentColor, cardIndex, trackRef, totalMembers }) => {
    const cardRef = useRef(null);
    const [angle, setAngle] = useState(0);
    const [hovered, setHovered] = useState(false);

    const updateAngle = useCallback(() => {
        const track = trackRef.current;
        const card = cardRef.current;
        if (!track || !card || hovered) return;

        // Disable bay window tilt for small groups (≤ 3 members)
        if (totalMembers <= 3) {
            setAngle(0);
            return;
        }

        const trackRect = track.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();

        const trackCx = trackRect.left + trackRect.width / 2;
        const cardCx = cardRect.left + cardRect.width / 2;
        const dist = (cardCx - trackCx) / (trackRect.width / 2);

        const tilt = -dist * 28;
        setAngle(tilt);
    }, [hovered, trackRef, totalMembers]);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        updateAngle();
        track.addEventListener('scroll', updateAngle, { passive: true });
        window.addEventListener('resize', updateAngle, { passive: true });
        return () => {
            track.removeEventListener('scroll', updateAngle);
            window.removeEventListener('resize', updateAngle);
        };
    }, [updateAngle, trackRef]);

    useEffect(() => {
        if (!hovered) updateAngle();
    }, [hovered, updateAngle]);

    const isCenter = Math.abs(angle) < 5;
    const isMobileCard = typeof window !== 'undefined' && window.innerWidth < 768;

    return (
        <div
            ref={cardRef}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                flexShrink: 0,
                width: isMobileCard ? '150px' : '280px',
                height: isMobileCard ? '220px' : '420px',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                border: `1px solid ${accentColor}40`,
                cursor: 'pointer',
                transform: hovered
                    ? 'perspective(900px) rotateY(0deg) scale(1.1)'
                    : `perspective(900px) rotateY(${angle}deg) scale(${isCenter ? 1.06 : 1})`,
                transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease',
                boxShadow: hovered
                    ? `0 30px 80px rgba(0,0,0,0.9), 0 0 40px ${accentColor}40`
                    : isCenter
                        ? `0 25px 60px rgba(0,0,0,0.7), 0 0 20px ${accentColor}20`
                        : '0 15px 40px rgba(0,0,0,0.6)',
                zIndex: hovered ? 50 : isCenter ? 10 : 1,
                scrollSnapAlign: 'center',
            }}
        >
            <img
                src={member.photo || 'https://placehold.co/280x420/111/333?text=?'}
                alt={member.name}
                draggable={false}
                style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: 'top center',
                    display: 'block', userSelect: 'none',
                }}
            />

            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.1) 55%, transparent 75%)',
                pointerEvents: 'none',
            }} />

            {!hovered && Math.abs(angle) > 3 && (
                <div style={{
                    position: 'absolute', inset: 0,
                    background: angle > 0
                        ? 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 50%)'
                        : 'linear-gradient(to left,  rgba(0,0,0,0.55) 0%, transparent 50%)',
                    pointerEvents: 'none',
                    borderRadius: 'inherit',
                }} />
            )}

            {member.badge && (
                <div style={{
                    position: 'absolute', top: '12px', right: '12px',
                    background: `${accentColor}25`,
                    border: `1px solid ${accentColor}60`,
                    borderRadius: '6px', padding: '4px 8px',
                    color: accentColor, fontSize: '9px', fontWeight: 700,
                    fontFamily: 'DM Sans', backdropFilter: 'blur(8px)',
                    textTransform: 'uppercase', letterSpacing: '0.1em',
                    pointerEvents: 'none',
                }}>
                    {member.badge}
                </div>
            )}

            <div style={{ position: 'absolute', bottom: isMobileCard ? '10px' : '18px', left: isMobileCard ? '10px' : '16px', right: isMobileCard ? '10px' : '16px', pointerEvents: 'none' }}>
                <p style={{
                    color: accentColor, fontSize: isMobileCard ? '8px' : '10px', fontWeight: 700,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    fontFamily: 'DM Sans', marginBottom: isMobileCard ? '2px' : '4px',
                }}>
                    {member.position}
                </p>
                <h3 style={{
                    fontFamily: 'Syne', fontSize: isMobileCard ? '0.85rem' : '1.1rem',
                    fontWeight: 800, color: 'white',
                    lineHeight: 1.1, marginBottom: isMobileCard ? '6px' : '10px',
                }}>
                    {member.name}
                </h3>
                <div style={{ display: 'flex', gap: '8px', pointerEvents: 'auto' }}>
                    {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noreferrer"
                            style={{ color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                        ><LinkedinIcon size={14} /></a>
                    )}
                    {member.instagram && (
                        <a href={member.instagram} target="_blank" rel="noreferrer"
                            style={{ color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                        ><InstagramIcon size={14} /></a>
                    )}
                </div>
            </div>
        </div>
    );
};

const CategoryRow = ({ group, isMobile }) => {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    return (
        <div ref={sectionRef} style={{ marginBottom: isMobile ? '50px' : '80px', padding: '0 0 0 4vw' }}>

            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{
                    marginBottom: '28px',
                    paddingLeft: '1vw',
                    textAlign: group.members.length <= 3 ? 'center' : 'left',
                }}
            >
                <h2 style={{
                    fontFamily: 'Syne', fontSize: 'clamp(1.8rem, 2.5vw, 2.4rem)',
                    fontWeight: 800, color: 'white', display: 'inline-block',
                }}>
                    {group.label}
                </h2>
                <span style={{
                    marginLeft: '12px', color: group.accentColor,
                    fontSize: '11px', fontFamily: 'DM Sans',
                    fontWeight: 700, letterSpacing: '0.1em',
                    textTransform: 'uppercase', verticalAlign: 'middle',
                }}>
                    {group.members.length} Members
                </span>
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ delay: 0.25, duration: 0.5, ease: 'easeOut' }}
                    style={{
                        height: '2px', width: '55px',
                        background: group.accentColor,
                        marginTop: '8px',
                        transformOrigin: group.members.length <= 3 ? 'center' : 'left',
                        margin: group.members.length <= 3 ? '8px auto 0' : '8px 0 0',
                    }}
                />
            </motion.div>

            <motion.div
                ref={trackRef}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="hide-scrollbar"
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: group.members.length <= 3 ? 'center' : 'flex-start',
                    gap: isMobile ? '8px' : '12px',
                    overflowX: group.members.length <= 3 ? 'visible' : 'scroll',
                    scrollSnapType: group.members.length <= 3 ? 'none' : 'x mandatory',
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'none',
                    paddingRight: group.members.length <= 3 ? '0' : isMobile ? '5vw' : '8vw',
                    paddingLeft: isMobile ? '4vw' : '0',
                    paddingTop: isMobile ? '24px' : '50px',
                    paddingBottom: isMobile ? '24px' : '50px',
                    cursor: group.members.length <= 3 ? 'default' : 'grab',
                }}
                onMouseDown={(e) => {
                    if (group.members.length <= 3) return;
                    const el = trackRef.current;
                    if (!el) return;
                    el.style.cursor = 'grabbing';
                    const startX = e.pageX - el.offsetLeft;
                    const scrollLeft = el.scrollLeft;
                    const onMove = (ev) => {
                        const x = ev.pageX - el.offsetLeft;
                        el.scrollLeft = scrollLeft - (x - startX);
                    };
                    const onUp = () => {
                        el.style.cursor = 'grab';
                        window.removeEventListener('mousemove', onMove);
                        window.removeEventListener('mouseup', onUp);
                    };
                    window.addEventListener('mousemove', onMove);
                    window.addEventListener('mouseup', onUp);
                }}
            >
                {group.members.map((member, i) => (
                    <MemberCard
                        key={i}
                        member={member}
                        accentColor={group.accentColor}
                        cardIndex={i}
                        trackRef={trackRef}
                        totalMembers={group.members.length}
                    />
                ))}
            </motion.div>

        </div>
    );
};

const Team = () => {
    const [isMobile] = useState(
        typeof window !== 'undefined' ? window.innerWidth < 768 : false
    );

    return (
        <div style={{
            background: '#000', minHeight: '100vh',
            paddingBottom: '120px', position: 'relative', overflowX: 'hidden',
        }}>
            <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
                <Starfield
                    starCount={isMobile ? 2000 : 5000}
                    starColor={[255, 255, 255]}
                    speedFactor={0.15}
                    backgroundColor="black"
                />
            </div>

            <div style={{ position: 'relative', zIndex: 10 }}>
                <div style={{ textAlign: 'center', padding: '80px 5vw 70px' }}>
                    <p style={{
                        color: '#a855f7', fontSize: '11px',
                        letterSpacing: '0.18em', textTransform: 'uppercase',
                        fontFamily: 'DM Sans', fontWeight: 700, marginBottom: '12px',
                    }}>
                        MEET THE TEAM
                    </p>
                    <h1 style={{
                        fontFamily: 'Syne', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                        color: 'white', fontWeight: 800, lineHeight: 1.05,
                    }}>
                        Team Abraxas
                    </h1>
                </div>

                {grouped.map((group) => (
                    <CategoryRow key={group.label} group={group} isMobile={isMobile} />
                ))}
            </div>
        </div>
    );
};

export default Team;