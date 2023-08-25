import React from "react";
import userimage1 from "assets/homepage_assets/userimage1.png"
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getHomepageParentsvoice } from "services/homepage_services/getHomepageParentsvoice";
import { Link, useNavigate } from 'react-router-dom';

const ParentsVoice = () => {
    const dispatch = useDispatch();
    const parentsvoice = useSelector((state) => state.homepage_parentsvoice);
    const { data, loading, isSuccess, message } = parentsvoice;
    const [parentsvoiceData , setparentsvoiceData] = useState({});
    useEffect(() => {
        dispatch(getHomepageParentsvoice());
        // console.log(parentsvoice)
    }, []);

    useEffect(() => {
        if (!loading && isSuccess) {
            const [parentsvoice_Data] = data;
            const{data1} = parentsvoice_Data
            const { studentname , parentname, studentclass, description } = data1[0]
            const { studentname2, parentname2, studentclass2, description2 } = data1[1]
            const { studentname3, parentname3, studentclass3, description3 } = data1[2]
            setparentsvoiceData({"studentname": studentname,"parentname": parentname,"studentclass": studentclass,"description": description,
                                 "studentname2": studentname2,"parentname2": parentname2,"studentclass2": studentclass2,"description2": description2,
                                 "studentname3": studentname3,"parentname3": parentname3,"studentclass3": studentclass3,"description3": description3
                                } )
        }
    }, [loading, isSuccess, data]);




    return (

        <section className='homepage__parentsvoice'>
            <article className="homepage__parentsvoice__section">
                <article className="homepage__parentsvoice__section__title">
                    <h2>Parents Voice</h2>
                </article>
                <Carousel
                    className="homepage__parentsvoice__section__carousel"
                    showStatus={false}
                    showThumbs={false}
                    showIndicators={false}
                    infiniteLoop={true}
                    autoPlay={true}
                    interval={10000}
                >
                    <article className="homepage__parentsvoice__section__carousel-row">
                        <article className="homepage__parentsvoice__section__carousel-row-card1">
                            <article className="homepage__parentsvoice__section__carousel-row-card1-image">
                                <img
                                    src={userimage1}
                                    width="60vw"
                                    height="60vh"
                                ></img>
                            </article>
                            <article className="homepage__parentsvoice__section__carousel-row-card1-text">
                                <h3 className="homepage__parentsvoice__section__carousel-row-card1-text-name">
                                    {parentsvoiceData.parentname}
                                </h3>
                                <h4 className="homepage__parentsvoice__section__carousel-row-card1-text-desc">
                                   Parent, {parentsvoiceData.studentname} {parentsvoiceData.studentclass} Class
                                </h4>
                                <h5 className="homepage__parentsvoice__section__carousel-row-card1-text-review">
                                    
                                    {parentsvoiceData.description}

                                </h5>
                            </article>
                        </article>

                        <article className="homepage__parentsvoice__section__carousel-row-card1">
                            <article className="homepage__parentsvoice__section__carousel-row-card1-image">
                                <img
                                    src={userimage1}
                                    width="60vw"
                                    height="60vh"
                                ></img>
                            </article>
                            <article className="homepage__parentsvoice__section__carousel-row-card1-text">
                                <h3 className="homepage__parentsvoice__section__carousel-row-card1-text-name">
                                {parentsvoiceData.parentname2}
                                </h3>
                                <h4 className="homepage__parentsvoice__section__carousel-row-card1-text-desc">
                                    Parent, {parentsvoiceData.studentname2} {parentsvoiceData.studentclass2} Class
                                </h4>
                                <h5 className="homepage__parentsvoice__section__carousel-row-card1-text-review">
                                    {parentsvoiceData.description2}
                                </h5>
                            </article>
                        </article>

                        <article className="homepage__parentsvoice__section__carousel-row-card1">
                            <article className="homepage__parentsvoice__section__carousel-row-card1-image">
                                <img
                                    src={userimage1}
                                    width="60vw"
                                    height="60vh"
                                ></img>
                            </article>
                            <article className="homepage__parentsvoice__section__carousel-row-card1-text">
                                <h3 className="homepage__parentsvoice__section__carousel-row-card1-text-name">
                                    {parentsvoiceData.parentname3}
                                </h3>
                                <h4 className="homepage__parentsvoice__section__carousel-row-card1-text-desc">
                                  Parent, {parentsvoiceData.studentname3} {parentsvoiceData.studentclass3} Class
                                </h4>
                                <h5 className="homepage__parentsvoice__section__carousel-row-card1-text-review">
                                     {parentsvoiceData.description3}
                                </h5>
                            </article>
                        </article>

                    </article>

                    <article className="homepage__parentsvoice__section__carousel-row">
                        <article className="homepage__parentsvoice__section__carousel-row-card1">
                            <article className="homepage__parentsvoice__section__carousel-row-card1-image">
                                <img
                                    src={userimage1}
                                    width="60vw"
                                    height="60vh"
                                ></img>
                            </article>
                            <article className="homepage__parentsvoice__section__carousel-row-card1-text">
                                <h3 className="homepage__parentsvoice__section__carousel-row-card1-text-name">                                    {parentsvoiceData.parentname}
                                </h3>
                                <h4 className="homepage__parentsvoice__section__carousel-row-card1-text-desc">                                    Parent, {parentsvoiceData.studentname} {parentsvoiceData.studentclass} Class

                                </h4>
                                <h5 className="homepage__parentsvoice__section__carousel-row-card1-text-review">
                                    {parentsvoiceData.description}
                                </h5>
                            </article>
                        </article>

                        <article className="homepage__parentsvoice__section__carousel-row-card1">
                            <article className="homepage__parentsvoice__section__carousel-row-card1-image">
                                <img
                                    src={userimage1}
                                    width="60vw"
                                    height="60vh"
                                ></img>
                            </article>
                            <article className="homepage__parentsvoice__section__carousel-row-card1-text">
                                <h3 className="homepage__parentsvoice__section__carousel-row-card1-text-name">
                                    Julia Harris
                                </h3>
                                <h4 className="homepage__parentsvoice__section__carousel-row-card1-text-desc">
                                    Parent, Varun 8th Class
                                </h4>
                                <h5 className="homepage__parentsvoice__section__carousel-row-card1-text-review">
                                    Brane Education has helped my son alot in his studies. He has
                                    improved alot in his studies and is now able to score good marks
                                    in his exams.
                                </h5>
                            </article>
                        </article>

                        <article className="homepage__parentsvoice__section__carousel-row-card1">
                            <article className="homepage__parentsvoice__section__carousel-row-card1-image">
                                <img
                                    src={userimage1}
                                    width="60vw"
                                    height="60vh"
                                ></img>
                            </article>
                            <article className="homepage__parentsvoice__section__carousel-row-card1-text">
                                <h3 className="homepage__parentsvoice__section__carousel-row-card1-text-name">
                                    {parentsvoiceData.parentname3}
                                </h3>
                                <h4 className="homepage__parentsvoice__section__carousel-row-card1-text-desc">
                                    Parent, {parentsvoiceData.studentname3} {parentsvoiceData.studentclass3} Class
                                </h4>
                                <h5 className="homepage__parentsvoice__section__carousel-row-card1-text-review">
                                    {parentsvoiceData.description3}
                                </h5>
                            </article>
                        </article>

                    </article>

                    <article className="homepage__parentsvoice__section__carousel-row">
                        <article className="homepage__parentsvoice__section__carousel-row-card1">
                            <article className="homepage__parentsvoice__section__carousel-row-card1-image">
                                <img
                                    src={userimage1}
                                    width="60vw"
                                    height="60vh"
                                ></img>
                            </article>
                            <article className="homepage__parentsvoice__section__carousel-row-card1-text">
                                <h3 className="homepage__parentsvoice__section__carousel-row-card1-text-name">
                                    Julia Harris
                                </h3>
                                <h4 className="homepage__parentsvoice__section__carousel-row-card1-text-desc">
                                    Parent, Varun 8th Class
                                </h4>
                                <h5 className="homepage__parentsvoice__section__carousel-row-card1-text-review">
                                    Brane Education has helped my son alot in his studies. He has
                                    improved alot in his studies and is now able to score good marks
                                    in his exams.
                                </h5>
                            </article>
                        </article>

                        <article className="homepage__parentsvoice__section__carousel-row-card1">
                            <article className="homepage__parentsvoice__section__carousel-row-card1-image">
                                <img
                                    src={userimage1}
                                    width="60vw"
                                    height="60vh"
                                ></img>
                            </article>
                            <article className="homepage__parentsvoice__section__carousel-row-card1-text">
                                <h3 className="homepage__parentsvoice__section__carousel-row-card1-text-name">
                                    Julia Harris
                                </h3>
                                <h4 className="homepage__parentsvoice__section__carousel-row-card1-text-desc">
                                    Parent, Varun 8th Class
                                </h4>
                                <h5 className="homepage__parentsvoice__section__carousel-row-card1-text-review">
                                    Brane Education has helped my son alot in his studies. He has
                                    improved alot in his studies and is now able to score good marks
                                    in his exams.
                                </h5>
                            </article>
                        </article>

                        <article className="homepage__parentsvoice__section__carousel-row-card1">
                            <article className="homepage__parentsvoice__section__carousel-row-card1-image">
                                <img
                                    src={userimage1}
                                    width="60vw"
                                    height="60vh"
                                ></img>
                            </article>
                            <article className="homepage__parentsvoice__section__carousel-row-card1-text">
                                <h3 className="homepage__parentsvoice__section__carousel-row-card1-text-name">
                                    Julia Harris
                                </h3>
                                <h4 className="homepage__parentsvoice__section__carousel-row-card1-text-desc">
                                    Parent, Varun 8th Class
                                </h4>
                                <h5 className="homepage__parentsvoice__section__carousel-row-card1-text-review">
                                    Brane Education has helped my son alot in his studies. He has
                                    improved alot in his studies and is now able to score good marks
                                    in his exams.
                                </h5>
                            </article>
                        </article>

                    </article>

                </Carousel>
            </article>
        </section>
    );
};

export default ParentsVoice;