import React, {
  Component
} from 'react';
import API from '../../utils/API';
import './Globe.css';
import './earthTexture.jpg';
import * as THREE from 'three';
import {
  Object3D
} from 'three';
var OrbitControls = require('three-orbit-controls')(THREE)



class Globe extends Component {

  constructor(props) {
    super(props)

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);

    /*
    this.state = {
      name: '',
      flightNumber: '',
      flightYear: '',
      image: '',
      desc: ''
    }
    */

  }

  componentDidMount() {

    // set timout function increases earth size after 9 seconds.
    // wait 9 seconds becuase beginning text animation on load takes about 8 seconds
    setTimeout(() => {
      camera.position.z = 9;
    }, 8000)

    // load rockets function finds the api data and logs it
    // need it here and when rendering lines becuase it will also populate api from databse if no data exists
    const loadRockets = () => {
      API.getLaunches().then(response => {
          // const gps = response.data;
          if (response.data.length < 1) {
            console.log("Didn't find spaceX data so let's add it to the database");
            API.createGeoDataSet().then(response => {
              API.addSpaceXData().then(res => {
                console.log(res);
              });
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
    loadRockets();

    // set width and height of browser
    const width = window.innerWidth - 17;
    const height = window.innerHeight;
    // incase we want to change images or have muliple in array hold image in variable
    const img = 'https://www.eleusal.com/html5GlobeFiles/textures/land_ocean_ice_cloud_2048.jpg'

    // init scene and camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // init web gl renderer into variable
    const renderer = new THREE.WebGLRenderer();
    // set size of renderer accoring to variable set above
    renderer.setSize(width, height);

    /*
    // ---------------------------
    // EARTH OBJECT CREATION
    // ---------------------------
    */

    // create sphere geomerty and populate its texture with earth image stored in variable above
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const texture = new THREE.TextureLoader().load(img);
    // create a mesh lambert texture around earth
    const sphereTexture = [
      new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load('./earthTexture.jpg')
      })
    ]
    const material = new THREE.MeshBasicMaterial({
      map: texture
    });
    const sphere = new THREE.Mesh(geometry, material);

    // add sphere(earth) to scene
    scene.add(sphere)

    // set camera position from viewscreen
    camera.position.z = 13;
    scene.add(sphere);
    renderer.setClearColor('#191a1f');

    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.material = material
    this.sphere = sphere

    // array of random colors to fill in each line. 
    const colors = ['red', 'blue', 'yellow', 'green', 'white', 'pink']

    // initial test data to populate lines

    /*
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
    */

    /*
    // ---------------------------
    // CREATING LINES FROM API DATA
    // ---------------------------
    */

    // Loop through getLaunces function which returns json from /spacex/data and create a line 
    API.getLaunches().then(rsp => {
      const gps = rsp.data;
      var loader = new THREE.FontLoader();

      // load in spacex/data
      loader.load('/spacex/data', function (font) {

        for (var j = 0; j < gps.length; j++) {

          /*
          var geometry = new THREE.RingBufferGeometry( .5, .4, 30, 30, 6, 6.3 );
          var material = new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide } );
          var mesh = new THREE.Mesh( geometry, material );
          scene.add( mesh );

          const placeObjectOnPlanet = (mesh, lat, lon, radius) => {
            var latRad = lat * (Math.PI / 180);
            var lonRad = -lon * (Math.PI / 180);
            mesh.position.set(
                Math.cos(latRad) * Math.cos(lonRad) * radius,
                Math.sin(latRad) * radius,
                Math.cos(latRad) * Math.sin(lonRad) * radius
            );
            mesh.rotation.set(0.0, -lonRad, latRad - Math.PI * 0.5);
        }

        placeObjectOnPlanet(mesh, gps[j].lat, gps[j].lon, .5);
        */

          // create new line for each iterator
          var material = new THREE.LineBasicMaterial({
            color: 'white',
            linewidth: 1, // cannot change :(
            name: gps[j].name,
          });

          var geometry = new THREE.Geometry();
          geometry.vertices.push(new THREE.Vector3(0, 0, 0));

          // push each line to a vertice and create declare the line
          geometry.vertices.push(new THREE.Vector3(5.5, 0, 0));
          var line = new THREE.Line(geometry, material);

          // convert each line from deg to rad so it can init into lat and long coords
          line.rotation.z = THREE.Math.degToRad(gps[j].lat);
          line.rotation.y = THREE.Math.degToRad(gps[j].lon);

          // userData is native object in three js to hold custom data for each object
          // init userData object and hold each objects data
          line.userData = {
            name: gps[j].name,
            flightNumber: gps[j].flightNumber,
            flightYear: gps[j].flightYear,
            image: gps[j].image,
            desc: gps[j].desc
          };

          // add line to scene
          scene.add(line);

          // create empty array to hold all line objects and push each line into objects
          // will need this for click events

          objects.push(line);

          var parent = line;
          scene.add(parent);

          var stick = new THREE.Object3D();
          var point = new THREE.Vector3(5, 0, 0);
          stick.lookAt(point);
          parent.add(stick);

          var geometry = new THREE.RingBufferGeometry(.2, .1, 30, 5, 6.3);
          var material = new THREE.MeshBasicMaterial({
            color: 'gold',
            transparent: true,
            wireframe: true,
            opacity: .5,
            side: THREE.DoubleSide
          });
          var mesh = new THREE.Mesh(geometry, material);
          mesh.position.set(0, 0, 5.5);
          stick.add(mesh);


          // ---------------------------
          // OPTIONAL TEXT WITH LINE THAT WILL WRITE name_e AT END OF LINE:
          // ---------------------------
          /*
              let xMid;
              var text;
              var textShape = new THREE.BufferGeometry();
              var color = 'red';
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
              var shapes = font.generateShapes( gps[j].name, 0.2, 2 );
              var geometryTwo = new THREE.ShapeGeometry( shapes );
              geometryTwo.computeBoundingBox();
              xMid = -0.5 * ( geometryTwo.boundingBox.max.x - geometryTwo.boundingBox.min.x );
              geometry.translate( xMid, 0, 0 );
              // make shape ( N.B. edge view not visible )
              textShape.fromGeometry( geometryTwo );
              text = new THREE.Mesh( textShape, matLite );
              
              text.rotation.z =THREE.Math.degToRad( gps[j].lat );
              text.rotation.y =THREE.Math.degToRad( gps[j].lon );
      
              var a = new THREE.Euler( 0, THREE.Math.degToRad( gps[j].lon ), THREE.Math.degToRad( gps[j].lon ), 'XYZ' );
              var b = new THREE.Vector3( 9, 0, 0 );
              var ab = b.applyEuler(a);	
              
              text.position.x = ab.x;
              text.position.y = ab.y;
              text.position.z = ab.z;
      
              scene.add( text );	
              */


        } // END FOR LOOP

      }); // END LOADER.LOAD FUNCTION

    }); // END GET LAUNCHES FUNCTION


    /*
    //---------------------------
    // CLICK EVENTS
    //---------------------------
    */


    const projector = new THREE.Projector();
    const mouse2D = new THREE.Vector3(0, 10000, 0.5);
    const objects = [];
    // event listener for each click on object
    document.addEventListener('click', onDocumentMouseClick, false);

    // handle callback function that updates props on click
    const handleChangeUserDataLineObject = (name, flightNumber, flightYear, image, desc) => {
      this.props.cbProp({
        name: name,
        flightNumber: flightNumber,
        flightYear: flightYear,
        image: image,
        desc: desc,
      });
    }

    function onDocumentMouseClick(event) {
      // need to prevent any sort of default behavior
      event.preventDefault();
      // get the x and y coords of mouse
      mouse2D.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse2D.y = -(event.clientY / window.innerHeight) * 2 + 1;
      var vector = new THREE.Vector3(mouse2D.x, mouse2D.y, 0.5);
      projector.unprojectVector(vector, camera);
      // start the raycaster -- esentially it projects a ray from position of click and see if it intersects with any objects in its path
      var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
      var intersects = raycaster.intersectObjects(objects);
      if (intersects.length > 0) {
        var firstIntersectedObject = intersects[0];
        // this will give you the first intersected Object if there are multiple.
        console.log(firstIntersectedObject.object.userData);
        console.log(firstIntersectedObject.object.userData.name);
        handleChangeUserDataLineObject(firstIntersectedObject.object.userData.name, firstIntersectedObject.object.userData.flightNumber, firstIntersectedObject.object.userData.flightYear, firstIntersectedObject.object.userData.image, firstIntersectedObject.object.userData.desc);
      }
    }

    // on mount append all renderes to domElement which is the canvas
    this.mount.appendChild(this.renderer.domElement)
    this.start()

    // init orbit controls. this allows you to pan the object(earth) around
    OrbitControls = new OrbitControls(this.camera, this.renderer.domElement);

    // listen for resize of browser so earth will always be in correct aspect ratio
    window.addEventListener('resize', () => {
      const width = window.innerWidth - 17;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
  }

  // on willunmount this will stop all animations and remove all rendering from dom element
  componentWillUnmount() {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

  // start functino that requested animation frame and begins rendering
  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId)
  }

  // animate function that renders all scenes and has earth object auto rotate
  animate() {
    // right now no rotation since on auto rotate the line objects do not rotate with earth
    this.sphere.rotation.x += 0.00
    this.sphere.rotation.y += 0.00
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  // render scene function wich renders the scene and camera
  renderScene() {
    this.renderer.render(this.scene, this.camera);

  }

  render() {
    return ( <
      div className = {
        this.props.panelShown ? "globeDiv globeDiv__panelShown" : "globeDiv"
      }
      ref = {
        (mount) => {
          this.mount = mount
        }
      }
      />
    )
  }
}

export default Globe;