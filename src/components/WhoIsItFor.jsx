import React from 'react';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaStore, FaBriefcase, FaLaptopCode, FaHandHoldingUsd } from 'react-icons/fa';
import { BsCheckLg } from 'react-icons/bs';

const audiences = [
  { text: "Students & Freshers", icon: <FaUserGraduate /> },
  { text: "Business Owners & Shopkeepers", icon: <FaStore /> },
  { text: "Working Professionals", icon: <FaBriefcase /> },
  { text: "Freelancers & Content Creators", icon: <FaLaptopCode /> },
  { text: "Anyone Who Wants Income + Skills", icon: <FaHandHoldingUsd /> },
];

const WhoIsItFor = () => {
  return (
    <section className="py-24 px-4 section-light-bg relative overflow-hidden">
      {/* Content above bg */}
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary-600 text-sm font-semibold tracking-widest uppercase mb-3 block">
            Perfect For You
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-dark-900 mb-4">
            Who Is This Training For?
          </h2>
          <div className="w-16 h-1 bg-primary-500 mx-auto rounded-full" />
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {audiences.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card-light p-6 flex items-center gap-4 group transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-600 text-xl flex-shrink-0 group-hover:bg-primary-500 group-hover:text-white group-hover:border-primary-500 transition-all duration-300">
                {item.icon}
              </div>
              
              {/* Text */}
              <div className="flex-1">
                <h3 className="text-dark-800 font-semibold">{item.text}</h3>
              </div>

              {/* Check */}
              <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary-500/30">
                <BsCheckLg className="text-white text-sm" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <span className="inline-flex items-center gap-2 text-primary-700 font-medium bg-primary-50 px-6 py-3 rounded-full border border-primary-100">
            ✨ No technical background required
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoIsItFor;
