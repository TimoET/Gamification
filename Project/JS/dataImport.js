//Zones data
let data = [];
let xhttp = new XMLHttpRequest();

//User data
let userData = [];
let xhttp1 = new XMLHttpRequest();

//Zones
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(xhttp.responseText);
        let output = Object.values(response);
        for (let i = 0; i < output.length; i++) {
            data.push(output[i]);
        }
    }
};

//Users
xhttp1.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let response1 = JSON.parse(xhttp1.responseText);
        let output1 = Object.values(response1);
        for (let i = 0; i < output1.length; i++) {
            userData.push(output1[i]);
        }
    }
};

//Zones
xhttp.open("GET", "../data/Zones_data.json", false);
xhttp.send();

//Users
xhttp1.open("GET", "../data/User_data.json", false);
xhttp1.send();

export { data };
export { userData };