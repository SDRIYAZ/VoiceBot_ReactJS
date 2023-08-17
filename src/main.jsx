import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import HomePageStore from "store/store.jsx"
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Sample from './components/signup/sample.jsx'
import Freshlandingpage from './components/freshcomponents/Freshlandingpage.jsx'
import FreshNavbar from './components/freshcomponents/Freshnavbar.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

   <Provider store={HomePageStore}>
    <App></App>
   </Provider>
//  <Freshlandingpage></Freshlandingpage>
 
)
