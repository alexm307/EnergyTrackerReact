import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';


function UserLogin() {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    let navigate = useNavigate()

    const handleLogIn = async e => {
        e.preventDefault();
        axios.post('http://localhost:8080/user/login', {
            username: username,
            password: password
        })
        /*.then(response => {
            navigate('/user', {state: response.data})
            console.log(response.data);
            alert("Succesfully logged in!")
        })
        */
       .then(response => {
        if (response.data.role === 'ADMIN') {
            navigate('/admin', {state: response.data})
        }
        else
            navigate('/clients', {state: response.data})
        })
        .catch((error) => {
            console.log(error);
            alert(error)
        })
    }

    return(
        <div>
            <form onSubmit={handleLogIn}>
                <label> Username </label>
                    <input type="text" onChange={e => setUserName(e.target.value)}/>
                <br></br>
                <label> Password </label>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                <br></br>
                <div>
                    <button type="submit"> LogIn </button>
                </div>
            </form>
        </div>
    )
}

export default UserLogin;