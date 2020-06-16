export const getTripInfo = async (url = '', data = {})=>{
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