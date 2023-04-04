'use strict';
const active_slide = localStorage.activeSlide || 0;
const splide = new Splide('#main', {
    // type: 'slide',
    pagination: locations.length > 1 ? true : false,
    speed: 700,
    height: 'calc(100%)',
    // autoHeight: true,
    perPage: 1,
    // perMove: 1,
    start: active_slide || 0,
    gap: '3rem',
    arrows: false,
    easing: 'cubic-bezier(.23,1,.32,1)',
    noDrag: 'input, textarea, .no-drag',
    classes: {
        page: 'bg-primary-light/30 dark:bg-primary-dark/40 h-1.5 w-1.5 [&.is-active]:bg-primary-light dark:[&.is-active]:bg-primary-dark rounded-full',
    },
});
document.body.style.webkitTouchCallout = 'none';
const locationCardsContainer = document.querySelector(
    '#location-cards--container'
);

let splide2;
let updateInterval;
const moonPhaseIconsPath = 'img/assets/icons/moonphases/';
const weatherIconsPath = 'img/assets/icons/weather-conditions/';
const weatherIconsSmallPath = 'img/assets/icons/weather-conditions/small/';

const moonPhaseIcons = {
    new: 'new.svg',
    waxingcrescent: 'waxingcrescent.svg',
    firstquarter: 'firstquarter.svg',
    waxinggibbous: 'waxinggibbous.svg',
    fullmoon: 'fullmoon.svg',
    waninggibbous: 'waninggibbous.svg',
    lastquarter: 'lastquarter.svg',
    waningcrescent: 'waningcrescent.svg',
};

const weatherIcons = {
    'clear-day': 'clear-day.svg',
    'clear-night': 'clear-night.svg',
    'cloudy': 'cloudy.svg',
    'cloudy-night': 'cloudy-night.svg',
    'wind': 'wind.svg',
    'wind-night': 'wind-night.svg',
    'fog': 'fog.svg',
    'fog-night': 'fog-night.svg',
    'hail': 'hail.svg',
    'hail-night': 'hail-night.svg',
    'partly-cloudy-day': 'partly-cloudy-day.svg',
    'partly-cloudy-night': 'partly-cloudy-night.svg',
    'rain': 'rain.svg',
    'rain-night': 'rain-night.svg',
    'rain-snow': 'rain-snow.svg',
    'rain-snow-night': 'rain-snow-night.svg',
    'rain-snow-showers-day': 'rain-snow-showers-day.svg',
    'rain-snow-showers-night': 'rain-snow-showers-night.svg',
    'showers-day': 'showers-day.svg',
    'showers-night': 'showers-night.svg',
    'sleet': 'sleet.svg',
    'sleet-night': 'sleet-night.svg',
    'snow': 'snow.svg',
    'snow-night': 'snow-night.svg',
    'snow-showers-day': 'snow-showers-day.svg',
    'snow-showers-night': 'snow-showers-night.svg',
    'thunder': 'thunder.svg',
    'thunder-night': 'thunder-night.svg',
    'thunder-rain': 'thunder-rain.svg',
    'thunder-rain-night': 'thunder-rain-night.svg',
    'thunder-showers-day': 'thunder-showers-day.svg',
    'thunder-showers-night': 'thunder-showers-night.svg',
};

const svgCheck =
    '<svg class="stroke-primary-light dark:stroke-primary-dark" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.66675 8L6.66675 12L13.3334 4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>';
const svgSystemTheme =
    '<svg class="fill-cosmic-900 dark:fill-white" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 5.375C6 4.74511 6.25022 4.14102 6.69562 3.69562C7.14102 3.25022 7.74511 3 8.375 3H15.5C16.1299 3 16.734 3.25022 17.1794 3.69562C17.6248 4.14102 17.875 4.74511 17.875 5.375V19.625C17.875 20.2549 17.6248 20.859 17.1794 21.3044C16.734 21.7498 16.1299 22 15.5 22H8.375C7.74511 22 7.14102 21.7498 6.69562 21.3044C6.25022 20.859 6 20.2549 6 19.625V5.375ZM13.125 18.4375C13.125 18.1226 12.9999 17.8205 12.7772 17.5978C12.5545 17.3751 12.2524 17.25 11.9375 17.25C11.6226 17.25 11.3205 17.3751 11.0978 17.5978C10.8751 17.8205 10.75 18.1226 10.75 18.4375C10.75 18.7524 10.8751 19.0545 11.0978 19.2772C11.3205 19.4999 11.6226 19.625 11.9375 19.625C12.2524 19.625 12.5545 19.4999 12.7772 19.2772C12.9999 19.0545 13.125 18.7524 13.125 18.4375Z" /></svg>';
