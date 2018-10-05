// Dependencies
const express = require('express');
const router = express.Router();

// Import Controller
const articlesController = require('../../controllers/articlesController');

// get query from articlesController
router.route('/')
    .get(articlesController.findAll);

router.route('/nyt/spacex')
    .get(articlesController.postAll);

router.route('spacex/data')
    .get(articlesController.findAll);

module.exports = router;
// Export router to server