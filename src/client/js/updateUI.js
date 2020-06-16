export const updateUI = (trip, data) => {
    document.getElementById('output_img2').src = trip.trip.imgURL;
    document.getElementById("dest_city").innerHTML = data.city + ", ";
    document.getElementById("dest_country").innerHTML = trip.trip.country;
    document.getElementById("depart_info").innerHTML = trip.trip.departureInfo;
    let temp = `weather forcast ${trip.trip.tempMin} - ${trip.trip.tempMax} °C`
    document.getElementById("day_temp").innerHTML = temp;
    console.log("diff" + trip.trip.diffDays);
    document.getElementById("day_desc").innerHTML = "";
    if (trip.trip.diffDays >=0 && trip.trip.diffDays < 16){
        // CREATE AN EMELEMENT
        document.getElementById("day_desc").innerHTML = trip.trip.weatherDescription;
        console.log(trip.trip.weatherDescription);
        let icon_src = `https://www.weatherbit.io/static/img/icons/${trip.trip.icon}.png`;
        console.log(icon_src);
        document.getElementById('weather_icon').src = icon_src;
    }
}