import React from 'react'
import listening from 'homepage_assets/listening.png'
import memory from 'homepage_assets/memory.png'
import spelling from 'homepage_assets/spelling.png'
import dynamic from 'homepage_assets/dynamic.png'
import search from 'homepage_assets/search.png'
import video from 'homepage_assets/video.png'

const OurFeatures = () => {
    return (
        <>
            <section className="homepage__ourfeatures">
                <article className='homepage__ourfeatures__section'>
                    <article className="homepage__ourfeatures__section__heading">
                        Why Choose Us?
                    </article>
                    <article className='homepage__ourfeatures__section__container'>
                        <article className="homepage__ourfeatures__section__container__card">
                            <div className='homepage__ourfeatures__section__container__card-top'>
                                <div>
                                    <img src={listening} alt="Listening Skills" />
                                </div>
                                <div>
                                    Listening Skills
                                </div>
                            </div>
                            <div className='homepage__ourfeatures__section__container__card-bottom'>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae quae tempora minus cumque aperiam illum obcaecati. At enim minus cumque!
                            </div>
                        </article>
                        <article className="homepage__ourfeatures__section__container__card"></article>
                        <article className="homepage__ourfeatures__section__container__card"></article>
                        <article className="homepage__ourfeatures__section__container__card"></article>
                        <article className="homepage__ourfeatures__section__container__card"></article>
                        <article className="homepage__ourfeatures__section__container__card"></article>
                    </article>
                </article>
            </section>
        </>
    )
}

export default OurFeatures
