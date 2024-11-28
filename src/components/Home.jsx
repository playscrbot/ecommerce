import React, { useState, useEffect } from 'react';
import FAQSection from '../views/FAQSection';
import FeaturedSection from '../views/FeaturedSection';
import HeroSection from '../views/HeroSection';
import HighlightsSection from '../views/HighlightsSection';
import Testimonials from '../views/Testimonials';
import PopupSection from '../views/PopupSection';

function Home() {
  const [showPopup, setShowPopup] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 15000); // 15 seconds delay
  }, []);
  
  return (
    <div>
      <HeroSection />
      <FeaturedSection />
      <HighlightsSection />
      <Testimonials />
      <FAQSection />
      {showPopup && <PopupSection />}
    </div>
  )
}

export default Home;