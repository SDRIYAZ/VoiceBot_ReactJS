import React, { useState, useEffect } from "react";
import axios from "axios";

const VideoRecorderComponent = ({ mobileno, childno }) => {
  const [videoBlob, setVideoBlob] = useState(null);
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState(null);
  const canvasRef = React.useRef(null);
  const videoRef = React.useRef(null);
  const streamRef = React.useRef(null);
  const chunksRef = React.useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;

      const options = { mimeType: "video/webm" }; // Set the MIME type to video/webm for wider support
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };
      mediaRecorder.onstop = () => {
        const videoBlob = new Blob(chunksRef.current, { type: "video/webm" }); // Set the type to video/webm
        setVideoBlob(videoBlob);
        chunksRef.current = [];
        streamRef.current.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setRecording(true);

      setTimeout(() => {
        if (mediaRecorder.state === "recording") {
          mediaRecorder.stop();
          setRecording(false);
        }
      }, 15000); // Stop recording after 15 seconds
    } catch (error) {
      console.error("Error accessing the camera:", error);
      setError("Error accessing the camera. Please make sure the camera is available and accessible.");
      setRecording(false);
    }
  };

  useEffect(() => {
    if (canvasRef.current && videoRef.current && streamRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      const videoElement = videoRef.current;
  
      if (videoElement) {
        videoElement.srcObject = streamRef.current;
        videoElement.onloadedmetadata = () => {
          videoElement.play();
        };
      }
  
      const drawFrame = () => {
        if (recording && videoElement.videoWidth && videoElement.videoHeight) {
          ctx.drawImage(videoElement, 0, 0, 300, 270);
        }
        requestAnimationFrame(drawFrame);
      };
  
      drawFrame();
    }
  }, [recording]);

  const handleStartRecording = () => {
    setVideoBlob(null);
    setError(null); // Clear any previous errors
    startRecording();
  };

  const handleUpload = async () => {
    if (!videoBlob) return;

    const formData = new FormData();
    formData.append("mobile_number", "12345654323456");
    formData.append("child_no", "9");
    formData.append("video_file", videoBlob);

    try {
      const response = await axios.post("http://127.0.0.1:8000/process_video", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Video uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {videoBlob ? (
        <div>
          <video ref={videoRef} src={URL.createObjectURL(videoBlob)} width="300" height="270" controls />
          <a href={URL.createObjectURL(videoBlob)} download="recorded_video.mp4">
            <button>Download Video</button>
          </a>
          <button onClick={handleUpload}>Upload Video</button>
        </div>
      ) : (
        <div>
          {recording ? (
            <div>
              <canvas ref={canvasRef} width="300" height="270" />
              <p>Recording...</p>
            </div>
          ) : (
            <button onClick={handleStartRecording}>Start Recording</button>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoRecorderComponent;
