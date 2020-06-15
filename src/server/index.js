var path = require('path');
const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
let trip = {};

// Start up an instance of app
const app = express()

// initialize main project folder
app.use(express.static('dist'))

//Configure express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Set up server: designates what port the app will listen to for incoming requests
app.listen(3300, function () {
    console.log('Example app listening on port 3300!')
})

// set dotenv
const dotenv = require('dotenv');
dotenv.config();

console.log(`Your API key is ${process.env.API_KEY_PIX}`);

// Get city image through Pixabay API
const pixKEY = process.env.API_KEY_PIX;
// Pixabay API URL
const pixURL = 'https://pixabay.com/api/?';

// Get wan image from Pixabay
const getImage = async (pixKEY) => {
    console.log("fetching pic");
    console.log("KEY "+ pixKEY);
    console.log("city " + trip.city);
    console.log("https://pixabay.com/api/?image_type=photo&key=" + pixKEY + "&q=$" + trip.city);
    // const req = await fetch(`https://pixabay.com/api/?image_type=photo&key=${pixKEY}&q=${trip.city}`);
    const req = await fetch("https://pixabay.com/api/?image_type=photo&key=" + pixKEY + "&q=$" + trip.city);
    try {
        console.log("sending img to client side");
        const res = await req.json();
        trip.imgURL = "HELLO";
        // trip.imgURL = res.hits[0].webformatURL;
    } catch (error) {
        trip.imgURL = "ooops, no image was fetched";
    }
}


// ENDPOINTS

// endpoint to get main page
app.get('/', function (req, res) {
    // res.sendfile("server is running")
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})


app.post('/trip', async(req, res) => {
    trip = {};
    try {
        const city = req.body.city;
        trip.city = city;
        await getImage(pixKEY);
        res.json({
            success: true, 
            trip: trip
        });
    } catch (error) {
        res.send({success: false});
    }
     
})
