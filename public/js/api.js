async function getWeather(lat, lon) {
    try {
        const response = await axios({
            url: "/api/weather",
            method: "get",
            params: {
                lat: 41,
                lon: 41
            }
        })
        data = response.data
        saveWeatherData(data)
        return await data;
    } catch (err) {
        console.warn({ message: err })
    }
}

async function getSuggestions(query) {
    try {
        const response = await axios({
            url: "/api/suggestions",
            method: "get",
            params: {
                string: query,
            }
        })
        data = response.data
        parseSuggestions(data.features, query)
        return await data;
    } catch (err) {
        console.warn({ message: err })
    }
}

function saveWeatherData(weatherData) {
    localStorage.setItem('weatherData', JSON.stringify(weatherData))
}

// weatherData = getWeather().then(weatherData => console.table(weatherData.products))