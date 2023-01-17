import axios from "axios";
import React, {useEffect, useState} from "react";
import Calendar from "react-calendar";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import './User.css';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

function Consumption() {
    const [name, setname] = useState()
    const [consumption, setConsumption] = useState()
    const [value, setVal] = useState(new Date())
    const [devID, setDevID] = useState()

    var a,b,c;
/*
    useEffect(() => {
        const getRaces = async () => {
            axios.get('http://localhost:8081/user/getRaces').then(
                response => setRaces(response.data)
            )
        }
        getRaces();
    }, [])
*/
    const getConsumption = async e => {
        e.preventDefault()
        axios.post('http://localhost:8080/clients/getConsumption', {
            devID:devID, 
            day:value.getDate(a),
            month:value.getMonth(b),
            year:value.getFullYear(c)
        }).then (
            response => {
                setConsumption(response.data);
                alert(response.data)
                setConsumption(response.data)
            }
        ).catch((error) => {
            console.log(error);
            alert(error);
        })
    }

    const data = {
        labels: consumption?.map((g,i) => g.hour),
        datasets : [
            {
                data: consumption?.map((g,i) => g.consumedKw),
                backgroundcolor:'red',
                borderColor:'black',
                borderWidth:1
            }
    ]
    }

    return (
        <div class='consumption'>
            <h1> Consumption </h1>
            <label>Device ID</label>
            <br></br>
            <br></br>
            <input type='text' onChange={e => setDevID(e.target.value)}></input>
            <br></br>
            <br></br>
            <label>Consumption Date</label>
            <br></br>
            <br></br>
            <div class='calendar'>
                <Calendar onClickDay={setVal}/>
            </div>
            <br></br>
            <button onClick={getConsumption}>Get Device Consumption</button>

            {
                consumption?.map((g, i) => (
                    <div key={i}>
                            <h2> {g.hour}: {g.consumedKw} </h2>
                    </div>
                ))}
            <br></br>
            <a href="/charts">ChartPage</a>
            <div>
            <Bar
                data={data}
            ></Bar>
        </div>
        </div>
    )
}

export default Consumption;