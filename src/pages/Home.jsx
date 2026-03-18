import React from 'react';
import Hero from '../components/Hero';
import Destinations from '../components/Destinations';
import WhyUs from '../components/WhyUs';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import ContactFAQ from '../components/ContactFAQ';

const Home = () => {
  return (
    <>
      <Hero />
      <Destinations />
      <WhyUs />
      <div className="w-full h-24 bg-gradient-to-b from-slate-50 to-brand-dark pointer-events-none"></div>
      <Testimonials />
      <div className="bg-white">
        <ContactFAQ />
      </div>
      <Newsletter />
    </>
  );
};

export default Home;
