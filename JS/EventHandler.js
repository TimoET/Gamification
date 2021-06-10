import { camera } from './globe.js';
import { renderer } from './globe.js';
import { earth } from './globe.js';
import { map } from './GoogleMap.js';
import { allMarkers } from './GoogleMap.js';
// Add event listeners so DOM knows what functions to use when objects/items are interacted with
window.addEventListener('resize', onWindowResize, false);
//window.addEventListener('click', onWindowClick, false);
window.addEventListener('click', onDocumentMouseMove, false);

let canvas = document.querySelector('canvas');

// Mouse
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

function onDocumentMouseMove( event ) {

    event.preventDefault();

    mouse.x = ( event.offsetX / canvas.clientWidth ) * 2 - 1;
    mouse.y = - ( event.offsetY / canvas.clientHeight ) * 2 + 1;
}

// Listens for the mouse to intersect object and when clicked returns the data to the inner html
canvas.addEventListener('click', function(event)  {
    event.preventDefault();
    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects(earth.children);

    for (var i in earth.children) {
        if (earth.children[i] instanceof THREE.Mesh) 
        {
            intersects.push(raycaster.intersectObject(earth.children[i]));
        }
    }
    
    if (intersects.length > 0) {
        for (let i = 0; i < intersects.length; i++){
            if(intersects[0].object != undefined){
                document.querySelector("#country-info").innerText = "Country: " + intersects[0].object.userData.country;
                document.querySelector("#area").innerText = "Area: " + intersects[0].object.userData.area;
                document.querySelector("#area-sq-meter").innerText = "Area(meter^2): " + intersects[0].object.userData.area_sq_meter;
                document.getElementById("map").style.display = "block";
                canvas.style.display = "none";
                for(let j = 0; j < allMarkers.length; j++){
                    console.log(allMarkers);
                    if(allMarkers[j].title == intersects[0].object.userData.area){
                        map.panTo(allMarkers[j].position);
                    }
                }
            }
            else{
                console.log("undefined");
            }
        }
        return intersects;
    } else {
        return null;
    }

    

});

function showData(){
    
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};