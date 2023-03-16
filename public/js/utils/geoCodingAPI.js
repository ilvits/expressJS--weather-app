function getUserLocation() {
	getLocationPlaceholder.classList.add("opacity-0");
	setTimeout(() => {
		getLocationPlaceholder.classList.add("hidden");
	}, 400);
	locations_backdrop.classList.add("z-[5]");
	showLoadingAnimation();
	const options = {
		enableHighAccuracy: true,
		timeout: 10000,
	};

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			showPosition,
			showError,
			options
		);
	} else {
		x = "Geolocation is not supported by this browser.";
	}
}

function showPosition(position, isUserLocation = true) {
	console.log(position);
	var query = position.coords.longitude + "," + position.coords.latitude;
	primaryToken =
		"pk.eyJ1IjoiaWx2aXRzIiwiYSI6ImNsZGViNGowNDBibDAzb3E3cWQ5OThrc20ifQ.0ZyvQ-0dE8CqherBbekJIA";
	backupKey = "";
	const options = {
		method: "GET",
		headers: { Accept: "application/json", "Accept-Encoding": "gzip" },
	};
	const baseurl = `https://api.mapbox.com/geocoding/v5/mapbox.places/`;
	const params = {
		// limit: '10',
		language: "ru",
		types: "place",
		// autocomplete: 'true',
		// routing: 'false',
		worldview: "ru",
		access_token: primaryToken,
	};
	let paramsArray = [];
	Object.entries(params).forEach(([key, value]) => {
		v = Array.isArray(value) ? value.join(",") : value;
		paramsArray.push([key, v].join("="));
	});

	url = baseurl + `${query}.json?` + paramsArray.join("&");
	getLocationPlaceholder.classList.add("opacity-0");
	setTimeout(() => {
		getLocationPlaceholder.classList.add("hidden");
	}, 400);
	locations_backdrop.classList.add("z-[5]");
	showLoadingAnimation();
	if (position) {
		request(url, options).then((geoLocation) =>
			previewWeather(geoLocation.features[0], isUserLocation)
		);
	} else {
		console.log("No coordinates :(");
	}
}

function getGeoData(event) {
	suggestionList.innerHTML = "";

	const regex = /^[a-zA-ZАА-Яа-яёЁ.,\d\-_\s]+$/i;
	const str = event.target.value.trim();

	if (regex.exec(str) !== null) {
		if (str.length > 1) {
			setTimeout(() => {
				// console.log(str, event.target.value);
				// console.log(str === event.target.value);
				if (str === event.target.value) {
					getSuggestions(str);
				}
			}, 600);
		} else {
			console.log("недостаточно символов");
			// document.querySelector('#suggestion-list').innerText = 'недостаточно символов'
		}
	}
	// else {
	//     console.log('Недопустимые символы')
	//     // document.querySelector('#suggestion-list').innerText = 'Недопустимые символы'
	// }
}

function getSuggestions(str) {
	// console.log(str);
	var query = str;
	primaryToken =
		"pk.eyJ1IjoiaWx2aXRzIiwiYSI6ImNsZGViNGowNDBibDAzb3E3cWQ5OThrc20ifQ.0ZyvQ-0dE8CqherBbekJIA";
	backupKey = "";
	const options = {
		method: "GET",
		headers: { Accept: "application/json", "Accept-Encoding": "gzip" },
	};
	const baseurl = `https://api.mapbox.com/geocoding/v5/mapbox.places/`;
	const params = {
		limit: "10",
		language: "ru",
		types: "place",
		autocomplete: "true",
		// routing: 'false',
		worldview: "ru",
		access_token: primaryToken,
	};
	let paramsArray = [];
	Object.entries(params).forEach(([key, value]) => {
		v = Array.isArray(value) ? value.join(",") : value;
		paramsArray.push([key, v].join("="));
	});

	url = baseurl + `${query}.json?` + paramsArray.join("&");

	request(url, options)
		.then((jsonResponse) => parseSuggestions(jsonResponse.features, str))
		// .then(jsonResponse => console.table(jsonResponse.features))
		.catch((error) => console.log("error", error));
}

function parseSuggestions(features, searchText) {
	const nothing_found = document.querySelector(
		"#search-user-location--not-found"
	);
	nothing_found.classList.remove("hidden");
	setTimeout(() => {
		nothing_found.classList.remove("opacity-0");
	}, 100);
	suggestionList.innerHTML = "";
	// console.table(features)
	if (features.length == 0) {
		console.log("Nothing");
	} else {
		// console.table(features)
		nothing_found.classList.add("hidden", "opacity-0");
		suggestionList.classList.remove("invisible", "opacity-0");
		for (const value of Object.values(features)) {
			let position = {
				coords: {
					longitude: value.geometry.coordinates[0],
					latitude: value.geometry.coordinates[1],
				},
			};
			// let action = `showPosition()`
			// if (value.data.fias_level === "65") {
			//     delete (features[key]);
			//     features.length -= 1;
			// } else {
			let id = value.id.split(".")[1];
			let name = value.text_ru;
			let countryCode =
				value.context[
					value.context.findIndex((item) =>
						item.id.includes("country")
					)
				].short_code;
			let region;
			if (
				value.context.findIndex((item) =>
					item.id.includes("region")
				) !== -1
			) {
				region =
					value.context[
						value.context.findIndex((item) =>
							item.id.includes("region")
						)
					].text;
			}
			context__country_id = value.context.findIndex((item) =>
				item.id.includes("country")
			);
			let country = value.context[context__country_id].text;
			let capText = searchText[0].toUpperCase() + searchText.slice(1);
			let locationLi = document.createElement("li");
			locationLi.onclick = () => showPosition(position, false);
			if (
				typeof locations !== "undefined" &&
				Object.values(locations).findIndex((item) => item.id == id) !=
					-1
			) {
				action = "";
				locationLi.classList.add(
					"flex",
					"pointer-events-none",
					"text-gray-300",
					"pr-2",
					"truncate"
				);
				text = `${name}${region ? ", " + region : ""}${
					countryCode !== userCountry ? ", " + country : ""
				}`;
			} else {
				// action = action;
				locationLi.classList.add("flex", "pr-2", "truncate");
				text = `${name.replace(
					capText,
					`<div class="text-primary-light dark:text-primary-dark">${capText}</div>`
				)}<div class="text-gray-300 dark:text-cosmic-500">${
					region ? ", " + region : ""
				}${countryCode !== userCountry ? ", " + country : ""}</div>`;
			}
			locationLi.innerHTML = text;
			suggestionList.appendChild(locationLi);
		}
	}
}
