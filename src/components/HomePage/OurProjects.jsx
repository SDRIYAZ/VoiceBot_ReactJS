// Developer Riyaz
import React, { useEffect, useState } from "react";
import ourprojectsimg from "assets/homepage_assets/OurprojectsImage.png";
import { useDispatch, useSelector } from "react-redux";
import { getHomepageOurprojects } from "services/homepage_services/getHomepageOurprojects";


const OurProjects = () => {
  const dispatch = useDispatch();
  const ourprojects = useSelector((state) => state.homepage_ourprojects);

  const { data, loading, isSuccess, message } = ourprojects;
  const [ourprojectsData, setOurProjectsData] = useState({});
  useEffect(() => {
    dispatch(getHomepageOurprojects());
  }, []);

  useEffect(() => {
    if (!loading && isSuccess) {
      const [ourprojects_data] = data;
      const { ourprojectstitle, description, video } = ourprojects_data;
      setOurProjectsData({
        ourprojectstitle: ourprojectstitle,
        description: description,
        video: video,
      });
    }
  }, [loading, isSuccess, data]);

  return (
    <>
      <section className="homepage__ourprojects">
        <article className="homepage__ourprojects__section">
          <article className="homepage__ourprojects__section__video">
            <video src={ourprojectsData.video} controls autoPlay muted></video>
            {/* <video
              id="my-video"
              class="video-js"
              controls
              preload="auto"
              width=" 622"
              height="350"
              poster={ourprojectsimg}
              data-setup="{}"
            >
              <source src={ourprojectsData.video} type="video/mp4" />
              {/* <source src="MY_VIDEO.webm" type="video/webm" />  */}
              {/* <p class="vjs-no-js">
                To view this video please enable JavaScript, and consider
                upgrading to a web browser that
                <a
                  href="https://videojs.com/html5-video-support/"
                  target="_blank"
                >
                  supports HTML5 video
                </a>
              </p>
            </video>  */}
          </article>

          <article className="homepage__ourprojects__section__content">
            <article className="homepage__ourprojects__section__content__title">
              {ourprojectsData.ourprojectstitle}{" "}
            </article>
            <article className="homepage__ourprojects__section__content__description">
              <p>{ourprojectsData.description}</p>
            </article>
          </article>
        </article>
      </section>
    </>
  );
};

export default OurProjects;
