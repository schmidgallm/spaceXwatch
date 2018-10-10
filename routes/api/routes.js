// Dependencies
const express = require('express');
const router = express.Router();

// Import Controller
const articlesController = require('../../controllers/articlesController');

// get query from articlesController
router.get('/spacex/data', (req,res) => {
    res.sendStatus(200);
})

    


module.exports = router;
// Export router to server