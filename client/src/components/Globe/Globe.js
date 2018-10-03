import React, { Component} from 'react';
import './Globe.css';
import './earthTexture.jpg';
import * as THREE from 'three';

// import OrbitControls from 'three-orbit-controls/index';

class Globe extends Component {

   constructor(props) {
    super(props)

    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animate = this.animate.bind(this)
    
  }

  componentDidMount() {
    const width = window.innerWidth
    const height = window.innerHeight
    const img = 'https://www.eleusal.com/html5GlobeFiles/textures/land_ocean_ice_cloud_2048.jpg'

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setSize(width, height);
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const texture = new THREE.TextureLoader().load(img);
    // const sphereTexture = [
    //     new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('./earthTexture.jpg')})
    // ]
    const material =  new THREE.MeshBasicMaterial({map: texture});
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere)

    camera.position.z = 9;
    scene.add(sphere);
    renderer.setClearColor('#2e2e2e');
    // renderer.setSize(width, height);

    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.material = material
    this.sphere = sphere

    this.mount.appendChild(this.renderer.domElement)
    this.start()

    // const controls = new OrbitControls(this.camera, this.renderer.domElement);

    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
  }

  componentWillUnmount() {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
    
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
    
  }

  stop() {
    cancelAnimationFrame(this.frameId)
  }

  animate() {
    this.sphere.rotation.x += 0.001
    this.sphere.rotation.y += 0.001

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
    
  }

  render() {
    return (
      <div
        style={{ width: '100%', height: '100%' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}

export default Globe;
