import React, { Component } from 'react';
import './Globe.css';
import * as THREE from 'three';
import './earthTexture.jpg';
// const OrbitControls = require('three-orbitcontrols')(THREE);


class Globe extends Component {
  render() {
    
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // event listener for window resize so aspect ratio remains same
        window.addEventListener('resize', () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
        });
        
        // init controlls
        // const controls = new OrbitControls(camera, renderer.domElement);

        // create shape
        const geometry = new THREE.SphereGeometry(5,32,32);
        const sphereTexture = [
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('earthTexture.jpg')})
        ]
        // create material, color, or image
        const material = new THREE.MeshFaceMaterial(sphereTexture);
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        camera.position.z = 10;

        // game logic
        const update = () => {
            
            sphere.rotation.x += 0.000;
            sphere.rotation.y += 0.001;
        }

        const render = () => {
            renderer.render(scene, camera);
        }

        const GameLoop = () => {
            requestAnimationFrame(GameLoop);
            update();
            render();
        }
        return (
            <div>
                {GameLoop()}
            </div>
        );
        
  }
}

export default Globe;
