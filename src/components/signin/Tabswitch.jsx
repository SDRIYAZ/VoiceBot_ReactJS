import React, { useState } from 'react';
import './tabswitch.css';

const TabSwitch = ({ switchTab }) => {
  const [activeTab, setActiveTab] = useState('left');

  const handleTabClick = (direction) => {
    if (activeTab === direction) return;
    setActiveTab(direction);
    switchTab(direction);
    // handleTabClick(tab);
  };

  return (
    <main>
      <h2 className="login-title">Login to your account</h2>
      <div className="wrapper">
        <div className={`taeb-switch ${activeTab} text-center`}>
          <div
            className={`taeb ${activeTab === 'left' ? 'active' : ''}`}
            taeb-direction="left"
            onClick={() => handleTabClick('left')}
          >
            Mobile
          </div>
          <div
            className={`taeb ${activeTab === 'center' ? 'active' : ''}`}
            taeb-direction="center"
            onClick={() => handleTabClick('center')}
          >
            Face ID
          </div>
          <div
            className={`taeb ${activeTab === 'right' ? 'active' : ''}`}
            taeb-direction="right"
            onClick={() => handleTabClick('right')}
          >
           Voice ID
          </div>
        </div>
      </div>
    </main>
  );
};

export default TabSwitch;
