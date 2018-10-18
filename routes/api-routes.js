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
	
	app.get('/creategeodataset', (req, res) => {
		articlesController.createGeoDataSet(req, res);
	});
	
	app.get('/addspacexdata', (req, res) => {
		articlesController.postLaunches(req, res);
	});

	app.get('/spacex/images', (req, res) => {
		res.sendFile(path.resolve('routes/api/stars.png'));
	});

	app.get('/spacex/images/earth/map', (req, res) => {
		res.sendFile(path.resolve('routes/api/map.jpg'));
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
}
