import React, { useState } from 'react';

import axios from 'axios';

import { useLocation, useNavigate } from 'react-router-dom';

import "./bot.css";

// import bot from '../../assets/HomePage_Assets/voicebot';

const SpeechBot = () => {

  const [isListening, setIsListening] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const [botResponse, setBotResponse] = useState('');
  const [utterance, setUtterance] = useState('');

  const recognition = new window.webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.lang = 'en-IN';
  recognition.onstart = () => {
    setIsListening(true);
  };

  recognition.onresult = (event) => {

    const result = event.results[event.results.length - 1][0].transcript;
    // setUtterance(result);
    console.log(result);

    
    
    if ((result === 'brain.') || (result === 'brain') || (result === 'Brain.') || (result === 'brane.') || (result === 'Brane.')  || (result === 'train.') || (result === 'Brent.') || (result === 'brent')   ) {

      respondTowakeword();
    }
    // if (result.toLowerCase().includes("brain")|| result.toLowerCase().includes("brain.") || result.toLowerCase().includes("brane") || result.toLowerCase().includes("brane.")){
      
    else  if (result.toLowerCase().includes("scroll up")) {
        const distanceToScroll = -1500;
        window.scrollBy({
  
          top: distanceToScroll,
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
    else if (result.toLowerCase().includes("previous page")) {
  
        navigateBack();
      }
    else if (result.toLowerCase().includes("next page")) {
  
        navigateForward();
      }
    else if (result.toLowerCase().includes("refresh the page")) { // Refresh the page
  
        window.location.reload();
      }
    else if (result.toLowerCase().includes("close the window")) {
        // Close the window
        window.close();
      }
      else {
        setUtterance(result);
        sendRequest(result);
      }
    };
    recognition.onend = () => {
      setIsListening(false);
    };

    // }

    

  const respondTowakeword = () => {

    // setBotResponse("how can i help you?");

    const spek = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance("Hello!You can start asking your queries")
    spek.speak(utterance);
  }
  
  function navigateBack() {
    window.history.back();
  }
  function navigateForward() {
    window.history.forward();
  }

  const sendRequest = async (query) => {

    try {

      recognition.stop();

      // Simulate sending request and receiving response

      const response = await axios.get('http://localhost:8080/bot', {


        params: { query },

      });
      
      const { response: botResponse, route } = response.data;
      
      // console.log(response)

      setBotResponse(botResponse);

        console.log(botResponse);

        if (route === window.location.pathname) {
          const speak = new SpeechSynthesisUtterance("You are in the same page");
          window.speechSynthesis.speak(speak);
          
          if (!isListening) {
            recognition.start();
          }
        }
        else {
          const botResponseUtterance = new SpeechSynthesisUtterance(botResponse);
          botResponseUtterance.onend = () => {
            // Re-enable recognition after the bot finishes speaking
            if (!isListening) {
          recognition.start();
        }
    
            if (route) {

              navigate(route);

              // setTimeout(() => {
              //   navigate(route);
              // }, 2000);
            }
          };
          window.speechSynthesis.speak(botResponseUtterance);
        }
      } catch (error) {
        console.error('Error sending request:', error);
        const speak = new SpeechSynthesisUtterance("Sorry, I can't understand");
        speak.onend = () => {
          recognition.start(); // Start recognition after the response is spoken
        };
        window.speechSynthesis.speak(speak);
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


