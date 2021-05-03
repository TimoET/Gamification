import * as THREE from '../build/three.module.js';

//SCENE (Enviorment for objects)
const scene = new THREE.Scene();

//CAMERA (Seeing the objects)
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.z = 30;
export { camera };

//RENDERER (Redering the created objects to see them)
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
export { renderer };

//LOADER (Loads the image that wraps around the earth)
var loader = new THREE.TextureLoader();
const texture = loader.load('./IMAGES/8k.jpg');

//EARTH (Creating the shape, adding material, setting size, adding to the scene)
const geometry = new THREE.SphereGeometry(15, 500, 500);
const material = new THREE.MeshBasicMaterial({map:texture});
const earth = new THREE.Mesh( geometry, material);
scene.add( earth );
export { earth };

function animate() {
	requestAnimationFrame( animate );
    render();
}

function render(){
    renderer.render( scene, camera );
}

animate();