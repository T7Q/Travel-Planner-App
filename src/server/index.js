var path = require('path');
const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
let trip = {};

// Trip variable contains the following data
// trip: {
//     city: 'Rome', // user input
//     departure: '20.06.2020', // user input
//     country: 'Italy', // from GeoNames
//     imgURL: 'https://city_image...' // form Pixabay
//     diffDays: 2, // days to the trip (calculate value)
//     departureInfo: 'Departure in 2 days on 20.06.2010', // calucated value
//     tempMax: 20, // from Weatherbits
//     tempMin: 15, // from Weatherbits
//     icon: 'r01d.png', //icon code from Weatherbits (availalble only for 16 days)
//     weatherDescription: 'Sunny', // from Weatherbits (awailable only for 16 days)
// }

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
    const response = await fetch(`http://api.geonames.org/searchJSON?username=${geonamesKEY}&q=${trip.city}&maxRows=1`);
    try {
        const data = await response.json();
        trip.country = data.geonames[0].countryName;
    } catch (error) {
        trip.country = "ooops, country does not exist";
        cosole.log("error");
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

// Function that sends a request to Pixabay server using pixKEY (Pixabay API key)

const getWeather = async (weatherbitsKEY, url) => {
    const response = await fetch(`${url}&key=${weatherbitsKEY}&units=M&city=${trip.city},${trip.country}`);
    try {
        const data = await response.json();
        
        if (trip.diffDays >= 0 && trip.diffDays < 16){
            trip.tempMin = data.data[trip.diffDays].low_temp;
            trip.tempMax = data.data[trip.diffDays].high_temp;
            trip.icon = data.data[trip.diffDays].weather.icon;
            trip.weatherDescription = data.data[trip.diffDays].weather.description
            }
        else {
            trip.tempMin = data.data[0].min_temp;
            trip.tempMax = data.data[0].max_temp;           
        }

    } catch (error) {
        trip.weather = "error";
    }
}


// function that calculates number of days between today and departure date and generates message
function departureInfo(date) {
    const today = new Date();
    const departure = new Date(date);
    const diffTime = Math.abs(departure - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    trip.diffDays = diffDays;

    const diffDaysManual = departure.getDate() - today.getDate();
    const diffYears = departure.getFullYear() - today.getFullYear();
    const diffMonths = ((departure.getMonth() + 1) - (today.getMonth() + 1));


    if (diffDaysManual == 0 && diffYears == 0 && diffMonths == 0){
        trip.departureInfo = `Departure is today ${departure.getDate()}.${(departure.getMonth() + 1)}.${departure.getFullYear()}`;
        trip.diffDays = 0;
    }
    else if (diffDaysManual == -1 && diffYears == 0 && diffMonths == 0){
        trip.departureInfo = `Departure was yesterday ${departure.getDate()}.${(departure.getMonth() + 1)}.${departure.getFullYear()}`;
        trip.diffDays *= -1;
    }
    else if (diffDaysManual == 1 && diffYears == 0 && diffMonths == 0){
        trip.departureInfo = `Departure is tomorrow ${departure.getDate()}.${(departure.getMonth() + 1)}.${departure.getFullYear()}`;
    }
    else if ((departure - today) > 0){
        trip.departureInfo = `Departure is in ${diffDays} days on ${departure.getDate()}.${(departure.getMonth() + 1)}.${departure.getFullYear()}`;
    }
    else{
        trip.departureInfo = `Departure was ${diffDays} days ago on ${departure.getDate()}.${(departure.getMonth() + 1)}.${departure.getFullYear()}`;
        trip.diffDays *= -1;
    }
}

// ENDPOINTS

// endpoint to get main page
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})


function getWeatherbitURL(diffDays, userInputDate){
    // change date format for YY MM DD data extraction
    const departure = new Date(userInputDate);
    
    let url = "";
    // for past dates use received date
    if (diffDays < 0 ){
        let startDate = `${departure.getFullYear()}-${departure.getMonth() + 1}-${departure.getDate()}`;
        let endDate =  `${departure.getFullYear()}-${departure.getMonth() + 1}-${departure.getDate() + 1}`;
        url = `http://api.weatherbit.io/v2.0/history/daily?start_date=${startDate}&end_date=${endDate}`;
    }
    // for future dates use historical values for 2019
    else if (diffDays > 15){
        let startDate = `2019-${departure.getMonth() + 1}-${departure.getDate()}`;
        let endDate =  `2019-${departure.getMonth() + 1}-${departure.getDate() + 1}`;
        url = `http://api.weatherbit.io/v2.0/history/daily?start_date=${startDate}&end_date=${endDate}`;
    }
    // for 16days forcast use different url (here we get icons)
    else {
        url = `http://api.weatherbit.io/v2.0/forecast/daily?`;
    }
    return url;
}


app.post('/trip', async(req, res) => {
    // reset current trip
    trip = {};
    try {
        trip.city = req.body.city;
        let departureDate = req.body.departure;
        
        // function that updates trip.diffDays (days to the trip) and trip.message (to updat UI with)
        departureInfo(departureDate);

        // get base URL for Weaterbit API request
        let url = getWeatherbitURL(trip.diffDays, departureDate);
        
        await getImage(process.env.API_KEY_PIXABAY);
        await getCountry(process.env.API_KEY_GEONAMES);
        await getWeather(process.env.API_KEY_WEATHERBIT, url);
        res.json({
            success: true, 
            trip: trip
        });
    } catch (error) {
        res.send({success: false});
    }
     
})

module.exports = app