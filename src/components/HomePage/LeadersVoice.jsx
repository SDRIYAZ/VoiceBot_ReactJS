import React, { Component } from "react";
import VerticalCarousel from "./VerticalCarousel";
import { config } from "react-spring";
import leadervideo from "assets/homepage_assets/leadervideo.mp4";
import thumbnailimg from "assets/homepage_assets/thumbnail.png";

let slides = [
  {
    key: 1,
    content: {
      quote: "This voice-interactive AI platform is a game-changer.It revolutionizes education, engages students like never before, and prepares them for success in the future.",
      video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      caption: "Elon Musk",
      subcaption: " CEO of Tesla Motors and SpaceX",
      thumbnail: {thumbnailimg}
    }
  },
  {
    key: 2,
    content: {
      quote: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      video: "https://example.com/video2.mp4",
      caption: "Video Caption 2",
      subcaption: " CEO of Tesla Motors and SpaceX",
      thumbnail: "https://example.com/thumbnail1.jpg"
    }
  },
  {
    key: 3, 
    content: {
      quote: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      video: "https://example.com/video3.mp4",
      caption: "Video Caption 3",
      subcaption: " CEO of Tesla Motors and SpaceX",
      thumbnail: "https://example.com/thumbnail1.jpg"
    }
  },
  {
    key: 4,
    content: {
      quote: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      video: "https://example.com/video4.mp4",
      caption: "Video Caption 4",
      subcaption: " CEO of Tesla Motors and SpaceX",
      thumbnail: "https://example.com/thumbnail1.jpg"
    }
  },
  {
    key: 5,
    content: {
      quote: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      video: "https://example.com/video5.mp4",
      caption: "Video Caption 5",
      subcaption: " CEO of Tesla Motors and SpaceX",
      thumbnail: "https://example.com/thumbnail1.jpg"
    }
  },
  {
    key: 6,
    content: {
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      video: "https://example.com/video6.mp4",
      caption: "Video Caption 6",
      subcaption: " CEO of Tesla Motors and SpaceX",
      thumbnail: "https://example.com/thumbnail1.jpg"
    }
  },
  {
    key: 7,
    content: {
      quote: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      video: "https://example.com/video7.mp4",
      caption: "Video Caption 7",
      subcaption: " CEO of Tesla Motors and SpaceX",
      thumbnail: "https://example.com/thumbnail1.jpg"
    }
  },
  
  // Add similar structures for the remaining slides...
];

export default class Example extends Component {
  state = {
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: true,
    config: config.gentle
  };

  render() {
    return (
      <div
        style={{
          color: "black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100vh",
          margin: "0 auto",
          background: "#ffff",
          overflow: "hidden", // Add overflow: hidden to prevent component overflow
          padding: "2rem 0"
        }}
      >
        <div className="homepage__leadersvoice">Leaders Voice</div>
        <VerticalCarousel
          slides={slides}
          offsetRadius={this.state.offsetRadius}
          showNavigation={this.state.showNavigation}
          animationConfig={this.state.config}
        />
      </div>
    );
  }
}
