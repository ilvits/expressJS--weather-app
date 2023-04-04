'use strict';

async function getWeather(location, isPreview = false) {
    const lat = location.latitude;
    const lon = location.longitude;
    console.log('trying to update...');
    axios({
        url: '/api/weather',
        method: 'get',
        params: {
            lat,
            lon,
            lang: language,
        },
    })
        .then(response => parseWeatherData(location, response.data, isPreview))
        .catch(error => {
            if (error.code === 'ERR_NETWORK') {
                const message = languageStrings[language].errors.network;
                window.dispatchEvent(
                    new CustomEvent('toast', {
                        detail: {
                            type: 'error',
                            data: 'weather',
                            content: message,
                            duration: 10000,
                        },
                    })
                );
            }
        });
}

function parseWeatherData(location, data, isPreview) {
    // console.log(data);
    const id = Number(location.id);
    const delta =
        data.currentConditions.sunsetEpoch -
        data.currentConditions.sunriseEpoch;
    const timezone = data.tzoffset;
    const sunrise = moment
        .unix(data.currentConditions.sunriseEpoch)
        .utcOffset(timezone)
        .locale(language)
        .format('HH:mm');
    const sunset = moment
        .unix(data.currentConditions.sunsetEpoch)
        .utcOffset(timezone)
        .locale(language)
        .format('HH:mm');
    const dayLight = moment
        .unix(delta)
        .utc()
        .locale(language)
        .format(
            `HH [${languageStrings[language].datetime.hourShort}] mm [${languageStrings[language].datetime.minShort}]`
        );

    let weatherData = {
        id: id,
        lastUpdateEpoch: moment().unix(),
        raw: data,
        coordinates: {
            latitude: data.latitude,
            longitude: data.longitude,
        },
        timezone: timezone,
        currentConditions: {
            temp: data.currentConditions.temp,
            tempmax: data.days[0].tempmax,
            tempmin: data.days[0].tempmin,
            feelslike: data.currentConditions.feelslike,
            conditions: data.currentConditions.conditions,
            sunrise: sunrise,
            sunset: sunset,
            daylight: dayLight,
            moonphase: data.currentConditions.moonphase,
            sunposition: sunPositionDegree(
                data.currentConditions.sunriseEpoch,
                data.currentConditions.sunsetEpoch,
                moment().unix()
            ),
            pressure: data.currentConditions.pressure,
            windspeed: data.currentConditions.windspeed,
            winddir: data.currentConditions.winddir,
            windgust: data.currentConditions.windgust,
            humidity: Math.round(data.currentConditions.humidity),
            precipprob: Math.round(data.currentConditions.precipprob),
            icon: data.currentConditions.icon,
        },
        days: data.days,
    };

    weatherData.days.forEach(day => {
        const delta = day.sunsetEpoch - day.sunriseEpoch;
        day.daylight = moment
            .unix(delta)
            .utc()
            .locale(language)
            .format(
                `HH [${languageStrings[language].datetime.hourShort}] mm [${languageStrings[language].datetime.minShort}]`
            );
        day.sunrise = moment
            .unix(day.sunriseEpoch)
            .utcOffset(timezone)
            .locale(language)
            .format('HH:mm');
        day.sunset = moment
            .unix(day.sunsetEpoch)
            .utcOffset(timezone)
            .locale(language)
            .format('HH:mm');
    });
    console.log('isPreview', isPreview);
    if (isPreview) {
        // console.log('weather', weatherData);
        window.dispatchEvent(
            new CustomEvent('addnewslide', {
                detail: {
                    id: id,
                    location,
                    weatherData,
                },
            })
        );
        saveWeatherData(id, weatherData);
    } else {
        saveWeatherData(id, weatherData);
    }
}

function saveWeatherData(id, weatherData) {
    localStorage.setItem('weatherData-' + id, JSON.stringify(weatherData));
    window.dispatchEvent(
        new CustomEvent('weatherSaved', {
            detail: {
                id,
                weatherData,
            },
        })
    );
    return weatherData;
}

async function getSuggestions(query) {
    axios({
        url: '/api/suggestions',
        method: 'get',
        params: {
            string: query,
            lang: language,
        },
    })
        .then(response => parseSuggestions(response.data.features, query))
        .catch(error => {
            if (error.code === 'ERR_NETWORK') {
                const message = languageStrings[language].errors.network;
                window.dispatchEvent(
                    new CustomEvent('toast', {
                        detail: {
                            type: 'error',
                            data: 'weather',
                            content: message,
                            duration: 10000,
                        },
                    })
                );
            }
        });
}

async function resolveAdress(position) {
    try {
        const response = await axios({
            url: '/api/resolveadress',
            method: 'get',
            params: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                lang: language,
            },
        });
        const { data } = response;
        parseSuggestions(data.features, '', true);
        return await data;
    } catch (err) {
        console.warn({ message: err });
        window.dispatchEvent(
            new CustomEvent('toast', {
                detail: {
                    type: 'error',
                    content: err,
                    duration: 10000,
                },
            })
        );
    }
}
