import React, {useEffect, useState} from 'react'
import HomePage from 'components/HomePage/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import { getHomepageHeader } from './services/homepage_services/getHomepageHeader';
// import { getHomepageBanner } from './services/homepage_services/getHomepageBanner';
// import { getHomepageOurprojects } from './services/homepage_services/getHomepageOurprojects';
// import { getHomepageLeadersvoice } from './services/homepage_services/getHomepageLeadersvoice';
// import { getHomepageParentsvoice } from './services/homepage_services/getHomepageParentsvoice';
// import { getHomepageNewsletter } from './services/homepage_services/getHomepageNewsletter';


const App = () => {
  // const dispatch = useDispatch();
  // const header = useSelector((state)=> state.homepage_header)
  // const { data, loading, isSuccess, message } = header;
  // const [finalheaderdata, setFinalHeaderData] = useState([]) 
  // if(!loading && isSuccess){
  //   const [header_data] = data
  //   const Data = header_data.data
  //   const final = Data[0]
  //   const {image, ...rest} = final
  //   const {patents, about, contact, forparents, home} = rest;
  //   // const final_header_data = [home, about, contact, forparents , patents]
  //   // console.log(final_header_data);
  //   setFinalHeaderData([home, about, contact, forparents , patents]);
  // }
  
  // const banner = useSelector((state)=> state.homepage_banner)
  // const ourprojects = useSelector((state)=> state.homepage_ourprojects)
  // const leadersvoice = useSelector((state)=> state.homepage_leadersvoice)
  // const parentsvoice = useSelector((state)=> state.homepage_parentsvoice)
  // const newsletter = useSelector((state)=> state.homepage_newsletter)
  // useEffect(()=>{
  //   dispatch(getHomepageHeader());
  //   // dispatch(getHomepageBanner());
  //   // dispatch(getHomepageOurprojects());
  //   // dispatch(getHomepageLeadersvoice());
  //   // dispatch(getHomepageParentsvoice());
  //   // dispatch(getHomepageNewsletter());
  // },[])

  return (
    <>
        <HomePage />
       {/* {JSON.stringify(header)}  */}
       {/* {final_header_data} */}
       {/* {finalheaderdata.map((element, index)=>{
          return <div key={index}>{element}</div>
       })} */}
       {/* {JSON.stringify(ourprojects)} */}
       {/* {JSON.stringify(banner)} */}
       {/* {JSON.stringify(leadersvoice)} */}
       {/* {JSON.stringify(parentsvoice)} */}
       {/* {JSON.stringify(newsletter)} */}
    </>
  )
}


export default App;
