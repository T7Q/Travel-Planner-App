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

// FUNCTIONS

// Function that sends a request to Geonames server to fetch country based on city

const getCountry = async (geonamesKEY) => {
    console.log(`http://api.geonames.org/searchJSON?username=${geonamesKEY}&q=${trip.city}`);
    console.log("city"+ trip.city);
    const response = await fetch(`http://api.geonames.org/searchJSON?username=${geonamesKEY}&q=${trip.city}&maxRows=1`);
    // const response = await fetch(`https://pixabay.com/api/?image_type=photo&key=${pixKEY}&q=${trip.city}`);
    try {
        const data = await response.json();
        trip.country = data.geonames[0].countryName;
    } catch (error) {
        trip.country = "ooops, country does not exist";
        cosole.log("errore");
        // trip.imgURL = "https://cdn.pixabay.com/photo/2013/02/21/19/06/beach-84533_1280.jpg";
    }
}

// Function that sends a request to Pixabay server using pixKEY (Pixabay API key)

const getImage = async (pixKEY) => {
    const response = await fetch(`https://pixabay.com/api/?image_type=photo&key=${pixKEY}&q=${trip.city}`);
    try {
        const data = await response.json();
        trip.imgURL = data.hits[0].webformatURL;
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
        await getImage(process.env.API_KEY_PIXABAY);
        await getCountry(process.env.API_KEY_GEONAMES);
        // await getImage(process.env.API_KEY_WEATHERBIT);
        res.json({
            success: true, 
            trip: trip
        });
    } catch (error) {
        res.send({success: false});
    }
     
})
