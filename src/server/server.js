// Require Express to run server and routes
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


// use the express-static middleware
app.use(express.static(__dirname + '/public'))

// // define the first route
// app.get("/", function (req, res) {
//   res.send("<h1>Hello World!</h1>")
// })

// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));


//Body-parser as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');

  // authorized headers for preflight requests
  // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();

  app.options('*', (req, res) => {
      // allowed XHR methods  
      res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
      res.send();
  });
});

//initialize the main project folder
app.use(express.static("website"));

//defining projectData to act as the app API endpoint
const projectData = {};

// get endpoints
app.get('/', (req,res)=>{
  res.sendFile(`./website/index.html`)
});

app.get('/entries', (req,res)=>{
  res.send(projectData);
  console.log(`Entry has been sent to the UI: `+ JSON.stringify({projectData}));
});

//post endpoints
app.post("/newentry", addEntry);

//def function to add a new entry
function addEntry(req,res){
  let newEntry = {
    "temp": req.body.temp,
    "postContent": req.body.content,
    "date": req.body.date
  };

  Object.assign(projectData, newEntry)

  console.log(`New entry has been added to the server: `+JSON.stringify({projectData}));
  res.send(projectData)
}