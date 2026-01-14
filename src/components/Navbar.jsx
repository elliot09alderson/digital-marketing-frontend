import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Course', href: '#course' },
    { name: 'Register', href: '#register' },
  ];

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-50 px-4 md:px-6 py-3 md:py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo - Smaller on mobile */}
          <a href="#" className="flex items-center gap-2 group">
            <img 
              src="/logo-2.jpeg" 
              alt="Logo" 
              className="w-12 h-12 md:w-20 md:h-20 ml-4 rounded-full object-cover border-2 border-primary-500/30 group-hover:border-primary-400 transition-colors shadow-lg"
            />
          </a>

          {/* Hamburger Menu - Mobile Only */}
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden w-10 h-10 rounded-lg bg-dark-800/80 backdrop-blur-sm border border-dark-700/50 flex items-center justify-center text-white hover:text-primary-400 hover:border-primary-500/30 transition-all"
            aria-label="Open menu"
          >
            <FiMenu className="text-xl" />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm z-[100] md:hidden"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-72 bg-dark-900 border-l border-dark-700/50 z-[101] md:hidden"
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-4 border-b border-dark-700/50">
                <img 
                  src="/logo-2.jpeg" 
                  alt="Logo" 
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary-500/30"
                />
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-10 h-10 rounded-lg bg-dark-800 border border-dark-700/50 flex items-center justify-center text-white hover:text-primary-400 transition-colors"
                  aria-label="Close menu"
                >
                  <FiX className="text-xl" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="p-4">
                <ul className="space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <a
                        href={link.href}
                        onClick={() => setIsSidebarOpen(false)}
                        className="block px-4 py-3 rounded-xl text-dark-300 hover:text-white hover:bg-primary-500/10 border border-transparent hover:border-primary-500/20 transition-all duration-300"
                      >
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* CTA Button */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-dark-700/50">
                <a
                  href="#register"
                  onClick={() => setIsSidebarOpen(false)}
                  className="block w-full py-3 rounded-xl bg-primary-500 text-white text-center font-semibold hover:bg-primary-600 transition-colors"
                >
                  Register Now
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
