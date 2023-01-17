import React, {useState, useEffect, Component} from 'react';
import './App.css';
import {NavLink,BrowserRouter as Router,
  Routes, Link,
  Route} from "react-router-dom";
import UserLogin from "./Login";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Energy Monitoring App</h1>
        <h2>Login</h2>
        <UserLogin/>
      </header>
    </div>
  );
}

export default App;
