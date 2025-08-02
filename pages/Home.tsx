'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

interface MousePosition {
  x: number;
  y: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  size: number;
}

export default function Home() {
  const [scrollY, setScrollY] = useState<number>(0);
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  // Optimized mouse move handler with throttling
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  // Window resize handler
  const handleResize = useCallback(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    // Initialize window size
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    
    // Trigger loading animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Throttled event handlers
    let scrollTicking = false;
    let mouseTicking = false;
    let resizeTicking = false;

    const throttledScroll = () => {
      if (!scrollTicking) {
        requestAnimationFrame(() => {
          handleScroll();
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    };

    const throttledMouseMove = (e: MouseEvent) => {
      if (!mouseTicking) {
        requestAnimationFrame(() => {
          handleMouseMove(e);
          mouseTicking = false;
        });
        mouseTicking = true;
      }
    };

    const throttledResize = () => {
      if (!resizeTicking) {
        requestAnimationFrame(() => {
          handleResize();
          resizeTicking = false;
        });
        resizeTicking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('mousemove', throttledMouseMove, { passive: true });
    window.addEventListener('resize', throttledResize, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('mousemove', throttledMouseMove);
      window.removeEventListener('resize', throttledResize);
    };
  }, [handleScroll, handleMouseMove, handleResize]);

  const scrollToSection = useCallback((sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Memoized background style
  const backgroundStyle = useMemo(() => ({
    background: isLoaded
      ? 'linear-gradient(180deg, #1f2937 0%, #374151 20%, #6b7280 40%, #9ca3af 50%, #d1d5db 60%, #9ca3af 70%, #6b7280 80%, #374151 90%, #1f2937 100%)'
      : '#1f2937'
  }), [isLoaded]);

  return (
    <div 
      className={`transition-all duration-2000 ease-out overflow-x-hidden min-h-screen relative ${
        isLoaded ? 'bg-gradient-to-b from-gray-900 via-gray-700 to-gray-900' : 'bg-gray-800'
      }`} 
      style={backgroundStyle}
    >
      {/* Particle Effect - Only render on larger screens for performance */}
      {windowSize.width > 768 && (
        <ParticleEffect isLoaded={isLoaded} windowSize={windowSize} />
      )}

      {/* Enhanced Circuit Board Overlay */}
      <CircuitOverlay isLoaded={isLoaded} />

      {/* Hero Section */}
      <HeroSection scrollToSection={scrollToSection} isLoaded={isLoaded} />
    </div>
  );
}

function ParticleEffect({ isLoaded, windowSize }: { 
  isLoaded: boolean; 
  windowSize: { width: number; height: number; }; 
}) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  // Reduced particle count for better performance
  const particleCount = useMemo(() => {
    if (windowSize.width < 768) return 20;
    if (windowSize.width < 1024) return 30;
    return 40;
  }, [windowSize.width]);

  useEffect(() => {
    if (!isLoaded || windowSize.width === 0) return;

    // Initialize particles
    const initialParticles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      initialParticles.push({
        id: i,
        x: Math.random() * windowSize.width,
        y: Math.random() * windowSize.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.2 + 0.05,
        size: Math.random() * 1.5 + 0.5
      });
    }
    setParticles(initialParticles);

    const animate = () => {
      setParticles(prevParticles =>
        prevParticles.map(particle => ({
          ...particle,
          x: (particle.x + particle.vx + windowSize.width) % windowSize.width,
          y: (particle.y + particle.vy + windowSize.height) % windowSize.height,
          opacity: 0.05 + Math.sin(Date.now() * 0.001 + particle.id) * 0.05
        }))
      );
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isLoaded, windowSize, particleCount]);

  if (!isLoaded) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-5">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute bg-white rounded-full will-change-transform"
          style={{
            transform: `translate3d(${particle.x}px, ${particle.y}px, 0)`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px rgba(255, 255, 255, ${particle.opacity})`
          }}
        />
      ))}
    </div>
  );
}

function CircuitOverlay({ isLoaded }: { isLoaded: boolean }) {
  return (
    <div className={`fixed inset-0 pointer-events-none z-10 transition-opacity duration-2000 ${
      isLoaded ? 'opacity-20' : 'opacity-0'
    }`}>
      {/* Responsive circuit lines */}
      <div className="absolute top-8 sm:top-16 left-4 sm:left-8 w-32 sm:w-48 lg:w-64 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>
      <div className="absolute top-12 sm:top-24 right-8 sm:right-16 w-24 sm:w-32 lg:w-48 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
      <div className="absolute bottom-16 sm:bottom-32 left-1/4 w-36 sm:w-48 lg:w-72 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-1/3 w-20 sm:w-32 lg:w-40 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>

      {/* Responsive circuit nodes */}
      <div className="absolute top-8 sm:top-16 left-8 sm:left-20 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/30"></div>
      <div className="absolute top-24 sm:top-48 right-12 sm:right-24 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-gray-400 rounded-full animate-pulse shadow-lg shadow-gray-400/30" style={{ animationDelay: '0.8s' }}></div>
      <div className="absolute bottom-24 sm:bottom-48 left-1/3 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-blue-300 rounded-full animate-pulse shadow-lg shadow-blue-300/30" style={{ animationDelay: '1.2s' }}></div>

      {/* Responsive chip components */}
      <div className="absolute top-1/4 right-1/4 w-6 sm:w-8 h-8 sm:h-12 bg-gradient-to-b from-gray-700 to-gray-900 border border-gray-500 opacity-60 shadow-xl">
        <div className="w-full h-0.5 bg-blue-400 mt-1 sm:mt-2"></div>
        <div className="w-full h-0.5 bg-gray-400 mt-0.5 sm:mt-1"></div>
      </div>
      <div className="absolute bottom-1/3 left-1/6 w-8 sm:w-12 h-6 sm:h-8 bg-gradient-to-r from-gray-700 to-gray-900 border border-gray-500 opacity-60 shadow-xl">
        <div className="h-full w-0.5 bg-blue-300 ml-1 sm:ml-2"></div>
        <div className="h-full w-0.5 bg-gray-500 ml-0.5 sm:ml-1"></div>
      </div>
    </div>
  );
}

function HeroSection({ scrollToSection, isLoaded }: {
  scrollToSection: (sectionId: string) => void;
  isLoaded: boolean;
}) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleExploreClick = useCallback(() => scrollToSection('products'), [scrollToSection]);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-8 sm:pt-16 z-20">
      <video src="bgvid/bgv1.mp4" autoPlay loop muted className="absolute inset-0 w-full h-full object-cover"/>
      {/* Professional background overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute inset-0 transition-all duration-2000 ${
          isLoaded ? 'bg-black/10' : 'bg-black/50'
        }`} />

        {/* Subtle professional rays */}
        <div className={`absolute top-0 right-0 w-full h-full transition-opacity duration-2000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-blue-400/5 via-transparent to-transparent transform rotate-12"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-radial from-gray-400/8 via-transparent to-transparent transform rotate-45"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 relative z-30 text-center">
        {/* Main headline with responsive text sizes */}
        <div className="space-y-2 sm:space-y-4 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight">
            {['Better Chip. Better Battery.', 'Better Power.'].map((text, index) => (
              <div key={index} className={`relative inline-block group overflow-hidden transition-all duration-1000 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: `${500 + index * 200}ms` }}>
                <span className="text-white group-hover:text-gray-100 transition-colors duration-500 relative z-10">
                  {text}
                </span>

                {/* Refined traveling effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-2000 ease-out"
                    style={{ width: '150%' }}
                  ></div>
                </div>

                {/* Subtle base enhancement */}
                <div className="absolute inset-0 text-blue-400/10 blur-sm group-hover:text-blue-400/20 transition-all duration-500">
                  {text}
                </div>
                {index < 1 && <br className="hidden sm:block" />}
              </div>
            ))}
          </h1>
        </div>

        {/* Responsive subtitle */}
        {/* <div className={`mb-8 sm:mb-12 transition-all duration-1000 delay-700 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            We don&apos;t just build battery chips —<br className="hidden sm:block" />
            we craft the silent intelligence that powers tomorrow.<br className="hidden sm:block" />
            Energy, reimagined through purpose, precision, and possibility.
          </p>
        </div> */}

        {/* Responsive CTA Button */}
        <div className={`flex justify-center transition-all duration-1000 delay-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="relative group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>

            {/* Professional glow */}
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-400/20 via-white/25 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-sm"></div>

            <button 
              onClick={handleExploreClick}
              className="relative px-6 sm:px-8 py-2.5 sm:py-3 bg-gray-700/90 hover:bg-gray-600/90 border border-gray-600/60 hover:border-blue-400/40 text-white font-semibold transition-all duration-700 flex items-center space-x-2 sm:space-x-3 group rounded-xl text-sm sm:text-base shadow-xl"
            >
              <span className="group-hover:text-blue-100 transition-colors duration-500">Explore Products</span>

              <div className="flex items-center space-x-1 sm:space-x-2">
                <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400 group-hover:text-blue-300 transition-all duration-500 group-hover:translate-x-1" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Professional scroll indicator */}
      <button
        onClick={handleExploreClick}
        className={`absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-gray-200 transition-all duration-700 ${
          isLoaded ? 'opacity-100 animate-bounce' : 'opacity-0'
        }`}
        style={{ transitionDelay: '1500ms' }}
        aria-label="Scroll to next section"
      >
        <ChevronDown className="w-4 sm:w-5 h-4 sm:h-5" />
      </button>
    </section>
  );
}