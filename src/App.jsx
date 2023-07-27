import React, {useEffect, useState} from 'react'
import HomePage from './components/HomePage/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Ui from './components/signin/Ui1';
import Parent from './components/signin/Parentspage';
import Child from './components/signin/Childpage';
import MultistepForm from './components/signup/MultistepForm';
const App = () => {
  return (
    <>
        {/* <HomePage /> */}
        {/* <Ui /> */}
        <Router>
      <div>
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Ui />} />
            <Route path="/parentspage" element={<Parent />} />
            <Route path="/childpage" element={<Child/>} />
            <Route path="/signup" element={<MultistepForm />} />
          </Routes>
      </div>
    </Router>
    </>
  )
}


export default App;
