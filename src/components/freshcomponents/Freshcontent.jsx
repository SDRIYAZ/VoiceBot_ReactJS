import React, {useState, useEffect} from 'react';
import { useQuery } from 'react-query';
import './Freshcontent.css'
import fetchLandingPageData from '../../services/landingpage_services/fetchLandingPageData';

const Content = () => {
  const { data, error, isLoading } = useQuery(
    'content_data',
    () => fetchLandingPageData("http://localhost:3000/landingpage_defaultdata")
  );

  const [landingcontentData, setLandingContentData] = useState([]);

  useEffect(() => {
    if (!isLoading && !error) {
      setLandingContentData(data);
    }
  }, [data, isLoading, error]);

  if (isLoading) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
          <animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite" />
        </path>
      </svg>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <article className='content'>
        <article className='content__top'>
          <article className='content__greeting'>
            <div className='content__greeting__img'>
              <img src={landingcontentData[0]?.greetingimg} alt='Greeting' />
            </div>
            <article className='content__greeting__text'>
              <div className='content__greeting__text_1'>
                {landingcontentData[0]?.wish}
              </div>
              <div className='content__greeting__text_2'>
                <p> {landingcontentData[0]?.name} </p>
              </div>
            </article>
          </article>
          <article className='content__quote'>
            <div className='content__quote__text1'>
              <span> {landingcontentData[1]?.quotation}</span>
            </div>
            {/* <div className='content__quote__text2'>
              <span> "Take risks now.Do something bold.</span>
            </div>
            <div className='content__quote__text3'>
              <span> You won't regret it"</span>
            </div> */}
            <div className='content__quote__text4'>
              <span> - {landingcontentData[1]?.author}</span>
            </div>
          </article>
        </article>
        <article className='content__video'>
          <p>This week's Inspiring personality</p>
          <div className='content__video__video'>
            <video
              // src={landingcontentData[2]?.video_link}
              id="my-video"
              className="video-js"
              controls
              preload="auto"
              width="430"
              height="245"
              poster={landingcontentData[2]?.thumnail}
              data-setup="{}"
              type="video/mp4"
              src={landingcontentData[2]?.video_link}
            >
              {/* <source src={landingcontentData[2]?.video_link} type="video/mp4" /> */}
              {/* <source src="MY_VIDEO.webm" type="video/webm" />  */}
              <p className="vjs-no-js">
                To view this video please enable JavaScript, and consider upgrading to a
                web browser that
                <a href="https://videojs.com/html5-video-support/" target="_blank"
                >supports HTML5 video</a
                >
              </p>
            </video>
          </div>
        </article>
      </article>
    </>
  );
};

export default Content;
