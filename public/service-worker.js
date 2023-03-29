// !Delete previous Cache

addEventListener("activate", (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => caches.delete(cacheName))
			);
		})
	);
});

// !Add files to Cache
const precacheName = "weather-website";
const precacheFiles = [
	"/css/style.css",
	"/css/splidejs/splide.min.css",
	// "/css/splidejs/splide-core.min.css",
	"js/i18n.js",
	"js/init.js",
	"js/utils/theme.js",
	"js/alpine/timeout.min.js",
	"js/alpine/moment.min.js",
	"js/moment/moment.min.js",
	"js/moment/locales/ru.min.js",
	"js/alpine/i18n.min.js",
	"js/axios/axios.min.js",
	"js/splide/splide.min.js",
	"js/alpine/alpine.min.js",
	"js/api.js",
	"js/slip/slip.min.js",
	"js/script.js",
	// "/offline.html",
];

addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(precacheName).then((cache) => cache.addAll(precacheFiles))
	);
});
