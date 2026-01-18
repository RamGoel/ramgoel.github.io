import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SarvamTeam() {
  const [time, setTime] = useState<string>('');
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setTime(`${hours}:${minutes}:${seconds}`);
    };
    
    updateTime(); // Initial call
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const teamMembers = [
    { 
      name: 'Jaljith Srinivasan', 
      role: 'Product Designer',
      image: 'https://ca.slack-edge.com/T05VBASMECD-U07V1P02L74-b7d0bf5ab0e0-512'
    },
    { 
      name: 'Pawar Rupesh', 
      role: 'Lead Frontend Engineer',
      image: 'https://ca.slack-edge.com/T05VBASMECD-U08E8BK3M9S-e4371ae64e51-512'
    },
    { 
      name: 'Ram Goel', 
      role: 'Frontend Engineer',
      image: 'https://ca.slack-edge.com/T05VBASMECD-U08JM9BNDRN-ecad25b2b701-512'
    },
    { 
      name: 'Sneha', 
      role: 'Product Manager',
      image: 'https://ca.slack-edge.com/T05VBASMECD-U08N36ANFU1-e1990ea48966-512'
    },
    { 
      name: 'Manikantha', 
      role: 'Senior Product Manager',
      image: 'https://ca.slack-edge.com/T05VBASMECD-U07614GQF8A-8143220241f0-512'
    },
    { 
      name: 'Jayanth Verma', 
      role: 'Product Designer',
      image: 'https://ca.slack-edge.com/T05VBASMECD-U08GY3F7L3U-1b999d9b2931-512'
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const memberRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const thumbRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastIndexRef = useRef(0);
  const lastSoundTimeRef = useRef(0);

  // Play click sound on switch
  const playClickSound = () => {
    const now = Date.now();
    // Debounce - don't play if less than 200ms since last sound
    if (now - lastSoundTimeRef.current < 200) return;
    lastSoundTimeRef.current = now;
    
    const audio = new Audio('/computer-mouse-click-352734.mp3');
    audio.volume = 0.3; // Reduced volume
    audio.play();
  };

  // Play sound when activeIndex changes
  useEffect(() => {
    if (activeIndex !== lastIndexRef.current) {
      playClickSound();
      lastIndexRef.current = activeIndex;
    }
  }, [activeIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalMembers = teamMembers.length;
      
      // Set initial states - simple crossfade
      imageRefs.current.forEach((ref, index) => {
        if (!ref) return;
        if (index === 0) {
          gsap.set(ref, { opacity: 1, scale: 1, zIndex: 20 });
        } else {
          gsap.set(ref, { opacity: 0, scale: 0, zIndex: 20 + index });
        }
      });
      
      memberRefs.current.forEach((ref, index) => {
        if (!ref) return;
        if (index === 0) {
          gsap.set(ref, { opacity: 1 });
        } else {
          gsap.set(ref, { opacity: 0.25 });
        }
      });
      
      // Set initial thumbnail states
      thumbRefs.current.forEach((ref, index) => {
        if (!ref) return;
        if (index === 0) {
          gsap.set(ref, { opacity: 1, scale: 1.1 });
        } else {
          gsap.set(ref, { opacity: 0.4, scale: 1 });
        }
      });

      // Create ScrollTrigger for each image transition
      const vh = window.innerHeight;
      const transitionPortion = 0.5; // Transition happens in first 50% of section
      
      // Add snap effect - snap to exact member positions
      const snapPoints = Array.from({ length: totalMembers }, (_, i) => i / (totalMembers + 1));
      
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        snap: {
          snapTo: snapPoints,
          duration: { min: 0.5, max: 0.8 },
          delay: 0.1,
          ease: 'power2.inOut',
          inertia: false,
        }
      });
      
      for (let i = 1; i < totalMembers; i++) {
        const imageRef = imageRefs.current[i];
        const prevImageRef = imageRefs.current[i - 1];
        const prevMemberRef = memberRefs.current[i - 1];
        const memberRef = memberRefs.current[i];
        const thumbRef = thumbRefs.current[i];
        const prevThumbRef = thumbRefs.current[i - 1];
        
        const sectionStart = i * vh;
        const transitionEnd = sectionStart + (vh * transitionPortion);
        
        if (imageRef) {
          // New image emerges from center on top of old image
          gsap.to(imageRef, {
            opacity: 1,
            scale: 1,
            ease: 'none',
            immediateRender: false,
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top+=${sectionStart} top`,
              end: `top+=${transitionEnd} top`,
              scrub: true,
            }
          });
        }
        
        // Old image stays visible - new one covers it
        // Only hide it after transition is complete
        if (prevImageRef) {
          gsap.to(prevImageRef, {
            opacity: 0,
            ease: 'none',
            immediateRender: false,
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top+=${transitionEnd} top`,
              end: `top+=${transitionEnd + 10} top`,
              scrub: true,
            }
          });
        }
        
        // Fade out previous member name
        if (prevMemberRef) {
          gsap.to(prevMemberRef, {
            opacity: 0.25,
            ease: 'none',
            immediateRender: false,
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top+=${sectionStart} top`,
              end: `top+=${transitionEnd} top`,
              scrub: true,
            }
          });
        }
        
        // Fade in current member name
        if (memberRef) {
          gsap.to(memberRef, {
            opacity: 1,
            ease: 'none',
            immediateRender: false,
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top+=${sectionStart} top`,
              end: `top+=${transitionEnd} top`,
              scrub: true,
            }
          });
        }
        
        // Fade out previous thumbnail
        if (prevThumbRef) {
          gsap.to(prevThumbRef, {
            opacity: 0.4,
            scale: 1,
            ease: 'none',
            immediateRender: false,
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top+=${sectionStart} top`,
              end: `top+=${transitionEnd} top`,
              scrub: true,
            }
          });
        }
        
        // Highlight current thumbnail
        if (thumbRef) {
          gsap.to(thumbRef, {
            opacity: 1,
            scale: 1.1,
            ease: 'none',
            immediateRender: false,
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top+=${sectionStart} top`,
              end: `top+=${transitionEnd} top`,
              scrub: true,
            }
          });
        }
      }
      
      // Track active index based on scroll
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const progress = self.progress;
          // Account for extra vh (totalMembers + 1 sections total)
          const adjustedProgress = progress * (totalMembers + 1);
          const newIndex = Math.min(
            Math.floor(adjustedProgress),
            totalMembers - 1
          );
          setActiveIndex(newIndex);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [teamMembers.length]);


  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        
        .retro-bg {
          background: #e8e4d9;
          font-family: 'Space Grotesk', sans-serif;
        }
        
        .noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E");
          opacity: 0.08;
        }
        
        .scanline {
          background-image: 
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 0, 0, 0.06) 2px,
              rgba(0, 0, 0, 0.06) 4px
            );
        }
        
        .stain {
          background: radial-gradient(circle, rgba(160, 130, 90, 0.25) 0%, transparent 70%);
        }
        
        .stain-dark {
          background: radial-gradient(circle, rgba(120, 100, 70, 0.15) 0%, transparent 60%);
        }
        
        .scratch {
          background: linear-gradient(90deg, transparent 49%, rgba(0,0,0,0.03) 49%, rgba(0,0,0,0.03) 51%, transparent 51%);
        }
        
        .team-image {
          position: relative;
        }
        
        .team-image::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 3px,
              rgba(0, 0, 0, 0.02) 3px,
              rgba(0, 0, 0, 0.02) 6px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 3px,
              rgba(0, 0, 0, 0.02) 3px,
              rgba(0, 0, 0, 0.02) 6px
            );
          pointer-events: none;
          z-index: 2;
        }
        
        .team-image::after {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 20% 30%, rgba(200, 180, 150, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(180, 160, 130, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.03) 0%, transparent 100%);
          mix-blend-mode: multiply;
          pointer-events: none;
          z-index: 3;
        }
        
        .vintage-image {
          filter: grayscale(100%) contrast(1.1) sepia(0.15) brightness(0.95);
        }
        
        .team-member {
          will-change: opacity, transform;
        }
        
        .image-container {
          will-change: opacity, filter, transform;
          transform-origin: center center;
        }
        
        .images-wrapper {
          position: relative;
          width: 450px;
          height: 450px;
          overflow: visible;
        }
        
        .image-stack {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
      
      {/* Main wrapper - extra 100vh to allow last animation to complete */}
      <div ref={containerRef} className="retro-bg min-h-screen text-[14px] text-[#2a2a2a]" style={{ height: `${(teamMembers.length + 1) * 100}vh` }}>
        
        {/* Fixed content */}
        <div className="retro-bg fixed inset-0 overflow-hidden">
        {/* Noise grain overlay */}
        <div className="noise absolute inset-0 pointer-events-none"></div>
        
        {/* Scanline overlay */}
        <div className="scanline absolute inset-0 pointer-events-none opacity-70"></div>
        
        {/* Content Grid */}
        <div className="relative z-10 h-screen p-6 grid grid-cols-2 grid-rows-[auto_1fr] gap-6">
          {/* Top Left - Date & Time */}
          <div className="col-start-1 row-start-1 self-start">
            <div className="tracking-wide">
              Thursday, Jan 15, 2026
            </div>
            <div className="tracking-wide mt-1 tabular-nums">
              {time}
            </div>
          </div>
          
          {/* Top Right - Links */}
          <div className="col-start-2 row-start-1 self-start justify-self-end">
            <div className="text-right">
              <a 
                href="https://linkedin.com/company/sarvam" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block my-1 text-[#2a2a2a] no-underline tracking-[0.3px] transition-all hover:underline hover:-translate-x-0.5"
              >
                [linkedin]
              </a>
              <a 
                href="https://twitter.com/sarvam" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block my-1 text-[#2a2a2a] no-underline tracking-[0.3px] transition-all hover:underline hover:-translate-x-0.5"
              >
                [twitter]
              </a>
              <a 
                href="https://sarvam.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block my-1 text-[#2a2a2a] no-underline tracking-[0.3px] transition-all hover:underline hover:-translate-x-0.5"
              >
                [website]
              </a>
            </div>
          </div>
          
          {/* Center - Team Images */}
          <div className="col-span-2 row-span-2 flex items-center justify-center absolute inset-0 pointer-events-none overflow-hidden">
            <div className="images-wrapper">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  ref={(el) => { imageRefs.current[index] = el; }}
                  className="image-stack image-container team-image overflow-hidden"
                >
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="vintage-image w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Bottom Left - Team List */}
          <div className="col-start-1 row-start-2 self-end z-20">
            <div className="max-w-[300px]">
              {teamMembers.map((member, index) => (
                <div 
                  key={index} 
                  ref={(el) => { memberRefs.current[index] = el; }}
                  className="team-member my-2 leading-relaxed"
                >
                  <span className="tracking-[0.3px]">{member.name}</span>
                  <span className="mx-1 text-[#888]">—</span>
                  <span className="text-[#555] ml-2">{member.role}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Bottom Right - Thumbnail Preview */}
          <div className="col-start-2 row-start-2 self-end justify-self-end z-20 pointer-events-auto">
            <div className="flex gap-2">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  ref={(el) => { thumbRefs.current[index] = el; }}
                  className="w-10 h-10 overflow-hidden cursor-pointer rounded-sm transition-transform hover:scale-110"
                  style={{ 
                    opacity: index === 0 ? 1 : 0.4,
                  }}
                  onClick={() => {
                    // Scroll to END of transition where only this person's image is visible
                    const vh = window.innerHeight;
                    const targetScroll = index === 0 ? 0 : (index + 1) * vh;
                    window.scrollTo({
                      top: targetScroll,
                      behavior: 'smooth'
                    });
                  }}
                >
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
