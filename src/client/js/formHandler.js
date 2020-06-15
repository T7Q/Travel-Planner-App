
const updateUI = (trip) => {
    console.log("updateUI function")
    console.log("Content of trip.imgURL: " + trip.trip.imgURL);
	// document.getElementById('dest_city').innerHTML = "UPDATED";
  }


const getTripInfo = async (url = '', data = {})=>{
    console.log("post city info to server");
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
        console.log("data from server: " + data.imgURL);
        return data;
    } catch(error) {
        console.log("ERROR getting the data from sever");
    }
}


export function handleSubmit(event) {
    event.preventDefault()

    console.log("handler");
    // save user input to formText
    let formText = document.getElementById('city').value
    console.log(formText);
    
    const data = {
        city: formText,
    }
    getTripInfo('http://localhost:3300/trip', data)
    .then(function(res) {
        //update UI according to 
        // console.log("response from server" + res);
        updateUI(res);
    })
};