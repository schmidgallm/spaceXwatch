import React, {
  Component
} from 'react';
import API from '../../utils/API';
import './Globe.css';
import * as THREE from 'three';
import {
  Object3D
} from 'three';
var OrbitControls = require('three-orbit-controls')(THREE);

// init empty array to hold all line objects in
// needs to be outside of react class so it can be global outside of component did mount function
const objects = [];
const ringArray = [];
const stickArray = [];

class Globe extends Component {

  constructor(props) {
    super(props)

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);

  }



  componentDidMount() {

    // set timout function increases earth size after 9 seconds.
    // wait 9 seconds becuase beginning text animation on load takes about 8 seconds
    setTimeout(() => {
      camera.position.z = 12;
    }, 8250);
    setTimeout(() => {
      camera.position.z = 11.75;
    }, 8312);
    setTimeout(() => {
      camera.position.z = 11.5;
    }, 8375);
    setTimeout(() => {
      camera.position.z = 11.25;
    }, 8437);
    setTimeout(() => {
      camera.position.z = 11;
    }, 8500);
    setTimeout(() => {
      camera.position.z = 10.75;
    }, 8562);
    setTimeout(() => {
      camera.position.z = 10.5;
    }, 8675);
    setTimeout(() => {
      camera.position.z = 10.25;
    }, 8737);
    setTimeout(() => {
      camera.position.z = 10;
    }, 8750);
    setTimeout(() => {
      camera.position.z = 9.75;
    }, 8812);
    setTimeout(() => {
      camera.position.z = 9.5;
    }, 8875);
    setTimeout(() => {
      camera.position.z = 9.25;
    }, 8937);
    setTimeout(() => {
      camera.position.z = 9;
    }, 9000);

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

    /*
    // ---------------------------
    // INIT CAMERA SETTINGS
    // ---------------------------
    */

    // set width and height of browser
    const width = window.innerWidth - 17;
    const height = window.innerHeight;

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
    // STARS SKYBOX OBJECT CREATION
    // ---------------------------
    */

    // load texture into variable so its loaded before we call the box
    const sphereTexture = new THREE.TextureLoader().load('spacex/images');
    // const moonTexture = new THREE.TextureLoader().load('spacex/images/moon');
    const sphereGeomerty = new THREE.SphereGeometry(100, 100, 100);
    // create material using sphereTexture
    const sphereMaterial = new THREE.MeshBasicMaterial({
      map: sphereTexture,
      side: THREE.BackSide
    });
    // create mesh based on geometry and material
    const mesh = new THREE.Mesh(sphereGeomerty, sphereMaterial )
    // add stars skybox to scene
    scene.add(mesh);


    /*
    // ---------------------------
    // EARTH OBJECT CREATION
    // ---------------------------
    */

    /*
    var geometry = new THREE.SphereGeometry(0.5, 32, 32)
    var material = new THREE.MeshLambertMaterial()
    var sphere = new THREE.Mesh(geometry, material)
    material.map = THREE.TextureLoader().load('spacex/images/earth/earthmap1k.jpg')
    material.bumpMap = THREE.TextureLoader().load('spacex/images/earth/earthbump1k.jpg')
    material.bumpScale = 0.05
    material.specularMap = THREE.TextureLoader().load('spacex/images/earth/earthspec1k.jpg')
    material.specular = new THREE.Color('grey')
    var geometry = new THREE.SphereGeometry(0.51, 32, 32)
    const canvasCloud = THREE.TextureLoader().load('spacex/images/earth/earthCloudmaptrans.jpg')
    var material = new THREE.MeshPhongMaterial({
      map: new THREE.Texture(canvasCloud),
      side: THREE.DoubleSide,
      opacity: 0.8,
      transparent: true,
      depthWrite: false,
    })
    var cloudMesh = new THREE.Mesh(geometry, material)
    sphere.add(cloudMesh)
    */


    // incase we want to change images or have muliple in array hold image in variable
    // const mapImg = 'spacex/images/earth/map';
    const mapImg = new THREE.TextureLoader().load('spacex/images/earth/map');
    const bumpImg = new THREE.TextureLoader().load('spacex/images/earth/bump');
    const specImg = new THREE.TextureLoader().load('spacex/images/earth/specular');
    const canvasCloud = new THREE.TextureLoader().load('spacex/images/earth/cloud');
    const trans = new THREE.TextureLoader().load('spacex/images/earth/trans');
    // create sphere geomerty and populate its texture with earth image stored in variable above
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    // const texture = new THREE.TextureLoader().load(mapImg);
    const material = new THREE.MeshPhongMaterial();
    material.map = mapImg;
    material.bumpMap = bumpImg;
    // material.bumpScale = 0.05;
    material.specularMap = specImg;
    material.specular = new THREE.Color('0xffffff')
    const sphere = new THREE.Mesh(geometry, material);

   
    var meshGeometry = new THREE.SphereGeometry(5,32,32)
    var meshMaterial = new THREE.MeshPhongMaterial({
      map: (canvasCloud, trans),
      side: THREE.DoubleSide,
      opacity: 0.2,
      transparent: true,
      depthWrite: true,
    })
    var cloudMesh = new THREE.Mesh(meshGeometry, meshMaterial)
    sphere.add(cloudMesh)

    // add sphere(earth) to scene
    scene.add(sphere)

    // set camera position from viewscreen
    camera.position.z = 13;

    /*
    // ---------------------------
    // MOON OBJECT CREATION
    // ---------------------------
    */

    // init texture map of moon
    const moonImg = new THREE.TextureLoader().load('spacex/images/moon');
    // init sphere geometry for moon
    const moonGeometry = new THREE.SphereGeometry(5, 5, 5);
    // Use mesh phong material so it gives off reflectivity and glow
    const moonMaterial = new THREE.MeshPhongMaterial({
      map: moonImg
    });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    // moon.vertices.push(new THREE.Vector3(1,1,1));
    scene.add(moon);
    // set position of moon
    moon.position.set(20,10,-40);
    // set shadowing of moon to false
    moon.castShadow = false;
    // rotate moon around earth. need to set up moon as child to earth
    var moonParent = sphere;
    sphere.add(moon)



    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.material = material;
    this.sphere = sphere;
    this.moon = moon;


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
      loader.load('/spacex/data', font => {

        for (var j = 0; j < gps.length; j++) {

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
          stick.castShadow = true;
          var point = new THREE.Vector3(5, 0, 0);
          stick.lookAt(point);
          parent.add(stick);

          var geometry = new THREE.RingBufferGeometry(.2, .1, 30, 5, 6.3);
          var material = new THREE.MeshBasicMaterial({
            color: 'gold',
            transparent: false,
            wireframe: false,
            opacity: 1,
            side: THREE.DoubleSide
          });
          var ring = new THREE.Mesh(geometry, material);
          ring.position.set(0, 0, 5.5);

          // set same user data to rings since it is a child of the line
          ring.userData = {
            name: gps[j].name,
            flightNumber: gps[j].flightNumber,
            flightYear: gps[j].flightYear,
            image: gps[j].image,
            desc: gps[j].desc
          };

          // cast shadow to true to show shadow on earth surface
          ring.castShadow = true;

          // add ring as child to stick
          stick.add(ring);

          // push to global ringArray array so we can access them outside of component did mount function
          ringArray.push(ring);

          // ---------------------------
          // OPTIONAL TEXT WITH LINE THAT WILL WRITE FLIGHT NAME AT END OF LINE:
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
              var shapes = font.generateShapes( gps[j].flightName, 0.2, 2 );
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
    // ---------------------------
    // INIT LIGHT SOURCE AND SHADOWS
    // ---------------------------
    */

    console.log(stickArray);
   
    // init shadowmaps
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    // init directional light (mimicks moon light)
    var dirLight;
    dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(1, 1, 1).normalize();
    dirLight.target = sphere;
    ringArray.forEach(ringObj => {
      dirLight.target = ringObj;
    });
    stickArray.forEach(stickObj => {
      stickObj.castShadow = true;
    });


    // init shadow controls on dirlight
    dirLight.castShadow = true;
    dirLight.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(100, 1, 500, 1000));
    dirLight.shadow.bias = 0.001;
    dirLight.shadow.mapSize.width = 2048 * 2;
    dirLight.shadow.mapSize.height = 2048 * 2;

    // add dirlight to scnee
    scene.add(dirLight);

    // set up sphere and rings to allow to cast shadows
    sphere.castShadow = true;
    ringArray.forEach(ringObj => {
      ringObj.castShadow = true;
    })
    stickArray.forEach(stickObj => {
      stickObj.castShadow = true;
    })

    // init hemisphere light (puts a sort of gradient light over scene to give a hint of color in light source)
    var hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x020251, .02);
    scene.add(hemisphereLight);


    /*
    //---------------------------
    // CLICK EVENTS
    //---------------------------
    */


    const projector = new THREE.Projector();
    const mouse2D = new THREE.Vector3(0, 10000, 0.5);
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
    objects.forEach(object => {
      object.rotation.y += 0.003;
      object.rotation.x += 0.000;
    })
    this.moon.rotation.y += 0.002;
    this.sphere.rotation.x += 0.000;
    this.sphere.rotation.y += 0.003;
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