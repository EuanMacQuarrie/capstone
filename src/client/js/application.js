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
        UIdata.population = res.population;
        await getWeather(`http://localhost:8082/getWeather?lat=${res.lat}&long=${res.long}`)
    })
    .catch(error =>{
        console.log(error)
    })
}

//getting weather using lat and long values
const getWeather = async (url) => {
    await fetch(url ,{
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json:charset=utf-8'
        }
    })
    .then(res => res.json())
    .then(async res =>{
        UIdata.temperature = res.data[0].temp;
        UIdata.weatherDesc = res.data[0].weather.description;
        await getPics(`http://localhost:8082/getPics?q=${UIdata.city}`)
    })
    .catch(error =>{
        console.log(error)
    })
}

const getPics = async (url) =>{
    await fetch(url , {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
    .then(res => res.json())
    .then(res => {
        UIdata.img = res.webformatURL; 
    })
    .catch(error => {
        console.log(error)
    })
}

//to validate the input forms and process information
export const validateProcess = async () => {
    const destination = document.getElementById('destination').value;
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;
    const startDate = new Date(start);
    const endDate = new Date(end);
}

if(start.length !== 0 && end.length !== 0 && destination.length !== 0 && (endDate - startDate >= 0)){
    document.getElementById('form-submit').innerHTML = "Fetching data..."
    await formHandler();
    getRemainingDaysOfTrip();
    getLengthOfTrip();
    document.getElementById('form-submit').innerHTML = "Submit";
    updateUI();
  } else {
    document.getElementById('status').innerHTML = "Please enter correct values";
    setTimeout(() => {
      document.getElementById('status').innerHTML = "";
    }, 2500)
  }


//populating the webpage with the user's entries
export const updateUI = () => {
    document.getElementById('modal-img').setAttribute('src', UIdata.img);
    document.getElementById('modal-city').innerHTML = UIdata.city;
    document.getElementById('modal-country').innerHTML = UIdata.country;
    document.getElementById('modal-temp').innerHTML = UIdata.temperature;
    document.getElementById('modal-weather').innerHTML = UIdata.weatherDesc;
    document.getElementById('modal-population').innerHTML = UIdata.population;
    document.getElementById('modal-timeRemaining').innerHTML = UIdata.remainingTimeToTrip;
    document.getElementById('modal-tripLength').innerHTML = UIdata.lengthOfTrip;
    document.getElementById('modal-launch').click(); 
}