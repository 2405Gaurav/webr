'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Building2, Cpu, Users, Zap } from 'lucide-react';

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

  useEffect(() => {
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
    <div className="min-h-screen relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Particle Effects */}
      <ParticleField isLoaded={isLoaded} />
      
      {/* Navigation */}
      {/* <Navigation /> */}

      {/* Hero Section */}
      <HeroSection scrollToSection={scrollToSection} isLoaded={isLoaded} />
    </div>
  );
}

function ParticleField({ isLoaded }: { isLoaded: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!isLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles with electric theme
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 60; i++) {
        particlesRef.current.push({
          id: i,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.6 + 0.2,
          size: Math.random() * 2 + 0.5
        });
      }
    };

    initParticles();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle with electric blue glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        // Create electric glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        gradient.addColorStop(0, `rgba(59, 130, 246, ${particle.opacity})`);
        gradient.addColorStop(0.5, `rgba(147, 197, 253, ${particle.opacity * 0.3})`);
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Draw electric connections
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            
            const opacity = 0.15 * (1 - distance / 120);
            const gradient = ctx.createLinearGradient(
              particle.x, particle.y,
              otherParticle.x, otherParticle.y
            );
            gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity})`);
            gradient.addColorStop(0.5, `rgba(147, 197, 253, ${opacity * 0.8})`);
            gradient.addColorStop(1, `rgba(59, 130, 246, ${opacity})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isLoaded]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-10 transition-opacity duration-2000 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
}

// function Navigation() {
//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">
//         <div className="flex items-center space-x-3">
//           <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded border border-blue-400 flex items-center justify-center">
//             <Cpu className="w-5 h-5 text-white" />
//           </div>
//           <span className="text-white font-bold text-xl">ChipTech</span>
//         </div>
        
//         <div className="hidden md:flex items-center space-x-8">
//           <a href="#" className="text-slate-300 hover:text-white transition-colors">Products</a>
//           <a href="#" className="text-slate-300 hover:text-white transition-colors">Technology</a>
//           <a href="#" className="text-slate-300 hover:text-white transition-colors">Solutions</a>
//           <a href="#" className="text-slate-300 hover:text-white transition-colors">About</a>
//         </div>
        
//         <div className="flex items-center space-x-4">
//           <button className="text-slate-300 hover:text-white transition-colors px-4 py-2 rounded-lg border border-slate-600 hover:border-slate-500">
//             Contact
//           </button>
//           <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
//             Get Quote
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// }

function CountUpNumber({ end, duration, delay, suffix = "" }: { end: number; duration: number; delay: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let startTime: number;
    let animationId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(end * easeOut));

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [started, end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

function StatsSection({ isLoaded }: { isLoaded: boolean }) {
  return (
    <div className={`grid grid-cols-3 gap-6 max-w-4xl mx-auto mb-12 transition-all duration-1000 ${
      isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`} style={{ transitionDelay: '900ms' }}>
      <div className="text-center group border border-slate-600/60 rounded-lg p-6 hover:border-blue-500/60 transition-all duration-300 bg-slate-800/30 backdrop-blur-sm">
        <div className="flex justify-center mb-3">
          <Building2 className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
        </div>
        <div className="text-3xl font-bold text-white mb-2">
          <CountUpNumber end={850} duration={2000} delay={1500} suffix="+" />
        </div>
        <div className="text-sm text-slate-300 font-medium uppercase tracking-wide">Companies Served</div>
      </div>
      
      <div className="text-center group border border-slate-600/60 rounded-lg p-6 hover:border-blue-500/60 transition-all duration-300 bg-slate-800/30 backdrop-blur-sm">
        <div className="flex justify-center mb-3">
          <Cpu className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
        </div>
        <div className="text-3xl font-bold text-white mb-2">
          <CountUpNumber end={25} duration={2000} delay={1700} suffix="M+" />
        </div>
        <div className="text-sm text-slate-300 font-medium uppercase tracking-wide">Chips Manufactured</div>
      </div>
      
      <div className="text-center group border border-slate-600/60 rounded-lg p-6 hover:border-blue-500/60 transition-all duration-300 bg-slate-800/30 backdrop-blur-sm">
        <div className="flex justify-center mb-3">
          <Users className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
        </div>
        <div className="text-3xl font-bold text-white mb-2">
          <CountUpNumber end={15} duration={2000} delay={1900} suffix="+" />
        </div>
        <div className="text-sm text-slate-300 font-medium uppercase tracking-wide">Years Experience</div>
      </div>
    </div>
  );
}

function HeroSection({ scrollToSection, isLoaded }: { 
  scrollToSection: (sectionId: string) => void;
  isLoaded: boolean;
}) {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative z-20 pt-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Main Heading */}
        <div className="space-y-6 mb-8">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
            {/* Better Chip. Better Ride. */}
            <div className={`transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '300ms' }}>
              <span className="text-slate-400">Better</span>{' '}
              <span className="text-white">Chip.</span>{' '}
              <span className="text-slate-400">Better</span>{' '}
              <span className="text-white">Ride.</span>
            </div>
            
            {/* Better Power. */}
            <div className={`transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '500ms' }}>
              <span className="text-slate-400">Better</span>{' '}
              <span className="text-white">Power.</span>
            </div>
          </h1>
        </div>

        {/* Description */}
        <div className={`max-w-3xl mx-auto mb-12 transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '700ms' }}>
          <p className="text-xl text-slate-300 leading-relaxed">
            Leading manufacturer of high-performance electric vehicle chips<br />
            powering the future of sustainable transportation.
          </p>
        </div>

        {/* Company Statistics */}
        <StatsSection isLoaded={isLoaded} />

        {/* CTA Button */}
        <div className={`flex justify-center transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '1100ms' }}>
          <button className="group relative bg-slate-800/60 hover:bg-slate-700/60 border border-slate-600 hover:border-blue-500/60 text-white px-10 py-4 rounded-xl font-semibold transition-all duration-500 flex items-center space-x-3 backdrop-blur-sm">
            {/* Electric glow effect */}
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-500/20 via-blue-400/25 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-sm"></div>
            
            <div className="relative flex items-center space-x-3">
              <Zap className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
              <span className="group-hover:text-blue-50 transition-colors duration-300">Explore Products</span>
            </div>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => scrollToSection('technology')}
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-400 hover:text-blue-400 transition-all duration-300 ${
          isLoaded ? 'opacity-100 animate-bounce' : 'opacity-0'
        }`}
        style={{ transitionDelay: '1500ms' }}
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  );
}