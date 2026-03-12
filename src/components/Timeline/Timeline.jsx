import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const timelineData = [
  { month: 'Oct 2025', day: '3', title: 'Sophomore Interviews', subtitle: '' },
  { month: 'Jan 2026', day: '16', title: 'Nimbus Orientation', subtitle: 'Introducing Abraxas to Freshmen' },
  { month: 'Jan 2026', day: '17–18', title: 'Freshmen Interviews', subtitle: '' },
  { month: 'Feb 2026', day: '15', title: 'Innovision', subtitle: '' },
  { month: 'Mar 2026', day: '11', title: 'Game Theory Workshop', subtitle: '' },
  { month: 'Apr 2026', day: '', title: 'To be Announced', subtitle: '' },
];

const CircuitTraceCanvas = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !inView) return;
    const ctx = canvas.getContext('2d');
    let animationFrame;
    let w, h;

    let startTime = Date.now();
    let cacheMap = null;
    let lastCacheTime = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.offsetWidth;
      h = parent.offsetHeight;
      canvas.width = w;
      canvas.height = h;
      lastCacheTime = 0;
    };
    resize();

    const draw = () => {
      animationFrame = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, w, h);

      const elapsed = Date.now() - startTime;
      const globalAlpha = Math.min(elapsed / 800, 1);
      ctx.globalAlpha = globalAlpha;

      if (elapsed - lastCacheTime > 500 || !cacheMap) {
        lastCacheTime = elapsed;
        const parent = canvas.parentElement?.parentElement;
        if (parent) {
          let newCache = { isMobile: false, line: null, nodes: [] };
          const desktopView = parent.querySelector('.hidden.md\\:block');
          const mobileView = parent.querySelector('.block.md\\:hidden');

          if (window.innerWidth >= 768 && desktopView) {
            newCache.isMobile = false;
            const hLine = desktopView.querySelector('.w-full.h-px');
            const baseRect = parent.getBoundingClientRect();
            const cards = Array.from(desktopView.querySelectorAll('.bg-white\\/\\[0\\.04\\]'));
            if (hLine) {
              const hlRect = hLine.getBoundingClientRect();
              let lineX = hlRect.left - baseRect.left;
              let lineWidth = hlRect.width;
              if (cards.length >= 2) {
                const firstRect = cards[0].getBoundingClientRect();
                const lastRect = cards[cards.length - 1].getBoundingClientRect();
                lineX = firstRect.left - baseRect.left + firstRect.width / 2;
                lineWidth = (lastRect.left - baseRect.left + lastRect.width / 2) - lineX;
              }
              newCache.line = {
                x: lineX,
                y: hlRect.top - baseRect.top + hlRect.height / 2,
                width: lineWidth
              };
            }
            if (cards.length > 0 && newCache.line) {
              cards.forEach((c, idx) => {
                const cRect = c.getBoundingClientRect();
                const isTop = (idx % 2 === 0);
                const cx = cRect.left - baseRect.left + cRect.width / 2;
                let stemStart, stemEnd, cardGlowBox;
                if (isTop) {
                  // Stem goes UP from line — stop exactly at card bottom edge
                  stemStart = { x: cx, y: newCache.line.y };
                  stemEnd = { x: cx, y: newCache.line.y - 32 };
                } else {
                  // Stem goes DOWN from line — stop exactly at card top edge
                  stemStart = { x: cx, y: newCache.line.y };
                  stemEnd = { x: cx, y: newCache.line.y + 32 };
                }
                cardGlowBox = {
                  x: cRect.left - baseRect.left,
                  y: cRect.top - baseRect.top,
                  w: cRect.width,
                  h: cRect.height
                };
                newCache.nodes.push({ cx, stemStart, stemEnd, cardGlowBox, isTop });
              });
            }
          } else if (mobileView) {
            newCache.isMobile = true;
            const vLine = mobileView.querySelector('.absolute.w-px');
            const baseRect = parent.getBoundingClientRect();
            if (vLine) {
              const vlRect = vLine.getBoundingClientRect();
              newCache.line = {
                x: vlRect.left - baseRect.left + vlRect.width / 2,
                y: vlRect.top - baseRect.top,
                height: vlRect.height
              };
            }
            const cards = Array.from(mobileView.querySelectorAll('.bg-white\\/\\[0\\.04\\]'));
            if (cards.length > 0 && newCache.line) {
              cards.forEach(c => {
                const cRect = c.getBoundingClientRect();
                const cy = cRect.top - baseRect.top + cRect.height / 2;
                newCache.nodes.push({
                  cx: newCache.line.x,
                  cy,
                  stemStart: { x: newCache.line.x, y: cy },
                  stemEnd: { x: cRect.left - baseRect.left, y: cy },
                  cardGlowBox: {
                    x: cRect.left - baseRect.left,
                    y: cRect.top - baseRect.top,
                    w: cRect.width,
                    h: cRect.height
                  }
                });
              });
            }
          }
          cacheMap = newCache;
        }
      }

      if (!cacheMap) return;

      const duration = 4000;
      const t = (elapsed % duration) / duration;

      const drawPulse = (startX, startY, endX, endY, progress, length, color, headColor) => {
        const dx = endX - startX;
        const dy = endY - startY;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d === 0) return;

        const angle = Math.atan2(dy, dx);
        const currentD = progress * (d + length) - length;

        if (currentD > d || currentD + length < 0) return;

        const pStartX = Math.max(0, currentD);
        const pEndX = Math.min(d, currentD + length);

        if (pStartX >= pEndX) return;

        const x1 = startX + Math.cos(angle) * pStartX;
        const y1 = startY + Math.sin(angle) * pStartX;
        const x2 = startX + Math.cos(angle) * pEndX;
        const y2 = startY + Math.sin(angle) * pEndX;

        const grad = ctx.createLinearGradient(x1, y1, x2, y2);
        if (currentD + length <= d) {
          grad.addColorStop(0, "transparent");
          grad.addColorStop(0.8, color);
          grad.addColorStop(1, headColor);
        } else {
          grad.addColorStop(0, "transparent");
          grad.addColorStop(1, color);
        }

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.save();
        ctx.shadowBlur = 10;
        ctx.shadowColor = color;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.restore();
      };

      if (!cacheMap.isMobile && cacheMap.line) {
        ctx.beginPath();
        ctx.moveTo(cacheMap.line.x, cacheMap.line.y);
        ctx.lineTo(cacheMap.line.x + cacheMap.line.width, cacheMap.line.y);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        ctx.stroke();

        drawPulse(cacheMap.line.x, cacheMap.line.y,
          cacheMap.line.x + cacheMap.line.width, cacheMap.line.y,
          t, 200, 'rgba(255,255,255,0.9)', '#fff');

        cacheMap.nodes.forEach((node) => {
          const tCardNode = (node.stemStart.x - cacheMap.line.x) / cacheMap.line.width;
          const pulseDelay = tCardNode;
          const stemDuration = 0.15;

          let stemProgress = 0;
          if (t >= pulseDelay) {
            stemProgress = (t - pulseDelay) / stemDuration;
          }

          if (stemProgress > 0 && stemProgress < 1.0) {
            const glowAlpha = Math.max(0, 1 - Math.abs(stemProgress - 0.5) * 2);

            ctx.beginPath();
            ctx.arc(node.stemStart.x, node.stemStart.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${glowAlpha})`;
            ctx.fill();
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'rgba(255,255,255,0.8)';
            ctx.fill();
            ctx.shadowBlur = 0;

            drawPulse(node.stemStart.x, node.stemStart.y,
              node.stemEnd.x, node.stemEnd.y,
              Math.min(1, stemProgress), 15, 'rgba(255,255,255,0.9)', '#fff');

            if (stemProgress >= 0.8 && stemProgress <= 1.5) {
              const boxGlow = Math.max(0, 1 - (stemProgress - 0.8) * 1.4);
              ctx.save();
              const b = node.cardGlowBox;
              ctx.beginPath();
              ctx.roundRect(b.x, b.y, b.w, b.h, 16);
              ctx.strokeStyle = `rgba(255, 255, 255, ${boxGlow * 0.6})`;
              ctx.lineWidth = 1.5;
              ctx.shadowBlur = 20;
              ctx.shadowColor = `rgba(255, 255, 255, ${boxGlow * 0.4})`;
              ctx.stroke();
              ctx.restore();
            }
          }
        });

      } else if (cacheMap.isMobile && cacheMap.line) {
        ctx.beginPath();
        ctx.moveTo(cacheMap.line.x, cacheMap.line.y);
        ctx.lineTo(cacheMap.line.x, cacheMap.line.y + cacheMap.line.height);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        ctx.stroke();

        drawPulse(cacheMap.line.x, cacheMap.line.y,
          cacheMap.line.x, cacheMap.line.y + cacheMap.line.height,
          t, 200, 'rgba(255,255,255,0.9)', '#fff');

        cacheMap.nodes.forEach((node) => {
          const tCardNode = (node.cy - cacheMap.line.y) / cacheMap.line.height;
          const pulseDelay = tCardNode;
          const stemDuration = 0.15;

          let stemProgress = 0;
          if (t >= pulseDelay) {
            stemProgress = (t - pulseDelay) / stemDuration;
          }

          if (stemProgress > 0 && stemProgress < 1.0) {
            const glowAlpha = Math.max(0, 1 - Math.abs(stemProgress - 0.5) * 2);

            ctx.beginPath();
            ctx.arc(node.stemStart.x, node.stemStart.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${glowAlpha})`;
            ctx.fill();
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'rgba(255,255,255,0.8)';
            ctx.fill();
            ctx.shadowBlur = 0;

            drawPulse(node.stemStart.x, node.stemStart.y,
              node.stemEnd.x, node.stemEnd.y,
              Math.min(1, stemProgress), 15, 'rgba(255,255,255,0.9)', '#fff');

            if (stemProgress >= 0.8 && stemProgress <= 1.5) {
              const boxGlow = Math.max(0, 1 - (stemProgress - 0.8) * 1.4);
              ctx.save();
              const b = node.cardGlowBox;
              ctx.beginPath();
              ctx.roundRect(b.x, b.y, b.w, b.h, 16);
              ctx.strokeStyle = `rgba(255, 255, 255, ${boxGlow * 0.6})`;
              ctx.lineWidth = 1.5;
              ctx.shadowBlur = 20;
              ctx.shadowColor = `rgba(255, 255, 255, ${boxGlow * 0.4})`;
              ctx.stroke();
              ctx.restore();
            }
          }
        });
      }
    };

    draw();

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, [inView]);

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

