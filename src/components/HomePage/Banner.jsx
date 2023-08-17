import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getHomepageBanner } from 'services/homepage_services/getHomepageBanner';


const Banner = () => {

    const dispatch = useDispatch();
    const banner = useSelector((state) => state.homepage_banner);

    const { data, loading, isSuccess, message } = banner;
    const [bannerData , setBannerData] = useState({});
    useEffect(() => {
        dispatch(getHomepageBanner());
    }, []);
    
    useEffect(() => {
        if (!loading && isSuccess) {
            const [banner_data] = data;
            const {bannerimg, bannerdescription, bannerquote} = banner_data;
            setBannerData({"bannerimg": bannerimg, "bannerquote":bannerquote, "bannerdescription":bannerdescription})
        }
    }, [loading, isSuccess, data]);

    return (
        <>
            <section className='homepage__banner'>
                <article className='homepage__banner__main'>
                    <article className='homepage__banner__main__content'>
                        <article className='homepage__banner__main__content__title'>
                            {bannerData.bannerquote}
                        </article>
                        <article className='homepage__banner__main__content__description'>
                            {bannerData.bannerdescription}
                        </article>
                        <article className='homepage__banner__main__content__button'>
                            <button>Get Started <i className="fa fa-arrow-right" aria-hidden="true"></i></button>
                        </article>
                    </article>
                    <article className='homepage__banner__main__video'>
                        {/* {console.log(bannerData.bannerimg)} */}
                        <video src="https://brane.s3.ap-south-1.amazonaws.com/videos/banneranimation.mp4"  autoPlay loop muted style={{height:"55vh", width:"35vw"}}></video>
                        {/* <img src={bannerData.bannerimg} alt="homepagebg" /> */}
                    </article>
                </article>
            </section>

        </>
    )
}

export default Banner
