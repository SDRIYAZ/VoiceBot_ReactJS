import './Freshlandingpage.css'
import { useState } from 'react';
import Leftmenu from './Freshleftmenu.jsx'
import FreshNavbar from './Freshnavbar.jsx';
import { Outlet } from 'react-router-dom';
import PopupVideo from './PopupVideo';
import videoUrl from 'assets/HomePage_Assets/motivationalspeaker.mp4'

function Freshlandingpage() {
  const [videoCompleted, setVideoCompleted] = useState(false);

  const handleVideoCompletion = () => {
    setVideoCompleted(true);
  };

  return (
    <>
      <div className='Freshlandingpagemain' style={{ backgroundColor: "#dbdbf7", width: "100%", padding: "1.25rem 1rem .5rem 1rem" }}>
        <div className='Freshleftmenu'>
          <Leftmenu></Leftmenu>
        </div>
        <div className='Freshnavbar'>
          <FreshNavbar></FreshNavbar>

          <Outlet></Outlet>
        </div>
      </div>
      {/* <PopupVideo
        videoUrl= {videoUrl}
        onClose={handleVideoCompletion}
      /> */}
    </>
  )
}

export default Freshlandingpage;