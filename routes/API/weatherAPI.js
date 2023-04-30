const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
    re = new RegExp(/^-?\d+\.?\d+$/);
    console.log('get weatherData from API');
    // Acccept only requests with 'lat' & 'lon' params
    if (
        Object.keys(req.query).length &&
        re.test(req.query.lat) &&
        re.test(req.query.lon)
    ) {
        const Token_1 = process.env.VISUAL_CROSSING__API_TOKEN;
        const Token_2 = process.env.VISUAL_CROSSING__API_TOKEN_2;
        const Token_3 = process.env.VISUAL_CROSSING__API_TOKEN_3; // admin token
        const lang = req.query.lang;
        let paramsArray = [];
        const baseurl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline`;
        const params = {
            unitGroup: 'metric',
            key: Token_3,
            elements: [
                // "name",
                // "datetime",
                'description',
                // 'resolvedAddress',
                'moonphase',
                'moonriseEpoch',
                'moonsetEpoch',
                'datetimeEpoch',
                'conditions',
                'temp',
                'tempmax',
                'tempmin',
                'feelslike',
                'humidity',
                'pressure',
                'precipprob',
                // "preciptype",
                'windspeed',
                'winddir',
                'windgust',
                'sunriseEpoch',
                'sunsetEpoch',
                'uvindex',
                'severerisk',
                'icon',
            ],
            iconSet: 'icons2',
            includeAstronomy: true,
            // include: ['days', 'hours', 'current'],
            include: ['days', 'hours', 'current', 'alerts', 'events'],
            contentType: 'json',
            lang: lang,
        };
        Object.entries(params).forEach(([key, value]) => {
            v = Array.isArray(value) ? value.join(',') : value;
            paramsArray.push([key, v].join('='));
        });

        const lat = req.query.lat;
        const lon = req.query.lon;

        // const url = baseurl + `/${lat},${lon}?` + paramsArray.join('&');
        const url =
            baseurl + `/${lat},${lon}/next30days?` + paramsArray.join('&');
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
