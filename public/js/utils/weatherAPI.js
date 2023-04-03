/* eslint-disable no-unused-vars */
'use strict';

function getWeatherDataFromAPI(id, lat, lon, preview = false) {
    // Const timeOffset = new Date().getTimezoneOffset() / 60;
    const weatherData = localStorage.getItem(`weatherData-${id}`);
    const date = localStorage.getItem(`weatherData-${id}-lastUpdate`);
    const timeDelta = Math.round(
        (new Date().getTime() - new Date(date).getTime()) / 1000
    );

    if (weatherData && timeDelta < 00) {
        if (preview) {
            generatePreview(locationPreviewData, JSON.parse(weatherData), true);
        }
    } else {
        console.log('get weatherData from API');
        const primaryKey = '6M44EU7ZDRK49GFJHKBCX2JJC';
        // BackupKey = '6G659YZGHYJQJQYGA99FJZDMK';
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Accept-Encoding': 'gzip',
            },
        };
        const baseurl =
            'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';
        const params = {
            unitGroup: 'metric',
            key: primaryKey,
            elements: [
                'datetime',
                'datetimeEpoch',
                'description',
                'conditions',
                'icon',
                'name',
                'address',
                'resolvedAddress',
                'temp',
                'tempmax',
                'tempmin',
                'feelslike',
                'humidity',
                'pressure',
                'precipprob',
                'preciptype',
                'windspeed',
                'winddir',
                'windgust',
                'severerisk',
                'sunriseEpoch',
                'sunsetEpoch',
            ],
            include: ['days', 'hours', 'current', 'alerts', 'events'],
            contentType: 'json',
            lang: 'ru',
        };
        const paramsArray = [];
        Object.entries(params).forEach(([key, value]) => {
            // Console.log(key, value)
            const v = Array.isArray(value) ? value.join(',') : value;
            paramsArray.push([key, v].join('='));
        });

        const url =
            baseurl + `/${lat}%2C${lon}/next30days?` + paramsArray.join('&');
        let i = Math.trunc(Math.random() * 3);
        fetch(`testResponseData/weatherData${i}.json`)
            .then(response => response.json())
            .then(weatherData => saveWeatherData(id, weatherData));
        // request(url, options).then(weatherData => {
        //     saveWeatherData(id, weatherData);
        //     if (preview) {
        //         hideLoadingAnimation();
        //         setTimeout(() => {
        //             locationsBackdrop.classList.remove('z-[5]');
        //         }, 500);
        //         generatePreview(locationPreviewData, weatherData, true);
        //     }
        // });
    }
}

function saveWeatherData(id, weatherData) {
    // Console.table(weatherData.currentConditions)
    // console.warn(weatherData.alerts || '')
    const date = new Date();
    localStorage.setItem(`weatherData-${id}-lastUpdate`, date);
    localStorage.setItem(`weatherData-${id}`, JSON.stringify(weatherData));
}
