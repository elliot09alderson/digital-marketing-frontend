import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhoIsItFor from './components/WhoIsItFor';
import Highlights from './components/Highlights';
import WhyDifferent from './components/WhyDifferent';
import MotivationalQuote from './components/MotivationalQuote';
import Testimonials from './components/Testimonials';
import Register from './components/Register';
import Footer from './components/Footer';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// Home Page Component
function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || 
          e.target.closest('a') || e.target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-primary-500/30 selection:text-white relative">
      {/* Custom Cursor */}
      <div 
        className={`custom-cursor ${isHovering ? 'hover' : ''}`}
        style={{ left: mousePosition.x, top: mousePosition.y }}
      />
      <div 
        className="cursor-dot"
        style={{ left: mousePosition.x, top: mousePosition.y }}
      />

      {/* Navbar with Logo */}
      <Navbar />

      <main className="w-full relative z-10">
        <Hero />
        <WhoIsItFor />
        <Highlights />
        <WhyDifferent />
        <MotivationalQuote />
        <Testimonials />
        <Register />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
