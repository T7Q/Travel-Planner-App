/* Global Variables */

// my API key for openweather website
const apiKEY = '1b7def04d6503cb6860a08aa55b18ab8';
// open weather API URL
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

function handSumbit() {
	console.log("click");
  // Store values entered into the form
  let zip = document.getElementById('zip').value;
  let userResponse = document.getElementById('feelings').value;

  // Get temperature based on entered zip code and openweather API
  getWeather(baseURL, zip, apiKEY)
  // post the data (weather, userResponse, zip and date) to the server
  .then(function(weatherData){
      let data = {
        'zip': zip,
        'userResponse': userResponse,
        'temperature': weatherData.main.temp,
        'date': newDate
      }
      postData('/weather', data);
      // update UI
      updateUI()
  })
}

// Function to update UI
const updateUI = async () => {
  const request = await fetch('/weather');
  try {
    const data = await request.json();
    document.getElementById('dest_city').innerHTML = data.date;
    
  } catch(error) {
    console.log("error", error);
  }
}

// Get weather data from external API
const getWeather = async (baseURL, zip, apiKEY) => {
	console.log("fetching zip");
    const res = await fetch (baseURL + "zip=" + zip + "&appid=" + apiKEY)
    try {
      const weatherData = await res.json();
      return weatherData;
    } catch (error) {
      console.log("error", error);
    }
  }

// POST request to our route
const postData = async ( url = '', data = {})=>{
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      }, 
      body: JSON.stringify(data), 
      });
      try {
        const data = await response.json();
        return data;
      }catch(error) {
      	console.log("error", error);
      }
  }

// Add event listerner to the "Generate" button
console.log(document.getElementById('generate'));
document.getElementById('generate').addEventListener('click', performeAction)