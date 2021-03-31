import * as THREE from '/build/three.module.js';
import { OrbitControls} from '/jsm/controls/OrbitControls.js';

// DATA IMPORT
let data = [];
let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        let response = JSON.parse(xhttp.responseText);
        let output = Object.values(response);
        for(let i=1; i<output.lenght; i++){
            data.push(output[i])
        }
    }
};
xhttp.open("GET", "../DATA/Final_data.json", false);
xhttp.send();
console.log(data);