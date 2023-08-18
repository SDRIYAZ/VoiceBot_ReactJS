import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import './BreadcrumbComponent.css';
import icon from '../../assets/HomePage_Assets/mathsicon.png';


const BreadcrumbComponent = () => {
    const dataToPass = "Maths";
    const dataToPass1 = "Chapter-1";
    const dataToPass2 = "Intro to Real Numbers";

  return (
    
      <Breadcrumb className="custom-breadcrumb">
      <Breadcrumb.Item href="/" className="breadcrumb-item">
        <img src={icon} alt="Home" className="breadcrumb-icon" /> Mathematics
      </Breadcrumb.Item>
      <Breadcrumb.Item href="childpage/childpage/chapters" className="breadcrumb-item"> Chapter-1
      </Breadcrumb.Item>
      <Breadcrumb.Item active className="breadcrumb-item">
        Intro to Real Numbers
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
