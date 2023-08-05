import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import HomePageStore from "store/store.jsx"
import 'bootstrap-icons/font/bootstrap-icons.css';
import Sample from './components/signup/sample.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <Sample />
  <Provider store={HomePageStore}>
    <App></App>
  </Provider>
)
