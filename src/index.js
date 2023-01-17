import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AdminHome from './Admin/AdminHome';
import UserHome from './User/UserHome';
import Chartpage from './User/Chartpage';
import WebSocket from './User/WebSocket';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
        <Routes>
            <Route path='*' element={<App/>}/>
            <Route path='/admin' element={<AdminHome/>}/>
            <Route path='/clients' element={<UserHome/>}/>
            <Route path='/charts' element={<Chartpage/>}/>
            <Route path='/socket' element={<WebSocket/>}/>
        </Routes>
    </Router>
  //<React.StrictMode>
  //  <App />
  //</React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
