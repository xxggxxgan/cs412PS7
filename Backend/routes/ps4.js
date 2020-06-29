const fetch = require('node-fetch');
const express = require('express');
const router = express.Router();
const apiCon = require('../configs/apiKey');
const request = require('request');

/* GET home page. */
   
router.route('/current')

    .get( async (req, res, next) =>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); 
    //let result = await fetch(apiCon.url + 'country/China');
    let result = await fetch('https://covid2019-api.herokuapp.com/v2/current/US');
    let covid = await result.json();
    // res.render('ps4', { location: covid.data.location,
    //     confirmed:covid.data.confirmed,
    //     deaths : covid.data.deaths,
    //     recovered : covid.data.recovered,
    //     active : covid.data.active
    //         });
    res.send(covid);
})

    .post(async (req, res, next) =>{
       // console.log(req.body.country)
    let result = await fetch(apiCon.url + 'country/' + req.body.country);
    let covid = await result.json();
    //console.log('covid',covid);
    res.render('ps4', { location: covid.data.location,
        confirmed:covid.data.confirmed,
        deaths : covid.data.deaths,
        recovered : covid.data.recovered,
        active : covid.data.active
    });
})

module.exports = router;