const Card = ({ item }) => (
  <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 md:p-5 hover:bg-white/[0.07] transition-all duration-300 w-full relative z-10">
    <div style={{ fontFamily: "'Syne', sans-serif" }} className="text-white/40 text-[10px] md:text-xs mb-1.5 md:mb-2 tracking-widest uppercase">
      {item.month}
    </div>
    {item.day && (
      <div style={{ fontFamily: "'Syne', sans-serif" }} className="text-white text-2xl md:text-3xl font-bold leading-none mb-1.5 md:mb-2">
        {item.day}
      </div>
    )}
    <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-white/90 text-xs md:text-sm font-medium leading-snug">
      {item.title}
    </div>
    {item.subtitle && (
      <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-white/30 text-[10px] md:text-xs mt-1 leading-snug">
        {item.subtitle}
      </div>
    )}
  </div>
);

/* ── Mobile: vertical timeline, full width cards ── */
const MobileTimeline = () => (
  <div className="relative pl-5">
    {/* Vertical line */}
    <div className="absolute left-0 top-2 bottom-2 w-px bg-white/15" />
    <div className="space-y-5">
      {timelineData.map((item, index) => {
        const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
        return (
          <motion.div
            key={index}
            ref={ref}
            initial={{ opacity: 0, x: 12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: index * 0.07 }}
            className="relative"
          >
            {/* Dot on the vertical line */}
            <div className="absolute -left-5 top-1/2 -translate-y-1/2 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
            </div>
            {/* Horizontal connector tick */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-4 h-px bg-white/10" />
            <Card item={item} />
          </motion.div>
        );
      })}
    </div>
  </div>
);

/* ── Desktop: horizontal alternating above/below ── */
const DesktopTimeline = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const STEM = 32;

  return (
    <div ref={ref} className="relative">
      <div className="flex justify-between gap-4 items-end mb-0">
        {timelineData.map((item, index) => {
          const isTop = index % 2 === 0;
          const [cardRef, cardInView] = useInView({ triggerOnce: true, threshold: 0.2 });
          return (
            <div key={index} ref={cardRef} className="flex-1 min-w-0 flex flex-col items-center">
              {isTop ? (
                <>
                  <motion.div
                    className="w-full"
                    initial={{ opacity: 0, y: -20 }}
                    animate={cardInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card item={item} />
                  </motion.div>
                  <div className="w-px bg-white/20" style={{ height: `${STEM}px` }} />
                </>
              ) : (
                <div style={{ height: `${STEM}px` }} />
              )}
            </div>
          );
        })}
      </div>

      <motion.div
        className="w-full h-px bg-white/20"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.2 }}
        style={{ transformOrigin: 'left' }}
      />

      <div className="flex justify-between gap-4 items-start mt-0">
        {timelineData.map((item, index) => {
          const isBottom = index % 2 !== 0;
          const [cardRef, cardInView] = useInView({ triggerOnce: true, threshold: 0.2 });
          return (
            <div key={index} ref={cardRef} className="flex-1 min-w-0 flex flex-col items-center">
              {isBottom ? (
                <>
                  <div className="w-px bg-white/20" style={{ height: `${STEM}px` }} />
                  <motion.div
                    className="w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={cardInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card item={item} />
                  </motion.div>
                </>
              ) : (
                <div style={{ height: `${STEM}px` }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Timeline = () => (
  <div className="bg-black py-12 md:py-16 px-4 md:px-8 overflow-x-hidden relative">
    <CircuitTraceCanvas />

    <div className="relative z-10">
      <motion.h1
        style={{ fontFamily: "'Syne', sans-serif" }}
        className="text-3xl md:text-4xl font-bold text-white mb-3 text-center tracking-widest"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        TIMELINE
      </motion.h1>
      <motion.div
        className="w-12 h-px bg-white/20 mx-auto mb-10 md:mb-16"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />

      {/* Mobile */}
      <div className="block md:hidden w-full px-4">
        <MobileTimeline />
      </div>

      {/* Desktop */}
      <div className="hidden md:block max-w-6xl mx-auto">
        <DesktopTimeline />
      </div>
    </div>
  </div>
);

export default Timeline;