const svgClearText =
    '<svg class="stroke-gray-300 dark:stroke-cosmic-500 stroke-1.5" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <circle cx="10" cy="10" r="9.25" /><path d="M7 13L10 10M10 10L13 7M10 10L7 7M10 10L13 13" stroke-linecap="round" stroke-linejoin="round" /></svg>';

localStorage.setItem('lastPageUpdate', new Date());

const checkDarkMode = () => document.documentElement.classList.contains('dark');

function checkIcon(iconName, sunrise, sunset, hour) {
    sunrise = Number(sunrise.slice(0, 2));
    sunset = Number(sunset.slice(0, 2));
    // console.log(sunset, sunrise, hour);
    if (
        (hour <= sunrise || hour > sunset) &&
        iconName.search('-night') === -1
    ) {
        if (iconName.search('day') !== -1) {
            iconName = iconName.replace(/day/g, 'night');
        } else {
            iconName = iconName + '-night';
        }
    }
    return iconName;
}

const addSlide = data => {
    window.dispatchEvent(
        new CustomEvent('addslide', {
            detail: data,
        })
    );
};

const addPopup = data => {
    window.dispatchEvent(
        new CustomEvent('addpopup', {
            detail: data,
        })
    );
};

function stopUpdateInterval() {
    clearInterval(updateInterval);
    updateInterval = null;
}

