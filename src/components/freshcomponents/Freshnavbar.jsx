import "./Freshnavbar.css";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import fetchLandingPageData from "../../services/landingpage_services/fetchLandingPageData";
import notiimg from "../../assets/HomePage_Assets/notification.png";
import { useNavigate } from "react-router-dom";

const FreshNavbar = () => {
  const { data, error, isLoading } = useQuery(
    'nav_data',
    () => fetchLandingPageData("http://localhost:3000/landingpage_navmenu")
  );

  const [landingnavData, setLandingNavData] = useState([]);

  useEffect(() => {
    if (!isLoading && !error) {
      setLandingNavData(data);
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
    <div className="Navbar">
      <div className="Navbarleft">
        {landingnavData.map((ele, index) => (
          <span key={index}>
            <img src={ele.image} className="navicons"></img>{ele.title}
          </span>
        ))}
      </div>
      <div className="Navbarright">
        <input type="text" className="searchbox" placeholder="Search" />
        <img src={notiimg} className="notiicon"></img>
      </div>
    </div>
  );
};
export default FreshNavbar;
