import Accordion from "react-bootstrap/Accordion";
import './FreshChaptersPage.css'
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import fetchLandingPageData from "../../services/landingpage_services/fetchLandingPageData";

const FreshChaptersPage = () => {
  const { data, error, isLoading } = useQuery(
    'chapters_data',
    () => fetchLandingPageData("http://localhost:3000/landingpage_chapters")
  );

  const [landingchaptersData, setLandingChaptersData] = useState([]);

  useEffect(() => {
    if (!isLoading && !error) {
      setLandingChaptersData(data);
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
    <>
      <div className="accordionsection content" >
        <Accordion className="Accordionitem">
          {landingchaptersData && (
            landingchaptersData.map((element, index) => (
              <Accordion.Item key={index} eventKey={index}>
                <Accordion.Header>
                  {element.title}
                </Accordion.Header>
                <Accordion.Body>
                  <ul>
                    {element && (
                      element.content.map((ele, ind) => (
                        <li key={ind}>
                          <Link to="/takelesson">{ele.title}</Link>
                        </li>
                      ))
                    )}
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            ))
          )}
        </Accordion>

      </div>
    </>
  )
};
export default FreshChaptersPage;