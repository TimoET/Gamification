import { camera } from './globe.js';
import { renderer } from './globe.js';
import { earth } from './globe.js';
// Add event listeners so DOM knows what functions to use when objects/items are interacted with
window.addEventListener('resize', onWindowResize, false);
window.addEventListener('click', onWindowClick, false);

// CREATE raycaster for mouse interaction
const raycaster = new THREE.Raycaster();

// CREATE vector2 for mouse and mobile x,y coordinates
const mouse = new THREE.Vector2();
const touch = new THREE.Vector2();

// Listens for the mouse to intersect object and when clicked returns the data to the inner html
function onWindowClick(event) {
    console.log('click');
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects(earth.children, true);
    console.log(earth.children, true);

    for (let i = 0; i < intersects.length; i++){
        document.querySelector("#country-info").innerText = "Country: " + intersects[0].object.userData.country;
        document.querySelector("#area").innerText = "Area: " + intersects[0].object.userData.area;
        document.querySelector("#area-sq-meter").innerText = "Area(meter^2): " + intersects[0].object.userData.area_sq_meter;
    }
    const item = intersects[0];
    let point = item.point;
    let camDistance = camera.position.copy(point).normalize.multiplyScalar(camDistance);
};

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};