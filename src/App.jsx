import React, {useEffect} from 'react'
import HomePage from 'components/HomePage/HomePage';
// import { useDispatch, useSelector } from 'react-redux';
// import { getHomepageHeader } from './services/homepage_services/getHomepageHeader';
// import { getHomepageBanner } from './store/reducers/homepage/banner';
// import { getHomepageourprojects } from './store/reducers/homepage/ourprojects';

const App = () => {
  // const dispatch = useDispatch();
  // const header = useSelector((state)=> state.homepage_header)
  // console.log(`${header} from App.jsx`);
  // const banner = useSelector((state)=> state.homepage_banner)
  // const ourprojects = useSelector((state)=> state.homepage_ourprojects)
  // useEffect(()=>{
  //   dispatch(getHomepageHeader());
  //   dispatch(getHomepageBanner());
  //   dispatch(getHomepageourprojects());
  // },[])

  return (
    <>
        <HomePage />
       {/* {JSON.stringify(header)} 
       {JSON.stringify(ourprojects)}
       {JSON.stringify(banner)} */}

    </>
  )
}

export default App;
