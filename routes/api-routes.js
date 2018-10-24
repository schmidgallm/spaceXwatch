const db = require("../models");
const articlesController = require('../controllers/articlesController');
const path = require('path');

// Routes
// =============================================================
module.exports = function(app) {
	
	app.get('/himom', function (req, res) {
		res.send("himom");
	});

	app.get('/spacex/data', (req, res) => {
		articlesController.getLaunches(req, res);
	});
	
	app.post('/getuserlaunches', (req, res) => {
		articlesController.getUserLaunches(req, res);
	});
	
	app.get('/creategeodataset', (req, res) => {
		articlesController.createGeoDataSet(req, res);
	});
	
	app.post('/user_creategeodataset', (req, res) => {
		articlesController.user_createGeoDataSet(req, res);
	});
	
	app.post('/user_createEvent', (req, res) => {
		articlesController.user_createEvent(req, res);
	});
	
	app.post('/user_datasets', (req, res) => {
		articlesController.user_datasets(req, res);
	});
	
	app.get('/addspacexdata', (req, res) => {
		articlesController.postLaunches(req, res);
	});

	app.get('/spacex/images', (req, res) => {
		res.sendFile(path.resolve('routes/api/stars.jpg'));
	});

	app.get('/spacex/images/earth/map', (req, res) => {
		res.sendFile(path.resolve('routes/api/map_desat_4000.jpg'));
	});

	app.get('/spacex/images/earth/bump', (req, res) => {
		res.sendFile(path.resolve('routes/api/bump.jpg'));
	});

	app.get('/spacex/images/earth/specular', (req, res) => {
		res.sendFile(path.resolve('routes/api/specular.png'));
	});

	app.get('/spacex/images/earth/lights', (req, res) => {
		res.sendFile(path.resolve('routes/api/night_lights_modified.png'));
	});
	
	app.get('/spacex/images/earth/cloud', (req, res) => {
		res.sendFile(path.resolve('routes/api/earthcloudmap.jpg'));
	});

	app.get('/spacex/images/earth/trans', (req, res) => {
		res.sendFile(path.resolve('routes/api/earthcloudmaptrans.jpg'));
	});

	app.get('/spacex/images/sun', (req, res) => {
		res.sendFile(path.resolve('routes/api/sun.jpg'));
	});

	app.get('/spacex/images/moon', (req, res) => {
		res.sendFile(path.resolve('routes/api/moon.jpg'));
	});

	app.get('/spacex/images/moon/bump', (req, res) => {
		res.sendFile(path.resolve('routes/api/moonbump.jpg'))
	});
	
	app.get('/spacex/images/newspace', (req, res) => {
		console.log("hi");
		res.sendFile(path.resolve('routes/api/space_b.jpg'));
	});

	app.get('/spacex/images/michael', (req, res) => {
		console.log("hi");
		res.sendFile(path.resolve('routes/api/michael.png'));
	});

	app.get('/spacex/images/steven', (req, res) => {
		console.log("hi");
		res.sendFile(path.resolve('routes/api/steven.jpg'));
	});
}
