function getWeatherDataFromAPI(id, lat, lon, preview = false) {
    timeOffset = new Date().getTimezoneOffset() / 60
    let weatherData = localStorage.getItem(`weatherData-${id}`);
    let date = localStorage.getItem(`weatherData-${id}-lastUpdate`)
    timeDelta = Math.round((new Date().getTime() - new Date(date).getTime()) / 1000)

    if (weatherData && timeDelta < 36000) {
        if (preview) {
            generatePreview(locationPreviewData, JSON.parse(weatherData), true)
        }
    } else {
        console.log('get weatherData from API')
        primaryKey = '6M44EU7ZDRK49GFJHKBCX2JJC'
        backupKey = '6G659YZGHYJQJQYGA99FJZDMK'
        const options = {
            method: 'GET',
            headers: { Accept: 'application/json', 'Accept-Encoding': 'gzip' }
        };
        const baseurl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline`
        const params = {
            unitGroup: 'metric',
            key: '6G659YZGHYJQJQYGA99FJZDMK',
            elements: [
                'datetime', 'datetimeEpoch', 'description', 'conditions', 'icon',
                'name', 'address', 'resolvedAddress',
                'temp', 'tempmax', 'tempmin', 'feelslike', 'humidity',
                'pressure', 'precipprob', 'preciptype',
                'windspeed', 'winddir', 'windgust', 'severerisk',
                'sunriseEpoch', 'sunsetEpoch'
            ],
            include: ['days', 'hours', 'current', 'alerts', 'events'],
            contentType: 'json',
            lang: 'ru'
        }
        let paramsArray = []
        Object.entries(params).forEach(([key, value]) => {
            // console.log(key, value)
            v = Array.isArray(value) ? value.join(',') : value
            paramsArray.push([key, v].join('='))
        });

        url = baseurl + `/${lat}%2C${lon}/next30days?` + paramsArray.join('&')

        request(url, options)
            .then(weatherData => {
                saveWeatherData(id, weatherData);
                if (preview) {
                    hideLoadingAnimation()
                    setTimeout(() => {
                        locations_backdrop.classList.remove('z-[5]')
                    }, 500);
                    generatePreview(locationPreviewData, weatherData, true)
                }
            })
    }
}

function saveWeatherData(id, weatherData) {
    // console.table(weatherData.currentConditions)
    // console.warn(weatherData.alerts || '')
    date = new Date()
    localStorage.setItem(`weatherData-${id}-lastUpdate`, date);
    localStorage.setItem(`weatherData-${id}`, JSON.stringify(weatherData));
}