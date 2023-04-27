const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const minify = require('express-minify');
const compression = require('compression');
const express = require('express');
// const cors = require('cors');
const bodyParser = require('body-parser');
// const helmet = require('helmet');

require('dotenv').config();

const indexRouter = require('./routes/index');
const apiWeatherRouter = require('./routes/API/weatherAPI');
const apiSuggestionsRouter = require('./routes/API/suggestionsAPI');
const apiResolveRouter = require('./routes/API/resolveadressAPI');

const app = express();

app.use(function (req, res, next) {
    if (/\.(css)$/.test(req.url)) {
        res.minifyOptions = res.minifyOptions || {};
        res.minifyOptions.minify = false;
    }
    next();
});
// // View engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

// app.use(cors());
// app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());
app.use(minify());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/weather', apiWeatherRouter);
app.use('/api/suggestions', apiSuggestionsRouter);
app.use('/api/resolveadress', apiResolveRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// Error handler
app.use((err, req, res) => {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.render('error');
});

const myErrorHandler = function (errorInfo, callback) {
    console.log(errorInfo);
    // below is the default implementation (minify.Minifier.defaultErrorHandler)
    if (errorInfo.stage === 'compile') {
        callback(errorInfo.error, JSON.stringify(errorInfo.error));
        return;
    }
    callback(errorInfo.error, errorInfo.body);
};

module.exports = app;
