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
	
	this.state = {
		toggle_rotate: true,
		toggle_moon: true,
		toggle_sun: true,
		user_button_array: []
	};

  }



  componentDidMount() {
	  
	  API.session().then(response => {
			if(response.data.id)
			{
				API.user_datasets({userId: response.data.id}).then((res) => {
					console.log("datasets by dre", res);
					this.setState({user_button_array: res.data});
				})
			} 
        })
        .catch(err => {
          console.log(err);
        });
    // set timout function increases earth size after 9 seconds.
    // wait 9 seconds becuase beginning text animation on load takes about 8 seconds
    /*setTimeout(() => {
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
    }, 9000);*/

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

    // set camera position from viewscreen
    camera.position.z = 13;



    /*
    // ---------------------------
    // STARS SKYBOX OBJECT CREATION
    // ---------------------------
    */

    // load texture into variable so its loaded before we call the box
    const sphereTexture = new THREE.TextureLoader().load('spacex/images');
    // const moonTexture = new THREE.TextureLoader().load('spacex/images/moon');
    const sphereGeomerty = new THREE.SphereGeometry(75, 75, 75);
    // create material using sphereTexture
    const sphereMaterial = new THREE.MeshBasicMaterial({
      map: sphereTexture,
      side: THREE.BackSide
    });
    // create mesh based on geometry and material
    const mesh = new THREE.Mesh(sphereGeomerty, sphereMaterial )
    // add stars skybox to scene
//_______________________________________________________________________________________________________//////scene.add(mesh);


    /*
    // ---------------------------
    // EARTH OBJECT CREATION
    // ---------------------------
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
    material.specular = new THREE.Color(0x111111);
	
	
	//var iskyfireMaterial = new THREE.MeshBasicMaterial({ map: mapImg });
	const sphere = new THREE.Mesh(geometry, material);
	//const sphere = new THREE.Mesh(geometry, iskyfireMaterial);

   
    var meshGeometry = new THREE.SphereGeometry(5,32,32)
    var meshMaterial = new THREE.MeshPhongMaterial({
      map: (canvasCloud, trans),
      side: THREE.DoubleSide,
      opacity: 0.2,
      transparent: true,
      depthWrite: true,
    })

	
    //var cloudMesh = new THREE.Mesh(meshGeometry, meshMaterial)
    //sphere.add(cloudMesh)

    // add sphere(earth) to scene
    scene.add(sphere)

    // set camera position from viewscreen
    camera.position.z = 13;
	
	
	/*
    // ---------------------------
    // NEW SPACE CREATION
    // ---------------------------
    */
	
	//Space background is a large sphere
  var spacetex = THREE.ImageUtils.loadTexture("/spacex/images/newspace");
  var spacesphereGeo = new THREE.SphereGeometry(50,32,32);
  var spacesphereMat = new THREE.MeshBasicMaterial();
  spacesphereMat.map = spacetex;

  var spacesphere = new THREE.Mesh(spacesphereGeo,spacesphereMat);
  
  //spacesphere needs to be double sided as the camera is within the spacesphere
  spacesphere.material.side = THREE.DoubleSide;
  
  spacesphere.material.map.wrapS = THREE.RepeatWrapping; 
  spacesphere.material.map.wrapT = THREE.RepeatWrapping;
  spacesphere.material.map.repeat.set( 5, 3);
  
  scene.add(spacesphere);

    /*
    // ---------------------------
    // MOON OBJECT CREATION
    // ---------------------------
    */

    // init texture map of moon and bump map
    const moonImg = new THREE.TextureLoader().load('spacex/images/moon');
    const moonBumpImg = new THREE.TextureLoader().load('spacex/images/moon/bump');
    // init sphere geometry for moon
    const moonGeometry = new THREE.SphereGeometry(1.5,32,32);
    // Use mesh phong material so it gives off reflectivity and glow
    const moonMaterial = new THREE.MeshPhongMaterial({
      map: moonImg,
      bumpMap: moonBumpImg,
      bumpScale: .5
    });
    // material.bumpMap = moonBumpImg;
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    // moon.vertices.push(new THREE.Vector3(1,1,1));
//_______________________________________________________________________________________________________//////
scene.add(moon);
    // set position of moon
    moon.position.set(20,0,0);
    // set shadowing of moon to false
    moon.castShadow = false;
    // rotate moon around earth. need to set up moon as child to earth
    var moonParent = sphere;
//_______________________________________________________________________________________________________//////
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
  
  spaceXData = () => {
	   API.getLaunches().then(rsp => {
      const gps = rsp.data;
      var loader = new THREE.FontLoader();

      // load in spacex/data
      loader.load('/spacex/data', font => {
		  
		  this.sphere.rotation.x = 0;
		  this.sphere.rotation.y = 0;

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
          line.rotation.y = THREE.Math.degToRad((gps[j].lon) * -1);

          // userData is native object in three js to hold custom data for each object
          // init userData object and hold each objects data
          line.userData = {
            name: gps[j].name,
            flightNumber: "Flight Number:" + gps[j].flightNumber,
            flightYear: "Flight Year:" + gps[j].flightYear,
            image: gps[j].image,
            desc: gps[j].desc
          };

          // add line to scene
          this.scene.add(line);

          // create empty array to hold all line objects and push each line into objects
          // will need this for click events

          objects.push(line);

          var parent = line;
          this.scene.add(parent);

          var stick = new THREE.Object3D();
          stick.castShadow = true;
          var point = new THREE.Vector3(5, 0, 0);
          stick.lookAt(point);
          parent.add(stick);

          var ringGeometry = new THREE.RingBufferGeometry(.2, .1, 30, 5, 6.3);
          var ringMaterial = new THREE.MeshBasicMaterial({
            color: 'gold',
            transparent: false,
            wireframe: false,
            opacity: 1,
            side: THREE.DoubleSide
          });
          var ring = new THREE.Mesh(ringGeometry, ringMaterial);
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
	
  }
  
  userDataRender = (geo_dataset_id) => {
	   API.getUserLaunches({GeoDataSetId: geo_dataset_id}).then(rsp => {
      const gps = rsp.data;
      var loader = new THREE.FontLoader();

      // load in spacex/data
      loader.load('/spacex/data', font => {
		  
		  this.sphere.rotation.x = 0;
		  this.sphere.rotation.y = 0;

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
          line.rotation.y = THREE.Math.degToRad((gps[j].lon) * -1);

          // userData is native object in three js to hold custom data for each object
          // init userData object and hold each objects data
          line.userData = {
            name: gps[j].name,
            flightNumber: "",
            flightYear: "",
            image: gps[j].image,
            desc: gps[j].desc
          };

          // add line to scene
          this.scene.add(line);

          // create empty array to hold all line objects and push each line into objects
          // will need this for click events

          objects.push(line);

          var parent = line;
          this.scene.add(parent);

          var stick = new THREE.Object3D();
          stick.castShadow = true;
          var point = new THREE.Vector3(5, 0, 0);
          stick.lookAt(point);
          parent.add(stick);

          var ringGeometry = new THREE.RingBufferGeometry(.2, .1, 30, 5, 6.3);
          var ringMaterial = new THREE.MeshBasicMaterial({
            color: 'gold',
            transparent: false,
            wireframe: false,
            opacity: 1,
            side: THREE.DoubleSide
          });
          var ring = new THREE.Mesh(ringGeometry, ringMaterial);
          ring.position.set(0, 0, 5.5);

          // set same user data to rings since it is a child of the line
          ring.userData = {
            name: gps[j].name,
            flightNumber: "",
            flightYear: "",
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
  animate = () => {
    // right now no rotation since on auto rotate the line objects do not rotate with earth
	if(this.state.toggle_rotate)
	{
		objects.forEach(object => {
		  object.rotation.y += 0.003;
		  object.rotation.x += 0.000;
		})
		this.moon.rotation.y += 0.002;
		this.sphere.rotation.x += 0.000;
		this.sphere.rotation.y += 0.003;
	}
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  // render scene function wich renders the scene and camera
  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }
  
  toggleSun = () =>
  {
	  this.setState(state => ({
		toggle_sun: !state.toggle_sun
	}));
	
	if(!this.state.toggle_sun)
	{
		const mapImg = new THREE.TextureLoader().load('spacex/images/earth/map');
		const bumpImg = new THREE.TextureLoader().load('spacex/images/earth/bump');
		const specImg = new THREE.TextureLoader().load('spacex/images/earth/specular');
		
		const material = new THREE.MeshPhongMaterial();
		material.map = mapImg;
		material.bumpMap = bumpImg;
		material.specularMap = specImg;
		material.specular = new THREE.Color('0xffffff')
		
		this.sphere.material = material;
		this.sphere.material.needsUpdate = true;
	}
	else
	{
		const mapImg = new THREE.TextureLoader().load('spacex/images/earth/map');
		var iskyfireMaterial = new THREE.MeshBasicMaterial({ map: mapImg });
		
		this.sphere.material = iskyfireMaterial;
		this.sphere.material.needsUpdate = true;
	}
  }
  
   toggleMoon = () =>
  {
	  this.setState(state => ({
		toggle_moon: !state.toggle_moon
	}));
	
	if(!this.state.toggle_moon)
	{

	    this.scene.add(this.moon);
	    this.sphere.add(this.moon);
	}
	else
	{
	    this.sphere.remove(this.moon);
		this.scene.remove(this.moon);
	}
  }
  
   toggleRotate = () =>
  {
	  this.setState(state => ({
		toggle_rotate: !state.toggle_rotate
	}));
	
	console.log(this.state.toggle_rotate);
  }

  logout = () => {
	  console.log("logout");
	  API.logout().then((res) => {
		  window.location.reload();
	  });
  }
  
  addUserDataPanel = (event) => {
	  event.target.parentElement.nextElementSibling.dataset.shown = "true";
  }
  
  hideUserDataPanel = (event) => {
	  event.target.parentElement.dataset.shown = "false";
  }
  
  getNameOfData = (event) => {
	  let name1 = event.target.parentElement.firstElementChild.nextElementSibling.value;
	  let myEventTarget = event.target;
	  console.log(name1);
	  API.user_createGeoDataSet({name: name1}).then((res) => {
		  document.getElementById("event_hidden_box").value=res.data;
		  myEventTarget.parentElement.dataset.shown = "false";
		  myEventTarget.parentElement.nextElementSibling.dataset.shown = "true";
	  });
  }
  
  getEventData = (event) => {
	  let myEventTarget = event.target;
	  const newEvent = {
		  name: document.getElementById("event_name_box").value,
		  lat: document.getElementById("event_lat_box").value,
		  lon: document.getElementById("event_lon_box").value,
		  desc: document.getElementById("event_desc_box").value,
		  GeoDataSetId: document.getElementById("event_hidden_box").value
	  }
	  
	  API.user_createEvent(newEvent).then((res) => {
		
		  document.getElementById("event_name_box").value = "";
		  document.getElementById("event_lat_box").value = "";
		  document.getElementById("event_lon_box").value = "";
		  document.getElementById("event_desc_box").value = "";
	  });
  }
  

  render() {
    return ( 
	<div>
	<
      div className = {
        this.props.panelShown ? "globeDiv globeDiv__panelShown" : "globeDiv"
      }
      ref = {
        (mount) => {
          this.mount = mount
        }
      }
      />
	 <div id="control-panel" data-shown={this.props.controlPanel} >
		Choose a dataset:
		<div onClick={this.spaceXData} className="control-toggle">SpaceX API</div>
		{this.state.user_button_array.map((value) => <div onClick={() => { this.userDataRender(value.id) }} className="control-toggle">{value.title}</div>)}
		<div onClick={this.addUserDataPanel} className="control-toggle">Add your own data...</div>
		<br/>
		Controls:
		<div onClick={this.toggleSun} className="control-toggle"> Earth Lighting: {this.state.toggle_sun.toString()}</div>
		<div onClick={this.toggleMoon} className="control-toggle"> Moon: {this.state.toggle_moon.toString()}</div>
		<div onClick={this.toggleRotate} className="control-toggle"> Auto-Rotate: {this.state.toggle_rotate.toString()}</div>
		<br />
		<div onClick={this.logout} className="control-toggle"> Logout</div>
	 </div>
	 <div id="add-data-panel" data-shown={false}>
		Name of Data:<br/>
		<input type="text" className="moveBox"/>
		<br /><br />
		<div className="control-toggle" onClick={this.getNameOfData}>Continue</div>
		<div className="control-toggle" onClick={this.hideUserDataPanel}>Back</div>
	 </div>
	 <div id="add-events-panel" data-shown={false}>
		Add Event <br/> <br/>
		Name:<br/>
		<input type="text" id="event_name_box"/> <br/>
		Latitude:<br/>
		<input type="text" id="event_lat_box"/> <br/>
		Longitude:<br/>
		<input type="text" id="event_lon_box"/> <br/>
		Description:
		<input type="text" id="event_desc_box"/>
		<input type="hidden" value="0" id="event_hidden_box" />
		<br /><br />
		<div className="control-toggle" onClick={this.getEventData}>Add</div>
		<div className="control-toggle" onClick={() => {window.location.reload()}}>Done</div>
	 </div>
	 </div>
    )
  }
}

export default Globe;