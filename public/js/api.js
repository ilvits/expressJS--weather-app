'use strict';

async function getWeather(
    location,
    isPreview = false,
    geoPositionUpdate = false
) {
    const lat = location.latitude;
    const lon = location.longitude;
    // console.log('trying to update...');
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
            temp: tempConverter(data.currentConditions.temp),
            tempmax: tempConverter(data.days[0].tempmax),
            tempmin: tempConverter(data.days[0].tempmin),
            feelslike: tempConverter(data.currentConditions.feelslike),
            pressure: pressureConverter(data.currentConditions.pressure),
            windspeed: windConverter(data.currentConditions.windspeed),
            windgust: windConverter(data.currentConditions.windgust),
            precipprob: Math.round(data.currentConditions.precipprob),
            humidity: Math.round(data.currentConditions.humidity),
            winddir: data.currentConditions.winddir,
            uvindex: data.currentConditions.uvindex,
            conditions: data.currentConditions.conditions,
            sunrise,
            sunset,
            daylight,
            moonphase: data.currentConditions.moonphase,
            icon: data.currentConditions.icon,
            sunposition: sunPositionDegree(
                data.currentConditions.sunriseEpoch,
                data.currentConditions.sunsetEpoch,
                moment().unix()
            ),
        },
        days: data.days,
    };

    weatherData.days.forEach(day => {
        day.temp = tempConverter(day.temp);
        day.tempmax = tempConverter(day.tempmax);
        day.tempmin = tempConverter(day.tempmin);
        day.feelslike = tempConverter(day.feelslike);
        day.pressure = pressureConverter(day.pressure);
        day.windspeed = windConverter(day.windspeed);
        day.windgust = windConverter(day.windgust);
        day.humidity = Math.round(day.humidity);
        day.precipprob = Math.round(day.precipprob);

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
        day.hours.forEach(hour => {
            hour.temp = tempConverter(hour.temp);
            hour.humidity = Math.round(hour.humidity);
            hour.precipprob = Math.round(hour.precipprob);
            hour.windspeed = windConverter(hour.windspeed);
            hour.windgust = windConverter(hour.windgust);
            hour.feelslike = tempConverter(hour.feelslike);
            hour.pressure = pressureConverter(hour.pressure);
        });
    });
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

function parseSuggestions(
    features,
    searchText,
    isUserLocation = false,
    update = false
) {
    const suggestionList = document.querySelector('.suggestions-list');
    const searchInput = document.querySelector('#searchInput');
    const nothingFound = document.querySelector(
        '#search-user-location--not-found'
    );
    suggestionList.innerHTML = '';
    const f = [];
    features.forEach(el => {
        f.push({
            id: Number(el.id.split('.')[1]),
            name: el.text,
        });
    });

    if (features.length === 0) {
        // console.log("Nothing found");
        nothingFound.classList.remove('hidden');
        setTimeout(() => {
            nothingFound.classList.remove('opacity-0');
        }, 100);
    } else {
        nothingFound.classList.add('hidden', 'opacity-0');
        suggestionList.classList.remove('invisible', 'opacity-0');
        for (const feature of Object.values(features)) {
            const position = {
                coords: {
                    longitude: feature.geometry.coordinates[0],
                    latitude: feature.geometry.coordinates[1],
                },
            };
            const id = Number(feature.id.split('.')[1]);
            const name = feature.text;
            const countryCode =
                feature.context[
                    feature.context.findIndex(item =>
                        item.id.includes('country')
                    )
                ].short_code;
            let region;
            if (
                feature.context.findIndex(item =>
                    item.id.includes('region')
                ) !== -1
            ) {
                region =
                    feature.context[
                        feature.context.findIndex(item =>
                            item.id.includes('region')
                        )
                    ].text;
            }

            let text;
            const contextCountryId = feature.context.findIndex(item =>
                item.id.includes('country')
            );
            const country = feature.context[contextCountryId].text;

            if (isUserLocation) {
                window.dispatchEvent(
                    new CustomEvent('addpopup3', {
                        detail: {
                            id: id,
                            name: name,
                            country: country,
                            region: region,
                            countryCode: countryCode,
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            isUserLocation: 'true',
                        },
                    })
                );
            } else if (update) {
                const location = {
                    id: id,
                    name: name,
                    country: country,
                    region: region,
                    countryCode: countryCode,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    isUserLocation: 'true',
                };
            } else {
                searchText = capitalize(searchText);
                // console.log(searchText);
                const locationLi = document.createElement('li');
                locationLi.onclick = () =>
                    window.dispatchEvent(
                        new CustomEvent('addpopup3', {
                            detail: {
                                id: id,
                                name: name,
                                country: country,
                                region: region,
                                countryCode: countryCode,
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                                isUserLocation: 'false',
                            },
                        })
                    );
                if (
                    typeof locations !== 'undefined' &&
                    locations.findIndex(item => item.id === id) === -1
                ) {
                    locationLi.classList.add('flex', 'pr-2', 'whitespace-pre');
                    text = `${name.replace(
                        searchText,
                        `<div class="text-primary-light dark:text-primary-dark">${searchText}</div>`
                    )}<div class="text-gray-300 dark:text-cosmic-500 truncate">${
                        region ? ', ' + region : ''
                    }${
                        countryCode === userCountry ? '' : ', ' + country
                    }</div>`;
                } else {
                    locationLi.classList.add(
                        'flex',
                        'pointer-events-none',
                        'text-gray-300',
                        'pr-2',
                        'truncate'
                    );
                    text = `${name}${region ? ', ' + region : ''}${
                        countryCode === userCountry ? '' : ', ' + country
                    }`;
                }

                locationLi.innerHTML = text;
                if (searchInput.value.length > 0) {
                    suggestionList.appendChild(locationLi);
                } else {
                    suggestionList.innerHTML = '';
                }
            }
        }
    }
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
