import React from 'react';
import { FaInstagram, FaLinkedin, FaYoutube, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const socialLinks = [
    { icon: <FaInstagram />, href: '#', label: 'Instagram' },
    { icon: <FaLinkedin />, href: '#', label: 'LinkedIn' },
    { icon: <FaYoutube />, href: '#', label: 'YouTube' },
    { icon: <FaWhatsapp />, href: '#', label: 'WhatsApp' },
  ];

  return (
    <footer className="py-12 px-4 section-dark border-t border-dark-700/30 relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[150px] bg-primary-500/10 rounded-full blur-[80px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src="/logo-2.jpeg" 
              alt="Logo" 
              className="w-[72px] h-[72px] rounded-full object-cover border-2 border-primary-500/30 shadow-lg"
            />
            <span className="text-xl font-semibold text-white">Business Training</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                aria-label={link.label}
                className="w-10 h-10 rounded-lg bg-dark-800 border border-dark-700/50 flex items-center justify-center text-dark-400 text-lg hover:text-primary-400 hover:border-primary-500/30 hover:bg-dark-700 transition-all duration-300"
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-dark-700 to-transparent" />

          {/* Copyright */}
          <p className="text-dark-500 text-sm text-center">
            © {new Date().getFullYear()} Digital Marketing Business Training. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
