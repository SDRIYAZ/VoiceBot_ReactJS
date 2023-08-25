import React, { useState } from 'react';
import axios from 'axios';
import "./bot.css";
import { useNavigate } from 'react-router-dom';
const SpeechBot = () => {
  const navigate=useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [botResponse, setBotResponse] = useState('');
  const [utterance, setUtterance] = useState('');

  const recognition = new window.webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.lang = 'en-US';

  recognition.onstart = () => {
    setIsListening(true);
  };
  recognition.onresult = (event) => {
    console.log("-------------------------------------------")
    const result = event.results[event.results.length - 1][0].transcript;
    // setUtterance(result);
    console.log(result);
    if ((result === 'Brane.') || (result === 'brane.') || (result === 'Brain.')|| (result === 'brain.') || (result === 'brain')) {
      respondTowakeword();
    }
    else if (result.toLowerCase().includes("scroll up")) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
    else if (result.toLowerCase().includes("scroll down")) {
      const distanceToScroll = 1500; // Adjust this value as needed
      window.scrollBy({
        top: distanceToScroll,
        behavior: "smooth"
      });
    }
    else {
      setUtterance(result);
      sendRequest(result);
    }
  };

  recognition.onend = () => {
    setIsListening(false);
  };
  const respondTowakeword = () => {
    // setBotResponse("how can i help you?");
    const spek = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance("yes brain bot activated")
    spek.speak(utterance);


  }
  const sendRequest = async (query) => {
    try {
      // Simulate sending request and receiving response
      const response = await axios.get('http://localhost:8080/bot', {
        params: { query },
      });
      //   console.log(response);

      const { response: botResponse, route } = response.data;
      setBotResponse(botResponse);
      //   console.log(botResponse);
      if (route) {
        // Navigate to the specified route
        setTimeout(() => {
          navigate(route);
          // window.location.href = route;
        }, 4000)
      }

      // Use the Web Speech API for TTS
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(botResponse);
      console.log(utterance.text)
      synth.speak(utterance);
     
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  return (
    <div className="speech-bot-container">
      <div className="button-container">
        {isListening ? (
          <div className="listening-indicator">
            <i className="bi bi-volume-up-fill"></i> Listening...
          </div>
        ) : (
          <i className="bi bi-robot listening-icon" onClick={toggleListening}></i>
        )}
      </div>

    </div>
  );
};

export default SpeechBot;