// function to post request to the server
const getTripInfo = async (url = '', data = {})=>{
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
    } catch(error) {
        console.log("error", error);
    }
}

// function triggered by eventListener (button click), takes user input and checks user input
export function handleSubmit(event) {
    event.preventDefault()

    // save user input to formText
    let destination = document.getElementById('city').value
    let date = document.getElementById('departure').value;
    
    // regex for non-empty string
    const re = new RegExp(/^(?!\s*$).+/);

    // check if entered data non-empty string and proceed, else show alert
    if (re.test(destination) && re.test(date)){
        const data = {
            city: destination,
            departure: date
        }
        // function to post request to the server
        getTripInfo('http://localhost:3300/trip', data)
        .then(function(res) {
            // If error occured, display error message
            console.log(res.success)
            if (res.success == false){
                alert("ERROR fetching your trip data. Check if input is correct")
            }
            // else update UI according to server response and data received from user
            else {
                Client.updateUI(res, data);
            }
        })
    }
    else {
        alert("ERROR! Please enter the city and departure date")
    }
};
