const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/weather", (req, res, next) => {
    console.log("'/test' call");
    axios.get("https://api.neoscan.io/api/main_net/v1/get_all_nodes")
        .then(response => res.json(response.data))
        .catch(err => next(err));
})


router.get("/weather", (req, res, next) => {
    res.send(405, '<h1>Method not alowed</h1>');
})

router.get("/", (req, res, next) => {
    res.redirect('/');
})

module.exports = router;