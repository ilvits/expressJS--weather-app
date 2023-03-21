const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
// const minify = require('express-minify');
// const compression = require("compression");
const express = require("express");
// const cors = require('cors');
const bodyParser = require("body-parser");
// Const helmet = require('helmet');

require("dotenv").config();

const indexRouter = require("./routes/index");
const apiWeatherRouter = require("./routes/API/weatherAPI");
const apiSuggestionsRouter = require("./routes/API/suggestionsAPI");
const apiResolveRouter = require("./routes/API/resolveadressAPI");

const app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app.use(cors());
// App.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(compression());
// app.use(minify());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/weather", apiWeatherRouter);
app.use("/api/suggestions", apiSuggestionsRouter);
app.use("/api/resolveadress", apiResolveRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// Error handler
app.use((err, req, res) => {
	// Set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// Render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
