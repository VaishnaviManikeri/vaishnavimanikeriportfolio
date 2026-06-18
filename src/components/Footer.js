// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { GithubIcon, LinkedinIcon, MailIcon, TwitterIcon } from '../components/Icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-effect mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold gradient-text mb-4">Alex Rivera</h3>
            <p className="text-gray-400 max-w-md">
              Building exceptional digital experiences with modern web technologies.
              Let's create something amazing together.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Projects', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-purple-500/20 transition-all hover-glow">
                <GithubIcon className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-purple-500/20 transition-all hover-glow">
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-purple-500/20 transition-all hover-glow">
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a href="mailto:alex@example.com" className="p-2 rounded-full bg-white/5 hover:bg-purple-500/20 transition-all hover-glow">
                <MailIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Alex Rivera. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;