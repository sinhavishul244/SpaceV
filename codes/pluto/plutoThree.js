// import * as THREE from 'three';
import * as THREE from '../../Resources/three/build/three.module.js';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OrbitControls } from '../../Resources/three/examples/jsm/controls/OrbitControls.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';




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

const camera = new THREE.PerspectiveCamera(75, width / height, 0.01, 1000);
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

// main pluto sphere
const radiusPlanet = 2.75;
const Pluto_geometry = new THREE.SphereGeometry(radiusPlanet, 50, 50);
const Pluto_material = new THREE.MeshPhongMaterial(
    {
        // color: 0xFF0000,
        map: new THREE.TextureLoader().load('./planet-resources/pluto_texture_map_fixed_blur_by_bob3studios_dclugc9.jpg'),
    }
);
const Pluto = new THREE.Mesh(Pluto_geometry, Pluto_material);
scene.add(Pluto);
Pluto.rotateY(((5 * Math.PI) / 6) + Math.PI / 2);

// Mercury.rotateZ(358);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);


// AR button 
// renderer.xr.enabled = true;
// const arbtn = ARButton.createButton(renderer);
// let ov1 = document.querySelector('.hero1');
// ov1.appendChild(arbtn);

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

// function animate() {
//     let onscreen = overviewpage.getAttribute('aria-hidden');


//     if (onscreen === "true") {
//         Mercury.rotateY(0.0005);
//         // console.log("rendering");
//         renderer.render(scene, camera);
//     }
//     else {
//         // console.log("no rendering");
//     }
//     requestAnimationFrame(animate);
// }
// animate();

renderer.setAnimationLoop(function () {

    let onscreen = overviewpage.getAttribute('aria-hidden');


    if (onscreen === "true") {
        Pluto.rotateY(0.0005);
        // console.log("rendering");
        renderer.render(scene, camera);
    }
    else {
        // console.log("no rendering");
    }

});