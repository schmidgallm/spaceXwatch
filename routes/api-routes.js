const db = require("../models");
const articlesController = require('../controllers/articlesController');


// Routes
// =============================================================
module.exports = function(app) {
	
	app.get('/himom', function (req, res) {
		res.send("himom");
	});

	app.get('/spacex/data', (req, res) => {
		articlesController.getLaunches(req, res);
	})
	
}
