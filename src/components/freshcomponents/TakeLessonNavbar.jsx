import React from 'react'
import './takelesson.css'
import dashboardicon from "../../assets/HomePage_Assets/dashboard.png"
import learnicon from "../../assets/HomePage_Assets/learn.png"
import scheduleicon from "../../assets/HomePage_Assets/Schedule.png"
import discussicon from "../../assets/HomePage_Assets/Discuss.png"
import { Link } from 'react-router-dom'
import notiimg from "../../assets/HomePage_Assets/notification.png";

const TakeLessonNavbar = () => {
    return (
        <>
            <div className='takelesson__navbar'>
                <div className="takelesson__navbar__left">
                    <Link to='/childpage'>
                        <div>
                            <img src={dashboardicon} alt="dashboard" /> Dashboard
                        </div>
                    </Link>
                    <Link to='/childpage'>
                        <div>
                            <img src={learnicon} alt="Learn" /> Learn
                        </div>
                    </Link>
                    <Link to='/childpage'>
                        <div>
                            <img src={scheduleicon} alt="Dynamic Timetable" /> Dynamic Timetable
                        </div>
                    </Link>
                    <Link to='/childpage'>
                        <div>
                            <img src={discussicon} alt="Learning Network" /> Learning Network
                        </div>
                    </Link>
                </div>
                <div className="takelesson__navbar__right">
                    <input type="text" className="takelesson__navbar__right__searchbox" placeholder="Search" />
                    <img src={notiimg} className="takelesson__navbar__right__notiicon"></img>
                </div>
            </div>
        </>
    )
}

export default TakeLessonNavbar
