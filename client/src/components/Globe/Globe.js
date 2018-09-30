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
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer()
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const sphereTexture = [
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('earthTexture.jpg')
        })
    ]
    const material =  new THREE.MeshFaceMaterial(sphereTexture);
    const sphere = new THREE.Mesh(geometry, material);

    camera.position.z = 10;
    scene.add(sphere);
    renderer.setClearColor('#2e2e2e');
    renderer.setSize(width, height);

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
        const height = window.innerHeight;
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
    this.sphere.rotation.x += 0.01
    this.sphere.rotation.y += 0.01

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    return (
      <div
        style={{ width: '100%', height: '90vh' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}

export default Globe;