function startUpdateInterval() {
    if (!updateInterval) {
        updateInterval = setInterval(() => {
            updateInfo();
        }, 10000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    startUpdateInterval();
    // Check if the API is supported
    if ('setAppBadge' in navigator) {
        navigator.setAppBadge(2).catch(error => {
            console.log(error);
        });
    }

    splide.on('overflow', function (isOverflow) {
        splide.options = {
            pagination: isOverflow,
            drag: isOverflow,
        };
        if (isOverflow) {
            splide.options.pagination = true;
        } else {
            // Not enough slides
            splide.options.pagination = false;
        }
    });

    splide.on('ready', function (mount) {
        // console.log("*** Splide succesfully mounted ***");
        if (splide.length) {
            // console.log('slides:', splide.length);
            // console.log('pagination', splide.options.pagination);
            splide.options.pagination = true;
        }
    });

    splide.on('moved', function (id) {
        localStorage.activeSlide = id;
    });

    splide.mount();
    if (typeof locations !== 'undefined' && locations.length > 0) {
        locations.forEach(location => {
            const weatherData = localStorage.getItem(
                `weatherData-${location.id}`
            )
                ? JSON.parse(localStorage.getItem(`weatherData-${location.id}`))
                : JSON.parse(getWeather(location));
            addSlide({
                id: Number(location.id),
                location,
                weatherData,
            });
        });

        window.onfocus = () => updateInfo();

        setupSlip(locationCardsContainer);
    }
});

window.addEventListener('weatherSaved', event => {
    console.log('after weather update: ', event.detail);
    const id = event.detail.id;
    const weatherData = event.detail.weatherData;
    localStorage.setItem('lastPageUpdate', new Date());

    window.dispatchEvent(
        new CustomEvent('updateslide', {
            detail: {
                id,
                weatherData,
            },
        })
    );

    setTimeout(() => {
        splide.refresh();
    }, 150);
});

// updateAppData = (value) => window.appData.update(value);

function updateLocation(data) {
    console.log('update Location id:', data.detail.id);
    const id = data.detail.id;
    const index = locations.findIndex(location => Number(location.id) === id);
    for (key in data.detail) {
        locations[index] = { ...locations[index], [key]: data.detail[key] };
    }
    window.dispatchEvent(
        new CustomEvent('updateslide', {
            detail: { id, location: locations[index] },
        })
    );
    window.dispatchEvent(
        new CustomEvent('updatecard', {
            detail: { id, location: locations[index] },
        })
    );
    setTimeout(() => {
        splide.refresh();
    }, 100);
    localStorage.setItem('locations', JSON.stringify(locations));
}

document.addEventListener('alpine:init', () => {
    Alpine.data('main', () => ({
        slides: [],
        atTop: true,
        detailedAtTop: false,
        isLoading: false,
        userLocationLoading: false,
        editedCard: '',
        newLocation: null,
        inputValue: '',
        inputFocus: false,
        searchClearText: false,
        clearText: false,
        settingsChanged: false,
        menuLocations: false,
        menuSettings: false,
        mainBackdrop: false,
        menuSettingsBackdrop: false,
        menuLocationsBackdrop: false,
        modalAbout: false,
        modalResetSettings: false,
        modalClearLocations: false,
        settings: settings,
        details: settings.details,
        userLocation: false,
        showUserLocationPlaceholder: settings.userGeo,
        displaymode: displayMode(),
        lang: languageStrings[language],
        checkUserLocation() {
            const userLocation =
                locations.findIndex(
                    location => location.isUserLocation === 'true'
                ) !== -1;
            // console.log(userLocation);
            this.userLocation = userLocation;
        },
        info() {
            console.table(JSON.parse(JSON.stringify(this.slides)));
        },
        add(event) {
            event.detail.location.isUserLocation === 'true'
                ? this.slides.unshift(event.detail)
                : this.slides.push(event.detail);
            setTimeout(() => {
                splide.refresh();
            }, 100);
        },
        update(event) {
            const index = this.slides.findIndex(
                slide => slide.id === event.detail.id
            );
            if (index !== -1) {
                for (let key in event.detail) {
                    this.slides[index] = {
                        ...this.slides[index],
                        [key]: event.detail[key],
                    };
                }
                setTimeout(() => {
                    splide.refresh();
                }, 100);
            } else {
                console.warn('slide not found');
            }
        },
        swap(event) {
            const fromSlide = event.detail.fromSlide;
            const toSlide = event.detail.toSlide;
            const movedItem = this.slides[fromSlide];
            this.slides.splice(fromSlide, 1); // Remove item from the previous position
            this.slides.splice(toSlide, 0, movedItem); // Insert item in the new position
            setTimeout(() => {
                splide.refresh();
            }, 100);
        },

        removecard(event) {
            const index = this.slides.findIndex(
                card => card.id === event.detail.id
            );
            splide.remove(index);
            this.slides = this.slides.filter(i => i.id !== event.detail.id);

            locations = locations.filter(i => i.id !== event.detail.id);
            localStorage.setItem('locations', JSON.stringify(locations));
            localStorage.removeItem(`weatherData-${event.detail.id}`);
            if (locations.length === 0) {
                stopUpdateInterval();
            }
        },
    }));

    Alpine.data('card', () => ({
        showcard: true,
        init() {
            console.log('show card');
            this.$nextTick(() => (this.show = true));
        },
        transitionOut() {
            console.log('hide card');
            this.show = false;
            setTimeout(() => this.removecard(this.card), 500);
        },
    }));

    Alpine.data('popups', () => ({
        popup1: [],
        popup2: [],
        popup3: [],
        location: [],
        legend: false,

        remove(el) {
            el.style.display = 'none';
        },

        addnewslide(event) {
            console.log(event.detail);
            this.location.push(event.detail);
        },
        popup1info() {
            console.log(JSON.parse(JSON.stringify(this.popup1)));
        },
        addpopup1(event) {
            this.popup1.push(event.detail);
        },
        removepopup1(popup) {
            this.popup1 = this.popup1.filter(i => i.id !== popup.id);
        },
        addpopup2(event) {
            this.popup2.push(event.detail);
        },
        removepopup2(popup) {
            this.popup2 = this.popup2.filter(i => i.id !== popup.id);
        },
        popup3info() {
            console.log(JSON.parse(JSON.stringify(this.popup3)));
        },
        popup3locationinfo() {
            console.log(JSON.parse(JSON.stringify(this.location)));
        },
        addpopup3(event) {
            // console.log(event.detail);
            this.popup3.push(event.detail);
        },
        removepopup3(popup) {
            this.popup3 = this.popup3.filter(i => i.id !== popup.id);
        },
        removelocation() {
            console.log('del slide');
            this.location = [];
        },
    }));

    Alpine.data('newLocation', () => ({
        show: false,

        init() {
            console.log('show newLocation');
            this.$nextTick(() => (this.show = true));
        },

        transitionOut() {
            console.log('hide newLocation');
            this.show = false;
            setTimeout(() => this.removepopup3(this.newLocation), 500);
            setTimeout(() => this.removelocation(this.slide), 500);
        },
    }));

    Alpine.data('slide', () => ({
        showslide: false,

        init() {
            console.log('show newSlide');
            this.isLoading = false;
            this.$nextTick(() => (this.showslide = true));
        },

        transitionOut() {
            console.log('hide newSlide');
            this.showslide = false;
            setTimeout(() => this.removelocation(this.slide), 500);
        },
    }));

    Alpine.data('detailedDays', () => ({
        detailedDays: [],
        info() {
            console.table(JSON.parse(JSON.stringify(this.detailedDays)));
        },

        add(event) {
            // console.log(event.detail);
            // id = this.detailedDays.findIndex(
            // 	(item) =>
            // 		Number(item.id) === Number(event.detail.day.datetimeEpoch)
            // );
            // console.log(id);
            // if (id === -1) {
            const days = event.detail.days;
            days.forEach(day => {
                this.detailedDays.push({
                    id: day.datetimeEpoch,
                    weatherData: day,
                });
                this.offset = 16 + event.detail.dayid * 50;
            });
            // }
            console.log(event.detail.dayid);
            setTimeout(() => {
                splide2 = new Splide('#daysDetailed', {
                    pagination: false,
                    speed: 700,
                    perPage: 1,
                    perMove: 1,
                    start: event.detail.dayid,
                    gap: '3rem',
                    arrows: false,
                    easing: 'cubic-bezier(.23,1,.32,1)',
                    noDrag: 'input, textarea, .no-drag',
                });
                splide2.on('move', () => {
                    this.offset = 16 + splide2.index * 50;
                });
                splide2.mount();
            }, 150);
        },

        removeday(event) {
            if (
                this.detailedDays.findIndex(
                    item => Number(item.id) === Number(event.detail.id)
                ) !== -1
            ) {
                this.detailedDays = this.detailedDays.filter(
                    i => i.id === event.detail.id
                );
            }
        },
    }));

    Alpine.data('detailedDay', () => ({
        show: false,
        init() {
            this.$nextTick(() => (this.show = true));
        },
        closeday(day) {
            console.log('hide day');
            // console.log(day.detail.id);
            if (
                this.detailedDays.findIndex(
                    item => Number(item.id) === Number(day.detail.id)
                ) === -1
            ) {
                this.show = false;
            }
            setTimeout(() => this.removeday(day), 500);
        },
    }));

    Alpine.data('detailedForecast', () => ({
        show: false,
        offset: 0,
        init() {
            console.log('show detailedForecast');
            this.$nextTick(() => (this.show = true));
        },
        transitionOut() {
            console.log('hide detailedForecast');
            this.show = false;

            checkDarkMode() ? changeColor(false) : changeColor(true);

            setTimeout(() => this.removepopup2(this.detailedForecast), 500);
        },
    }));

    Alpine.data('monthlyForecast', () => ({
        show: false,
        init() {
            console.log('show monthlyForecast');
            this.$nextTick(() => (this.show = true));
        },
        transitionOut() {
            console.log('hide monthlyForecast');
            this.show = false;
            setTimeout(() => this.removepopup1(this.monthlyForecast), 500);
        },
    }));

    Alpine.data('toasts', () => ({
        toasts: [],
        duration: 2500,
        add(event) {
            console.log(event.detail);
            console.log(this.toasts.length);
            if (event.detail.data === 'weather' && this.toasts.length === 0) {
                this.toasts.push({
                    id: Date.now() + Math.floor(Math.random() * 1000000),
                    type: event.detail.type || 'success',
                    content: event.detail.content,
                });
                this.duration = event.detail.duration || 2500;
            }
        },
        remove(toast) {
            this.toasts = this.toasts.filter(i => i.id !== toast.id);
        },
    }));

    Alpine.data('toast', () => ({
        show: false,
        init() {
            console.log('show toast');
            console.log(this.duration);
            this.$nextTick(() => (this.show = true));
            setTimeout(() => this.transitionOut(), this.duration);
        },
        transitionOut() {
            console.log('hide toast');
            this.show = false;
            setTimeout(() => this.remove(this.toast), 500);
        },
    }));
});

// setup location Cards List on "My locations" (SlipJS)
function setupSlip(list) {
    let itemsArray = [];
    if (typeof locations !== 'undefined') {
        itemsArray = locations;
    } else {
        console.table('Locations undefined');
    }

    list.addEventListener(
        'slip:beforeswipe',
        function (event) {
            if (event.target.classList.contains('no-swipe')) {
                event.preventDefault();
            }
        },
        false
    );

    list.addEventListener('slip:swipe', function (event) {
        event.preventDefault(); // will animate back to original position
        // }
    });

    list.addEventListener(
        'slip:beforewait',
        function (event) {
            if (event.target.classList.contains('instant'))
                event.preventDefault();
        },
        false
    );

    list.addEventListener(
        'slip:afterswipe',
        function (event) {
            event.target.parentNode.appendChild(event.target);
        },
        false
    );

    list.addEventListener(
        'slip:beforereorder',
        function (event) {
            if (event.target.classList.contains('no-reorder')) {
                event.preventDefault();
            }
        },
        false
    );
    list.addEventListener('slip:reorder', function (event) {
        console.log(
            'isuserlocation',
            event.target.attributes.isuserlocation.value
        );
        const fromSlide = event.detail.originalIndex - 1;
        const toSlide = event.detail.spliceIndex - 1;
        if (
            event.target.attributes.isuserlocation.value === 'true' ||
            (event.detail.insertBefore &&
                event.detail.insertBefore.attributes.isuserlocation.value ===
                    'true')
        ) {
            console.log(
                'isuserlocation',
                event.target.attributes.isuserlocation.value
            );
            event.preventDefault();
        } else {
            let reordered_locations = [];
            const movedItem = itemsArray[fromSlide];
            itemsArray.splice(fromSlide, 1); // Remove item from the previous position
            itemsArray.splice(toSlide, 0, movedItem); // Insert item in the new position
            itemsArray.forEach(el => {
                reordered_locations[String(itemsArray.indexOf(el))] = el;
            });
            locations = reordered_locations;
            // And update the DOM:
            window.dispatchEvent(
                new CustomEvent('swapslides', {
                    detail: { fromSlide, toSlide },
                })
            );
            localStorage.setItem('locations', JSON.stringify(locations));
        }
    });
    return new Slip(list);
}

// Update all data in Slides and Cards after timeout
function updateInfo(force = false) {
    // console.log('focus');
    if (force) {
        console.log('*** Force update ***');
        locations.forEach(location => {
            const lastUpdate = moment.unix(
                JSON.parse(localStorage.getItem('weatherData-' + location.id))
                    .lastUpdateEpoch
            );
            getWeather(location);
            console.log(lastUpdate.locale(language).format('DD.MMM, HH:mm:ss'));
        });
    } else {
        locations.forEach(location => {
            const lastUpdate = moment.unix(
                JSON.parse(localStorage.getItem('weatherData-' + location.id))
                    .lastUpdateEpoch
            );
            const timeDelta = moment().diff(lastUpdate, 'minutes');
            if (timeDelta >= 5) {
                getWeather(location);
                console.log(
                    location.name,
                    'updated:',
                    lastUpdate.locale(language).format('DD.MMM, HH:mm:ss')
                );
            } else {
                console.log(location.name);
                console.log(
                    'Last Update:',
                    lastUpdate.locale(language).format('DD.MMM, HH:mm:ss'),
                    '(',
                    timeDelta,
                    'minutes ago )'
                );
                console.log(
                    'Next Update:',
                    lastUpdate.add(5, 'm').format('DD.MMM, HH:mm:ss'),
                    '\n\n'
                );
            }
        });
    }

    // console.log('focus');
    // const date = new Date();
    // const lastPageUpdate = new Date(localStorage.getItem('lastPageUpdate'));
    // const delta = (date.getTime() - lastPageUpdate.getTime()) / 1000; // in sec
    // if (typeof locations !== undefined || locations.length > 0) {
    //     if (force) {
    //         console.log('*** Force update ***');
    //         locations.forEach(location => {
    //             getWeather(location);
    //         });
    //         localStorage.setItem('lastPageUpdate', new Date());
    //     } else {
    //         const lastUpdate = moment(
    //             new Date(localStorage.getItem('lastPageUpdate'))
    //         ).locale(language);
    //         console.log(
    //             'last update: ',
    //             lastUpdate.format('HH:mm:ss') + ' || next update:',
    //             lastUpdate.add(5, 'm').format('HH:mm:ss')
    //         );
    //         if (delta > 300) {
    //             console.log('update from API:', delta);
    //             locations.forEach(location => {
    //                 getWeather(location);
    //             });
    //         }
    //     }
    // }
}

function displayMode() {
    let displayMode = 'browser';
    if (window.matchMedia('(display-mode: standalone)').matches) {
        displayMode = 'standalone';
    } else if (window.matchMedia('(display-mode: fullscreen)').matches) {
        displayMode = 'fullscreen';
    } else if (navigator.standalone) {
        displayMode = 'standalone';
    }
    // Log to analytics

    // console.log("DISPLAY_MODE_LAUNCH:", displayMode);
    // if (window.navigator.standalone == null) {
    // 	console.log("not running in iOS browser");
    // } else if (window.navigator.standalone == false) {
    // 	console.log("using mobile safari");
    // } else {
    // 	console.log("running standalone app on iOS");
    // }
    return displayMode;
}

function resetSettings() {
    localStorage.removeItem('settings');
    settings = initSettings();
    activateTheme(2);
}

function deleteLocations() {
    locations.forEach(location => {
        localStorage.removeItem(`weatherData-${location.id}`);
    });
    localStorage.removeItem('locations');
    locations = [];
}

requestUserCountry();
// Request User Country code. User country hide in location search suggestions.
async function requestUserCountry() {
    if (!localStorage.getItem('userCountry')) {
        try {
            const response = await axios({
                url: 'https://ipinfo.io/json?token=bf205b8bacf2c5',
                method: 'get',
            });
            userCountry =
                (await response.data.country.toLowerCase()) || 'Unknown';
            localStorage.setItem('userCountry', userCountry);
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
}

function inputProcessing(el) {
    const suggestionList = document.querySelector('.suggestions-list');

    const re = /^[a-zA-ZАА-Яа-яёЁ.,\d\-_\s]+$/i;
    suggestionList.innerHTML = '';
    const value = el.value.trim();
    if (re.test(value)) {
        if (value.length > 0) {
            getSuggestions(value);
        } else {
            // console.log("недостаточно символов");
            suggestionList.innerHTML = '';
            // Document.querySelector('#suggestion-list').innerText = 'недостаточно символов'
        }
    } else {
        console.log('Недопустимые символы');
        // parseSuggestions([], "");
        // Document.querySelector('#suggestion-list').innerText = 'Недопустимые символы'
    }
}

function parseSuggestions(features, searchText, isUserLocation = false) {
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
    console.table(f);
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

            if (isUserLocation === true) {
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

function tempConverter(temp) {
    const result = settings.temp ? (temp * 9) / 5 + 32 : temp;
    // console.log("temp", Math.round(result));
    return Math.round(result);
}

function windConverter(wind) {
    const result = Math.round(settings.wind ? wind : 0.277778 * wind);
    // console.log("wind", result);
    return result;
}

function pressureConverter(p) {
    const result = Math.round(settings.pressure ? p : (p * 0.1) / 0.1333223684);
    // console.log("pressure", result);
    return result;
}

function changeColor(atTop = true) {
    const darkmode = checkDarkMode();
    if (atTop) {
        if (darkmode) {
            document
                .querySelector('meta[name="theme-color"]')
                .setAttribute('content', '#132846');
        } else {
            document
                .querySelector('meta[name="theme-color"]')
                .setAttribute('content', '#F3F4F7');
        }
    } else {
        if (darkmode) {
            document
                .querySelector('meta[name="theme-color"]')
                .setAttribute('content', '131E32');
        } else {
            document
                .querySelector('meta[name="theme-color"]')
                .setAttribute('content', '#FFF');
        }
    }
}

function moonphaseConverter(m) {
    switch (true) {
        case m === 0:
            return 'new';
        case m < 0.25:
            return 'waxingcrescent';
        case m === 0.25:
            return 'firstquarter';
        case m < 0.5:
            return 'waxinggibbous';
        case m === 0.5:
            return 'fullmoon';
        case m < 0.75:
            return 'waninggibbous';
        case m === 0.75:
            return 'lastquarter';
        case m < 1:
            return 'waningcrescent';
    }
}

function minMax(array, days) {
    let i;
    let minMin = array[0]; // ignoring case of empty array for conciseness
    let maxMax = array[0];
    for (i = 0; i < days; i++) {
        const value = array[i];
        if (value.tempmin < minMin.tempmin) minMin = value;
        if (value.tempmax > maxMax.tempmax) maxMax = value;
    }
    const tempRange = {
        tempmin: tempConverter(minMin.tempmin),
        tempmax: tempConverter(maxMax.tempmax),
    };
    return tempRange;
}

function tempRangeLineStyles(obj, tempRange, currentTemperature) {
    const tempmin = tempConverter(obj.tempmin);
    const tempmax = tempConverter(obj.tempmax);
    const weekTempdelta = tempRange.tempmax - tempRange.tempmin;
    const currentDayTempDelta = tempmax - tempmin;
    const gradientWidth = Math.round(
        (100 * (tempmax - tempmin)) / weekTempdelta
    );
    const left = Math.round(
        (100 * (tempmin - tempRange.tempmin)) / weekTempdelta
    );
    const currentTempShift = tempConverter(currentTemperature) - tempmin;
    const styles = {
        width: gradientWidth,
        left: left,
        dotShift: Math.round((100 * currentTempShift) / currentDayTempDelta),
    };
    return styles;
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

// converting first letter to uppercase
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function classToggle(el, ...args) {
    args.map(e => el.classList.toggle(e));
}

function getUserLocation() {
    const options = {
        enableHighAccuracy: true,
        timeout: 10000,
    };

    // console.log(navigator.geolocation);
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            resolveAdress,
            showError,
            options
        );
    } else {
        x = 'Geolocation is not supported by this browser.';
    }
}

function windDegreeToString(degree) {
    // Wind direction calc
    let winddir = Math.round(Number(degree));
    let dir = '';
    switch (true) {
        case 0 < winddir && winddir <= 90:
            dir = languageStrings[language].weather.units.winddir[0];
            break;
        case 90 < winddir && winddir < 180:
            dir = languageStrings[language].weather.units.winddir[1];
            break;
        case 180 < winddir && winddir < 270:
            dir = languageStrings[language].weather.units.winddir[2];
            break;
        case 270 < winddir && winddir < 360:
            dir = languageStrings[language].weather.units.winddir[3];
        case winddir == 0:
            dir = languageStrings[language].weather.units.winddir[4];
        case winddir == 90:
            dir = languageStrings[language].weather.units.winddir[5];
        case winddir == 180:
            dir = languageStrings[language].weather.units.winddir[6];
        case winddir == 270:
            dir = languageStrings[language].weather.units.winddir[7];
    }
    return dir;
}

function sunPositionDegree(sunriseEpoch, sunsetEpoch, sunPositionEpoch) {
    const sunrise = moment.unix(sunriseEpoch);
    const sunPosition = moment.unix(sunPositionEpoch);
    const daylightInMinutes = moment
        .duration(moment.unix(sunsetEpoch).diff(sunrise))
        .as('minutes');
    const sunPositionInMinutes = moment
        .duration(sunPosition.diff(sunrise))
        .as('minutes');
    const deltaInPercentage = (sunPositionInMinutes * 100) / daylightInMinutes;
    let deltaInDegrees = Math.round(-180 + (180 * deltaInPercentage) / 100);
    if (deltaInDegrees > 0 || deltaInDegrees < -180) {
        deltaInDegrees = false;
    }
    return deltaInDegrees;
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.log('User denied the request for Geolocation.');
            window.dispatchEvent(
                new CustomEvent('toast', {
                    detail: {
                        type: 'error',
                        content: `<b>User denied the request for Geolocation.</b><br>
						Please <a class='underline' href='App-Prefs://prefs:root'>enable</a> Safari location services to continue.`,
                        duration: 10000,
                    },
                })
            );
            updateSettings('userGeo', false);
            // localStorage.setItem("userGeoPosition", false);
            window.dispatchEvent(new CustomEvent('cancelusergeosearch'));
            break;
        case error.POSITION_UNAVAILABLE:
            console.log('Location information is unavailable.');
            break;
        case error.TIMEOUT:
            console.log('The request to get user location timed out.');
            window.dispatchEvent(
                new CustomEvent('toast', {
                    detail: {
                        type: 'error',
                        content: `<b>The request to get user location timed out.</b><br>Check your internet connection and try again.`,
                        duration: 10000,
                    },
                })
            );
            window.dispatchEvent(new CustomEvent('cancelusergeosearch'));
            break;
        case error.UNKNOWN_ERROR:
            console.log('An unknown error occurred.');
            break;
    }
}
