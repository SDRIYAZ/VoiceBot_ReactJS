import React, {useEffect} from 'react'
import HomePage from 'components/HomePage/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import { getHomepageHeader } from './services/homepage_services/getHomepageHeader';
import { getHomepageBanner } from './services/homepage_services/getHomepageBanner';
import { getHomepageOurprojects } from './services/homepage_services/getHomepageOurprojects';
import { getHomepageLeadersvoice } from './services/homepage_services/getHomepageLeadersvoice';
import { getHomepageParentsvoice } from './services/homepage_services/getHomepageParentsvoice';
import { getHomepageNewsletter } from './services/homepage_services/getHomepageNewsletter';


const App = () => {
  const dispatch = useDispatch();
  const header = useSelector((state)=> state.homepage_header)
  const banner = useSelector((state)=> state.homepage_banner)
  const ourprojects = useSelector((state)=> state.homepage_ourprojects)
  const leadersvoice = useSelector((state)=> state.homepage_leadersvoice)
  const parentsvoice = useSelector((state)=> state.homepage_parentsvoice)
  const newsletter = useSelector((state)=> state.homepage_newsletter)
  useEffect(()=>{
    dispatch(getHomepageHeader());
    dispatch(getHomepageBanner());
    dispatch(getHomepageOurprojects());
    dispatch(getHomepageLeadersvoice());
    dispatch(getHomepageParentsvoice());
    dispatch(getHomepageNewsletter());
  },[])

  return (
    <>
        {/* <HomePage /> */}
       {/* {JSON.stringify(header)} 
       {JSON.stringify(ourprojects)}
       {JSON.stringify(banner)} */}
       {JSON.stringify(leadersvoice)}
       {/* {JSON.stringify(parentsvoice)} */}
       {/* {JSON.stringify(newsletter)} */}
    </>
  )
}

export default App;
