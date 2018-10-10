import React, { Component} from 'react';
import API from '../../utils/API';
import './Globe.css';
import './earthTexture.jpg';
import * as THREE from 'three';
var OrbitControls = require('three-orbit-controls')(THREE)



class Globe extends Component {
  
   constructor(props) {
    super(props)
	
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
    
  }

  componentDidMount() {

    const loadRockets = () => {
      API.getLaunches()
        .then( res => {
          console.log("response recieved");
          console.log(res);
        })
        .catch( err => {
          console.log('Err API GET LAUNCHES : ' ,err);
        })
    }
    loadRockets();
    
    const width = window.innerWidth - 17;
    const height = window.innerHeight;
    const img = 'https://www.eleusal.com/html5GlobeFiles/textures/land_ocean_ice_cloud_2048.jpg'

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    camera.lookAt(new THREE.Vector3(0,0,0));
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const texture = new THREE.TextureLoader().load(img);
    // const sphereTexture = [
    //     new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('./earthTexture.jpg')})
    // ]
    const material =  new THREE.MeshBasicMaterial({map: texture});
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere)

    camera.position.z = 10;
    scene.add(sphere);
    renderer.setClearColor('#191a1f');
    // renderer.setSize(width, height);

    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.material = material
    this.sphere = sphere
    
    const colors = ['red', 'blue', 'yellow', 'green', 'white', 'pink']
    const gps = [
      { "name_e": "Phoenix", "latitude":33.4484, "longitude": -112.077019,"color": colors[Math.floor(Math.random() * colors.length)]},
      { "name_e": "Leipzig", "latitude":51.339762, "longitude": 12.371358,"color": colors[Math.floor(Math.random() * colors.length)]},
      { "name_e": "Leipzig", "latitude":100.339762, "longitude": 12.371358,"color": colors[Math.floor(Math.random() * colors.length)]},
      { "name_e": "Leipzig", "latitude":-112.339762, "longitude": 54.371358,"color": colors[Math.floor(Math.random() * colors.length)]},
      { "name_e": "Leipzig", "latitude":-51.339762, "longitude": -12.371358,"color": colors[Math.floor(Math.random() * colors.length)]},
      { "name_e": "Leipzig", "latitude":51.339762, "longitude": -12.371358,"color": colors[Math.floor(Math.random() * colors.length)]},
      { "name_e": "Leipzig", "latitude":125.339762, "longitude": 125.371358,"color": colors[Math.floor(Math.random() * colors.length)]},
      { "name_e": "Leipzig", "latitude":19.339762, "longitude": -99.371358,"color": colors[Math.floor(Math.random() * colors.length)] },
    ]
    var loader = new THREE.FontLoader();
    loader.load( 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
    //build/NanumGothic_Regular.json
    //https://threejs.org/examples/fonts/helvetiker_regular.typeface.json
        for ( var j = 0; j < gps.length; j ++ ) {  
          
            var material = new THREE.LineBasicMaterial({ 
              color: gps[j].color,
              linewidth: 1 // cannot change :(
            });
            var geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(0, 0, 0));
            // randNum represents line length - only numbers 6-9 will give a decent visual of lines
            const randNum = [6,7,8,9]
            geometry.vertices.push(new THREE.Vector3(randNum[Math.floor(Math.random() * 4)], 0, 0));
            var line = new THREE.Line(geometry, material);
    
            line.rotation.z =THREE.Math.degToRad( gps[j].latitude );
            line.rotation.y =THREE.Math.degToRad( gps[j].longitude );
            scene.add(line); 
            
            /*
            OPTIONAL TEXT WITH LINE THAT WILL WRITE name_e AT END OF LINE:

            let xMid;
            var text;
            var textShape = new THREE.BufferGeometry();
            var color = gps[j].color;
            var matDark = new THREE.LineBasicMaterial( {
            color: color,
            side: THREE.DoubleSide
            } );
            var matLite = new THREE.MeshBasicMaterial( {
            color: color,
            transparent: true,
            opacity: 0.7,
            side: THREE.DoubleSide
            } );

            var message = "";
            var shapes = font.generateShapes( gps[j].name_e, 0.2, 2 );
            var geometryTwo = new THREE.ShapeGeometry( shapes );
            geometryTwo.computeBoundingBox();
            xMid = -0.5 * ( geometryTwo.boundingBox.max.x - geometryTwo.boundingBox.min.x );
            geometry.translate( xMid, 0, 0 );
            make shape ( N.B. edge view not visible )
            textShape.fromGeometry( geometryTwo );
            text = new THREE.Mesh( textShape, matLite );
            
            text.rotation.z =THREE.Math.degToRad( gps[j].latitude );
            text.rotation.y =THREE.Math.degToRad( gps[j].longitude );
    
            var a = new THREE.Euler( 0, THREE.Math.degToRad( gps[j].longitude ), THREE.Math.degToRad( gps[j].latitude ), 'XYZ' );
            var b = new THREE.Vector3( 9, 0, 0 );
            var ab = b.applyEuler(a);	
            
            text.position.x = ab.x;
            text.position.y = ab.y;
            text.position.z = ab.z;
    
            scene.add( text );	
            */
        }
    })


    this.mount.appendChild(this.renderer.domElement)
    this.start()

    OrbitControls = new OrbitControls(this.camera, this.renderer.domElement);

    window.addEventListener('resize', () => {
        const width = window.innerWidth - 17;
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
    this.sphere.rotation.x += 0.00
    this.sphere.rotation.y += 0.00

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
    
  }

  render() {
    return (
      <div
        className={this.props.panelShown ? "globeDiv globeDiv__panelShown" : "globeDiv"}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}

export default Globe;
