import React, { useEffect, useState } from 'react';

const PopupVideo = ({ videoUrl, onClose }) => {
    const [videoVisible, setVideoVisible] = useState(true);

    const handleVideoEnded = () => {
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
        <div className={`popup-video-container ${videoVisible ? 'visible' : 'hidden'}`}>
            <video id="popup-video" onEnded={handleVideoEnded}>
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default PopupVideo;
