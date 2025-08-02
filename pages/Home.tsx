'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  console.log(scrollY);
  console.log(mousePos);

  useEffect(() => {
    // Trigger loading animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`transition-all duration-2000 ease-out overflow-x-hidden min-h-screen relative ${isLoaded
        ? 'bg-gradient-to-b from-gray-900 via-gray-700  to-gray-900'
        : 'bg-gray-800'
      }`} style={{
        background: isLoaded
          ? 'linear-gradient(180deg, #1f2937 0%, #374151 20%, #6b7280 40%, #9ca3af 50%, #d1d5db 60%, #9ca3af 70%, #6b7280 80%, #374151 90%, #1f2937 100%)'
          : '#1f2937'
      }}>
      {/* Particle Effect */}
      <ParticleEffect isLoaded={isLoaded} />

      {/* Enhanced Circuit Board Overlay */}
      <CircuitOverlay isLoaded={isLoaded} />

      {/* Hero Section */}
      <HeroSection scrollToSection={scrollToSection} isLoaded={isLoaded} />
    </div>
  );
}

function ParticleEffect({ isLoaded }: { isLoaded: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationRef = useRef<number>(null);

  useEffect(() => {
    if (!isLoaded) return;

    // Initialize particles
    const initialParticles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      initialParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        size: Math.random() * 2 + 1
      });
    }
    setParticles(initialParticles);

    const animate = () => {
      setParticles(prevParticles =>
        prevParticles.map(particle => ({
          ...particle,
          x: (particle.x + particle.vx + window.innerWidth) % window.innerWidth,
          y: (particle.y + particle.vy + window.innerHeight) % window.innerHeight,
          opacity: 0.1 + Math.sin(Date.now() * 0.001 + particle.id) * 0.1
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
  }, [isLoaded]);

  if (!isLoaded) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-5">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
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
    <div className={`fixed inset-0 pointer-events-none z-10 transition-opacity duration-2000 ${isLoaded ? 'opacity-20' : 'opacity-0'
      }`}>
      {/* Professional circuit lines */}
      <div className="absolute top-16 left-8 w-64 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>
      <div className="absolute top-24 right-16 w-48 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
      <div className="absolute bottom-32 left-1/4 w-72 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-1/3 w-40 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>

      {/* Sophisticated circuit nodes */}
      <div className="absolute top-16 left-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/30"></div>
      <div className="absolute top-48 right-24 w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse shadow-lg shadow-gray-400/30" style={{ animationDelay: '0.8s' }}></div>
      <div className="absolute bottom-48 left-1/3 w-2 h-2 bg-blue-300 rounded-full animate-pulse shadow-lg shadow-blue-300/30" style={{ animationDelay: '1.2s' }}></div>

      {/* Professional chip components */}
      <div className="absolute top-1/4 right-1/4 w-8 h-12 bg-gradient-to-b from-gray-700 to-gray-900 border border-gray-500 opacity-60 shadow-xl">
        <div className="w-full h-0.5 bg-blue-400 mt-2"></div>
        <div className="w-full h-0.5 bg-gray-400 mt-1"></div>
      </div>
      <div className="absolute bottom-1/3 left-1/6 w-12 h-8 bg-gradient-to-r from-gray-700 to-gray-900 border border-gray-500 opacity-60 shadow-xl">
        <div className="h-full w-0.5 bg-blue-300 ml-2"></div>
        <div className="h-full w-0.5 bg-gray-500 ml-1"></div>
      </div>
    </div>
  );
}



function HeroSection({ scrollToSection, isLoaded }: {
  scrollToSection: (sectionId: string) => void;
  isLoaded: boolean;
}) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  console.log(isHovered)

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 z-20">
      {/* Professional background overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute inset-0 transition-all duration-2000 ${isLoaded
            ? 'bg-black/10'
            : 'bg-black/50'
          }`} />

        {/* Subtle professional rays */}
        <div className={`absolute top-0 right-0 w-full h-full transition-opacity duration-2000 ${isLoaded ? 'opacity-100' : 'opacity-0'
          }`}>
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-blue-400/5 via-transparent to-transparent transform rotate-12"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-radial from-gray-400/8 via-transparent to-transparent transform rotate-45"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20 relative z-30 text-center">
        {/* Main headline with smaller text */}
        <div className="space-y-4 mb-8">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight">
            {['Better Chip. Better Battery.', 'Better Power.'].map((text, index) => (
              <div key={index} className={`relative inline-block group overflow-hidden transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
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
                {index < 1 && <br />}
              </div>
            ))}
          </h1>
        </div>

        {/* Subtitle */}
        <div className={`mb-12 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We don&apos;t just build battery chips —<br />
            we craft the silent intelligence that powers tomorrow.<br />
            Energy, reimagined through purpose, precision, and possibility.
          </p>

        </div>

        {/* Professional CTA Button */}
        <div className={`flex justify-center transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          <div className="relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>

            {/* Professional glow */}
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-400/20 via-white/25 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-sm"></div>

            <button className="relative px-8 py-3 bg-gray-700/90 hover:bg-gray-600/90 border border-gray-600/60 hover:border-blue-400/40 text-white font-semibold transition-all duration-700 flex items-center space-x-3 group rounded-xl text-base shadow-xl">
              <span className="group-hover:text-blue-100 transition-colors duration-500">Explore Products</span>

              <div className="flex items-center space-x-2">
                {/* <Zap className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors duration-500" /> */}
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-300 transition-all duration-500 group-hover:translate-x-1" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Professional scroll indicator */}
      <button
        onClick={() => scrollToSection('technology')}
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-gray-200 transition-all duration-700 ${isLoaded ? 'opacity-100 animate-bounce' : 'opacity-0'
          }`}
        style={{ transitionDelay: '1500ms' }}
      >
        <ChevronDown className="w-5 h-5" />
      </button>
    </section>
  );
}