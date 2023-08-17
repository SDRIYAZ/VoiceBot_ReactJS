import "./Freshleftmenu.css";
import Accordion from "react-bootstrap/Accordion";
import myaccimg from "../../assets/HomePage_Assets/sideaccount.png";
import loginimg from "../../assets/HomePage_Assets/sidelogin.png";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import fetchLandingPageData from "../../services/landingpage_services/fetchLandingPageData";
import { useState, useEffect } from "react";

const Leftmenu = () => {
  const { data, error, isLoading } = useQuery(
    'leftmenu_data',
    () => fetchLandingPageData("http://localhost:3000/leftmenu")
  );

  const [landingleftmenuData, setLandingLeftmenuData] = useState([]);

  useEffect(() => {
    if (!isLoading && !error) {
      setLandingLeftmenuData([
        [data[0]],
        [data.slice(1)]
      ]);
    }
  }, [data, isLoading, error]);

  if (isLoading) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
          <animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite" />
        </path>
      </svg>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }



  return (
    <div className="menucontainer">
      {/* {console.log(landingleftmenuData[0])} */}
      <div className="topsection">
        <img src={landingleftmenuData[0] && landingleftmenuData[0][0]?.logo} className="branelogo"></img>
        <img src={landingleftmenuData[0] && landingleftmenuData[0][0]?.image} className="userimage"></img>
        <span className="username">{landingleftmenuData[0] && landingleftmenuData[0][0]?.name}</span>
        <span className="userclass">{landingleftmenuData[0] && landingleftmenuData[0][0]?.class}</span>
        <div className="line"></div>
      </div>
      <div className="accordionsection">
        <Accordion className="Accordionitem">
          {landingleftmenuData[1] && (
            landingleftmenuData[1][0].map((element, index) => (
              <Accordion.Item key={index} eventKey={index.toString()}>
                <Accordion.Header>
                  <img src={element.icon} className="academicsimg"></img> {element.title}
                </Accordion.Header>
                <Accordion.Body>
                  <ul>
                    {
                      element && (
                        element.content.map((ele, ind) => (
                          <li key={ind}>
                            <Link to="childpage/chapters">{ele.title}</Link>
                          </li>
                        ))
                      )
                    }
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            ))
          )}
        </Accordion>
        <div className="myaccount">
          <span>
            {" "}
            <img src={myaccimg} className="academicsimg"></img>My Account
          </span>
        </div>
      </div>
      <div className="logoutbutton">
        <span>
          {" "}
          <img src={loginimg} className="academicsimg"></img>Log out
        </span>
      </div>
    </div>
  );
};
export default Leftmenu;
