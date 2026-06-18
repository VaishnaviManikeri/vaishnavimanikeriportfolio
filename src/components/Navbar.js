// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  
    // frontend/src/components/Navbar.js - Add Blog link in navLinks array
const navLinks = [
  { path: '/', name: 'Home' },
    { path: '/about', name: 'About' },

  { path: '/projects', name: 'Projects' },
  { path: '/services', name: 'Services' },

  { path: '/contact', name: 'Contact' },

  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'glass-effect py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex flex-col">
            <Link to="/" className="group relative">
              <span className="text-2xl font-bold gradient-text">Vaishnavi Manikeri</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <div className="hidden sm:block">
              <span className="text-xs text-gray-400">Full Stack Developer | Freelance Available</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-purple-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
                )}
              </Link>
            ))}
            
            {/* Contact Button */}
            <Link
              to="/contact"
              className="ml-4 px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover-glow transition-all duration-300 hover:scale-105"
            >
              Contact Me
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg glass-effect"
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6 text-white" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 mt-4' : 'max-h-0'
        }`}>
          <div className="glass-effect p-4 flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive(link.path)
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile Contact Button */}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 mt-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium text-center hover-glow transition-all"
            >
              Contact Me
            </Link>
            
            {/* Mobile Slogan */}
            <div className="mt-3 pt-3 border-t border-white/10 text-center">
              <span className="text-xs text-gray-400">Available for freelance opportunities</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;