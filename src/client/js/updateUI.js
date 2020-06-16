export const updateUI = (trip, data) => {
    document.getElementById('output_img2').src = trip.trip.imgURL;
    document.getElementById("dest_city").innerHTML = data.city + ", ";
    document.getElementById("dest_country").innerHTML = trip.trip.country;
}