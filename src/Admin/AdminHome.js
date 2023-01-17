import React, { useState } from 'react';
import AddDevice from './DeviceCreator';
import AddUser from './UserCreator';
import {useLocation} from "react-router-dom";
import axios from 'axios';
import './Admin.css';

function AdminHome() {

    const {state} = useLocation();  // is an adminDTO
    const [users,setUsers] = useState();
    const [devices,setDevices] = useState();
    const [userID,setUserID] = useState();
    const [devID,setDevID] = useState();

    const getUsers = async e => {
        e.preventDefault()
        //var foo = adminID + ''
        axios.get('http://localhost:8080/admin/getUsers').then(
            response => setUsers(response.data)
        )
    }

    const getDevices = async e => {
        e.preventDefault()
        axios.get('http://localhost:8080/admin/getDevices').then(
            response => setDevices(response.data)
            .then(function(response) {
                console.log(response);
                })
                .catch((error) => {
                    console.log(error.headers.text);
                    alert(error)
                })
        )
    }

    const handleConnect = async e => {
        e.preventDefault()
        axios.post('http://localhost:8080/admin/connectUserDevice', {
        devID : devID,
        userID : userID
        })
        alert(devID + "   and user:" + userID)
    }

    return (
        <div className='App'>
            <div>
                <div>
                    <AddUser admin={state.id}/>
                </div>
                <br></br>
                <div>
                    <AddDevice admin={state.id}/>
                </div>
                <br></br>
                <div>
                    <h1> Users </h1>
                    <button onClick={getUsers}> Users </button>
                    <div class='entries'>
                        {
                        users?.map((f, i) => (
                            <div key={i}>
                                    <h2> {f.id}: {f.username} </h2>
                                    <p> {f.password} </p>
                                    <p> {f.role} </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h1> Devices </h1>
                    <button onClick={getDevices}> Devices </button>
                    <div class='entries'>
                        {
                        devices?.map((g, i) => (
                            <div key={i}>
                                    <h2> {g.id}: {g.description} </h2>
                                    <p> {g.address} </p>
                                    <p> {g.maxConsHr} </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div class='connect'>
                    <h1> Connect user with device </h1>
                    <form onSubmit={handleConnect}>
                        <label for='userID'> User ID</label>
                        <br></br>
                        <input id='userID' onChange={e => setUserID(e.target.value)}></input>
                        <br></br>
                        <label for='devID'> Device ID</label>
                        <br></br>
                        <input id='devID' onChange={e => setDevID(e.target.value)}></input>
                        <br></br>
                        <br></br>
                        <button type='submit'>Connect</button>
                    </form>
                </div> 
                <footer>
                    Distributed Systems 2022
                </footer>
            </div>
        </div>
    )
}

export default AdminHome;