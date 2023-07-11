import React from 'react'
import Navbar from './Navbar'
import Banner from './Banner';
import OurProjects from './OurProjects';
import OurFeatures from './OurFeatures';
import "./homepage.css";

const HomePage = () => {
  return (
    <>
        <Navbar />
        <Banner />
        <OurProjects />
        <OurFeatures />
    </>
  )
}

export default HomePage
