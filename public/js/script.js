suggestionList = document.querySelector('.suggestions-list')
let userCountry = ''
const svg__check = `<svg class="stroke-primary-light dark:stroke-primary-dark" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.66675 8L6.66675 12L13.3334 4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>`
const svg__system_theme = `<svg class="fill-cosmic-900 dark:fill-white" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 5.375C6 4.74511 6.25022 4.14102 6.69562 3.69562C7.14102 3.25022 7.74511 3 8.375 3H15.5C16.1299 3 16.734 3.25022 17.1794 3.69562C17.6248 4.14102 17.875 4.74511 17.875 5.375V19.625C17.875 20.2549 17.6248 20.859 17.1794 21.3044C16.734 21.7498 16.1299 22 15.5 22H8.375C7.74511 22 7.14102 21.7498 6.69562 21.3044C6.25022 20.859 6 20.2549 6 19.625V5.375ZM13.125 18.4375C13.125 18.1226 12.9999 17.8205 12.7772 17.5978C12.5545 17.3751 12.2524 17.25 11.9375 17.25C11.6226 17.25 11.3205 17.3751 11.0978 17.5978C10.8751 17.8205 10.75 18.1226 10.75 18.4375C10.75 18.7524 10.8751 19.0545 11.0978 19.2772C11.3205 19.4999 11.6226 19.625 11.9375 19.625C12.2524 19.625 12.5545 19.4999 12.7772 19.2772C12.9999 19.0545 13.125 18.7524 13.125 18.4375Z" /></svg>`


function displayMode() {
    let display_mode = 'browser';
    if (window.matchMedia('(display-mode: standalone)').matches) {
        display_mode = 'standalone';
    } else if (window.matchMedia('(display-mode: fullscreen)').matches) {
        display_mode = 'fullscreen';
    } else if (navigator.standalone) {
        display_mode = 'standalone';
    }
    // Log launch display mode to analytics
    console.log('DISPLAY_MODE_LAUNCH:', display_mode);
    if (window.navigator.standalone == null) {
        console.log("not running in iOS browser");
    } else if (window.navigator.standalone == false) {
        console.log("using mobile safari");
    } else {
        console.log("running standalone app on iOS");
    }
    return display_mode;
}

requestUserCountry()
// request User Country code. User country hide in location search suggestions.
async function requestUserCountry() {
    if (!localStorage.userCountry) {
        try {
            const response = await axios({
                url: "https://ipinfo.io/json?token=bf205b8bacf2c5",
                method: "get"
            })
            userCountry = await response.data.country.toLowerCase() || 'Unknown';
            localStorage.setItem('userCountry', userCountry)
        } catch (err) {
            console.warn({ message: err })
        }
    } else {
        return localStorage.userCountry
    }
}

function inputProcessing(value) {
    suggestionList.innerHTML = ''
    const string = value.trim();
    const re = /^[a-zA-ZАА-Яа-яёЁ.,\d\-_\s]+$/i;

    if (re.test(string)) {
        if (string.length > 1) {
            setTimeout(() => {
                getSuggestions(string)
            }, 600)
        } else {
            console.log('недостаточно символов')
            // document.querySelector('#suggestion-list').innerText = 'недостаточно символов'
        }
    }
    else {
        console.log('Недопустимые символы')
        // document.querySelector('#suggestion-list').innerText = 'Недопустимые символы'
    }
}

function parseSuggestions(features, searchText) {
    const nothing_found = document.querySelector('#search-user-location--not-found')
    // nothing_found.classList.remove('hidden')
    setTimeout(() => {
        // nothing_found.classList.remove('opacity-0')
    }, 100);
    suggestionList.innerHTML = ''
    console.table(features)
    if (features.length == 0) {
        console.log('Nothing found')
    } else {
        // console.table(features)
        // nothing_found.classList.add('hidden', 'opacity-0')
        suggestionList.classList.remove('invisible', 'opacity-0')
        for (const value of Object.values(features)) {
            let position = {
                coords: {
                    longitude: value.geometry.coordinates[0],
                    latitude: value.geometry.coordinates[1],
                }
            }
            let id = value.id.split('.')[1]
            let name = value.text_ru;
            let countryCode = value.context[value.context.findIndex(item => item.id.includes('country'))].short_code;
            let region
            if (value.context.findIndex(item => item.id.includes('region')) !== -1) {
                region = value.context[value.context.findIndex(item => item.id.includes('region'))].text;
            }
            context__country_id = value.context.findIndex(item => item.id.includes('country'))
            let country = value.context[context__country_id].text;
            let capText = searchText[0].toUpperCase() + searchText.slice(1)
            let locationLi = document.createElement('li');
            locationLi.onclick = () => showPosition(position, false)
            if ((typeof locations !== 'undefined') && (Object.values(locations).findIndex(item => item.id == id) != -1)) {
                action = ''
                locationLi.classList.add('flex', 'pointer-events-none', 'text-gray-300', 'pr-2', 'truncate')
                text = `${name}${region ? ', ' + region : ''}${(countryCode !== userCountry) ? ', ' + country : ''}`
            } else {
                // action = action;
                locationLi.classList.add('flex', 'pr-2', 'truncate')
                text = `${name.replace(capText, `<div class="text-primary-light dark:text-primary-dark">${capText}</div>`)}<div class="text-gray-300 dark:text-cosmic-500">${region ? ', ' + region : ''}${(countryCode !== userCountry) ? ', ' + country : ''}</div>`
            }
            locationLi.innerHTML = text
            suggestionList.appendChild(locationLi)

        }
    }
}