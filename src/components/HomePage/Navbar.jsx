import React, { useState } from "react";
import logo from "../../assets/HomePage_Assets/Branelogo.png";

// Developer Name Sairam
const Navbar = () => {
    const [toggleNavMenu, setToggleNavMenu] = useState(false);
    const onToggle = () => {
        setToggleNavMenu(!toggleNavMenu);
    };

    return (
        <>
            <header className="homepage__header">
                <section className="homepage__header__section">
                    <article className="homepage__header__section__nav1">
                        <article className="homepage__header__section__nav1__img">
                            <img src={logo} alt="123" />
                        </article>
                        <ul className="homepage__header__section__nav1__navcontent">
                            <li>
                                <a href="#">Home</a>
                            </li>

                            <li>
                                <a href="#">About</a>
                            </li>

                            <li>
                                <a href="#">For Parents</a>
                            </li>

                            <li>
                                <a href="#">Contact</a>
                            </li>

                            <li>
                                <a href="#">Patents</a>
                            </li>
                        </ul>
                    </article>

                    <article className="homepage__header__section__nav2">
                        <article className="homepage__header__section__nav2__buttons">
                            <button>Login</button>
                            <button>Sign Up</button>
                        </article>
                    </article>

                    <article className="homepage__header__section__hamburger">
                        <button onClick={() => onToggle()}>
                            <i className="fa fa-align-justify"></i>
                        </button>
                        {toggleNavMenu && (
                            <div className="toggledropdown">
                                <ul>
                                    <li>
                                        <a href="#">Home</a>
                                    </li>
                                    <li>
                                        <a href="#">About</a>
                                    </li>
                                    <li>
                                        <a href="#">Contact</a>
                                    </li>
                                    <li>
                                        <a href="#">For Parents</a>
                                    </li>
                                    <li>
                                        <a href="#">Patents</a>
                                    </li>
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
