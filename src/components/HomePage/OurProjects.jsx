import React from 'react'
import ourprojectsimg from 'homepage_assets/OurprojectsImage.png'
const OurProjects = () => {
    return (
        <>
            <section className="homepage__ourprojects">
                <article className='homepage__ourprojects__section'>
                    <article className="homepage__ourprojects__section__video">
                        <img src={ourprojectsimg}></img>
                    </article>

                    <article className='homepage__ourprojects__section__content'>
                        <article className='homepage__ourprojects__section__content__title'>Tranforming Education Using AI </article>
                        <article className='homepage__ourprojects__section__content__description'>
                            <p> 
                                Lorem ipsum dolor sit amet consectetur adipisicing elit Blanditiis animi fuga.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit Blanditiis animi fuga.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit Blanditiis animi fuga.
                            </p>
                        </article>
                    </article>
                </article>
            </section>
        </>
    )
}

export default OurProjects
