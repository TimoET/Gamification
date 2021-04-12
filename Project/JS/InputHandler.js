class InputHandler {
    constructor() {
        
    }

    update() {
        
    }

    AddControls(){
        controls.listenToKeyEvents( window ); // optional
        controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;
        controls.minDistance = 15.5;
        controls.maxDistance = 40;
        controls.maxPolarAngle = Math.PI / 1;
        controls.enablePan = false;
    }
}