import axios from "axios";
import React, {useEffect, useState} from "react";
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

function Chartpage() {
    

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

    const data = {
        labels: [1, 2 ,3 ,4, 5, 6, 7, 8, 9, 10 ,11, 12],
        datasets : [
            {
                backgroundcolor:'aqua',
                borderColor:'black',
                borderWidth:1
            }
    ]
    }

    return ( 
        <div>
            <Bar
            
            ></Bar>
        </div>
    )
}

export default Chartpage;