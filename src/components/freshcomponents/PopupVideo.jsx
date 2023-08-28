import React, { useEffect, useState } from 'react';
const PopupVideo = ({ videoUrl, onClose }) => {
    const [videoVisible, setVideoVisible] = useState(true);
    const handleVideoEnded = () => {
        setVideoVisible(false);
        onClose();
    };
    const handleCloseButtonClick = () => {
        setVideoVisible(false);
        onClose();
    };

    useEffect(() => {
        if (videoVisible) {
            // Logic to start playing the video when the component mounts
            const videoElement = document.getElementById('popup-video');
            videoElement.play();
        }
    }, [videoVisible]);
    return (
        // <button className="close-button" onClick={handleCloseButtonClick} style={{width:"8rem", borderRadius:"10px",height : "2rem", marginTop: "25rem"}}>Close</button>
        <div className={`popup-video-container ${videoVisible ? 'visible' : 'hidden'}`}>
            <video id="popup-video" onEnded={handleVideoEnded}>
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className='popup_button'>

                <button className="close-button" onClick={handleCloseButtonClick} style={{
                    width: "8rem", borderRadius: "10px", height: "2rem", marginTop: "25rem", position: "absolute", bottom: "30rem",
                    right: "10rem", background: "rgb(112 131 139)", color: "white"
                }}>close</button>
            </div>
        </div>
    );
};

export default PopupVideo;