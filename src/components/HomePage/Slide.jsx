import React from "react";
import styled from "@emotion/styled";
import { useSpring, animated } from "react-spring";
import { withGesture } from "react-with-gesture";

const SlideContainer = styled(animated.div)`
  position: absolute;
  height: 70%;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: 50% 50%;
`;

const SlideCard = styled.div`
  position: relative;
  max-width: 80%;
  min-width: 30%;
  width: 100vw;
  height: 69vh;
 
  font-weight: 400;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left; /* Center-align the text */
  transform-origin: 50% 50%;
`;

const ContentWrapper = styled.div`
  display: flex;
  margin-left: 7vw;
  margin: 0 4vw; /* Apply margin of 2vw to the content */
`;

const QuoteSymbol = styled.span`
  position: absolute;
  top: 5.5rem;
  left: 2.2rem;
  font-size: 5rem;
  color: #7c7be2;
`;

const Video = styled.video`
  width: 33vw; /* Set the width of the video element to 27vw */
`;

const Caption = styled.p`
  margin-top: 0.5rem;
`;

function Slide({
  content,
  offsetRadius,
  index,
  animationConfig,
  moveSlide,
  delta,
  down,
  up
}) {
  const offsetFromMiddle = index - offsetRadius;
  const totalPresentables = 2 * offsetRadius + 1;
  const distanceFactor = 1 - Math.abs(offsetFromMiddle / (offsetRadius + 1));

  const offsetCardClick = i => {
    console.log(i);
  };

  const translateYoffset =
    50 * (Math.abs(offsetFromMiddle) / (offsetRadius + 1));
  let translateY = -50;

  if (offsetRadius !== 0) {
    if (index === 0) {
      translateY = 0;
    } else if (index === totalPresentables - 1) {
      translateY = -100;
    }
  }

  if (offsetFromMiddle === 0 && down) {
    translateY += delta[1] / (offsetRadius + 1);
    if (translateY > -40) {
      moveSlide(-1);
    }
    if (translateY < -100) {
      moveSlide(1);
    }
  }
  if (offsetFromMiddle > 0) {
    translateY += translateYoffset;
  } else if (offsetFromMiddle < 0) {
    translateY -= translateYoffset;
  }


  const springStyle = useSpring({
    transform: `translateX(0%) translateY(${translateY}%) scale(${distanceFactor})`,
    top: `${
      offsetRadius === 0 ? 50 : 50 + (offsetFromMiddle * 50) / offsetRadius
    }%`,
    opacity: distanceFactor * distanceFactor,
    zIndex: Math.abs(Math.abs(offsetFromMiddle) - 2),
    config: animationConfig
  });

  return (
    <SlideContainer style={springStyle}>
      <SlideCard onClick={() => moveSlide(offsetFromMiddle)}>
        <ContentWrapper>
          <QuoteSymbol>❝</QuoteSymbol>
          <div style={{ flex: 1, margin: "auto" }}>
            <text>{content.quote}</text>
          </div>
          <div style={{ flex: 1, width: "33vw", display: "flex", textAlign: "center", flexDirection: "column", alignItems: "center" }}>
          <Video controls poster={content.thumbnail}>
  <source src={content.video} type="video/mp4" />
</Video>
            <div style={{ marginTop:'0.5rem' }} >
              <videocap>{content.caption}</videocap>
              <Caption>{content.subcaption}</Caption> {/* Add the additional caption */}
            </div>
          </div>
        </ContentWrapper>
      </SlideCard>
    </SlideContainer>
  );
}

export default withGesture()(Slide);
