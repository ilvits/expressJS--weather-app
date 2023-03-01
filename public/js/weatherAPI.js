async function getWeather() {
    let response = await fetch('/api/weather/')
    let json = await response.json()
    return json
}


function getWeatherAxios() {
    axios
        .post("/api/weather/", {
            id: 11,
            name: "Tom Brady",
            username: "Brad",
            email: "tombrad@asd.com",
        })
        .then((response) => console.table(JSON.parse(response.data)))
        .catch((err) => console.log(err));
}

