// Developer Riyaz
import React, {useEffect, useState} from 'react'
import ourprojectsimg from 'assets/homepage_assets/OurprojectsImage.png'
import { useDispatch, useSelector } from 'react-redux';
import {getHomepageOurprojects} from 'services/homepage_services/getHomepageOurprojects';

const OurProjects = () => {

    const dispatch = useDispatch();
    const ourprojects = useSelector((state) => state.homepage_ourprojects);

    const { data, loading, isSuccess, message } = ourprojects;
    const [ourprojectsData , setOurProjectsData] = useState({});
    useEffect(() => {
        dispatch(getHomepageOurprojects());
    }, []);

    useEffect(() => {
        if (!loading && isSuccess) {
            const [ourprojects_data] = data;
            const {ourprojectstitle, description, video} = ourprojects_data;
            setOurProjectsData({"ourprojectstitle": ourprojectstitle, "description":description, "video":video})
        }
    }, [loading, isSuccess, data]);

    return (
        <>
            <section className="homepage__ourprojects">
                <article className='homepage__ourprojects__section'>
                    <article className="homepage__ourprojects__section__video">
                        <video src={ourprojectsData.video} controls autoPlay muted></video>
                    </article>

                    <article className='homepage__ourprojects__section__content'>
                        <article className='homepage__ourprojects__section__content__title'>{ourprojectsData.ourprojectstitle} </article>
                        <article className='homepage__ourprojects__section__content__description'>
                            <p> 
                                {ourprojectsData.description}
                            </p>
                        </article>
                    </article>
                </article>
            </section>
        </>
    )
}

export default OurProjects
