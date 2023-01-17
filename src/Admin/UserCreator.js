import axios from 'axios';
import React, { useState } from 'react';
import './Admin.css';

function AddUser({admin}) {
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [role, setRole] = useState();
    const [id, setId] = useState();
    const [delID, setDelId] = useState();

    const handleCreate = async e => {
        e.preventDefault();
           axios.post('http://localhost:8080/admin/createUser', {
               username : name,
               password:password,
               role:role
           })
           .then(function(response) {
            console.log(response);
            })
            .catch((error) => {
                console.log(error.text);
                alert(error)
            })
    }

    const handleUpdate = async e => {
        e.preventDefault();
           axios.post('http://localhost:8080/admin/updateUser', {
               id: id, 
               username : name,
               password:password,
               role:role
           })
           .then(function(response) {
            console.log(response);
            })
            .catch((error) => {
                console.log(error.text);
                alert(error)
            })
    }

    

    const handleDelete = async e => {
        e.preventDefault();
           axios.post('http://localhost:8080/admin/deleteUser'+ delID)
           .then(function(response) {
            console.log(response);
            })
            .catch((error) => {
                console.log(error.text);
                alert(error)
            })
    }

    return(
        <div class='addUser'>
            <form>
                <h2>Add User</h2>
                <div>
                    <label> Id </label>
                    <input type="text" onChange={e => setId(e.target.value)}></input>
                </div>
                <div>
                    <label> Name </label>
                    <input type="text" onChange={e => setName(e.target.value)}/>
                </div>
                <div>
                    <label> Password </label>
                    <input type="text" onChange={e => setPassword(e.target.value)}/>
                </div>
                <div>
                <label> Role</label>
                    <input type="text" onChange={e => setRole(e.target.value)}/>
                </div>
                <div>
                    <button onClick={handleCreate}> Create </button>
                    <button onClick={handleUpdate}> Update </button>
                </div>
                
            </form>
            <form onSubmit={handleDelete}>
                <label> Id to delete </label>
                <input type="text" onChange={e => setDelId(e.target.value)}/>
                <button type='submit'> Delete User</button>
            </form>
        </div>
    )
}

export default AddUser;