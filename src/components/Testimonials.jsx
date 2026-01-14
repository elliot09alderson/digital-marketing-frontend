import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Vimudha Reddy',
    profession: 'Writer',
    image: '/testimonials/vimudha-reddy.jpeg',
    quote: 'This training completely transformed my approach to digital marketing. The practical skills I learned helped me promote my writing career like never before.',
    rating: 5,
  },
  {
    name: 'Sharnya Pal',
    profession: 'Lawyer',
    image: '/testimonials/sharnya-pal.jpeg',
    quote: 'As a lawyer, I never thought digital marketing would be relevant to me. But this course opened my eyes to client acquisition strategies that work!',
    rating: 5,
  },
  {
    name: 'Manoj',
    profession: 'Business Owner',
    image: '/testimonials/Manoj.jpeg',
    quote: 'The business-oriented approach is what sets this training apart. I went from zero online presence to getting consistent leads within weeks.',
    rating: 5,
  },
  {
    name: 'R. Krishna Reddy',
    profession: 'Entrepreneur',
    image: '/testimonials/R-krishna-reddy.jpeg',
    quote: 'Excellent training program! The live project experience gave me the confidence to handle real client work professionally.',
    rating: 5,
  },
  {
    name: 'Dr. KT Ajamal',
    profession: 'Healthcare Professional',
    image: '/testimonials/dr-kt-ajamal.jpeg',
    quote: 'Even as a doctor, understanding digital marketing has helped me reach more patients. Highly recommend this program!',
    rating: 5,
  },
  {
    name: 'MD Irfan',
    profession: 'Freelancer',
    image: '/testimonials/md-irfan.jpeg',
    quote: 'Started freelancing right after the course. The client acquisition strategies taught here actually work in the real world.',
    rating: 5,
  },
  {
    name: 'Sanjeevan Desai',
    profession: 'Marketing Consultant',
    image: '/testimonials/sanjeevan-desai.jpeg',
    quote: 'This course took my consulting business to the next level. The practical approach and lifetime support made all the difference.',
    rating: 5,
  },
];

const Testimonials = () => {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const scrollWidth = containerRef.current.scrollWidth;
        const clientWidth = window.innerWidth;
        // Ensure positive scroll range
        const range = Math.max(0, scrollWidth - clientWidth + 50);
        setScrollRange(range);
      }
      setIsMobile(window.innerWidth < 768);
    };

    // Delay to ensure content is rendered
    setTimeout(updateDimensions, 100);
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Transform scroll to horizontal movement (always negative to move left)
  const x = useTransform(scrollYProgress, [0, 1], [0, -Math.abs(scrollRange)]);

  return (
    <section 
      ref={sectionRef}
      className="relative section-dark"
      style={{ height: isMobile ? '150vh' : '200vh' }}
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center py-8">
        {/* Background Glows */}
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-primary-500/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-primary-600/10 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto w-full px-4 relative z-10">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <span className="text-primary-400 text-sm font-semibold tracking-widest uppercase mb-3 block">
              Success Stories
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              What Our Participants Say
            </h2>
            <div className="w-16 h-1 bg-primary-500 mx-auto rounded-full" />
          </motion.div>

          <motion.div 
            ref={containerRef}
            style={{ x }}
            className="flex gap-6 md:gap-8 will-change-transform"
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[280px] md:w-[380px]"
              >
                <div className="card-water-glass p-5 md:p-6 h-full relative group">
                  {/* Quote Icon */}
                  <div className="absolute top-4 right-4 text-primary-500/20 text-2xl md:text-3xl">
                    <FaQuoteLeft />
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-3 md:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-xs md:text-sm" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-dark-300 text-xs md:text-sm leading-relaxed mb-4 md:mb-6 min-h-[60px] md:min-h-[80px]">
                    "{testimonial.quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 md:gap-4 pt-3 md:pt-4 border-t border-primary-500/10">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-primary-500/30"
                    />
                    <div>
                      <h4 className="text-white font-semibold text-sm md:text-base">{testimonial.name}</h4>
                      <p className="text-primary-400 text-xs md:text-sm">{testimonial.profession}</p>
                    </div>
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-r border-b border-primary-500/20 rounded-br-lg opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
