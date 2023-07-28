import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHomepageHeader } from "services/homepage_services/getHomepageHeader";
import { Link } from 'react-router-dom';
// Developer Name Sairam
const Navbar = () => {
    const dispatch = useDispatch();
    const header = useSelector((state) => state.homepage_header);
    const { data, loading, isSuccess, message } = header;
    const [finalHeaderData, setFinalHeaderData] = useState([]);
    const [logo, setLogo] = useState("")
    useEffect(() => {
        dispatch(getHomepageHeader());
    }, []);

    useEffect(() => {
        if (!loading && isSuccess) {
            const [header_data] = data;
            const {logoimg, navlinks} = header_data;
            setLogo(logoimg);
            setFinalHeaderData(navlinks);
        }
    }, [loading, isSuccess, data]);
    const [toggleNavMenu, setToggleNavMenu] = useState(false);
    const onToggle = () => {
        setToggleNavMenu(!toggleNavMenu);
    };

    return (
        <>
            <header className="homepage__header">
                <section className="homepage__header__section">
                    <article className="homepage__header__section__nav1">
                        <article className="homepage__header__section__nav1__img_spinner">
                            <Link to="/"><img src={logo} alt="123" className="homepage__header__section__nav1__img" /></Link>
                        </article>
                        <ul className="homepage__header__section__nav1__navcontent">
                           {finalHeaderData.map((element, index) => (
                                <li key={index}>
                                    <a href="#">{element}</a>
                                </li>
                            ))}
                        </ul>
                    </article>

                    <article className="homepage__header__section__nav2">
                        <article className="homepage__header__section__nav2__buttons">
                            {/* <button>Login</button> */}
                            <Link to="/login" className="homepage__header__section__nav2__buttons-btn">Login</Link>
                            <Link to="/signup" className="homepage__header__section__nav2__buttons-btn">Sign Up</Link>
                        </article>
                    </article>

                    <article className="homepage__header__section__hamburger">
                        <button onClick={() => onToggle()}>
                            <i className="fa fa-align-justify"></i>
                        </button>
                        {toggleNavMenu && (
                            <div className="toggledropdown">
                                <ul>
                                    {finalHeaderData.map((element, index) => (
                                        <li key={index}>
                                            <a href="#">{element}</a>
                                        </li>
                                    ))}
                                </ul>
                                <div className="dropdown-btns">
                                    <button>Login</button>
                                    <button>Sing Up</button>
                                </div>
                            </div>
                        )}
                    </article>
                </section>
            </header>
        </>
    );
};

export default Navbar;
