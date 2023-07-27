import React from 'react'
import listening from 'assets/homepage_assets/listening.png'
import memory from 'assets/homepage_assets/memory.png'
import spelling from 'assets/homepage_assets/spelling.png'
import dynamic from 'assets/homepage_assets/dynamic.png'
import search from 'assets/homepage_assets/search.png'
import video from 'assets/homepage_assets/video.png'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
const OurFeatures = () => {
    useEffect(() => {
        AOS.init({
            duration: 300,
            // delay: 500
        });
    }, [])
    return (
        <>
            <section  className="homepage__ourfeatures">
                <article className='homepage__ourfeatures__section'>
                    <article data-aos='fade-right' data-aos-delay='10s' className="homepage__ourfeatures__section__heading">
                        Why Choose Us?
                    </article>
                    <article  className='homepage__ourfeatures__section__container'>
                        <article data-aos='fade-right' className="homepage__ourfeatures__section__container__card">
                            <div className='homepage__ourfeatures__section__container__card-top'>
                                <div>
                                    <img className="ourfeature__img" src={listening} alt="Listening Skills" data-aos='rotate-c'/>
                                </div>
                                <div>
                                    Listening Skills
                                </div>
                            </div>
                            <div className='homepage__ourfeatures__section__container__card-bottom'>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae quae tempora minus cumque aperiam illum obcaecati. At enim minus cumque!
                            </div>
                        </article>
                        <article  data-aos='fade-right' className="homepage__ourfeatures__section__container__card">
                            <div className='homepage__ourfeatures__section__container__card-top'>
                                <div >
                                    <img className="ourfeature__img" src={memory} alt="Memory Skills" data-aos='rotate-c' />
                                </div>
                                <div>
                                    Memory Skills
                                </div>
                            </div>
                            <div className='homepage__ourfeatures__section__container__card-bottom'>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae quae tempora minus cumque aperiam illum obcaecati. At enim minus cumque!
                            </div>
                        </article>
                        <article data-aos='fade-right' className="homepage__ourfeatures__section__container__card">
                            <div className='homepage__ourfeatures__section__container__card-top'>
                                <div className='homepage__ourfeatures__section__container__img'>
                                    <img className="ourfeature__img" src={spelling} alt="Spelling Skills" data-aos='rotate-c' />
                                </div>
                                <div>
                                    Spelling Skills
                                </div>
                            </div>
                            <div className='homepage__ourfeatures__section__container__card-bottom'>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae quae tempora minus cumque aperiam illum obcaecati. At enim minus cumque!
                            </div>
                        </article>
                        <article data-aos='fade-right' className="homepage__ourfeatures__section__container__card">
                            <div className='homepage__ourfeatures__section__container__card-top'>
                                <div className='homepage__ourfeatures__section__container__img'>
                                    <img className="ourfeature__img" src={dynamic} alt="Dynamic TimeTable" data-aos='rotate-c' />
                                </div>
                                <div>
                                    Dynamic TimeTable
                                </div>
                            </div>
                            <div className='homepage__ourfeatures__section__container__card-bottom'>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae quae tempora minus cumque aperiam illum obcaecati. At enim minus cumque!
                            </div>
                        </article>
                        <article data-aos='fade-right'  className="homepage__ourfeatures__section__container__card">
                            <div className='homepage__ourfeatures__section__container__card-top'>
                                <div className='homepage__ourfeatures__section__container__img'>
                                    <img className="ourfeature__img" id='ourfeature__img' src={search} alt="General Search" data-aos='rotate-c' />
                                </div>
                                <div>
                                    General Search
                                </div>
                            </div>
                            <div className='homepage__ourfeatures__section__container__card-bottom'>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae quae tempora minus cumque aperiam illum obcaecati. At enim minus cumque!
                            </div>
                        </article>
                        <article data-aos='fade-right'  className="homepage__ourfeatures__section__container__card">
                            <div className='homepage__ourfeatures__section__container__card-top'>
                                <div className='homepage__ourfeatures__section__container__img'>
                                    <img className="ourfeature__img" src={video} alt="Video Based Library" data-aos='rotate-c' />
                                </div>
                                <div>
                                    Video Based Library
                                </div>
                            </div>
                            <div className='homepage__ourfeatures__section__container__card-bottom'>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae quae tempora minus cumque aperiam illum obcaecati. At enim minus cumque!
                            </div>
                        </article>

                    </article>
                </article>
            </section>
        </>
    )
}

export default OurFeatures
