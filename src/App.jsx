import React, { useEffect, useState } from 'react'
import HomePage from './components/HomePage/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Ui from './components/signin/Ui1';
import Parent from './components/signin/Parentspage';
import MultistepForm from './components/signup/MultistepForm';
import Content from './components/freshcomponents/Freshcontent';
import FreshChaptersPage from './components/freshcomponents/FreshChaptersPage';
import Component1 from './components/freshcomponents/Component1';
import TakeaClassPage from './components/freshcomponents/TakeaClassPage';
import SpeechBot from './components/voicebot/Bot';
const App = () => {
  return (
    <>
      
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Ui />} />
            <Route path="/parentspage" element={<Parent />} />
            <Route path="/childpage" element={<Component1 />}>
                <Route index element={<Content></Content>}></Route>
                <Route path="childpage/chapters" element={<FreshChaptersPage />} />
            </Route>
            <Route path='/takelesson' element={<TakeaClassPage />}></Route>
            <Route path="/signup" element={<MultistepForm />} />
          </Routes>
        </div>
      </Router>
      <SpeechBot />
    </>
  )
}


export default App;
