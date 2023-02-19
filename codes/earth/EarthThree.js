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

// main earth sphere
const radiusEarth = 2.75;
const Earth_geometry = new THREE.SphereGeometry(radiusEarth, 50, 50);
const Earth_material = new THREE.MeshPhongMaterial(
    {
        map: new THREE.TextureLoader().load('./planet-resources/earth-texture.jpg'),
    }
)
const Earth = new THREE.Mesh(Earth_geometry, Earth_material);
scene.add(Earth);
// Earth.rotateZ(358);

// earth cloud
const Cloud_geometry = new THREE.SphereGeometry(radiusEarth, 50, 50);
const Cloud_material = new THREE.MeshBasicMaterial(
    {
        blending: THREE.AdditiveBlending,
        map: new THREE.TextureLoader().load('./planet-resources/2k_earth_clouds.jpg'),

    }
)
const Cloud_mesh = new THREE.Mesh(Cloud_geometry, Cloud_material);

scene.add(Cloud_mesh);

Cloud_mesh.scale.set(1.005, 1.005, 1.005);


// AR button 
// renderer.xr.enabled = true;
// const arbtn = ARButton.createButton(renderer);
// let ov1 = document.querySelector('.hero1');
// ov1.appendChild(arbtn);

// adding light to scene 
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);


// earth atmosphere
// ########################################################################
const materialAround = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    vertexShader: `varying vec2 vUv;
    uniform float time;
    varying vec3 vPosition;
    uniform vec2 pixels;
    float PI=3.141592653589793238;
    
    varying vec3 vLayer0;
    varying vec3 vLayer1;
    varying vec3 vLayer2;
    varying vec3 eyeVector;
    varying vec3 vNormal;
    
    mat2 rotate(float a){
        float s=sin(a);
        float c=sin(a);
        return mat2(c,-s,s,c);
    }
    
    void main(){
        
        // vNormal=normal;
        vNormal=normalize(normalMatrix*normal);
        
        vec4 worldPosition=modelMatrix*vec4(position,1.);
        eyeVector=normalize(worldPosition.xyz-cameraPosition);
        
        float t=time*.000005;
        mat2 rot=rotate(t+20.);
        
        vec3 p0=position;
        p0.yz=rot*p0.yz;
        vLayer0=p0;
        
        mat2 rot1=rotate(t+10.);
        
        vec3 p1=position;
        p1.xz=rot1*p1.xz;
        vLayer1=p1;
        
        mat2 rot2=rotate(t+30.);
        vec3 p2=position;
        p2.xy=rot2*p2.xy;
        vLayer2=p2;
        
        vUv=uv;
        vPosition=position;
        gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
    }`,
    fragmentShader: `
    varying vec2 vUv;
uniform float time;
uniform sampler2D texture1;
uniform vec4 resolution;
// varying vec2 vUv;
uniform samplerCube uPerlin;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vLayer0;
varying vec3 vLayer1;
varying vec3 vLayer2;
varying vec3 eyeVector;

float PI=3.141592653589793238;

vec3 brightnessToColor(float b){
    b*=0.30;
    return(vec3(b*b*b*b,b*b,b)/.30)*.2;
}



void main(){
    
    float radial=1.-pow(vNormal.z,1.);
    // float radial=1.-vPosition.z;
    radial*=pow(radial,abs(2.*sin(.5)+7.));
    float brightness=(1.5+radial*.43)+.2*abs(sin(.05));
    
    gl_FragColor.rgb=brightnessToColor(brightness)*radial;
    gl_FragColor.a=radial;
    // float brightness=supersun();
    // brightness=brightness*6.+1.;
    
    // float fres=Fresnel(eyeVector,vNormal);
    // brightness+=(fres*.0025);
    
    // vec3 col=brightnessToColor(brightness);
    // gl_FragColor=vec4(1.,0.,0.,1.);
    // gl_FragColor=textureCube(uPerlin,vPosition);
    // gl_FragColor=vec4(col,1.);
    // gl_FragColor=vec4(fres);
    // gl_FragColor=vec4(vLayer0,1.);
    // gl_FragColor=vec4(vUv,1.,1.);
    // gl_FragColor=textureCube(1.,0.,0.,vPosition);
}`,
    uniforms: {
        time: { value: 0 },
    }
})

const geometryAround = new THREE.SphereGeometry(radiusEarth, 30, 30);

const sunAround = new THREE.Mesh(geometryAround, materialAround);
sunAround.scale.set(1.22, 1.22, 1.22);
scene.add(sunAround);

Earth.rotateY(3.45);
Cloud_mesh.rotateY(3.45);

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
        Cloud_mesh.rotateY(0.00037);
        Earth.rotateY(0.0005);
        // console.log("rendering");
        renderer.render(scene, camera);
    }
    else {
        // console.log("no rendering");
    }

});