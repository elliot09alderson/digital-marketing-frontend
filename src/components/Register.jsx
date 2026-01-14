import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiPhone, FiMail, FiSend, FiMapPin, FiBriefcase, FiChevronDown } from 'react-icons/fi';
import { BsCheck2 } from 'react-icons/bs';
import { API_URL } from '../config/api';

const countries = [
  'India', 'United States', 'United Kingdom', 'Canada', 'Australia', 
  'Germany', 'France', 'UAE', 'Singapore', 'Other'
];

const cities = {
  'India': ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Other'],
  'United States': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Other'],
  'United Kingdom': ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow', 'Other'],
  'Canada': ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa', 'Other'],
  'Australia': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Other'],
  'Germany': ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Other'],
  'France': ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Other'],
  'UAE': ['Dubai', 'Abu Dhabi', 'Sharjah', 'Other'],
  'Singapore': ['Singapore'],
  'Other': ['Other'],
};

const professions = [
  'Student', 'Fresher', 'Working Professional', 'Business Owner', 
  'Freelancer', 'Content Creator', 'Entrepreneur', 'Homemaker', 'Other'
];


const Register = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '', 
    email: '',
    country: '',
    city: '',
    profession: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Reset city when country changes
    if (name === 'country') {
      setFormData(prev => ({ ...prev, country: value, city: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${API_URL}/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({ type: 'success', message: '🎉 Registration successful! We will contact you soon.' });
        setFormData({ name: '', phone: '', email: '', country: '', city: '', profession: '' });
      } else {
        setSubmitStatus({ type: 'error', message: data.message || 'Registration failed. Please try again.' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Server error. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableCities = formData.country ? cities[formData.country] || ['Other'] : [];

  return (
    <section id="register" className="relative py-24 px-4 min-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
        >
          <source src="/form-bg.mp4" type="video/mp4" />
        </video>
        {/* Dark Overlay - Lighter for better visibility */}
        <div className="absolute inset-0 bg-dark-950/70 backdrop-blur-[1px]" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-950/40 via-transparent to-primary-900/30" />
      </div>

      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary-500/20 rounded-full blur-[150px] pulse-glow z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-primary-600/15 rounded-full blur-[120px] z-0" />

      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left - Text */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <span className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-primary-500/15 border border-primary-500/30 text-primary-400 text-sm font-medium backdrop-blur-sm">
            🎓 Reserve Your Seat Now
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Ready to Start Your{' '}
            <span className="text-gradient">Digital Journey?</span>
          </h2>

          <p className="text-lg text-dark-300 leading-relaxed">
            Fill the form to join our upcoming Digital Marketing Business Training Batch.
            <span className="block mt-2 text-primary-400 font-medium">
              Register now to secure your spot.
            </span>
          </p>
          
          {/* Social Proof */}
          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full border-2 border-dark-900 overflow-hidden">
                <img src="/coin-std/abhishek-raj.jpeg" alt="Student" className="w-full h-full object-cover" />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-dark-900 overflow-hidden">
                <img src="/coin-std/bhumika-das.jpeg" alt="Student" className="w-full h-full object-cover" />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-dark-900 overflow-hidden">
                <img src="/coin-std/kirti-verma.jpeg" alt="Student" className="w-full h-full object-cover" />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-dark-900 overflow-hidden">
                <img src="/coin-std/praveen-suneja.jpeg" alt="Student" className="w-full h-full object-cover" />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-dark-900 bg-primary-600 flex items-center justify-center text-xs font-bold text-white">
                +500
              </div>
            </div>
            <span className="text-dark-300 text-sm">Students enrolled</span>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-3 pt-2">
            {['100% Practical', 'Live Sessions', 'Certificate'].map((item, i) => (
              <span key={i} className="flex items-center gap-2 text-dark-300 text-sm bg-dark-800/80 px-3 py-2 rounded-lg border border-dark-700/50 backdrop-blur-sm">
                <BsCheck2 className="text-primary-400" />
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right - Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="card-water-glass p-8">
            {/* Top glow line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary-400/50 to-transparent" />
            
            {/* Form Header */}
            <div className="text-center mb-6 relative z-10">
              <div className="w-14 h-14 rounded-xl bg-primary-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-500/30">
                <FiSend className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Get Started Today</h3>
              <p className="text-dark-400 text-sm mt-1">Join the next batch</p>
            </div>

            {/* Submit Status Message */}
            {submitStatus.message && (
              <div className={`mb-4 p-3 rounded-xl text-center text-sm ${
                submitStatus.type === 'success' 
                  ? 'bg-green-500/20 border border-green-500/30 text-green-400' 
                  : 'bg-red-500/20 border border-red-500/30 text-red-400'
              }`}>
                {submitStatus.message}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              {/* Name - Full Width */}
              <div className="relative group">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-500 text-lg group-focus-within:text-primary-400 transition-colors" />
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-dark-800/50 border border-dark-600/50 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 focus:bg-dark-800/80 transition-all duration-300"
                  required
                />
              </div>

              {/* Phone - Full Width */}
              <div className="relative group">
                <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-500 text-lg group-focus-within:text-primary-400 transition-colors" />
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-dark-800/50 border border-dark-600/50 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 focus:bg-dark-800/80 transition-all duration-300"
                  required
                />
              </div>

              {/* Country & City - Two in one row */}
              <div className="grid grid-cols-2 gap-3">
                {/* Country Dropdown */}
                <div className="relative group">
                  <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-500 text-lg group-focus-within:text-primary-400 transition-colors pointer-events-none" />
                  <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-500 text-sm pointer-events-none" />
                  <select 
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full pl-12 pr-8 py-3.5 rounded-xl bg-dark-800/50 border border-dark-600/50 text-white appearance-none focus:outline-none focus:border-primary-500/50 focus:bg-dark-800/80 transition-all duration-300 cursor-pointer"
                    required
                  >
                    <option value="" disabled className="bg-dark-800">Country</option>
                    {countries.map((country) => (
                      <option key={country} value={country} className="bg-dark-800">{country}</option>
                    ))}
                  </select>
                </div>

                {/* City Dropdown */}
                <div className="relative group">
                  <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-500 text-lg group-focus-within:text-primary-400 transition-colors pointer-events-none" />
                  <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-500 text-sm pointer-events-none" />
                  <select 
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full pl-12 pr-8 py-3.5 rounded-xl bg-dark-800/50 border border-dark-600/50 text-white appearance-none focus:outline-none focus:border-primary-500/50 focus:bg-dark-800/80 transition-all duration-300 cursor-pointer disabled:opacity-50"
                    required
                    disabled={!formData.country}
                  >
                    <option value="" disabled className="bg-dark-800">City</option>
                    {availableCities.map((city) => (
                      <option key={city} value={city} className="bg-dark-800">{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Profession - Full Width */}
              <div className="relative group">
                <FiBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-500 text-lg group-focus-within:text-primary-400 transition-colors pointer-events-none" />
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-500 text-sm pointer-events-none" />
                <select 
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  className="w-full pl-12 pr-8 py-3.5 rounded-xl bg-dark-800/50 border border-dark-600/50 text-white appearance-none focus:outline-none focus:border-primary-500/50 focus:bg-dark-800/80 transition-all duration-300 cursor-pointer"
                  required
                >
                  <option value="" disabled className="bg-dark-800">Your Profession</option>
                  {professions.map((profession) => (
                    <option key={profession} value={profession} className="bg-dark-800">{profession}</option>
                  ))}
                </select>
              </div>

              {/* Email - Optional */}
              <div className="relative group">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-500 text-lg group-focus-within:text-primary-400 transition-colors" />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address (Optional)"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-dark-800/50 border border-dark-600/50 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/50 focus:bg-dark-800/80 transition-all duration-300"
                />
              </div>

              {/* Submit - Rolling Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl btn-rolling disabled:opacity-60"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2 h-[56px]">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <div className="btn-text-wrapper">
                    <span className="btn-text">
                      Confirm Registration
                      <FiSend />
                    </span>
                    <span className="btn-text-hover">
                      Confirm Registration
                      <FiSend />
                    </span>
                  </div>
                )}
              </button>
              
              <p className="text-center text-dark-500 text-xs">
                🔒 Your information is secure
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Register;
