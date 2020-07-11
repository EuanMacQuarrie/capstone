//config env
const dotenv = require('dotenv');
dotenv.config();

//import modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const { response } = require('express');

//to remove regeneratorRuntime error in testing
require('babel-polyfill');

const chokidar = require('chokidar');
 
// One-liner for current directory
chokidar.watch('.').on('all', (event, path) => {
  console.log(event, path);
});

//setting middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({extended: true,}));

//home route
app.get('/', function(req, res){
  res.sendFile(path.resolve('dist/index.html'))
  })

//server test
app.get('/test', function(req, res){
  res.json({
    status: 200
  })
})

//using geonames
app.get('/getLang', (req, res) => {
  const url = `http://api.geonames.org/searchJSON?maxRows=10&operator=OR&q=${req.query.city}&name=${req.query.city}&username=${process.env.USERNAME}`;
    axios.get(url).then(response => {
      res.end(JSON.stringify(response.data.geonames[0]));
    })
    .catch(error => {
      res.end(JSON.stringify({error: "An error occured"}));
    })
})

//using weatherbit api to get weather details of flight origin
app.get('/getWeather', (req, res) => {
  const url = `https://api.weatherbit.io/v2.0/current?lat=${req.query.lat}&long=${req.query.long}&key=${process.env.WEATHER_KEY}`;
    axios.get(url).then(response =>{
      res.end(JSON.stringify(response.data))
    })
    .catch(error => {
      res.end(JSON.stringify({error: "An error occured"}));
    })
})

//using pixabay to get images for the trip
app.get('/getPics', (req, res) => {
  const url = `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${req.query.q}&image_type=photo`;
    axios.get(url).then(response =>{
      res.end(JSON.stringify(response.data.hits[0]));
    })
    .catch(error => {
      res.end(JSON.stringify({error: "An error has occured"}));
    })
})

//setting server
app.listen(8082, () => {
  console.log('Server running on port 8082');
});

module.exports = app;