'use strict';

let splide, splide2, updateInterval;
document.body.style.webkitTouchCallout = 'none';
const active_slide = localStorage.getItem('activeSlide') || 0;
const moonPhaseIconsPath = 'img/assets/icons/moonphases/';
const weatherIconsPath = 'img/assets/icons/weather-conditions/';
const weatherIconsSmallPath = 'img/assets/icons/weather-conditions/small/';
const locationCardsContainer = document.querySelector(
    '#location-cards--container'
);
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

document.addEventListener('DOMContentLoaded', () => {
    requestUserCountry();

    splide = new Splide('#main', {
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
});

const svgCheck =
    '<svg class="stroke-primary-light dark:stroke-primary-dark" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.66675 8L6.66675 12L13.3334 4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>';
const svgSystemTheme =
    '<svg class="fill-cosmic-900 dark:fill-white" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 5.375C6 4.74511 6.25022 4.14102 6.69562 3.69562C7.14102 3.25022 7.74511 3 8.375 3H15.5C16.1299 3 16.734 3.25022 17.1794 3.69562C17.6248 4.14102 17.875 4.74511 17.875 5.375V19.625C17.875 20.2549 17.6248 20.859 17.1794 21.3044C16.734 21.7498 16.1299 22 15.5 22H8.375C7.74511 22 7.14102 21.7498 6.69562 21.3044C6.25022 20.859 6 20.2549 6 19.625V5.375ZM13.125 18.4375C13.125 18.1226 12.9999 17.8205 12.7772 17.5978C12.5545 17.3751 12.2524 17.25 11.9375 17.25C11.6226 17.25 11.3205 17.3751 11.0978 17.5978C10.8751 17.8205 10.75 18.1226 10.75 18.4375C10.75 18.7524 10.8751 19.0545 11.0978 19.2772C11.3205 19.4999 11.6226 19.625 11.9375 19.625C12.2524 19.625 12.5545 19.4999 12.7772 19.2772C12.9999 19.0545 13.125 18.7524 13.125 18.4375Z" /></svg>';
const svgClearText =
    '<svg class="stroke-gray-300 dark:stroke-cosmic-500 stroke-1.5" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <circle cx="10" cy="10" r="9.25" /><path d="M7 13L10 10M10 10L13 7M10 10L7 7M10 10L13 13" stroke-linecap="round" stroke-linejoin="round" /></svg>';

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

const addSlide = function (data) {
    window.dispatchEvent(
        new CustomEvent('addslide', {
            detail: data,
        })
    );
};

const addPopup = function (data) {
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
    window.dispatchEvent(new CustomEvent('orientationchange'));
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
        updateInfo();
        startUpdateInterval();
    }
    setTimeout(() => {
        splide.mount();
    }, 100);
});

window.addEventListener('weatherSaved', event => {
    window.dispatchEvent(
        new CustomEvent('updateslide', {
            detail: event.detail,
        })
    );
    setTimeout(() => {
        splide.refresh();
    }, 150);
});

function updateLocation(locationData, userLocation = false) {
    // console.log('update Location id:', data.detail.id);
    const id = locationData.detail.data.id;
    const index = userLocation
        ? 0
        : locations.findIndex(location => Number(location.id) === id);
    for (let key in locationData.detail.data) {
        locations[index] = {
            ...locations[index],
            [key]: locationData.detail.data[key],
        };
    }
    setTimeout(() => {
        window.dispatchEvent(
            new CustomEvent('updateslide', {
                detail: {
                    geoPositionUpdate: locationData.detail.geoPositionUpdate,
                    data: {
                        id,
                        location: locations[index],
                    },
                },
            })
        );
    }, 500);
    setTimeout(() => {
        splide.refresh();
    }, 600);
    localStorage.setItem('locations', JSON.stringify(locations));
}
const isDesktop = () => {
    const navigatorAgent =
        navigator.userAgent || navigator.vendor || window.opera;
    return !(
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series([46])0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
            navigatorAgent
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br([ev])w|bumb|bw-([nu])|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do([cp])o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly([-_])|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-([mpt])|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c([- _agpst])|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac([ \-/])|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja([tv])a|jbro|jemu|jigs|kddi|keji|kgt([ /])|klon|kpt |kwc-|kyo([ck])|le(no|xi)|lg( g|\/([klu])|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t([- ov])|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30([02])|n50([025])|n7(0([01])|10)|ne(([cm])-|on|tf|wf|wg|wt)|nok([6i])|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan([adt])|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c([-01])|47|mc|nd|ri)|sgh-|shar|sie([-m])|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel([im])|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c([- ])|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
            navigatorAgent.substr(0, 4)
        )
    );
};

