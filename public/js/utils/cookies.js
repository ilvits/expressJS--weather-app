function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (encodeURIComponent(value) || "") + expires + "; path=/; SameSite=Strict";
    console.log('cookie', name, 'set to:', JSON.parse(value))

}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    console.log('cookie', name, 'deleted')
}

// let loc = JSON.stringify(
//     {
//         'spb': {
//             "name": 'Санкт-Петербург',
//             "id": 'spb',
//             "latitude": 59.89064061054924,
//             "longitude": 30.418760414235095
//         },
//         // 'verh': {
//         //     "name": 'Верхненовокутлумбетьево',
//         //     "id": 'verh',
//         //     "latitude": 55.6743,
//         //     "longitude": 27.0192
//         // },
//         // 'ss111': {
//         //     "name": 'Верхненовокутлумбетьево',
//         //     "id": 'verrgyhtuh',
//         //     "latitude": 55.6743,
//         //     "longitude": 27.0192
//         // },
//         // 'ver222h': {
//         //     "name": 'Верхненовокутлумбетьево',
//         //     "id": 'vedth45rterh',
//         //     "latitude": 55.6743,
//         //     "longitude": 27.0192
//         // },
//         // '3s333': {
//         //     "name": 'Верхненовокутлумбетьево',
//         //     "id": 'verethrtgrh',
//         //     "latitude": 55.6743,
//         //     "longitude": 27.0192
//         // },
//         // 'ver444h': {
//         //     "name": 'Верхненовокутлумбетьево',
//         //     "id": 'vefrefg4rh',
//         //     "latitude": 55.6743,
//         //     "longitude": 27.0192
//         // },
//         // 'versefsefs555h': {
//         //     "name": 'Верхненовокутлумбетьево',
//         //     "id": 'verdwadh',
//         //     "latitude": 55.6743,
//         //     "longitude": 27.0192
//         // },
//         'panteleyki': {
//             "name": 'Пантелейки',
//             "id": 'panteleyki',
//             "latitude": 55.6743,
//             "longitude": 27.0192
//         },
//         'torrevieja': {
//             "name": "Торревьеха",
//             "id": 'torrevieja',
//             "latitude": 37.9815,
//             "longitude": -0.6753
//         },
//         'zucchelli': {
//             "name": "Zucchelli Station",
//             "id": 'zucchelli',
//             "latitude": -74.69399018874958,
//             "longitude": 164.11546177709056
//         },
//     }
// );

// if (getCookie('locations') === null) {
// setCookie('locations', loc, 30)
// }

// if (getCookie('lastUpdateEpoch') === null) {
// setCookie('lastUpdateEpoch', Date.now(), 1)
// }

// || (getCookie('lastUpdateEpoch') + 900000 < Date.now()))