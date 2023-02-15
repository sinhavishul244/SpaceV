import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { VRButton } from './VRbutton.js';


const canvas = document.querySelector(".sun_3d_model");
canvas.addEventListener("mousedown", () => {
    canvas.style.cursor = "grabbing";
})
canvas.addEventListener("mouseup", () => {
    canvas.style.cursor = "grab";
})
// console.log("hello");
let width = canvas.offsetWidth;
let height = canvas.offsetHeight;
console.log("width : " + width)
console.log("height : " + height)
var t = 0;

// const scene = new THREE.Scene();
const scene = new THREE.Scene();
const scene2 = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.set(0, 0, 5);

// const renderer = new THREE.WebGLRenderer();
const renderer = new THREE.WebGLRenderer(
    {
        canvas: canvas,
        alpha: true,
        // antialias: true,
        powerPreference: "high-performance",

    }
)
renderer.setSize(width, height);
// console.log("device pixel ratio is :" + window.devicePixelRatio)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// renderer.setPixelRatio(2);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;


// cube camera 
//##########################################################################
const cubeRenderTarget1 = new THREE.WebGLCubeRenderTarget(
    256, {
    format: THREE.RGBFormat,
    generateMipmaps: true,
    minFilter: THREE.LinearMipmapLinearFilter,
    encoding: THREE.sRGBEncoding
}
);

const CubeCamera1 = new THREE.CubeCamera(0.1, 10, cubeRenderTarget1);
// scene.add(CubeCamera1)

