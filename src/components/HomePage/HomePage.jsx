// import React from 'react'
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'
import Banner from './Banner';
import OurProjects from './OurProjects';
import OurFeatures from './OurFeatures';
import NewsLetter from './NewsLetter';
import ParentsVoice from './ParentsVoice';
import LeadersVoice from "./LeadersVoice"
import Footer from './Footer';
import Spinner from './Spinner'
import "./homepage.css";


const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <>
      <Navbar />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Banner />
          <OurProjects />
          <OurFeatures />
          <ParentsVoice />
          <LeadersVoice />
          <NewsLetter />
          <Footer />
        </>
      )}
    </>
  );
};

export default HomePage
