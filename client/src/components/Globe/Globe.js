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
    const texture = new THREE.TextureLoader().load('data:image/jpeg;base64,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');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1,1);
    // const sphereTexture = [
    //     new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('./earthTexture.jpg')})
    // ]
    const material =  new THREE.MeshBasicMaterial({map: texture});
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere)

    camera.position.z = 10;
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

    // const controls = new OrbitControls(camera, renderer.domElement);

    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        // const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
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
