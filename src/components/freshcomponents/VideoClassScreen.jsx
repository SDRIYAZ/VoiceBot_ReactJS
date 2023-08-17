import React from 'react';
import './VideoClassScreen.css';
import '../../assets/HomePage_Assets/motivationalvideo.png'
import { Link } from 'react-router-dom';
// import video from 'video.js';
import motivationalspeaker from '../../assets/HomePage_Assets/motivationalspeaker.mp4'
import motivationalvideo from '../../assets/HomePage_Assets/motivationalvideo.png'
import assessmenticon from '../../assets/HomePage_Assets/assessmenticon.png'
import gobackicon from "../../assets/HomePage_Assets/gobackicon.png"
const VideoClassScreen = () => {
  return (
    <>
      <div className="videoClassScreenContainer">
        <div className="TopPart">
          <Link to="/childpage/childpage/chapters" style={{textDecoration:"none"}}>
            <div className="control-button back-button" >
              <img src={gobackicon} alt="Go Back" /> Go Back
            </div>
          </Link>

          <h2 className="video-title">Video Title Goes Here</h2>
          <div className="assessment-button" >
            Take Assessment <img src={assessmenticon} className='assessmenticon' alt="arrow" />
          </div>
        </div>
        <div className='Midpart'>
          <video
            id="my-video"
            className="video-js-topic"
            controls
            preload="auto"
            width="640"
            height="362"
            poster={motivationalvideo}
            data-setup="{}"
          >
            <source src={motivationalspeaker} type="video/mp4" />
            {/* <source src="MY_VIDEO.webm" type="video/webm" />  */}
            <p className="vjs-no-js-topic">
              To view this video please enable JavaScript, and consider upgrading to a web browser that supports HTML5 video player
            </p>
          </video>
        </div>
        <div className="PrevNextControls">
          <div className="bottom-left-button previous-topic" >
            <span className="arrow">&#8592;</span> Previous Topic
          </div>
          <div className="bottom-right-button next-topic" >
            Next Topic <span className="arrow">&#8594;</span>
          </div>
        </div>
      </div>
    </>

  )

};
export default VideoClassScreen;