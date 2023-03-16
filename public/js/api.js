async function getWeather(id, lat, lon) {
	try {
		axios({
			url: "/api/weather",
			method: "get",
			params: {
				lat,
				lon,
				lang: language,
			},
		})
			.then((response) => parseWeatherData(Number(id), response.data))
			.then((weatherData) => {
				return weatherData;
			});
	} catch (err) {
		console.warn({ message: err });
	}
}

function parseWeatherData(id, data) {
	const delta =
		data.currentConditions.sunsetEpoch -
		data.currentConditions.sunriseEpoch;
	const timezone = data.tzoffset;
	const sunrise = moment
		.unix(data.currentConditions.sunriseEpoch)
		.utcOffset(timezone)
		.locale(lang)
		.format("HH:mm");
	const sunset = moment
		.unix(data.currentConditions.sunsetEpoch)
		.utcOffset(timezone)
		.locale(lang)
		.format("HH:mm");
	const dayLight = moment
		.unix(delta)
		.utc()
		.locale(lang)
		.format(
			`HH [${languageStrings[language].datetime.hourShort}] mm [${languageStrings[language].datetime.minShort}]`
		);

	const weatherData = {
		id: id,
		coordinates: {
			latitude: data.latitude,
			longitude: data.longitude,
		},
		timezone: timezone,
		currentConditions: {
			temp: Math.round(data.currentConditions.temp),
			tempmax: Math.round(data.days[0].tempmax),
			tempmin: Math.round(data.days[0].tempmin),
			feelslike: Math.round(data.currentConditions.feelslike),
			conditions: data.currentConditions.conditions,
			sunrise: sunrise,
			sunset: sunset,
			daylight: dayLight,
			// moonphase: data.currentConditions.moonphase,
			sunposition: sunPositionDegree(
				data.currentConditions.sunriseEpoch,
				data.currentConditions.sunsetEpoch,
				moment().unix()
			),
			humidity: Math.round(data.currentConditions.humidity),
			pressure: Math.round(data.currentConditions.pressure),
			windspeed: Math.round(data.currentConditions.windspeed),
			winddir: Math.round(data.currentConditions.winddir),
			windgust: Math.round(data.currentConditions.windgust),
			precipitation: Math.round(data.currentConditions.precipprob),
			icon: data.currentConditions.icon,
		},
		days: data.days,
	};
	const icon = weatherData.currentConditions.icon;
	weatherData.currentConditions.icon =
		"img/assets/icons/weather-conditions/" + icon + ".svg";
	weatherData.currentConditions.smallicon =
		"img/assets/icons/weather-conditions/small/" + icon + ".svg";

	weatherData.days.forEach((day, i) => {
		const icon = day.icon;
		day.icon = "img/assets/icons/weather-conditions/" + icon + ".svg";
		day.smallicon =
			"img/assets/icons/weather-conditions/small/" + icon + ".svg";
		const delta = day.sunsetEpoch - day.sunriseEpoch;
		day.daylight = moment
			.unix(delta)
			.utc()
			.locale(lang)
			.format(
				`HH [${languageStrings[language].datetime.hourShort}] mm [${languageStrings[language].datetime.minShort}]`
			);
		day.sunrise = moment
			.unix(day.sunriseEpoch)
			.utcOffset(timezone)
			.locale(lang)
			.format("HH:mm");
		day.sunset = moment
			.unix(day.sunsetEpoch)
			.utcOffset(timezone)
			.locale(lang)
			.format("HH:mm");
		if (i === 0) {
			day.sunposition = sunPositionDegree(
				data.currentConditions.sunriseEpoch,
				data.currentConditions.sunsetEpoch,
				moment().unix()
			);
		}
		if (i < 16) {
			hours = day.hours;
			hours.forEach((hour) => {
				const icon = hour.icon;
				hour.icon =
					"img/assets/icons/weather-conditions/" + icon + ".svg";
				hour.smallicon =
					"img/assets/icons/weather-conditions/small/" +
					icon +
					".svg";
			});
			day.hours[i] = hours[i];
		}
	});
	saveWeatherData(id, weatherData);
}

async function getSuggestions(query) {
	try {
		const response = await axios({
			url: "/api/suggestions",
			method: "get",
			params: {
				string: query,
				lang: language,
			},
		});
		const { data } = response;
		parseSuggestions(data.features, query);
		return await data;
	} catch (err) {
		console.warn({ message: err });
	}
}

function saveWeatherData(id, weatherData) {
	localStorage.setItem("weatherData-" + id, JSON.stringify(weatherData));
	window.dispatchEvent(
		new CustomEvent("weatherSaved", {
			detail: {
				id,
				weatherData,
			},
		})
	);
}

// WeatherData = getWeather().then(weatherData => console.table(weatherData.products))
