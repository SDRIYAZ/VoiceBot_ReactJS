import React, { useRef, useState } from "react";
import axios from "axios";
import { Recording } from "react-media-recorder";

const VideoRecorderComponent = ({ mobileno, childno }) => {
  const [videoBlob, setVideoBlob] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleRecordingComplete = (blob) => {
    setVideoBlob(blob);
  };

  const handleUpload = async () => {
    if (!videoBlob) return;

    const formData = new FormData();
    formData.append("mobile_number", mobileno);
    formData.append("child_no", childno);
    formData.append("video_file", videoBlob, "child_video.mp4");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/process_video",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response)
      console.log("Video uploaded successfully:", response.data);
      setIsUploaded(true);
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  const handleStartRecordingAgain = () => {
    setVideoBlob(null);
    setIsUploaded(false);
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

          {videoBlob ? (
            <div>
              <video src={URL.createObjectURL(videoBlob)} width="300" height="270" controls />
              <button style={{ marginRight: "1.25rem" }} onClick={handleUpload}>Upload Video</button>
              <button onClick={handleStartRecordingAgain}>Record Again</button>
            </div>
          ) : (
            <div>
              <Recording
                render={({ startRecording, stopRecording }) => (
                  <>
                    <button onClick={startRecording}>Start Recording</button>
                    <button onClick={stopRecording}>Stop Recording</button>
                  </>
                )}
                onRecordingComplete={handleRecordingComplete}
                constraints={{ video: true, audio: true }}
                mimeType="video/mp4" // Set the MIME type to mp4
                timeSlice={15000}
                onStop={handleRecordingComplete}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VideoRecorderComponent;
