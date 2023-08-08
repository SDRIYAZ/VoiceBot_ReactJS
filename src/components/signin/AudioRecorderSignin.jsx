import React, { useState, useRef } from "react";

const AudioRecorderSignin = () => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      setAudioBlob(audioBlob);

      // Call the API to get the base64 URL
      sendAudioBlobToAPI(audioBlob);
    };

    mediaRecorderRef.current.start();
    setTimeout(() => {
      stopRecording();
    }, 10000); // Stop recording after 10 seconds
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const recordAgain = () => {
    setAudioBlob(null);
    startRecording();
  };

  const sendAudioBlobToAPI = async (audioBlob) => {
    const formData = new FormData();
    formData.append("audio", audioBlob);

    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };

  return (
    <div style={{textAlign:"center"}}>
      {audioBlob ? (
        <div>
          <audio controls src={URL.createObjectURL(audioBlob)} /><br /><br />
          <button className="signup__container__form__div__button" type="button" onClick={recordAgain}>Record Again</button>
        </div>
      ) : (
        <button
          className="signup__container__form__div__button"
          type="button" onClick={startRecording} disabled={recording}
        >
          {recording ? "Recording..." : "Record Audio"}
        </button>
      )}
      <br /><br />
    </div>
  );
};

export default AudioRecorderSignin;
