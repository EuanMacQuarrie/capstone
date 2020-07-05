// To remove regeneratorRuntime error while testing
import 'babel-polyfill';
import { get } from 'http';

//used for storing all the user's data as information selected
let UIdata = {};

//measuring the length of the trip
const LengthOfTrip = () =>{
    const start = new Date(document.getElementById('start').value);
    const end = new Date(document.getElementById('end').value);
    const length = end.getTime() - start.getTime();
    UIdata.LengthOfTrip = length / (1000 * 60 * 60 *24) + " days";
}

//getting the remaining days of the trip
const getRemianingDaysOfTrip = () => {
    const start = new Date(document.getElementById('start').value);
    const end = new Date(document.getElementById('end').value);
    const remainingTimeToTrip = Math.ceil(start - time);
    UIdata.remainingTimeToTrip = Math.ceil(remainingTimeOfTrip / (1000 * 60 * 60 * 24)) + " days";    
}

async function formHandler() {
    const city = document.getElementById('destination').value;
    //getting the lat and long of the city entered
    await fetch(`http://localhost8081/getLatLang?city=${city}`, {
        method: get,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
    .then(res => res.json())
    .then(async res => {
        UIdata.temperature = res.data[0].temp;
        UIdata.weatherDesc = res.data[0].weather.description;

    })
}