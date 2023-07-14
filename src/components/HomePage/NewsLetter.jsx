import React, {useEffect,useState}from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import {getHomepageNewsletter} from 'services/homepage_services/getHomepageNewsletter'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import boardimg1 from 'assets/homepage_assets/board1.png'
import boardimg2 from 'assets/homepage_assets/board2.png'
import boardimg3 from 'assets/homepage_assets/board3.png'
import boardimg4 from 'assets/homepage_assets/board4.png'
import boardimg5 from 'assets/homepage_assets/board5.png'
import partner2 from 'assets/homepage_assets/partner2.png'
import partner3 from 'assets/homepage_assets/partner3.png'
import partner4 from 'assets/homepage_assets/partner4.png'
import partner5 from 'assets/homepage_assets/partner5.png'

const NewsLetter = () => {
    const dispatch = useDispatch();
    const newsletter = useSelector((state) => state.homepage_newsletter);

    const { data, loading, isSuccess, message } = newsletter;
    const [newsletterData , setNewsLetterData] = useState([]);
    useEffect(() => {
        dispatch(getHomepageNewsletter());
    }, []);

    useEffect(() => {
        if (!loading && isSuccess) {
            const [newsletter_data] = data;
            const {newsletterimages} = newsletter_data
            setNewsLetterData(newsletterimages)
        }
    }, [loading, isSuccess, data]);

    return (
        <>
            <section className='homepage__newscomponent'>
                <marquee scrollamount="12" className='homepage__newscomponent__image'>
                    {
                        newsletterData.map((element, index)=>{
                            console.log(element)
                            return(
                                    <img src={element} key={index}></img>
                            )
                        })
                        
                    }
                    {/* <article className='homepage__newscomponent__image'>
                        <img src={NewsImg}></img>
                    </article>
                    <article className='homepage__newscomponent__image'>
                        <img src={NewsImg2}></img>
                    </article> */}
                </marquee>
            </section>

            <section className="homepage__boards">
                <article className="homepage__boards__heading">
                    We Provide Content for Multiple Curriculum
                </article>
                <article className='homepage__boards__images'>
                    <marquee direction="right">
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

            <section className='homepage__ourpartners'>
                <h1 className='homepage__ourpartners__heading'>Our Partners</h1>
                <article className="homepage__ourpartners__parent" >
                    <img src={partner2} />
                    <img src={partner3} />
                    <img src={partner4} />
                    <img src={partner5} />
                </article>
            </section>
        </>
    )
}

export default NewsLetter
