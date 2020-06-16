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
        console.log("data from server: " + data);
        return data;
    } catch(error) {
        console.log("ERROR getting the data from sever");
    }
}


// export function handleSubmit(event) {
//     event.preventDefault()

//     console.log("handler");
//     // save user input to formText
//     let formText = document.getElementById('city').value
//     console.log(formText);
    
//     const data = {
//         city: formText,
//     }
//     getTripInfo('http://localhost:3300/trip', data)
//     .then(function(res) {
//         //update UI according to 
//         // console.log("response from server" + res);
//         Client.updateUI(res);
//     })
// };

export function handleSubmit(event) {
    event.preventDefault()

    console.log("handler");
    // save user input to formText
    let formText = document.getElementById('city').value
    console.log(formText);
    
    // regex for non-empty string
    const re = new RegExp(/^(?!\s*$).+/);
    // const re = new RegExp(/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/);

    // check if entered data non-empty string and proceed, else show alert
    if (re.test(formText)){
        const data = {
            city: formText,
        }
        console.log("valid");
        getTripInfo('http://localhost:3300/trip', data)
        .then(function(res) {
            //update UI according to 
            // console.log("response from server" + res);
            Client.updateUI(res);
        })
    }
    else {
        alert("ERROR! Please enter the city and departure date")
        console.log("invalid");
    }
};

document.getElementById('generate').addEventListener('click', handleSubmit)