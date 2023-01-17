import React, {useEffect, useState} from 'react';
import '../index.css';
import {Link, useLocation, useNavigate} from "react-router-dom";
import Consumption from "./Consumption";
import WebSk from "./WebSocket";
import axios from 'axios';
import './User.css'
import UserChat from './UserChat';


function UserHome() {

    const {state} = useLocation();
    const {id, username, password, role} = state;
    localStorage.setItem("user", username);


    const [devices, setDevices] = useState()

    const navigate = useNavigate()

    const totalprice = 0

    const getDevices = async e => {
        e.preventDefault();
        axios.get('http://localhost:8080/clients/getDevices/' + id).then(
            response => setDevices(response.data)
        )
    }

    return (
        <div className='App'>

            <div class='devList'>
                <h1> Devices </h1>
                <button onClick={getDevices}> Devices </button>
                {
                devices?.map((g, i) => (
                    <div key={i}>
                            <h2> {g.id}: {g.description} </h2>
                            <p> {g.address} </p>
                            <p> {g.maxConsHr} </p>
                    </div>
                ))}
            </div>

            <div>
               <Consumption/>
            </div>

            <div>
                <WebSk/>
            </div>

            <br></br>

            <div className='chat'>
                <h1>Chat with someone!</h1>
                
                <UserChat
                userName={username}/>
            </div>

        </div>)
}

export default UserHome;