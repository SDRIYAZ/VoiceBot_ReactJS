import React, { useState, useEffect } from "react";
import axios from "axios";

const VideoRecorderComponent = ({ mobileno, childno }) => {
  const [videoBlob, setVideoBlob] = useState(null);
  const [recording, setRecording] = useState(false);
  const canvasRef = React.useRef(null);
  const streamRef = React.useRef(null);
  const chunksRef = React.useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;

      const options = { mimeType: "video/mp4" }; // Set the MIME type to video/mp4
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };
      mediaRecorder.onstop = () => {
        const videoBlob = new Blob(chunksRef.current, { type: "video/mp4" }); // Set the type to video/mp4
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
      }, 15000);
    } catch (error) {
      console.error("Error accessing the camera:", error);
      setRecording(false);
    }
  };

  useEffect(() => {
    if (canvasRef.current && streamRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      const videoElement = document.createElement("video");

      videoElement.srcObject = streamRef.current;
      videoElement.onloadedmetadata = () => {
        videoElement.play();
      };

      const drawFrame = () => {
        if (recording) {
          ctx.drawImage(videoElement, 0, 0, 300, 270);
        }
        requestAnimationFrame(drawFrame);
      };

      drawFrame();
    }
  }, [recording]);

  const handleStartRecording = () => {
    setVideoBlob(null);
    startRecording();
  };

  const handleUpload = async () => {
    if (!videoBlob) return;

    const formData = new FormData();
    formData.append("mobile_number", mobileno);
    formData.append("child_no", childno);
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
      {videoBlob ? (
        <div>
          <video src={URL.createObjectURL(videoBlob)} width="300" height="270" controls />
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
