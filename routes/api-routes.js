const db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
	
	app.get('/himom', function (req, res) {
		res.send("himom");
	});
	
}