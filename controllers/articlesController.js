// Dependencies
const request = require('request');

// Import models
const db = require('../models');

// Define methods for the articles controller
module.exports = {

    // retrieve spacex api data and post to db
    postLaunches: (req, res) => {
        request.get({
            url: 'https://api.spacexdata.com/v3/launches'
        }, (err, response, body) => {
            const data = JSON.parse(body);
            data.forEach( flight => {
                db.Events.create({
                    name: flight.mission_name,
                    flightNumber: flight.flight_number,
                    flightYear: flight.launch_year,
                    image: flight.links.mission_patch,
                    desc: flight.details,
                    lat: 33.448376,
                    lon: -112.074036
                })
            })
        })
    },

    getLaunches: (req, res) => {
        db.Events.findAll({})
            .then(dbLaunches => {
                res.send(dbLaunches);
            })
    }

  
}