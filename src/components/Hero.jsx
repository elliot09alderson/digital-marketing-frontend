import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { HiOutlineUsers, HiOutlineStar, HiOutlineLightningBolt } from 'react-icons/hi';

const stats = [
  { value: '500+', label: 'Students Trained', icon: <HiOutlineUsers /> },
  { value: '4.9★', label: 'Average Rating', icon: <HiOutlineStar /> },
  { value: '50+', label: 'Live Projects', icon: <HiOutlineLightningBolt /> },
];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 section-dark grid-bg overflow-hidden">
      {/* Background Glows - More Visible */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary-500/20 rounded-full blur-[150px] pulse-glow" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-primary-600/15 rounded-full blur-[120px] pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/10 rounded-full blur-[200px]" />

      {/* Moving Orbital Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px]">
        <div className="orbit">
          <div className="w-2 h-2 bg-primary-400 rounded-full" />
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]">
        <div className="orbit-reverse">
          <div className="w-3 h-3 border border-primary-500/50 rounded-full" />
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-32 left-16 w-3 h-3 bg-primary-400 rounded-full float opacity-80" />
      <div className="absolute top-48 right-24 w-2 h-2 bg-primary-500 rounded-full float-slow opacity-60" />
      <div className="absolute bottom-40 left-1/4 w-4 h-4 border border-primary-400/40 rounded float-delay" />
      <div className="absolute top-1/3 right-1/4 w-6 h-6 border border-primary-500/20 rounded-lg rotate-45 float-reverse" />
      <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-primary-300 rounded-full float" />

      <div className="text-center max-w-5xl mx-auto space-y-8 z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-400 text-sm font-medium backdrop-blur-sm">
            <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
            Digital Marketing Business Training Program
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1]"
        >
          <span className="text-white">Learn. </span>
          <span className="text-gradient">Practice.</span>
          <span className="text-white"> Earn.</span>
          <span className="block text-2xl sm:text-3xl md:text-4xl font-medium text-dark-400 mt-6">
            Grow Your Own Digital Business
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-dark-400 max-w-2xl mx-auto leading-relaxed"
        >
          Master practical digital marketing skills that help you get clients, 
          build brands, and earn online — <span className="text-primary-400">even if you're a beginner.</span>
        </motion.p>
        
        {/* CTA - Rolling Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-4"
        >
          <a href="#register" className="btn-rolling inline-block">
            <div className="btn-text-wrapper">
              <span className="btn-text">
                Free Registration
                <FiArrowRight />
              </span>
              <span className="btn-text-hover">
                Free Registration
                <FiArrowRight />
              </span>
            </div>
          </a>
        </motion.div>

        {/* Stats Card - Single Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="pt-12"
        >
          <div className="glass-stats rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="grid grid-cols-3 divide-x divide-primary-500/20">
              {stats.map((stat, index) => (
                <div key={index} className="text-center px-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mx-auto mb-3 text-primary-400 text-xl">
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-dark-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
