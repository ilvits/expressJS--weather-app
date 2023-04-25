'use strict';

let userCountry = 'Unknown';
let language, locations, settings;
const setLanguage = () => {
    if (typeof settings !== 'undefined') {
        if (settings.lang === true) {
            return 'en-US';
        } else if (settings.lang === false) {
            return 'ru';
        }
    } else {
        if (navigator.language.includes('en')) {
            return 'en-US';
        } else {
            return 'ru';
        }
    }
};

const init = () => {
    locations = JSON.parse(localStorage.getItem('locations')) || [];
    if (!localStorage.getItem('settings')) {
        settings = {
            temp: false,
            wind: false,
            pressure: false,
            lang: navigator.language.includes('en') ? true : false,
            details: false,
            theme: 2,
            userGeo: true,
        };
        localStorage.setItem('settings', JSON.stringify(settings));
    } else {
        settings = JSON.parse(localStorage.getItem('settings'));
    }
    language = setLanguage();
    return settings;
};

function updateSettings(item, value) {
    settings[item] = value;
    localStorage.setItem('settings', JSON.stringify(settings));
}
init();
