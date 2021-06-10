//Zones data
let data = [];
let xhttp1 = new XMLHttpRequest();

//User data
let userData = [];
let xhttp2 = new XMLHttpRequest();

function ImportData(name,xhttp,src){
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(xhttp.responseText);
            let output = Object.values(response);
            for (let i = 0; i < output.length; i++) {
                name.push(output[i]);
            }
        }
    };
    xhttp.open("GET", src, false);
    xhttp.send();
}

ImportData(data,xhttp1,"../data/Zones_data.json");
ImportData(userData,xhttp2,"../data/User_data.json");

export { data };
export { userData };