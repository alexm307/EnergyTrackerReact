import axios from 'axios';
import React, { useState } from 'react';
import './Admin.css';

function AddDevice({admin}) {
    const [maxConsHr, setMaxConsHr] = useState();
    const [description, setDescription] = useState();
    const [address, setAddress] = useState();
    const [id, setId] = useState();
    const [delId, setDelId] = useState();

    const handleCreate = async e => {
        e.preventDefault();
           axios.post('http://localhost:8080/admin/createDevice', {
               id: id,
               description:description,
               address:address,
               maxConsHr:maxConsHr
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
           axios.post('http://localhost:8080/admin/updateDevice', {
               id: id, 
               description:description,
               address:address,
               maxConsHr:maxConsHr
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
           axios.post('http://localhost:8080/admin/deleteDevice/'+delId)
           .then(function(response) {
            console.log(response);
            })
            .catch((error) => {
                console.log(error.text);
                alert(error)
            })
    }

    return(
        <div class='addDev'>
            <form>
                <h2>Add Device</h2>
                <div>
                    <label> Id </label>
                    <input type="text" onChange={e => setId(e.target.value)}></input>
                </div>
                <div>
                    <label> Description </label>
                    <input type="text" onChange={e => setDescription(e.target.value)}/>
                </div>
                <div>
                    <label> Address </label>
                    <input type="text" onChange={e => setAddress(e.target.value)}/>
                </div>
                <div>
                <label> Max Consumption </label>
                    <input type="text" onChange={e => setMaxConsHr(e.target.value)}/>
                </div>
                <div>
                    <button onClick={handleCreate}> Create </button>
                    <button onClick={handleUpdate}> Update </button>
                </div>
                
            </form>
            <form onSubmit={handleDelete}>
                <label> Id to delete </label>
                <input type="text" onChange={e => setDelId(e.target.value)}/>
                <button type='submit'> Delete Device</button>
            </form>
        </div>
    )
}

export default AddDevice;