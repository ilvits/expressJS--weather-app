'use strict';

async function getWeather(
    location,
    isPreview = false,
    geoPositionUpdate = false
) {
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
        .then(response =>
            parseWeatherData(
                location,
                response.data,
                isPreview,
                geoPositionUpdate
            )
        )
        .catch(error => {
            if (error.code === 'ERR_NETWORK') {
                const message = languageStrings[language].errors.network;
                window.dispatchEvent(
                    new CustomEvent('toast', {
                        detail: {
                            type: 'warning',
                            data: 'weather',
                            content: message,
                            duration: 10000,
                        },
                    })
                );
            }
        });
}

function parseWeatherData(location, data, isPreview, geoPositionUpdate) {
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
    const daylight = moment
        .unix(delta)
        .utc()
        .locale(language)
        .format(
            `HH [${languageStrings[language].datetime.hourShort}] mm [${languageStrings[language].datetime.minShort}]`
        );

    let weatherData = {
        id,
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
            uvindex: data.currentConditions.uvindex,
            feelslike: data.currentConditions.feelslike,
            conditions: data.currentConditions.conditions,
            sunrise,
            sunset,
            daylight,
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
                    id,
                    location,
                    weatherData,
                },
            })
        );
    }
    saveWeatherData(id, weatherData, geoPositionUpdate);
}

function saveWeatherData(id, weatherData, geoPositionUpdate) {
    // console.log('geoPositionUpdate', geoPositionUpdate);
    localStorage.setItem('weatherData-' + id, JSON.stringify(weatherData));
    window.dispatchEvent(
        new CustomEvent('weatherSaved', {
            detail: {
                data: {
                    id,
                    weatherData,
                },
                geoPositionUpdate,
            },
        })
    );
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

async function updateAdress(position) {
    axios({
        url: '/api/resolveadress',
        method: 'get',
        params: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            lang: language,
        },
    })
        .then(response =>
            updateUserLocation(response.data.features, '', false, true)
        )
        .then(response => {
            return response;
        })
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

async function resolveAdress(position, update) {
    axios({
        url: '/api/resolveadress',
        method: 'get',
        params: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            lang: language,
        },
    })
        .then(response =>
            update
                ? parseUserAdress(response.data.features[0], update)
                : parseSuggestions(response.data.features, '', true)
        )
        .catch(error => {
            console.warn({ message: error });
            window.dispatchEvent(
                new CustomEvent('toast', {
                    detail: {
                        type: 'error',
                        content: error.message,
                        duration: 10000,
                    },
                })
            );
        });
}

const parseUserAdress = (feature, update) => {
    console.log(feature);
    const id = Number(feature.id.split('.')[1]);
    const name = feature.text;
    const countryCode =
        feature.context[
            feature.context.findIndex(item => item.id.includes('country'))
        ].short_code;
    let region;
    if (feature.context.findIndex(item => item.id.includes('region')) !== -1) {
        region =
            feature.context[
                feature.context.findIndex(item => item.id.includes('region'))
            ].text;
    }

    const contextCountryId = feature.context.findIndex(item =>
        item.id.includes('country')
    );
    const country = feature.context[contextCountryId].text;
    const position = {
        coords: {
            longitude: feature.geometry.coordinates[0],
            latitude: feature.geometry.coordinates[1],
        },
    };
    const data = {
        detail: {
            data: {
                id,
                name,
                originalName: name,
                country,
                region,
                countryCode,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                isUserLocation: 'true',
            },
            geoPositionUpdate: update,
        },
    };
    updateLocation(data, update);
    getWeather(data.detail.data, false, update);
};
