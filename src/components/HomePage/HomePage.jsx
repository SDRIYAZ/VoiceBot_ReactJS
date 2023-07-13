import React from 'react'
import Navbar from './Navbar'
import Banner from './Banner';
import OurProjects from './OurProjects';
import OurFeatures from './OurFeatures';
import NewsLetter from './NewsLetter';
import ParentsVoice from './ParentsVoice';
import Footer from './Footer';
import "./homepage.css";

const HomePage = () => {
  return (
    <>
        <Navbar />
        <Banner />
        <OurProjects />
        <OurFeatures />
        <ParentsVoice />
        <NewsLetter />
        <Footer />
    </>
  )
}

export default HomePage
