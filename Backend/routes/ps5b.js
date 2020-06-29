const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const apiCon = require('../configs/apiKey');
const request = require('request');
const {promisify} = require('util');
const bluebird = require('bluebird');

const redis = require('redis');
const client = redis.createClient();

client.flushdb((err, success) => {
    if (err) { throw new Error(err)}
});


const getAsync = promisify(client.get).bind(client);
const existsAsync = promisify(client.exists).bind(client);
const setAsync = promisify(client.set).bind(client);
router.route('/sb')
    .get( async (req, res, next) =>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); 
        let result = await fetch(apiCon.url + 'country/' + req.query.country);
        //let result = await fetch('https://covid2019-api.herokuapp.com/v2/current/US');
        //console.log(result);
        let covid = await result.json();
        let covid19Data = {
                covid:[covid.data,covid.data,covid.data],
                cache: true
        }
       //console.log(covid.data);
        // check if data exists
        let match = await existsAsync(covid.data.location);
        // seting expire
        let temp = await setAsync(covid.data.location, JSON.stringify(covid19Data),'EX',30);
        //let temp = await setAsync('covid', covid,'EX',30);
        
        if(match){
            // if in cache, then use get method
            let covidData = await getAsync(covid.data.location);
            //res.send(Json.parse(covidData));
            res.send(covidData);
        }else{
            //if not in cache, then just use the data from api to send
            covid19Data.cache = false;
            console.log('not cache');
            res.send(covid19Data);
            //console.log(covid19Data);
            //res.send(covid + 'not cached')
        }
    })








// router.get('/find/:name', (req, res, next) => {
//     const name = req.params.name;
//
//     client.exists(name, (err, match) => {  //looks for key
//         if(err) { throw new Error(err) }
//         if (match) { //key exists, grab value
//             client.get(name, (err, response) => {
//                 console.table(response);
//                 res.send(JSON.stringify(response + ' cached '))
//             })
//
//         } else {
//             const reversedName = name.split('').reverse().join(''); //reverse the string
//             client.set(name, reversedName, (err, response) => { //name = key, reversedName = value
//                 console.table(response);
//                 res.send(JSON.stringify(reversedName + ' not cached '))
//
//             })
//         }
//     })
// })

module.exports = router;