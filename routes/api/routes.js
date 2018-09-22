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

module.exports = router;
// Export router to server