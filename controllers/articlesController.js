// Dependencies
const request = require('request');

// Import models
const db = require('../models');

// Define methods for the articles controller
module.exports = {

    // Find all articles and limit to 10 and sort from newest to oldest
    findAll: (req, res) => {
        db.Articles
            .find()
            .limit(10)
            .sort({
                published: -1
            })
            .then(dbArticles => res.json(dbArticles))
            .catch(err => res.state(422).json(err));
    },

    postAll: (req, res) => {
        // Get New York Times articles search for spaceX and Rocket
        // Need to add rocket as param otherwise you get random data
        request.get({
            url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
            qs: {
                'api-key': "bd2c4617672b48ebb6d75459de9c1d1e",
                'q': "spaceX, rocket",
                'sort': "newest"
            },
        }, function (err, response, body) {

            // needs to be parsed for proper response object
            body = JSON.parse(body);
            const data = body.response.docs;
            // loop through articles and bring in relevent data to save to db
            data.forEach(article => {
                db.Articles.create({
                    snippet: article.snippet,
                    url: article.web_url,
                    author: article.byline.original
                });
            });
            // send json to 
            res.json(data);

        });
    }

}