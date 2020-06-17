# UDACITY - Travel App App
This project is a part of [Udacity](https://www.udacity.com/) Front End Developer Nanodegree program.

## Task
The aim of this project is to build out a travel app that  obtains a desired trip location & date from the user, and displays weather and an image of the location using information obtained from external APIs.

Detailed project specifications available [here](https://review.udacity.com/#!/rubrics/2669/view)

## Tech stack
1. Node.js
2. JavaScript
3. Webpack
4. HTML
5. Sass

## VIEW
![Interface](../assets/Travel_planner1.png?raw=true)

![Interface](../assets/Travel_planner2.png?raw=true)

## Run locally
* Sign up and get API keys from [Weatherbit](https://www.weatherbit.io/account/create), [Pixabay](https://pixabay.com/api/docs/) and user name from [GeoNames](http://www.geonames.org/export/web-services.html)
* git clone the repository and create a new ```.env``` file in the root of the project
* Fill the .env file with your API keys like this
  ```
  API_KEY_PIXABAY=**************************
  API_KEY_WEATHERBIT=**************************
  API_KEY_GEONAMES=**************************
  ```
* Install npm by running ```npm install```
* To view in develoment mode run ```npm run build-dev```, the window will open automatically
* To view in production mode run ```npm run build-prod```, then ```npm start``` and open [http://localhost:3300/](http://localhost:3300/) in your prefered browser
