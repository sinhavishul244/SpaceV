import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ARButton } from '../../Resources/ARbutton.js';
// import texture from '';





const canvas = document.querySelector(".sun_3d_model");
// const canvas = document.querySelector(".sun_3d_model");
// code for grab mouse button 
canvas.addEventListener("mousedown", () => {
    canvas.style.cursor = "grabbing";
})
canvas.addEventListener("mouseup", () => {
    canvas.style.cursor = "grab";
})
// console.log("hello");
let width = canvas.offsetWidth;
let height = canvas.offsetHeight;
// console.log("width : " + width)
// console.log("height : " + height)

// const scene = new THREE.Scene();
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.set(0, 0, 5);

// const renderer = new THREE.WebGLRenderer();
const renderer = new THREE.WebGLRenderer(
    {
        canvas: canvas,
        alpha: true,
        antialias: true,

    }
)
renderer.setSize(width, height);
// console.log("device pixel ratio is :" + window.devicePixelRatio)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// renderer.setPixelRatio(2);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;

// main mercury sphere
const radiusMercury = 2.75;
const Mercury_geometry = new THREE.SphereGeometry(radiusMercury, 50, 50);
const Mercury_material = new THREE.MeshBasicMaterial(
    {
        // color: 0xFF0000,
        map: new THREE.TextureLoader().load('./mercury-resources/mercurytexture.png'),
    }
);
const Mercury = new THREE.Mesh(Mercury_geometry, Mercury_material);
scene.add(Mercury);
Mercury.rotateZ(358);


// AR button 
const arbtn = ARButton.createButton(renderer);
let ov1 = document.querySelector('.hero1');
renderer.xr.enabled = true;
ov1.appendChild(arbtn);

// reszie fix 
window.addEventListener("resize", () => {
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    canvas.style.height = window.innerHeight;
    canvas.style.width = window.innerWidth;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
})





let overviewpage = document.querySelector(".overview-page");

function animate() {
    let onscreen = overviewpage.getAttribute('aria-hidden');


    if (onscreen === "true") {
        Mercury.rotateY(0.0005);
        // console.log("rendering");
        renderer.render(scene, camera);
    }
    else {
        // console.log("no rendering");
    }
    requestAnimationFrame(animate);
}
animate();

