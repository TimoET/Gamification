import { data } from './dataImport.js';
import { earth } from './globe.js';
// Create and add coordinates for the globe
function addCountryCoord(earth, country, area, latitude, longitude, color, area_sq_meter){
    let pointOfInterest = new THREE.SphereGeometry(.1, 32, 32);
    let lat = latitude * (Math.PI/180);
    let lon = -longitude * (Math.PI/180);
    const radius = 15;
    const phi = (90-lat)*(Math.PI/180);
    const theta = (lon+180)*(Math.PI/180);

    let material = new THREE.MeshBasicMaterial({
        color:color
    });

    let mesh = new THREE.Mesh(
        pointOfInterest,
        material
    );

    mesh.position.set(
        Math.cos(lat) * Math.cos(lon) * radius,
        Math.sin(lat) * radius,
        Math.cos(lat) * Math.sin(lon) * radius
    );

    mesh.rotation.set(0.0, -lon, lat-Math.PI*0.5);

    mesh.userData.country = country;
    mesh.userData.area = area;
    mesh.userData.color = color;
    mesh.userData.area_sq_meter = area_sq_meter;

    earth.add(mesh)
};

// Changes the information so data points can be seen
function changeToCountry() {
    // Get the data from the JSON file
    for (let i = 0; i < data.length; i++){
        addCountryCoord(earth, data[i].Country,data[i].Area, data[i].latitude, data[i].longitude, 'yellow', data[i].Area_sq_meter);
    }
};

changeToCountry()