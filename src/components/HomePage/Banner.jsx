import React from 'react'
import bannerimg from "homepage_assets/bannerimage.jpg";

const Banner = () => {
    return (
        <>
            <section className='homepage__banner'>
                <article className='homepage__banner__main'>
                    <article className='homepage__banner__main__content'>
                        <article className='homepage__banner__main__content__title'>
                            Elevate. Educate. Empower.<br></br> AI Enhanced Learning for the 21st Century
                        </article>
                        <article className='homepage__banner__main__content__description'>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos nam, dolores laboriosam delectus ut Lorem, ipsum Lorem, ipsum dolor.
                        </article>
                        <article className='homepage__banner__main__content__button'>
                            <button>Get Started <i className="fa fa-arrow-right" aria-hidden="true"></i></button>
                        </article>
                    </article>
                    <article className='homepage__banner__main__video'>
                        <img src={bannerimg} alt="homepagebg" />
                    </article>
                </article>
            </section>

        </>
    )
}

export default Banner
