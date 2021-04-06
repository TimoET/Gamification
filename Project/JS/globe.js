import * as THREE from '../build/three.module.js';
import { OrbitControls } from '../JSM/controls/OrbitControls.js';

// DATA IMPORT
let data = [];
let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(xhttp.responseText);
        let output = Object.values(response);
        for (let i = 0; i < output.length; i++) {
            data.push(output[i]);
        }
    }
};
xhttp.open("GET", "../DATA/Final_data.json", true);
xhttp.send();
console.log(data);

//SCENE (Enviorment for objects)
const scene = new THREE.Scene();

//CAMERA (Seeing the objects)
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//RENDERER (Redering the created objects to see them)
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//LOADER (Loads the image that wraps around the earth)
var loader = new THREE.TextureLoader();
const texture = loader.load('./IMAGES/8k.jpg');

//EARTH (Creating the shape, adding material, setting size, adding to the scene)
const geometry = new THREE.SphereGeometry(15, 500, 500);
const material = new THREE.MeshBasicMaterial({map:texture});
const sphere = new THREE.Mesh( geometry, material);
scene.add( sphere );
    
camera.position.z = 30;


function animate() {
	requestAnimationFrame( animate );
    render();
}

function render(){
    renderer.render( scene, camera );
}
//Controls
let controls = new OrbitControls( camera, renderer.domElement );
controls.listenToKeyEvents( window ); // optional
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 15.5;
controls.maxDistance = 40;
controls.maxPolarAngle = Math.PI / 1;

// Add event listeners so DOM knows what functions to use when objects/items are interacted with
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};

// Create and add coordinates for the globe
function addCountryCoord(earth, country, language, latitude, longitude, color, region, population, area_sq_mi, gdp_per_capita, climate){
    let pointOfInterest = new THREE.SphereGeometry(15, 500, 500);
    let lat = latitude * (Math.PI/180);
    let lon = -longitude * (Math.PI/180);
    const radius = 10;
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
    mesh.userData.language = language;
    mesh.userData.color = color;
    mesh.userData.region = region;
    mesh.userData.population = population;
    mesh.userData.area_sq_mi = area_sq_mi;
    mesh.userData.gdp_per_capita = gdp_per_capita;
    mesh.userData.climate = climate;

};

animate();