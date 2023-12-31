import React, { Component } from "react";
import styled from "@emotion/styled";
import Slide from "./Slide";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  user-select: none;
  height: 100%;
`;

const NavigationButtons = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
 margin-top: 10rem;
  transform: translateY(-50%);
   left: 6rem; /* Adjust the left position as needed */
  z-index: 1000;
`;

const NavBtn = styled.div`

  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 1rem;
  color: #3E66DF;
  font-size: 1.5rem;
`;

function mod(a, b) {
  return ((a % b) + b) % b;
}

class VerticalCarousel extends React.Component {
  state = {
    index: 0,
    goToSlide: null,
    prevPropsGoToSlide: 0,
    newSlide: false
  };

  static propTypes = {
    slides: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.any,
        content: PropTypes.object
      })
    ).isRequired,
    goToSlide: PropTypes.number,
    showNavigation: PropTypes.bool,
    offsetRadius: PropTypes.number,
    animationConfig: PropTypes.object
  };

  static defaultProps = {
    offsetRadius: 2,
    animationConfig: { tension: 120, friction: 14 }
  };

  modBySlidesLength = (index) => {
    return mod(index, this.props.slides.length);
  };

  moveSlide = (direction) => {
    this.setState({
      index: this.modBySlidesLength(this.state.index + direction),
      goToSlide: null
    });
  };

  clampOffsetRadius(offsetRadius) {
    const { slides } = this.props;
    const upperBound = Math.floor((slides.length - 1) / 2);

    if (offsetRadius < 0) {
      return 0;
    }
    if (offsetRadius > upperBound) {
      return upperBound;
    }

    return offsetRadius;
  }

  getPresentableSlides() {
    const { slides } = this.props;
    const { index } = this.state;
    let { offsetRadius } = this.props;
    offsetRadius = this.clampOffsetRadius(offsetRadius);
    const presentableSlides = [];

    for (let i = -offsetRadius; i < 1 + offsetRadius; i++) {
      presentableSlides.push(slides[this.modBySlidesLength(index + i)]);
    }

    return presentableSlides;
  }

  render() {
    const { animationConfig, offsetRadius, showNavigation } = this.props;

    let navigationButtons = null;
    if (showNavigation) {
      navigationButtons = (
        <NavigationButtons>
          <NavBtn style={{rotate:"-90deg", cursor:"pointer"}} onClick={() => this.moveSlide(-1)}>➤</NavBtn>
          <NavBtn style={{rotate:"90deg", cursor:"pointer"}} onClick={() => this.moveSlide(1)}>➤</NavBtn>
        </NavigationButtons>
      );
    }
    return (
      <React.Fragment>
        <Wrapper>
          {this.getPresentableSlides().map((slide, presentableIndex) => (
            <Slide
              key={slide.key}
              content={slide.content}
              moveSlide={this.moveSlide}
              offsetRadius={this.clampOffsetRadius(offsetRadius)}
              index={presentableIndex}
              animationConfig={animationConfig}
            />
          ))}
        </Wrapper>
        {navigationButtons}
      </React.Fragment>
    );
  }
}

export default VerticalCarousel;
