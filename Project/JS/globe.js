const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var loader = new THREE.TextureLoader();
const texture = loader.load('./IMAGES/8k.jpg');

const geometry = new THREE.SphereGeometry(15, 200, 200);
const material = new THREE.MeshBasicMaterial({map:texture});
const sphere = new THREE.Mesh( geometry, material);
scene.add( sphere );
    
camera.position.z = 30;

function animate() {
	requestAnimationFrame( animate );
    sphere.rotation.y += 0.005;

    renderer.render( scene, camera );
}

animate();