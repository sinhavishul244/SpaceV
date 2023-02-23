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



// main saturn sphere
let radius = 1.5;
const Saturn_geometry = new THREE.SphereGeometry(radius, 50, 50);
const Saturn_material = new THREE.MeshPhongMaterial(
    {
        map: new THREE.TextureLoader().load('./planet-resources/saturn-texture.jpg'),
    }
);
const Saturn = new THREE.Mesh(Saturn_geometry, Saturn_material);
scene.add(Saturn);
Saturn.rotateZ(0.46652651)

var segs = 120;
var ii = radius * 1;
var oo = radius * 2.5;

var ring_geometry = new THREE.RingBufferGeometry(ii, oo, segs);

var uvs = ring_geometry.attributes.uv.array;
// loop and initialization taken from RingBufferGeometry
var phiSegments = ring_geometry.parameters.phiSegments || 0;
var thetaSegments = ring_geometry.parameters.thetaSegments || 0;
phiSegments = phiSegments !== undefined ? Math.max(1, phiSegments) : 1;
thetaSegments = thetaSegments !== undefined ? Math.max(3, thetaSegments) : 8;
for (var c = 0, j = 0; j <= phiSegments; j++) {
    for (var i = 0; i <= thetaSegments; i++) {
        uvs[c++] = i / thetaSegments,
            uvs[c++] = j / phiSegments;
    }
}

const ring_material = new THREE.MeshPhongMaterial({
    // color: 0xffff00,
    side: THREE.DoubleSide,

    map: new THREE.TextureLoader().load('./planet-resources/saturn_ring_4.png'),
    // alphaMap: new THREE.TextureLoader().load(ringTexture),
    // emissive: 0xffffff,
    // flatShading: true,
    // wireframe: true,
    // blending: THREE.AdditiveBlending,
    transparent: true,

});
const ring = new THREE.Mesh(ring_geometry, ring_material);
scene.add(ring);
// ring.rotateX(1.5908)
ring.rotateX(Math.PI / 2)
// Saturn.rotateY(1.6908)
ring.rotateY(0.46652651);
Saturn.rotateX(0.06652651)
ring.rotateX(0.06652651)




// AR button 
// renderer.xr.enabled = true;
// const arbtn = ARButton.createButton(renderer);
// let ov1 = document.querySelector('.hero1');
// ov1.appendChild(arbtn);

const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

// reszie fix 
window.addEventListener("resize", () => {
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    setCanvasDimensions(canvas, width, height);
    // canvas.style.height = window.innerHeight;
    // canvas.style.width = window.innerWidth;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
})


const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
scene.add(ambientLight);






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
        Saturn.rotateY(0.003);
        ring.rotateZ(0.003);
        // console.log("rendering");
        renderer.render(scene, camera);
    }
    else {
        // console.log("no rendering");
    }

});