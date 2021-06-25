import { OrbitControls } from "https://unpkg.com/three@0.125.1/examples/jsm/controls/OrbitControls.js";
import { camera } from './Globe.js';
import { renderer } from './Globe.js';

let controls = new OrbitControls( camera, renderer.domElement );
controls.listenToKeyEvents( window ); // optional
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 20;
controls.maxDistance = 40;
controls.maxPolarAngle = Math.PI / 1;
controls.enablePan = false;
controls.rotateSpeed = 0.2;
