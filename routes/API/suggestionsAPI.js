const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
	re = new RegExp(/\w+/);
	console.log("get suggestion from Mapbox API");
	if (Object.keys(req.query).length) {
		const query = req.query.string;
		const lang = req.query.lang;
		primaryToken =
			"pk.eyJ1IjoiaWx2aXRzIiwiYSI6ImNsZGViNGowNDBibDAzb3E3cWQ5OThrc20ifQ.0ZyvQ-0dE8CqherBbekJIA";
		backupKey = "";
		const baseurl = `https://api.mapbox.com/geocoding/v5/mapbox.places/`;
		const params = {
			limit: "10",
			language: lang,
			types: "place",
			autocomplete: "true",
			// routing: 'false',
			// worldview: lang,
			access_token: primaryToken,
		};
		let paramsArray = [];
		Object.entries(params).forEach(([key, value]) => {
			v = Array.isArray(value) ? value.join(",") : value;
			paramsArray.push([key, v].join("="));
		});

		url = baseurl + `${query}.json?` + paramsArray.join("&");
		axios({
			method: "GET",
			url: url,
			headers: { Accept: "application/json", "Accept-Encoding": "gzip" },
			// timeout: 4000,
		})
			.then((response) => {
				res.status(200).json(response.data);
			})
			.catch((err) => {
				res.status(500).json(err.message);
			});
	} else {
		res.status(400).json(`Bad request.`);
	}
});

module.exports = router;
