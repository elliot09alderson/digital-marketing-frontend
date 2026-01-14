import React from 'react';
import { motion } from 'framer-motion';
import { HiSparkles } from 'react-icons/hi2';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const MotivationalQuote = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden section-light-bg grid-bg-light">
      {/* Green Patches - Both Sides like Hero */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[400px] h-[400px] bg-primary-500/20 rounded-full blur-[150px] pulse-glow" />
      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[400px] h-[400px] bg-primary-500/20 rounded-full blur-[150px] pulse-glow" style={{ animationDelay: '2s' }} />
      
      {/* Center subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary-600/10 rounded-full blur-[100px]" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto relative z-10 text-center"
      >
        {/* Header Label */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2">
            <HiSparkles className="text-primary-600 text-xl" />
            <span className="text-primary-600 text-xs font-semibold tracking-widest uppercase">Words of Wisdom</span>
            <HiSparkles className="text-primary-600 text-xl" />
          </div>
        </div>

        {/* Quote with Cursive Font */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative px-8"
        >
          <FaQuoteLeft className="absolute top-0 left-0 text-primary-500/30 text-2xl md:text-3xl" />
          
          <p 
            className="text-xl md:text-2xl lg:text-3xl text-dark-800 leading-relaxed"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
          >
            The best time to start was{' '}
            <span className="text-primary-600 font-semibold" style={{ fontFamily: "'Dancing Script', cursive", fontStyle: 'normal' }}>yesterday.</span>
            <br />
            The next best time is{' '}
            <span className="text-primary-500 font-bold" style={{ fontFamily: "'Dancing Script', cursive", fontStyle: 'normal', fontSize: '1.2em' }}>NOW.</span>
          </p>
          
          <FaQuoteRight className="absolute bottom-0 right-0 text-primary-500/30 text-2xl md:text-3xl" />
        </motion.blockquote>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary-500 to-transparent mx-auto mt-8"
        />
      </motion.div>
    </section>
  );
};

export default MotivationalQuote;
