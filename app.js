//require express.js and pass express() to var called app
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
//req https module to get apis
const https = require("https");

//get our app to use body-parser - it is the code necessary to pass the body of the post req
app.use(bodyParser.urlencoded({extended: true}));
// get req done
//use app.get with res and req to get res from API
//res to respond to the user's req
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res){
    //console.log('Post request received'); --- to check that post req sends
    // console.log(req.body.cityName); --- to print input of user on console
    //To get the users input in the form we would install a new pkg called body-parser
    
    //create var to store API url
    const query = req.body.cityName; // used to get user input on input field of index.html file
    const apiKey = '78b581404738186382a0dd50b37d80f9';
    const unit = 'metric';

    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ query+'&appid='+ apiKey +"&unit"+ unit+"'";

    //gets the response of the API
    https.get(url, function(response){
        console.log(response.statusCode);

    
    response.on("data", function(data){
        //to convert hexadecimal code to JSON - Js object use:
        const weatherData = JSON.parse(data);
        //get weather details 
        const temp = weatherData.main.temp;
        //mini-challenge - get weather description and print to console
        const desc = weatherData.weather[0].description;
        //mini-challenge - get weather icon from JSON object path
        const icon = weatherData.weather[0].icon;
        //insert icon URL in a variable and concatenate the name of the icon as gotten from the JSON obj into the url
        const iconURL = 'https://openweathermap.org/img/wn/'+ icon+ '@2x.png'

    //this is the response from server to the browser //res.send can only be sent once
    res.write('<h1>The temperature in ' + query+ ' is ' + temp + ' degrees Celcius.</h1>');
    res.write('<p>The weather is currently ' + desc+ ' .</p>');
    //res.write the <img> tag //concatenate the url of the img in the src attributeu
    res.write('<img src='+ iconURL +'>');
    res.send();
    //to send multiple h1 either use res.send then + for sentence2 as seen above or use res.write()
    //we can have multiple res.write();

    })

})
})
    

 //local host on port 3000. This is seperate from app.get() & its function call
app.listen(3000, function(){
console.log("The server is running on port 3000.");
    
});