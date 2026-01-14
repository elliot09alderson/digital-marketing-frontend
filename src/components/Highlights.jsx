import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaPenNib, FaWhatsapp, FaUsers, FaBuilding, FaProjectDiagram } from 'react-icons/fa';
import { HiOutlineArrowRight } from 'react-icons/hi';

const highlights = [
  { 
    title: "Social Media Marketing", 
    subtitle: "Instagram, Facebook, Reels", 
    icon: <FaInstagram />,
  },
  { 
    title: "Content & Caption Writing", 
    subtitle: "Copywriting & Storytelling", 
    icon: <FaPenNib />,
  },
  { 
    title: "WhatsApp Marketing", 
    subtitle: "Automation & Business Tools", 
    icon: <FaWhatsapp />,
  },
  { 
    title: "Client Handling & Pricing", 
    subtitle: "Negotiation Strategy", 
    icon: <FaUsers />,
  },
  { 
    title: "Freelancing & Agency Setup", 
    subtitle: "Start Your Digital Agency", 
    icon: <FaBuilding />,
  },
  { 
    title: "Real Projects + Live Practice", 
    subtitle: "Hands-on Experience", 
    icon: <FaProjectDiagram />,
  },
];

const Highlights = () => {
  return (
    <section className="py-24 px-4 section-dark grid-bg relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-500/15 rounded-full blur-[150px] pulse-glow" />
      <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-primary-600/10 rounded-full blur-[120px]" />

      {/* Floating decorative elements */}
      <div className="absolute top-20 right-20 w-3 h-3 bg-primary-500 rounded-full float opacity-60" />
      <div className="absolute bottom-32 left-16 w-2 h-2 border border-primary-400/50 rounded float-slow" />
      <div className="absolute top-1/3 left-10 w-8 h-8 border border-primary-500/10 rounded-lg rotate-45 float-reverse" />
      <div className="absolute bottom-1/4 right-1/4 w-6 h-6 border border-primary-400/15 rounded float-delay" />

      {/* Decorative squares */}
      <div className="absolute top-40 right-1/3 w-16 h-16 border border-primary-500/10 rounded-lg opacity-30" />
      <div className="absolute bottom-20 left-1/4 w-12 h-12 border border-primary-400/10 rounded opacity-20" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 text-sm font-semibold tracking-widest uppercase mb-3 block">
            Course Curriculum
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What You Will Learn
          </h2>
          <p className="text-dark-400 text-lg max-w-xl mx-auto">
            Complete course highlights covering everything you need
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="card-premium card-decorated p-6 group"
            >
              {/* Corner decorations */}
              <div className="corner-tl" />
              <div className="corner-br" />
              <div className="shine-line" />

              {/* Card decorative square */}
              <div className="absolute top-4 right-4 w-6 h-6 border border-primary-500/20 rounded opacity-50 group-hover:opacity-100 group-hover:border-primary-400/40 transition-all duration-300" />
              
              {/* Shiny dots */}
              <div className="absolute top-6 right-14 w-1.5 h-1.5 bg-primary-500/30 rounded-full group-hover:bg-primary-400/60 transition-all" />
              <div className="absolute top-10 right-6 w-1 h-1 bg-primary-400/20 rounded-full" />

              {/* Content */}
              <div className="flex items-start gap-4 relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400 text-2xl flex-shrink-0 group-hover:bg-primary-500/20 group-hover:border-primary-500/40 group-hover:shadow-lg group-hover:shadow-primary-500/10 transition-all duration-300">
                  {item.icon}
                </div>
                
                {/* Text */}
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-1 group-hover:text-primary-300 transition-colors">{item.title}</h3>
                  <p className="text-dark-400 text-sm">{item.subtitle}</p>
                </div>
              </div>

              {/* Bottom arrow indicator */}
              <div className="mt-4 pt-4 border-t border-dark-700/30 flex items-center justify-between">
                <span className="text-xs text-dark-500 uppercase tracking-wider">Learn More</span>
                <HiOutlineArrowRight className="text-primary-500/50 group-hover:text-primary-400 group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
