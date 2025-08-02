"use client";
import React, { useState, useEffect, ReactNode } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import {MovingBorderDemo} from './MovingBorderDemo';

// Button Component Props Interface
interface ButtonProps {
  id?: string;
  title: string;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  containerClass?: string;
  onClick?: () => void;
}

// Button Component
const Button = ({ id, title, rightIcon, leftIcon, containerClass, onClick }: ButtonProps) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className={`group relative overflow-hidden px-3 sm:px-6 py-2.5 text-xs sm:text-sm font-medium transition-all duration-300 ${containerClass}`}
    >
      {leftIcon}
      <span className="relative inline-flex overflow-hidden tracking-wide">
        <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
          {title}
        </div>
        <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {title}
        </div>
      </span>
      {rightIcon}
    </button>
  );
};

// Navigation Item Interface
interface NavItem {
  name: string;
  hasDropdown: boolean;
  items?: string[];
}

const ElectricChipNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const navItems: NavItem[] = [
    { 
      name: 'Products', 
      hasDropdown: true,
      items: ['Microprocessors', 'Memory Chips', 'Power Management', 'Sensors']
    },
    { name: 'R&D Insights', hasDropdown: false },
    { name: 'Documentation', hasDropdown: false },
    { name: 'Support', hasDropdown: false },
    { name: 'About', hasDropdown: false }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-slate-800/95 backdrop-blur-sm border-b border-slate-700/50' 
        : 'bg-transparent'
    }`}>
      {/* Sunray gradient background */}
      <div className="absolute inset-0 h-8 bg-gradient-to-br from-slate-700/20 via-slate-800/30 to-slate-900/40 pointer-events-none"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-1.5">
        <div className="flex items-center justify-between h-14 sm:h-16">
          
          {/* Logo Section */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <MovingBorderDemo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item, index) => (
              <div 
                key={index} 
                className="relative"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center space-x-1 text-slate-300 hover:text-white transition-colors duration-200 py-2 px-1 text-sm font-medium">
                  <span>{item.name}</span>
                  {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                </button>
                
                {item.hasDropdown && activeDropdown === item.name && item.items && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-slate-800 border border-slate-700 shadow-xl overflow-hidden">
                    {item.items.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href="#"
                        className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700 transition-all duration-150 text-sm border-b border-slate-700/50 last:border-b-0"
                      >
                        {subItem}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* History Button */}
            <Button
              title="History"
              containerClass="bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white hidden sm:block"
            />
            
            {/* Lets Chip it Button */}
            <Button
              title="Lets Chip it"
              containerClass="bg-slate-600 hover:bg-slate-500 text-white border border-slate-500"
            />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden bg-slate-700 border border-slate-600 p-2 text-slate-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-slate-800 border-b border-slate-700 shadow-xl">
            <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-4">
              {navItems.map((item, index) => (
                <div key={index}>
                  <button className="flex items-center justify-between w-full text-left text-slate-300 hover:text-white transition-colors duration-200 py-2 text-sm font-medium">
                    <span>{item.name}</span>
                    {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                  </button>
                  {item.hasDropdown && item.items && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.items.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href="#"
                          className="block text-slate-400 hover:text-white transition-colors duration-200 py-1 text-sm"
                        >
                          {subItem}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="pt-4 border-t border-slate-700 space-y-3">
                <Button
                  title="History"
                  containerClass="bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white w-full sm:hidden"
                />
                <Button
                  title="Lets Chip it"
                  containerClass="bg-slate-600 hover:bg-slate-500 text-white border border-slate-500 w-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default ElectricChipNavbar;