const materialPerlin = new THREE.ShaderMaterial({
    // envMap: cubeRenderTarget1.texture,
    side: THREE.DoubleSide,
    uniforms: {
        extensions: {
            derivatives: "#extension GL_OES_standard_derivatives : enable"
        },
        time: { value: 0 },
        // uPerlin: { value: null },
        // time: 0,
        resolution: { value: new THREE.Vector4() },
    },
    vertexShader: `
    varying vec2 vUv;
    uniform float time;
    varying vec3 vPosition;
    uniform vec2 pixels;
    float PI=3.141592653589793238;
    
    void main(){
        vUv=uv;
        vPosition=position;
        gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
    }
        `,
    fragmentShader: `
        varying vec2 vUv;
    uniform float time;
    uniform sampler2D texture1;
    uniform vec4 resolution;
    // varying vec2 vUv;
    varying vec3 vPosition;
    float PI=3.141592653589793238;

    //
    // Description : Array and textureless GLSL 2D/3D/4D simplex
    //               noise functions.
    //      Author : Ian McEwan, Ashima Arts.
    //  Maintainer : ijm
    //     Lastmod : 20110822 (ijm)
    //     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
    //               Distributed under the MIT License. See LICENSE file.
    //               https://github.com/ashima/webgl-noise
    //

    vec4 mod289(vec4 x){
        return x-floor(x*(1./289.))*289.;
    }

    float mod289(float x){
        return x-floor(x*(1./289.))*289.;
    }

    vec4 permute(vec4 x){
        return mod289(((x*34.)+1.)*x);
    }

    float permute(float x){
        return mod289(((x*34.)+1.)*x);
    }

    vec4 taylorInvSqrt(vec4 r)
    {
        return 1.79284291400159-.85373472095314*r;
    }

    float taylorInvSqrt(float r)
    {
        return 1.79284291400159-.85373472095314*r;
    }

    vec4 grad4(float j,vec4 ip)
    {
        const vec4 ones=vec4(1.,1.,1.,-1.);
        vec4 p,s;
        
        p.xyz=floor(fract(vec3(j)*ip.xyz)*7.)*ip.z-1.;
        p.w=1.5-dot(abs(p.xyz),ones.xyz);
        s=vec4(lessThan(p,vec4(0.)));
        p.xyz=p.xyz+(s.xyz*2.-1.)*s.www;
        
        return p;
    }

    // (sqrt(5) - 1)/4 = F4, used once below
    #define F4.309016994374947451

    float snoise(vec4 v)
    {
        const vec4 C=vec4(.138196601125011,// (5 - sqrt(5))/20  G4
        .276393202250021,// 2 * G4
        .414589803375032,// 3 * G4
    -.447213595499958);// -1 + 4 * G4

    // First corner
    vec4 i=floor(v+dot(v,vec4(F4)));
    vec4 x0=v-i+dot(i,C.xxxx);

    // Other corners

    // Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)
    vec4 i0;
    vec3 isX=step(x0.yzw,x0.xxx);
    vec3 isYZ=step(x0.zww,x0.yyz);
    //  i0.x = dot( isX, vec3( 1.0 ) );
    i0.x=isX.x+isX.y+isX.z;
    i0.yzw=1.-isX;
    //  i0.y += dot( isYZ.xy, vec2( 1.0 ) );
    i0.y+=isYZ.x+isYZ.y;
    i0.zw+=1.-isYZ.xy;
    i0.z+=isYZ.z;
    i0.w+=1.-isYZ.z;

    // i0 now contains the unique values 0,1,2,3 in each channel
    vec4 i3=clamp(i0,0.,1.);
    vec4 i2=clamp(i0-1.,0.,1.);
    vec4 i1=clamp(i0-2.,0.,1.);

    //  x0 = x0 - 0.0 + 0.0 * C.xxxx
    //  x1 = x0 - i1  + 1.0 * C.xxxx
    //  x2 = x0 - i2  + 2.0 * C.xxxx
    //  x3 = x0 - i3  + 3.0 * C.xxxx
    //  x4 = x0 - 1.0 + 4.0 * C.xxxx
    vec4 x1=x0-i1+C.xxxx;
    vec4 x2=x0-i2+C.yyyy;
    vec4 x3=x0-i3+C.zzzz;
    vec4 x4=x0+C.wwww;

    // Permutations
    i=mod289(i);
    float j0=permute(permute(permute(permute(i.w)+i.z)+i.y)+i.x);
    vec4 j1=permute(permute(permute(permute(
                    i.w+vec4(i1.w,i2.w,i3.w,1.))
                    +i.z+vec4(i1.z,i2.z,i3.z,1.))
                    +i.y+vec4(i1.y,i2.y,i3.y,1.))
                    +i.x+vec4(i1.x,i2.x,i3.x,1.));
                    
                    // Gradients: 7x7x6 points over a cube, mapped onto a 4-cross polytope
                    // 7*7*6 = 294, which is close to the ring size 17*17 = 289.
                    vec4 ip=vec4(1./294.,1./49.,1./7.,0.);
                    
                    vec4 p0=grad4(j0,ip);
                    vec4 p1=grad4(j1.x,ip);
                    vec4 p2=grad4(j1.y,ip);
                    vec4 p3=grad4(j1.z,ip);
                    vec4 p4=grad4(j1.w,ip);
                    
                    // Normalise gradients
                    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
                    p0*=norm.x;
                    p1*=norm.y;
                    p2*=norm.z;
                    p3*=norm.w;
                    p4*=taylorInvSqrt(dot(p4,p4));
                    
                    // Mix contributions from the five corners
                    vec3 m0=max(.6-vec3(dot(x0,x0),dot(x1,x1),dot(x2,x2)),0.);
                    vec2 m1=max(.6-vec2(dot(x3,x3),dot(x4,x4)),0.);
                    m0=m0*m0;
                    m1=m1*m1;
                    return 49.*(dot(m0*m0,vec3(dot(p0,x0),dot(p1,x1),dot(p2,x2)))
                    +dot(m1*m1,vec2(dot(p3,x3),dot(p4,x4))));
                    
                }
                
                float fbm(vec4 p){
                    float sum=0.;
                    float amp=1.;
                    float scale=1.;
                    for(int i=0;i<6;i++){
                        sum+=snoise(p*scale)*amp;
                        p.w+=100.;
                        amp*=.9;
                        scale*=2.;
                    }
                    return sum;
                }
                
                void main(){
                    // vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
                    vec4 p=vec4(vPosition*.7,time*.006);
                    float noisy=fbm(p);
                    // gl_FragColor=vec4(sin(time),1.,0.,1.);
                    vec4 p1=vec4(vPosition*2.,time*.05);
                    float spots=max(snoise(p1),0.);
                    gl_FragColor=vec4(noisy);
                    
                    gl_FragColor*=mix(1.,spots,.7);
                    // gl_FragColor=vec4(vPosition,1.);
                }
    `
});

const radiusSun = 2.7;
const geometry = new THREE.SphereGeometry(radiusSun, 22, 22);

// const geometry1 = new THREE.SphereBufferGeometry(2.74, 70, 70)
const Perlin = new THREE.Mesh(geometry, materialPerlin);
scene2.add(Perlin);


// sun model 
// ###################################################################################

