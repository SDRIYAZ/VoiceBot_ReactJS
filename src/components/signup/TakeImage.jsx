import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const TakeImage = ({mobileno, childno, setChildImageURL}) => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isWebcamOpen, setIsWebcamOpen] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  
  const handleImageCapture = (capturedImageURL) => {
    setChildImageURL(childno - 1, capturedImageURL);
  };

  const openWebcam = () => {
    setIsWebcamOpen(true);
    setIsUploaded(false); // Reset the isUploaded state when opening the webcam
  };

  const captureImage = (e) => {
    
    const videoSrc = webcamRef.current.getScreenshot();
    setCapturedImage(videoSrc);
    setIsWebcamOpen(false); // Hide the webcam after capturing the image
  };

  const uploadImage = async () => {
    try {
      // Upload the video as a base64 string
      if (capturedImage) {
        const formData = new FormData();
        formData.append("video_file", capturedImage.split(',')[1]);
        console.log(capturedImage.split(',')[1])
        formData.append("mobile_number", "12221111");
        formData.append("child_no", childno);

        const response = await axios.post(
          "http://127.0.0.1:8000/process_video/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setIsUploaded(true); // Show the successful message
        if(response.statusText === "OK"){
          if(response.data.message === "success"){
            const imageurl = response.data.imageurl;
            handleImageCapture(imageurl)
          }else{
            alert("Error in Uploading Image")
          }
        }else{
          alert("Image not Uploaded Successfully ")
        }
      }
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  const recaptureImage = () => {
    setCapturedImage(null);
    setIsUploaded(false);
    setIsWebcamOpen(true);
  };

  return (
    <div style={{textAlign:"center"}}>
      {isWebcamOpen ? (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={300}
          height={270}
        />
      ) : null}

      {!capturedImage && !isUploaded && !isWebcamOpen && (
        <button onClick={openWebcam}>Open Camera</button>
      )}

      {isWebcamOpen && !capturedImage && (
        <button style={{marginTop:"0"}} onClick={captureImage}>Capture</button>
      )}

      {capturedImage && !isUploaded && (
        <div>
          {/* Show the captured image */}
          <img src={capturedImage} alt="Captured" width={300} height={270} />
          <br />

          <button type="button" style={{marginRight:"1rem"}} onClick={uploadImage}>Upload Image</button>
          <button type="button" onClick={recaptureImage}>ReCapture</button>
        </div>
      )}

      {isUploaded && (
        <div>
          <p style={{fontSize:"1.5rem"}}>Image uploaded successfully!</p>
          {/* Show the captured image again after uploading */}
          <img src={capturedImage} alt="Captured" width={300} height={270} />
        </div>
      )}
    </div>
  );
};

export default TakeImage;