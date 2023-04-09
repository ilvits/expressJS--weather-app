const express = require('express');
const router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function (req, res, next) {
    // res.render('index');
    res.sendFile(path.join(__dirname, '/index.html'));
});

router.get('/img/assets/icons/weather-conditions/*', function (req, res) {
    res.sendFile(
        path.join(__dirname, '../public/img/assets/icons/emptypic.svg')
    );
});

router.get('/img/assets/icons/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/img/assets/icons/blank.png'));
});

// app.get("/", function (req, res) {
// 	res.sendFile(path.join(__dirname, "/index.html"));
// });

module.exports = router;