const materialSun = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    uniforms: {
        extensions: {
            derivatives: "#extension GL_OES_standard_derivatives : enable"
        },
        time: { value: 0 },
        uPerlin: { value: null },
        // time: 0,
        resolution: { value: new THREE.Vector4() },
    },
    vertexShader: `
    varying vec2 vUv;
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
       // mat2 rot=rotate(t*1.5+20.);
        mat2 rot=rotate(1.5+20.);
        
        vec3 p0=position;
        p0.yz=rot*p0.yz;
        vLayer0=p0;
        
       // mat2 rot1=rotate(t*.2+10.);
        mat2 rot1=rotate(.2+10.);
        
        vec3 p1=position;
        p1.xz=rot1*p1.xz;
        vLayer1=p1;
        
       // mat2 rot2=rotate(t*.75+30.);
        mat2 rot2=rotate(.75+30.);
        vec3 p2=position;
        p2.xy=rot2*p2.xy;
        vLayer2=p2;
        
        vUv=uv;
        vPosition=position;
        gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
    }
    `,
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
        b*=.25;
        return(vec3(b,b*b,b*b*b*b)/.25)*1.;
    }
    
    float supersun(){
        float sum=0.;
        sum+=textureCube(uPerlin,vLayer0).r;
        sum+=textureCube(uPerlin,vLayer1).r;
        sum+=textureCube(uPerlin,vLayer2).r;
        sum*=.33;
        return sum;
    }
    
    float Fresnel(vec3 eyeVector,vec3 worldNormal){
        return pow(1.+dot(eyeVector,worldNormal),3.);
    }
    
    void main(){
        float brightness=supersun();
        brightness=brightness*6.+1.;
        
        float fres=Fresnel(eyeVector,vNormal);
        brightness+=(fres*.0025);
        
        vec3 col=brightnessToColor(brightness);
        // gl_FragColor=vec4(1.,0.,0.,1.);
        // gl_FragColor=textureCube(uPerlin,vPosition);
        gl_FragColor=vec4(col,1.);
        // gl_FragColor=vec4(fres);
        // gl_FragColor=vec4(vLayer0,1.);
        // gl_FragColor=vec4(vUv,1.,1.);
        // gl_FragColor=textureCube(1.,0.,0.,vPosition);
    }
    `
})





const mesh = new THREE.Mesh(geometry, materialSun);
scene.add(mesh);

// sun around model
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
    b*=.25;
    return(vec3(b,b*b,b*b*b*b)/.25)*.7;
}

float supersun(){
    float sum=0.;
    sum+=textureCube(uPerlin,vLayer0).r;
    sum+=textureCube(uPerlin,vLayer1).r;
    sum+=textureCube(uPerlin,vLayer2).r;
    sum*=.33;
    return sum;
}

float Fresnel(vec3 eyeVector,vec3 worldNormal){
    return pow(1.+dot(eyeVector,worldNormal),3.);
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

const geometryAround = new THREE.SphereGeometry(radiusSun, 22, 22);

const sunAround = new THREE.Mesh(geometryAround, materialAround);
sunAround.scale.set(1.2, 1.2, 1.2);
scene.add(sunAround);




// const spotLight = new THREE.SpotLight(0xffffff);
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
// scene.add(ambientLight);
// ambientLight.position.set(100, 100, 100);
// spotLight.position.set(100, 100, 100);
// scene.add(spotLight);

// reszie fix 
window.addEventListener("resize", () => {
    width = canvas.offsetWidth;
    // console.log("width changed to " + width);
    // console.log("height changed to " + height);

    height = canvas.offsetHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
})

let overviewpage = document.querySelector(".overview-page");





function animate() {
    let onscreen = overviewpage.getAttribute('aria-hidden');

    if (onscreen === "true") {
        // console.log("rendering")
        mesh.rotateY(0.0005);
        // mesh.rotation.y = 0.0001;
        // mesh.rotation.x += 0.005;
        // canvas.addEventListener("onmousedown", () => {
        //     mesh.rotateY(0);
        // })
        CubeCamera1.update(renderer, scene2);
        materialSun.uniforms.uPerlin.value = cubeRenderTarget1.texture;
        // console.log(materialSun.uniforms.uPerlin.value);
        t += 0.05;
        materialSun.uniforms.time.value = t;
        materialPerlin.uniforms.time.value = t;
        materialAround.uniforms.time.value = t;
        // console.log("time is :" + material.uniforms.time.value);
        // camera.updateProjectionMatrix();

        renderer.render(scene, camera);
        // renderer.render(scene2, camera);
    }
    else {
        // console.log(" not rendering")
    }

    requestAnimationFrame(animate);
}
animate();

