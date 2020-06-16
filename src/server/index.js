var path = require('path');
const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
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

// set dotenv to get API keys from .env
const dotenv = require('dotenv');
dotenv.config();


// Function that sends a request to Pixabay server using pixKEY (Pixabay API key)

const getImage = async (pixKEY) => {
    const response = await fetch(`https://pixabay.com/api/?image_type=photo&key=${pixKEY}&q=${trip.city}`);
    try {
        const data = await response.json();
        console.log("got response");
        trip.imgURL = data.hits[0].webformatURL;
        console.log(trip.imgURL);
    } catch (error) {
        trip.imgURL = "https://cdn.pixabay.com/photo/2013/02/21/19/06/beach-84533_1280.jpg";
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
        await getImage(process.env.API_KEY_PIX);
        res.json({
            success: true, 
            trip: trip
        });
    } catch (error) {
        res.send({success: false});
    }
     
})

// app.get('/trip', function (req, res) {
//     // res.sendfile("server is running")
//     res.sendFile("sending response")
//     // res.sendFile(path.resolve('src/client/views/index.html'))
// })