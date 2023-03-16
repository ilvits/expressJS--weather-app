let userCountry = "Unknown";
let locTemplate = [
	{
		id: 894030,
		name: "Париж",
		originalName: "Париж",
		nameTranslit: "Parizh",
		latitude: 48.8534951,
		longitude: 2.3483915,
		countryCode: "fr",
		country: "Франция",
		isUserLocation: "true",
	},
	{
		id: 233720044,
		name: "Нью-Йорк",
		originalName: "Нью-Йорк",
		nameTranslit: "Nyu-York",
		latitude: 40.7306,
		longitude: -73.9866,
		countryCode: "us",
		country: "США",
		isUserLocation: "false",
	},
	{
		id: 26970193,
		name: "Кобулети",
		originalName: "Кобулети",
		nameTranslit: "Kobuleti",
		latitude: 41.811360153,
		longitude: 41.779320175,
		countryCode: "ge",
		country: "Грузия",
		isUserLocation: "false",
	},
	{
		id: 894029,
		name: "Париж",
		originalName: "Париж",
		nameTranslit: "Parizh",
		latitude: 48.8534951,
		longitude: 2.3483915,
		countryCode: "fr",
		country: "Франция",
		isUserLocation: "false",
	},
	{
		id: 99109058,
		name: "Парижскокоммунское",
		originalName: "Парижскокоммунское",
		nameTranslit: "Parizhskokommunskoe",
		latitude: 51.798212,
		longitude: 39.635739,
		countryCode: "ru",
		country: "Россия",
		isUserLocation: "false",
	},
];
localStorage.locations = JSON.stringify(locTemplate);
let locations = JSON.parse(localStorage.getItem("locations"));

let settings = initSettings();
let language = settings.lang === true ? "en" : "ru";

function initSettings() {
	const settings = JSON.parse(localStorage.getItem("settings")) || {
		temp: false,
		wind: false,
		pressure: false,
		lang: false,
		details: false,
		theme: 2,
	};
	localStorage.setItem("settings", JSON.stringify(settings));
	return settings;
}

function updateSettings(item, value) {
	settings[item] = value;
	localStorage.setItem("settings", JSON.stringify(settings));
}
