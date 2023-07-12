import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import NewsImg from 'homepage_assets/NewsImg.png'
import NewsImg2 from 'homepage_assets/NewsImg2.png'
import boardimg1 from 'homepage_assets/board1.png'
import boardimg2 from 'homepage_assets/board2.png'
import boardimg3 from 'homepage_assets/board3.png'
import boardimg4 from 'homepage_assets/board4.png'
import boardimg5 from 'homepage_assets/board5.png'

const NewsLetter = () => {
    return (
        <>
            <section className='homepage__newscomponent'>
                <Carousel
                    showStatus={false}
                    showThumbs={false}
                    infiniteLoop={true}
                    autoPlay={true}
                    interval={10000}
                    showArrows={false}
                    showIndicators={false}
                >
                    <article className='homepage__newscomponent__image'>
                        <img src={NewsImg}></img>
                    </article>
                    <article className='homepage__newscomponent__image'>
                        <img src={NewsImg2}></img>
                    </article>
                </Carousel>
            </section>

            <section className="homepage__boards">
                <article className="homepage__boards__heading">
                    We Provide Content for Multiple Curriculum
                </article>
                <article className='homepage__boards__images'>
                    <marquee>
                        <img src={boardimg1}></img>
                        <img src={boardimg2}></img>
                        <img src={boardimg3}></img>
                        <img src={boardimg4}></img>
                        <img src={boardimg5}></img>
                        <img src={boardimg1}></img>
                        <img src={boardimg2}></img>
                        <img src={boardimg3}></img>
                        <img src={boardimg4}></img>
                        <img src={boardimg5}></img>
                        <img src={boardimg1}></img>
                </marquee>
            </article>
            </section>
        </>
    )
}

export default NewsLetter
