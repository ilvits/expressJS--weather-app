var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var minify = require('express-minify');
var compression = require('compression')
var express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');

require('dotenv').config();

var indexRouter = require('./routes/index');
var apiWeatherRouter = require('./routes/API/weatherAPI');
var apiSuggestionsRouter = require('./routes/API/suggestionsAPI');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
// app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(compression());
// app.use(minify());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/weather', apiWeatherRouter);
app.use('/api/suggestions', apiSuggestionsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
