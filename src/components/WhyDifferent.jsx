import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaMoneyBillWave, FaUserFriends, FaLifeRing, FaCertificate } from 'react-icons/fa';
import { HiOutlineCheck } from 'react-icons/hi';

const features = [
  { 
    text: "Business-oriented training", 
    subtitle: "Not just tools — real business skills",
    icon: <FaBriefcase />,
  },
  { 
    text: "Get paying clients", 
    subtitle: "Client acquisition strategies",
    icon: <FaMoneyBillWave />,
  },
  { 
    text: "Personal guidance", 
    subtitle: "Small batch for focused attention",
    icon: <FaUserFriends />,
  },
  { 
    text: "Lifetime support", 
    subtitle: "Ongoing guidance after course",
    icon: <FaLifeRing />,
  },
  { 
    text: "Certificate included", 
    subtitle: "Professional certification",
    icon: <FaCertificate />,
  },
];

const WhyDifferent = () => {
  return (
    <section className="py-24 px-4 section-with-bg-image relative overflow-hidden">
      {/* Content wrapper - above the rotated bg */}
      <div className="max-w-6xl mx-auto relative z-20">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary-300 text-sm font-semibold tracking-widest uppercase mb-3 block">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why This Training Is Different?
          </h2>
          <div className="w-16 h-1 bg-primary-400 mx-auto rounded-full" />
        </motion.div>

        {/* Features Grid - Water Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card-water-glass p-6 group"
            >
              {/* Content */}
              <div className="flex items-start gap-4 relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-primary-500/30 border border-primary-400/30 flex items-center justify-center text-primary-300 text-lg flex-shrink-0 group-hover:scale-105 group-hover:bg-primary-500/40 group-hover:shadow-lg group-hover:shadow-primary-500/20 transition-all duration-300">
                  {item.icon}
                </div>
                
                {/* Text */}
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-1 flex items-center gap-2 group-hover:text-primary-200 transition-colors">
                    {item.text}
                    <HiOutlineCheck className="text-primary-300 text-lg" />
                  </h3>
                  <p className="text-primary-100/70 text-sm">{item.subtitle}</p>
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute top-3 right-3 w-5 h-5 border border-primary-400/20 rounded opacity-50 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-3 left-3 w-3 h-3 bg-primary-400/10 rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-4 h-4 border border-primary-400/30 rounded float opacity-60 z-10" />
      <div className="absolute bottom-20 right-10 w-6 h-6 border border-primary-300/20 rounded-lg rotate-12 float-slow opacity-40 z-10" />
      <div className="absolute top-1/2 right-20 w-2 h-2 bg-primary-400/40 rounded-full float-reverse z-10" />
    </section>
  );
};

export default WhyDifferent;
