import React, { useRef, useState } from "react";
import VideoRecorder from "react-video-recorder";
import axios from "axios";

const VideoRecorderComponent = ({ mobileno, childno }) => {
  const [videoBlob, setVideoBlob] = useState(null);
  const [recording, setRecording] = useState(false);
  const [key, setKey] = useState(0); // Add key state to trigger remount
  const [isUploaded, setIsUploaded] = useState(false); // New state to track successful video upload
  const videoRecorderRef = useRef(null);

  const handleRecordingComplete = (videoBlob) => {
    setVideoBlob(videoBlob);
    setRecording(false);
  };

  const handleRecordClick = () => {
    setVideoBlob(null);
    setRecording(true);

    setTimeout(() => {
      if (recording) {
        videoRecorderRef.current.stopRecording();
      }
    }, 15000);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!videoBlob) return;

    const formData = new FormData();
    formData.append("mobile_number", mobileno);
    formData.append("child_no", childno);
    formData.append("video_file", videoBlob);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/process_video",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Video uploaded successfully:", response.data);
      setIsUploaded(true); // Set isUploaded to true on successful upload
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  const handleStartRecordingAgain = () => {
    setVideoBlob(null);
    setRecording(false);
    setIsUploaded(false); // Reset isUploaded when starting recording again
    setKey((prevKey) => prevKey + 1); // Update key to remount the VideoRecorder
  };

  return (
    <div style={{ textAlign: "center" }}>
      {isUploaded ? (
        <p>Video successfully uploaded!</p>
      ) : (
        <>
          <div style={{ textAlign: "left" }}>
            Steps:
            <ul style={{ fontSize: ".75rem", padding: "1rem 0rem" }}>
              <li>Record a video for at least 15 seconds and stop the recording</li>
              <li>After completing the recording, confirm the video and click on Upload</li>
            </ul>
          </div>

          <style>
            {`.icEoTt  {
              color: black;
              border-radius: 50%;
              width: 68px;
              height: 68px;
              background: rgba(227, 73, 28, 0.8);
              outline: none;
              border: none;
              cursor: pointer;
              position: absolute;
              z-index: 5;
              top: 26px;
              right: 125px;
              position: absolute;
              top: 25px;
              pointer-events: ${recording ? "none" : "auto"};
            }`}
          </style>
          {videoBlob ? (
            <div>
              <video src={URL.createObjectURL(videoBlob)} width="300" height="270" controls />
              <button style={{ marginRight: "1.25rem" }} onClick={handleUpload}>Upload Video</button>
              <button onClick={handleStartRecordingAgain}>Record Again</button>
            </div>
          ) : (
            <div>
              <VideoRecorder
                ref={videoRecorderRef}
                key={key} // Add key to remount the VideoRecorder
                onRecordingComplete={handleRecordingComplete}
                renderDisconnectedView={() => (
                  <p>Recording stopped after 15 seconds.</p>
                )}
                isOnInitially={recording}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VideoRecorderComponent;
