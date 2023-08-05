import React, { useEffect, useState } from 'react'
import HomePage from './components/HomePage/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Ui from './components/signin/Ui1';
import Parent from './components/signin/Parentspage';
import Child from './components/signin/Childpage';
import Child1 from './components/childpages/child1';
import Child2 from './components/childpages/child2';
import MultistepForm from './components/signup/MultistepForm';

const App = () => {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Ui />} />
            <Route path="/parentspage" element={<Parent />} />
            <Route path="/childpage" element={<Child />} />
            <Route path="/childpage1" element={<Child1 />} />
            <Route path="/childpage2" element={<Child2 />} />
            <Route path="/signup" element={<MultistepForm />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}


export default App;
