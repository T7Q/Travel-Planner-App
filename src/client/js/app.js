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
        // console.log("data from server: " + data);
        return data;
    } catch(error) {
        console.log("ERROR getting the data from sever");
    }
}

export function handleSubmit(event) {
    event.preventDefault()

    console.log("**** formHandler function *** ");

    // save user input to formText
    let destination = document.getElementById('city').value
    let date = document.getElementById('departure').value;
    console.log("object" + document.getElementById('departure').value);
    console.log("date: " + date);
    
    // regex for non-empty string
    const re = new RegExp(/^(?!\s*$).+/);
    // const re = new RegExp(/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/);

    // check if entered data non-empty string and proceed, else show alert
    if (re.test(destination) && re.test(date)){
        const data = {
            city: destination,
            departure: date
        }
        console.log("valid");
        getTripInfo('http://localhost:3300/trip', data)
        .then(function(res) {
            //update UI according to 
            // console.log("response from server" + res);
            Client.updateUI(res, data);
        })
    }
    else {
        alert("ERROR! Please enter the city and departure date")
        console.log("invalid");
    }
};
