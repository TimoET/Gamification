import { OrbitControls } from '../JSM/controls/OrbitControls.js';
import { camera } from './globe.js';
import { renderer } from './globe.js';

let controls = new OrbitControls( camera, renderer.domElement );
controls.listenToKeyEvents( window ); // optional
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 15.5;
controls.maxDistance = 40;
controls.maxPolarAngle = Math.PI / 1;
controls.enablePan = false;
controls.rotateSpeed = 0.2;
