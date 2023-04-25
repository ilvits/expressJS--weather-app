const express = require('express');
const axios = require('axios');
const router = express.Router();
const primaryToken = process.env.MAPBOX_API_TOKEN;

router.get('/', async (req, res) => {
    console.log('Resolve Adress from Mapbox API');
    if (Object.keys(req.query).length) {
        const query = req.query.longitude + ',' + req.query.latitude;
        const lang = req.query.lang;
        const baseurl = `https://api.mapbox.com/geocoding/v5/mapbox.places/`;
        const params = {
            language: lang,
            types: 'place',
            access_token: primaryToken,
        };
        let paramsArray = [];
        Object.entries(params).forEach(([key, value]) => {
            v = Array.isArray(value) ? value.join(',') : value;
            paramsArray.push([key, v].join('='));
        });

        url = baseurl + `${query}.json?` + paramsArray.join('&');
        axios({
            method: 'GET',
            url: url,
            headers: {
                'Accept': 'application/json',
                'Accept-Encoding': 'gzip',
            },
            crossDomain: true,
            // timeout: 4000,
        })
            .then(response => {
                res.status(200).json(response.data);
            })
            .catch(err => {
                res.status(500).json(err.message);
            });
    } else {
        res.status(400).json(`Bad request.`);
    }
});

module.exports = router;
