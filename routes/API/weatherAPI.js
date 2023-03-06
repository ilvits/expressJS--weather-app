const express = require("express");
const axios = require("axios");
const { response } = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    re = new RegExp(/^\d+\.?\d+$/)
    console.log('get weatherData from API')
    // Acccept only requests with 'lat' & 'lon' params
    if (Object.keys(req.query).length && re.test(req.query.lat) && re.test(req.query.lon)) {
        const primaryToken = process.env.VISUAL_CROSSING__API_TOKEN
        const backupToken = process.env.VISUAL_CROSSING__BACKUP_API_TOKEN
        let paramsArray = []
        const baseurl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline`
        const params = {
            unitGroup: 'metric',
            key: backupToken,
            elements: [
                'datetime', 'datetimeEpoch', 'description', 'conditions', 'icon',
                'name', 'address', 'resolvedAddress',
                'temp', 'tempmax', 'tempmin', 'feelslike', 'humidity',
                'pressure', 'precipprob', 'preciptype',
                'windspeed', 'winddir', 'windgust', 'severerisk',
                'sunriseEpoch', 'sunsetEpoch'
            ],
            include: ['days', 'hours', 'current', 'alerts', 'events'],
            contentType: 'json',
            lang: 'ru'
        }
        Object.entries(params).forEach(([key, value]) => {
            v = Array.isArray(value) ? value.join(',') : value
            paramsArray.push([key, v].join('='))
        });

        const lat = req.query.lat
        const lon = req.query.lon

        // const url = baseurl + `/${lat},${lon}/next30days?` + paramsArray.join('&')
        const url = 'https://dummyjson.com/products'
        axios({
            method: "GET",
            url: url,
            headers: { Accept: 'application/json', 'Accept-Encoding': 'gzip' },
            // timeout: 4000,
        })
            .then(response => {
                res.status(200).json(response.data);
            })
            .catch((err) => {
                res.status(500).json(err.message);
            });
    } else {
        res.status(400).json(`Bad request.`)
    }
});

module.exports = router;