screen.orientation
    ? (screen.orientation.onchange = () => {
          window.dispatchEvent(new CustomEvent('orientationchange'));
      })
    : (onorientationchange = () => {
          //   console.log(window.orientation);
          document.dispatchEvent(new CustomEvent('orientationchange'));
      });

document.addEventListener('alpine:init', () => {
    Alpine.data('main', () => ({
        slides: [],
        phonePower: false,
        atTop: true,
        detailedAtTop: false,
        orientation: '',
        orientationDeg: 0,
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
        details: false,
        userLocation: false,
        showUserLocationPlaceholder: settings.userGeo,
        displaymode: displayMode(),
        lang: languageStrings[language],
        checkDetails() {
            this.details = settings.details;
        },
        checkScreenOrientation() {
            if (isDesktop()) {
                this.orientation = 'portrait';
            } else {
                if (typeof screen.orientation === 'undefined') {
                    if (
                        window.orientation === 0 ||
                        window.orientation === 180
                    ) {
                        this.orientation = 'portrait';
                        this.orientationDeg = -window.orientation;
                    } else {
                        this.orientation = 'landscape';
                        this.orientationDeg = -window.orientation;
                    }
                } else {
                    if (
                        screen.orientation.type === 'portrait-primary' ||
                        screen.orientation.type === 'portrait-secondary'
                    ) {
                        this.orientation = 'portrait';
                        this.orientationDeg = -window.orientation;
                    } else {
                        this.orientation = 'landscape';
                        this.orientationDeg = -window.orientation;
                    }
                }
            }
        },
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
                if (this.slides.length <= 1) {
                    setupSlip(locationCardsContainer);
                }
            }, 100);
        },
        update(event) {
            const index = event.detail.geoPositionUpdate
                ? 0
                : this.slides.findIndex(
                      slide => slide.id === event.detail.data.id
                  );
            if (index !== -1) {
                for (let key in event.detail.data) {
                    this.slides[index] = {
                        ...this.slides[index],
                        [key]: event.detail.data[key],
                    };
                }
                setTimeout(() => {
                    splide.refresh();
                }, 100);
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
            this.$nextTick(() => (this.show = true));
        },
        transitionOut() {
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
            this.location = [];
        },
    }));

    Alpine.data('newLocation', () => ({
        show: false,

        init() {
            // console.log('show newLocation');
            this.$nextTick(() => (this.show = true));
        },

        transitionOut() {
            // console.log('hide newLocation');
            this.show = false;
            setTimeout(() => this.removepopup3(this.newLocation), 500);
            setTimeout(() => this.removelocation(this.slide), 500);
        },
    }));

    Alpine.data('slide', () => ({
        showslide: false,

        init() {
            // console.log('show newSlide');
            this.isLoading = false;
            this.$nextTick(() => (this.showslide = true));
        },

        transitionOut() {
            // console.log('hide newSlide');
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
            this.$nextTick(() => (this.show = true));
        },
        transitionOut() {
            this.show = false;

            checkDarkMode() ? changeColor(false) : changeColor(true);

            setTimeout(() => this.removepopup2(this.detailedForecast), 500);
        },
    }));

    Alpine.data('monthlyForecast', () => ({
        show: false,
        init() {
            this.$nextTick(() => (this.show = true));
        },
        transitionOut() {
            this.show = false;
            setTimeout(() => this.removepopup1(this.monthlyForecast), 500);
        },
    }));

    Alpine.data('toasts', () => ({
        toasts: [],
        duration: 2500,
        add(event) {
            // console.log(event.detail);
            this.duration = event.detail.duration || 2500;
            if (event.detail.data === 'weather' && this.toasts.length === 0) {
                this.toasts.push({
                    id: Date.now() + Math.floor(Math.random() * 1000000),
                    type: event.detail.type || 'success',
                    content: event.detail.content,
                });
            } else {
                this.toasts.push({
                    id: Date.now() + Math.floor(Math.random() * 1000000),
                    type: event.detail.type || 'success',
                    content: event.detail.content,
                });
            }
        },
        remove(toast) {
            this.toasts = this.toasts.filter(i => i.id !== toast.id);
        },
    }));

    Alpine.data('toast', () => ({
        show: false,
        init() {
            // console.log(this.duration);
            this.$nextTick(() => (this.show = true));
            setTimeout(() => this.transitionOut(), this.duration);
        },
        transitionOut() {
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
            if (
                event.target.classList.contains('no-reorder') ||
                event.target.closest('li').attributes.isuserlocation.value ===
                    'true'
            ) {
                event.preventDefault();
            }
        },
        false
    );
    list.addEventListener('slip:reorder', function (event) {
        const fromSlide = event.detail.originalIndex - 1;
        const toSlide = event.detail.spliceIndex - 1;
        if (
            event.target.attributes.isuserlocation.value === 'true' ||
            (event.detail.insertBefore &&
                event.detail.insertBefore.attributes.isuserlocation.value ===
                    'true')
        ) {
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
            itemsArray = locations;
        }
    });
    return new Slip(list);
}

// Update all data in Slides and Cards after timeout
function updateInfo(force = false) {
    // If force is true, update all locations regardless of last update time
    if (force) {
        console.log('*** Force update ***');
        // Iterate through each location
        locations.forEach(location => {
            // Get the last update time for this location from local storage
            const lastUpdate = moment.unix(
                JSON.parse(localStorage.getItem('weatherData-' + location.id))
                    .lastUpdateEpoch
            );
            // Call the getWeather function for this location
            getWeather(location);
        });
    } else {
        // Otherwise, only update locations that have not been updated in the last 5 minutes
        locations.forEach((location, index) => {
            // Get the last update time for this location from local storage
            const lastUpdate = moment.unix(
                JSON.parse(localStorage.getItem('weatherData-' + location.id))
                    .lastUpdateEpoch
            );
            // Calculate the time between now and the last update time in minutes
            const timeDelta = moment().diff(lastUpdate, 'minutes');
            if (timeDelta >= 5) {
                // If the time difference is greater than or equal to 5 minutes, update this location
                getWeather(location);
                // if the location is the user's location (index 0), update the user's geolocation
                index === 0 && locations[0].isUserLocation === 'true'
                    ? getUserLocation(true)
                    : undefined;
            }
        });
    }
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
    settings = init();
    activateTheme(2);
}

function deleteLocations() {
    locations.forEach(location => {
        localStorage.removeItem(`weatherData-${location.id}`);
    });
    localStorage.removeItem('locations');
    locations = [];
}

// Request User Country code. User country hide in location search suggestions.
async function requestUserCountry() {
    if (!localStorage.getItem('userCountry')) {
        try {
            const response = await axios({
                url: 'https://ipinfo.io/json?token=bf205b8bacf2c5',
                method: 'get',
                crossDomain: true,
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

const tempConverter = temp =>
    Math.round(settings.temp ? (temp * 9) / 5 + 32 : temp);

const windConverter = wind =>
    Math.round(settings.wind ? wind : 0.277778 * wind);

const pressureConverter = p =>
    Math.round(settings.pressure ? p : (p * 0.1) / 0.1333223684);

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

function minMax(arr) {
    const tempmax = Math.round(
        Math.max(...arr.slice().map(item => item.tempmax))
    );
    const tempmin = Math.round(
        Math.min(...arr.slice().map(item => item.tempmin))
    );
    return { tempmin, tempmax };
}

function tempRangeLineStyles(obj, tempRange, currentTemperature) {
    const tempmin = obj.tempmin;
    const tempmax = obj.tempmax;
    const weekTempdelta = tempRange.tempmax - tempRange.tempmin;
    const currentDayTempDelta = tempmax - tempmin;
    const width = Math.round((100 * (tempmax - tempmin)) / weekTempdelta);
    const left = Math.round(
        (100 * (tempmin - tempRange.tempmin)) / weekTempdelta
    );
    const currentTempShift = currentTemperature - tempmin;

    let dotShift = Math.round((100 * currentTempShift) / currentDayTempDelta);
    dotShift = dotShift < 0 ? 0 : dotShift > 100 ? 100 : dotShift;
    return {
        width,
        left,
        dotShift,
    };
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

function getUserLocation(update = false) {
    const options = {
        // enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
    };

    // console.log(navigator.geolocation);
    if (navigator.geolocation) {
        if (update) {
            navigator.geolocation.getCurrentPosition(
                userLocationSuccess =>
                    resolveAdress(userLocationSuccess, update),
                showError,
                options
            );
        } else {
            navigator.geolocation.getCurrentPosition(
                resolveAdress,
                showError,
                options
            );
        }
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
