const lang = "ru";
const dayParts = {
	ru: ["Утром", "Днем", "Вечером", "Ночью"],
};

// Locations Cards Data Append
// function renderLocationCard(loc, weatherData, preview = false) {
// 	const user_date = new Date();
// 	const todayWeather = weatherData.days[0];
// 	const time_offset =
// 		weatherData.tzoffset + user_date.getTimezoneOffset() / 60;
// 	let location_date = new Date(user_date);
// 	location_date.setHours(location_date.getHours() + time_offset);
// 	const location_time = getTime2Digits(location_date);
// 	let sunrise_time = new Date(
// 		weatherData.currentConditions.sunriseEpoch * 1000
// 	);
// 	sunrise_time = new Date(sunrise_time);
// 	sunrise_time.setHours(sunrise_time.getHours() + time_offset);
// 	let sunset_time = new Date(
// 		weatherData.currentConditions.sunsetEpoch * 1000
// 	);
// 	sunset_time = new Date(sunset_time);
// 	sunset_time.setHours(sunset_time.getHours() + time_offset);
// 	const dayLight_time = new Date(sunset_time);
// 	dayLight_time.setTime(sunset_time.getTime() - sunrise_time.getTime());
// 	dayLight_time.setHours(
// 		dayLight_time.getHours() + user_date.getTimezoneOffset() / 60
// 	);
// 	const currentWeather =
// 		weatherData.days[0].hours[
// 			Number(join(location_date, [{ hour: "numeric" }], "-"))
// 		];
// 	// const currentWeather = weatherData.currentConditions
// 	const current_temperature = Math.round(tempConverter(currentWeather.temp));
// 	if (
// 		(location_date.getHours() > sunset_time.getHours() ||
// 			location_date.getHours() < sunrise_time.getHours()) &&
// 		currentWeather.icon.search("-night") == -1
// 	) {
// 		if (currentWeather.icon.search("day") != -1) {
// 			currentWeather.icon = currentWeather.icon.replace(/day/g, "night");
// 		} else {
// 			currentWeather.icon = currentWeather.icon + "-night";
// 		}
// 	}

// 	if (!preview) {
// 		// LOCATIONS CARDS RENDER
// 		// console.log(loc.name.length)
// 		if (loc.name.length > 18) {
// 			document
// 				.querySelector(`#card-${loc.id} .card__location-name`)
// 				.classList.add("text-sm");
// 		}
// 		document.querySelector(
// 			`#card-${loc.id} .card__location-name`
// 		).innerText = loc.name;
// 		if (loc.isUserLocation) {
// 			// console.log(loc.isUserLocation)
// 			document.querySelector(
// 				`#card-${loc.id} .card__location-pin`
// 			).innerHTML = `
//             <svg class="ml-2 fill-cosmic-900 dark:fill-white" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M8 4.5C7.50555 4.5 7.0222 4.64662 6.61107 4.92133C6.19995 5.19603 5.87952 5.58648 5.6903 6.04329C5.50108 6.50011 5.45157 7.00277 5.54804 7.48773C5.6445 7.97268 5.8826 8.41814 6.23223 8.76777C6.58186 9.1174 7.02732 9.3555 7.51227 9.45196C7.99723 9.54843 8.49989 9.49892 8.95671 9.3097C9.41352 9.12048 9.80397 8.80005 10.0787 8.38893C10.3534 7.9778 10.5 7.49445 10.5 7C10.4992 6.33719 10.2356 5.70175 9.76693 5.23307C9.29825 4.7644 8.66281 4.50076 8 4.5ZM8 8.5C7.70333 8.5 7.41332 8.41203 7.16664 8.2472C6.91997 8.08238 6.72771 7.84811 6.61418 7.57403C6.50065 7.29994 6.47094 6.99834 6.52882 6.70736C6.5867 6.41639 6.72956 6.14912 6.93934 5.93934C7.14912 5.72956 7.41639 5.5867 7.70736 5.52882C7.99834 5.47094 8.29994 5.50065 8.57403 5.61418C8.84811 5.72771 9.08238 5.91997 9.2472 6.16664C9.41203 6.41332 9.5 6.70333 9.5 7C9.49955 7.39769 9.34138 7.77896 9.06017 8.06017C8.77896 8.34137 8.39769 8.49955 8 8.5ZM8 1.5C6.54182 1.50165 5.14383 2.08165 4.11274 3.11274C3.08165 4.14383 2.50165 5.54182 2.5 7C2.5 8.96225 3.40687 11.0424 5.12269 13.0156C5.89481 13.9072 6.76367 14.7101 7.71325 15.4096C7.7973 15.4685 7.89741 15.5 8 15.5C8.10259 15.5 8.2027 15.4685 8.28675 15.4096C9.23633 14.7101 10.1052 13.9072 10.8773 13.0156C12.5931 11.0424 13.5 8.96231 13.5 7C13.4983 5.54182 12.9184 4.14383 11.8873 3.11274C10.8562 2.08165 9.45818 1.50165 8 1.5ZM8 14.3737C6.96669 13.5632 3.5 10.5769 3.5 7C3.5 5.80653 3.97411 4.66193 4.81802 3.81802C5.66193 2.97411 6.80653 2.5 8 2.5C9.19347 2.5 10.3381 2.97411 11.182 3.81802C12.0259 4.66193 12.5 5.80653 12.5 7C12.5 10.577 9.03312 13.5634 8 14.3737Z"/>
//             </svg>`;
// 		} else {
// 			document
// 				.querySelector(`#card-${loc.id} .card__location-pin`)
// 				.classList.add("hidden");
// 		}
// 		document.querySelector(
// 			`#card-${loc.id} .card__current-time`
// 		).innerText = location_time;
// 		document.querySelector(
// 			`#card-${loc.id} .card__current-temp`
// 		).innerText = Math.round(current_temperature) + "°";
// 		document.querySelector(
// 			`#card-${loc.id} .card__current-condition`
// 		).innerText = currentWeather.conditions;
// 		document.querySelector(`#card-${loc.id} .card__max-temp`).innerText =
// 			Math.round(tempConverter(todayWeather.tempmax)) + "°";
// 		document.querySelector(`#card-${loc.id} .card__min-temp`).innerText =
// 			Math.round(tempConverter(todayWeather.tempmin)) + "°";
// 		document.querySelector(
// 			`#card-${loc.id} .card__weather-icon`
// 		).innerHTML = `<img class="w-12 h-12 shrink-0" src="img/assets/icons/weather-conditions/${currentWeather.icon}.svg">`;
// 		document
// 			.querySelector(`#card-${loc.id} .card__edit-btn`)
// 			.addEventListener("click", (event) => {
// 				openLocationEditModal(event.target);
// 			});
// 	}
// }

function renderHourlyForecast(id, weatherData) {
	// console.log(weatherData)
	const slide = document.querySelector(`#slide-${id}`);
	const hourlyPlaceholder = slide.querySelector(".hourlyToday");
	const time_offset =
		weatherData.tzoffset + user_date.getTimezoneOffset() / 60;
	const location_date = new Date(user_date);
	location_date.setHours(location_date.getHours() + time_offset);
	let sunrise_time = new Date(
		weatherData.currentConditions.sunriseEpoch * 1000
	);
	sunrise_time = new Date(sunrise_time);
	sunrise_time.setHours(sunrise_time.getHours() + time_offset);
	let sunset_time = new Date(
		weatherData.currentConditions.sunsetEpoch * 1000
	);
	sunset_time = new Date(sunset_time);
	sunset_time.setHours(sunset_time.getHours() + time_offset);

	let currentHour = location_date.getHours();
	let nHours = 26; // Number of hours to display
	let leftHours = 24 - currentHour;

	for (var day = 0; day < 2; day++) {
		if (day > 0) {
			currentHour = -1;
		} else {
			currentHour = location_date.getHours();
		}
		for (let i = 0; i < leftHours; i++) {
			data = weatherData.days[day].hours[currentHour + i];
			if (i == 0 && day == 0) {
				time = "Сейчас";
				if (
					(currentHour + i > sunset_time.getHours() ||
						currentHour + i < sunrise_time.getHours()) &&
					data.icon.search("-night") == -1
				) {
					if (data.icon.search("day") != -1) {
						data.icon = data.icon.replace(/day/g, "night");
					} else {
						data.icon = data.icon + "-night";
					}
				}
			} else if (day === 1 && i === 0) {
				continue;
			} else if (i > 0) {
				time = `${currentHour + i}:00`;
				if (
					(currentHour + i > sunset_time.getHours() ||
						currentHour + i < sunrise_time.getHours()) &&
					data.icon.search("-night") == -1
				) {
					// console.log(data.icon.search('day'))
					if (data.icon.search("day") !== -1) {
						data.icon = data.icon.replace(/day/g, "night");
					} else {
						data.icon = data.icon + "-night";
					}
				}
			}
			if (currentHour + i == 0 && day != 0) {
				new_date = new Date(location_date);
				new_date.setHours(location_date.getHours() + 24);
				nextDayTip = join(
					new_date,
					[{ day: "numeric" }, { month: "short" }],
					" "
				);
			} else {
				nextDayTip = "";
			}
			// card
			hourlyPlaceholder.innerHTML += `
<div class="flex flex-col justify-end items-center px-2  scroll-ml-3 snap-start">
    <div class="date text-xs text-gray- dark:text-cosmic-500 pb-1 truncate">${nextDayTip}</div>
    <div class="icon w-11 h-11 bg-white dark:bg-cosmic-900 dark:bg-gradient-to-br dark:from-[#192D52] dark:to-[#112645] rounded-xl flex justify-center items-center relative">
        <img class="w-6 h-6" src="img/assets/icons/weather-conditions/small/${
			data.icon
		}.svg" alt="" srcset="">
        ${
			Math.round(data.precipprob) > 20
				? '<div class="absolute bg-gray-100 dark:bg-cosmic-900 p-[5px] -bottom-2 -right-2 text-xxs text-gray-300 dark:text-cosmic-300 rounded-3xl">' +
				  Math.ceil(data.precipprob / 10) * 10 +
				  "%</div>"
				: ""
		}
    </div>
    <div class="time font-light text-xs text-gray-300 dark:text-cosmic-400 pt-3">${time}</div>
    <div class="temp font-semibold text-lg leading-5 pt-1">${Math.round(
		tempConverter(data.temp)
	)}°</div>
</div>`;
		}
		leftHours = nHours - leftHours;
	}
}

function renderDailyForecast(id, weatherData, days = 10, monthly = false) {
	const section_id = monthly ? "#monthly" : ".daily";
	if (monthly) {
		slideDailyForecastContainer = document.querySelector(section_id);
	} else {
		slideDailyForecastContainer = document
			.querySelector(`#slide-${id}`)
			.querySelector(section_id);
	}
	slideDailyForecastContainer.innerHTML = ``;
	const time_offset =
		weatherData.tzoffset + user_date.getTimezoneOffset() / 60;
	const location_date = new Date(user_date);
	location_date.setHours(location_date.getHours() + time_offset);
	const currentWeather =
		weatherData.days[0].hours[
			Number(join(location_date, [{ hour: "numeric" }], "-"))
		];
	const currentTemperature = Math.round(tempConverter(currentWeather.temp));
	let tempRange = minMax(weatherData.days, days);
	let weekTempdelta = tempRange.tempmax - tempRange.tempmin;
	// console.log(weatherData)
	// console.log(tempRange)

	for (let i = 0; i < days; i++) {
		if (weatherData.days[i].temp !== null) {
			let tempmin = Math.round(
				tempConverter(weatherData.days[i].tempmin)
			);
			let tempmax = Math.round(
				tempConverter(weatherData.days[i].tempmax)
			);
			let currentDayTempDelta = tempmax - tempmin;
			let currentTempShift = currentTemperature - tempmin;

			let d = [{ day: "numeric" }, { month: "short" }];
			let w = [{ weekday: "short" }];
			let date = join(new Date(weatherData.days[i].datetime), d, " ");
			let weekday = join(new Date(weatherData.days[i].datetime), w, "-");
			if (weekday == "сб" || weekday == "вс") {
				color = "text-primary-dark";
			} else {
				color = "text-white";
			}
			if (i === 0) {
				data = "Сегодня";
			} else if (i === 1) {
				data = "Завтра";
			} else {
				data = weekday + "</span><span>, " + date + "</span>";
			}
			let gradientWidth = Math.round(
				(100 * (tempmax - tempmin)) / weekTempdelta
			);
			let dot = "";
			if (i == 0) {
				dot = `<div class="absolute h-[8px] w-[8px] -top-[2px] rounded-full bg-[#6390F0] dark:bg-white border-[1.5px] border-gray-100 dark:border-cosmic-900" style="left: calc(${Math.round(
					(100 * currentTempShift) / currentDayTempDelta
				)}%);"></div>`;
			}
			slideDailyForecastContainer.innerHTML +=
				`
                <div class="w-full py-[2px] font-light flex flex-nowrap gap-5 items-center">
                    <div class="small-icon w-[52px] h-[52px] shrink-0 bg-white dark:bg-cosmic-900 dark:bg-gradient-to-br dark:from-[#192D52] dark:to-[#112645] rounded-2xl py-1 relative">
                        <img class="w-[44px] h-[44px] mx-auto" src="img/assets/icons/weather-conditions/${
							weatherData.days[i].icon
						}.svg" alt="">
                        ${
							Math.round(weatherData.days[i].precipprob) > 20
								? '<div class="absolute bg-gray-100 dark:bg-cosmic-900 p-[5px] -bottom-2 -right-2 text-xxs text-gray-300 dark:text-cosmic-300 rounded-3xl">' +
								  Math.ceil(
										weatherData.days[i].precipprob / 10
								  ) *
										10 +
								  "%</div>"
								: ""
						}
                    </div>
                    <div class="w-28 shrink-0 flex flex-col gap-1 justify-center">
                        <div class="text-sm leading-[17px]  dark:text-white">
                            <span class="capitalize">${data}</span>
                        </div>
                        <div class="text-xs leading-[14px] text-gray-300 dark:text-cosmic-400">${
							weatherData.days[i].conditions
						}
                        </div>
                    </div>
                    <div class="my-4 w-full">
                        <div id="labels" class="flex justify-between mx-auto pb-2 leading-5">
                            <div class="text-gray-300 dark:text-cosmic-400">${tempmin}°</div>
                            <div>${tempmax}°</div>
                        </div>
                        <div class="relative h-1 rounded-md bg-[#D4D4D4]/40 dark:bg-cosmic-800">
                            <div class="absolute h-full rounded-md bg-gradient-to-l from-[#647DFF] to-[#14CDFF] dark:from-[#DEDEDE] dark:to-[#3FD5FE]"
                                style="left: ${
									(100 * (tempmin - tempRange.tempmin)) /
									weekTempdelta
								}%; width: ${gradientWidth}%">` +
				dot +
				`</div>
                        </div>
                    </div>
                </div>`;
		} else {
			slideDailyForecastContainer.innerHTML += `<strong>Прогноз на следующие дни недоступен для данной локации</strong>`;
			i = days;
		}
	}
}

function renderMonthlyForecast(id) {
	weatherData = JSON.parse(localStorage.getItem(`weatherData-${id}`));
	renderDailyForecast(id, weatherData, 30, true);
}

function renderTenDaysDetailedForecastDaylist(el, selectedDay = 0) {
	const section = el.querySelector(".ten-days-forecast-detailed--dates");
	// section.innerHTML = ''
	// console.log(section)
	const currentDay = join(user_date, [{ day: "numeric" }]);

	date = new Date(user_date);
	let day = join(date, [{ day: "numeric" }]);
	section.setAttribute("x-data", `{ day: '${day}' }`);
	// console.log( currentDay)
	for (i = 0; i < 10; i++) {
		day = join(date, [{ day: "numeric" }]);
		weekday = join(date, [{ weekday: "short" }], "-").toLowerCase();
		section.innerHTML += `<div
        class="day flex flex-col gap-1 items-center snap-start dark:text-white 
        w-10 h-14 rounded-lg px-2.5 py-2 transition-500"
        @click="day = '${day}'; console.log($el.offsetLeft); offset = $el.offsetLeft"
        :class="{ 'text-white dark:text-cosmic-900': day === '${day}' }">
        <div class="font-bold text-xs">${weekday}</div>
        <div class="font-semibold text-base leading-5">
        ${day}</div>
        </div>`;
		date.setHours(user_date.getHours() + 24);
	}
	days = section.querySelectorAll(".day");
	days.forEach((day, index) => {
		day.onclick = () => {
			console.log(day.children[1].innerText.trim());
			console.log(index);
			// renderTenDaysDetailedForecastDaylist(weatherData, day.innerText.trim())
			renderTenDaysDetailedForecastWeather(el, weatherData, index);
		};
	});
}

function renderTenDaysDetailedForecastWeather(el, weatherData, day = 0) {
	console.log(el);
	const user_date = new Date();
	const section = el.querySelector(".ten-days-forecast-detailed--wrapper");
	const time_offset =
		weatherData.tzoffset + user_date.getTimezoneOffset() / 60;
	const location_date = new Date(user_date);
	location_date.setHours(location_date.getHours() + time_offset);
	let sunrise_time = new Date(weatherData.days[day].sunriseEpoch * 1000);
	sunrise_time = new Date(sunrise_time);
	sunrise_time.setHours(sunrise_time.getHours() + time_offset);
	let sunset_time = new Date(weatherData.days[day].sunsetEpoch * 1000);
	sunset_time = new Date(sunset_time);
	sunset_time.setHours(sunset_time.getHours() + time_offset);
	let dayLight_time = new Date(sunset_time);
	dayLight_time.setTime(sunset_time.getTime() - sunrise_time.getTime());
	dayLight_time.setHours(
		dayLight_time.getHours() + user_date.getTimezoneOffset() / 60
	);
	sun_position = sunPositionDegree(
		sunrise_time,
		dayLight_time,
		location_date
	);

	section.innerHTML = "";
	let hour = 8;
	dayParts[lang].forEach((part) => {
		try {
			weather = weatherData.days[day].hours[hour];
		} catch (error) {
			console.log(error);
			section.innerText = "Ошибка получения данных (((";
		}
		// console.log(weather)
		const winddir = windDegreeToString(weather.winddir);
		section.innerHTML += `<section class="mx-4">
        <header class="ml-4 mb-2 text-sm text-gray-300 dark:text-cosmic-500">${part} (${hour}:00)</header>
        <div class="flex flex-col gap-4  w-full rounded-2xl p-4 
            bg-white dark:bg-gradient-to-tr dark:from-[#112645] dark:to-[#192D52]">
            <div class="flex gap-2.5 justify-between">
                <div class="flex flex-col gap-2">
                    <div class="flex gap-4 items-center">
                        <div class="font-semibold text-2xl leading-7">${Math.round(
							weather.temp
						)}°</div>
                        <div class="flex items-end gap-1 font-semibold text-base leading-5">
                            <img class="w-5 h-5" src="img/assets/icons/feels-like.svg" alt="">
                            <div>${Math.round(weather.feelslike)}°</div>
                        </div>
                    </div>
                    <div class="text-sm">${weather.conditions}</div>
                </div>
                <div>
                <img class="w-14 h-14" src="img/assets/icons/weather-conditions/${
					weather.icon
				}.svg" alt="" srcset="">
                </div>
            </div>
            <div class="flex gap-4">
                <div class="flex gap-1.5 items-center">
                    <img class="w-4 h-4" src="img/assets/icons/clarity_compass-line.svg" alt="">
                    <div class="text-sm leading-4">${Math.round(
						windConverter(weather.windspeed)
					)} ${s_wind}, ${winddir}</div>
                </div>
                <div class="flex gap-1.5 items-center">
                    <img class="w-4 h-4" src="img/assets/icons/wi_barometer.svg" alt="">
                    <div class="text-sm leading-4">${Math.round(
						pressureConverter(Number(weather.pressure))
					)} ${s_pressure}</div>
                </div>
                <div class="flex gap-1.5 items-center">
                    <img class="w-4 h-4" src="img/assets/icons/ion_water-outline.svg" alt="">
                    <div class="text-sm leading-4">${Math.round(
						weather.humidity
					)}%</div>
                </div>
            </div>
            ${
				weather.precipprob > 50
					? `<div class="flex gap-1.5 items-center">
            <img class="w-4 h-4" src="img/assets/icons/rain-percent.svg" alt="">
            <div class="text-sm leading-4">Вероятность осадков ${Math.round(
				weather.precipprob
			)}%</div>
        </div>`
					: ""
			}
            
        </div>
    </section>`;
		hour += 5;
	});
	section.innerHTML += `<section class="mx-4">
    <header class="ml-4 mb-2 text-sm text-gray-300 dark:text-cosmic-500">Небесные светила</header>
    <div
        class="relative flex flex-col gap-4 bg-white dark:bg-gradient-to-tr dark:from-[#112645] dark:to-[#192D52] w-full h-[120px] rounded-2xl p-4">
        <div id="details-1" class="relative w-full grid grid-flow-col justify-around items-end h-[88px]">
            <div class="absolute detail-item overflow-hidden w-full h-full flex justify-center">
                <div class="absolute w-[150px] h-[75px] bottom-2">
                    <div
                        class="w-full h-full border border-b-0 border-dashed rounded-t-full border-[#6390F0]/60 dark:border-cyan/60">
                    </div>
                    <div
                        class="sky -rotate-45 absolute top-0 w-full h-full origin-bottom
                    border border-b-0 border-solid rounded-t-full border-cosmic-400 dark:border-cyan bg-gradient-to-b from-[#EDF8FF] dark:from-[#0F3C5C] to-transparent">
                    </div>
                    <div class="w-[150px] h-2 bg-white dark:bg-cosmic-800 absolute"></div>
                    <div
                        class="w-2 h-2 rounded-full bg-cosmic-400 dark:bg-cyan -bottom-[4px] -left-[4px] absolute">
                    </div>
                    <div
                        class="w-2 h-2 rounded-full bg-cosmic-400 dark:bg-cyan -bottom-[4px] -right-[4px] absolute">
                    </div>
                    <div class="sun -rotate-45 left-1/2 w-1/2 origin-left absolute">
                        <div
                            class="w-[7.5px] h-[7.5px] rounded-full bg-primary-dark outline-[5px] outline outline-white dark:outline-cosmic-800 outline-offset-0 -bottom-[4px] -right-[4px] absolute">
                        </div>
                        <svg class="w-[18px] h-[18px] rounded-full -bottom-[9px] -right-[9px] absolute"
                            width="18" height="18" viewBox="0 0 18 18" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.17923 2.28564C9.28979 2.28564 9.39582 2.33174 9.47399 2.41379C9.55217 2.49583 9.59609 2.60711 9.59609 2.72314V3.59581C9.59609 3.71184 9.55217 3.82312 9.47399 3.90517C9.39582 3.98722 9.28979 4.03331 9.17923 4.03331C9.06867 4.03331 8.96264 3.98722 8.88446 3.90517C8.80628 3.82312 8.76236 3.71184 8.76236 3.59581V2.72314C8.76236 2.60711 8.80628 2.49583 8.88446 2.41379C8.96264 2.33174 9.06867 2.28564 9.17923 2.28564ZM15.4322 9.72314C15.5427 9.72314 15.6488 9.67705 15.7269 9.595C15.8051 9.51296 15.849 9.40168 15.849 9.28564C15.849 9.16961 15.8051 9.05833 15.7269 8.97629C15.6488 8.89424 15.5427 8.84814 15.4322 8.84814H14.6001C14.4896 8.84814 14.3835 8.89424 14.3053 8.97629C14.2272 9.05833 14.1833 9.16961 14.1833 9.28564C14.1833 9.40168 14.2272 9.51296 14.3053 9.595C14.3835 9.67705 14.4896 9.72314 14.6001 9.72314H15.4322ZM9.17923 14.538C9.28979 14.538 9.39582 14.5841 9.47399 14.6661C9.55217 14.7482 9.59609 14.8594 9.59609 14.9755V15.8481C9.59609 15.9642 9.55217 16.0755 9.47399 16.1575C9.39582 16.2396 9.28979 16.2856 9.17923 16.2856C9.06867 16.2856 8.96264 16.2396 8.88446 16.1575C8.80628 16.0755 8.76236 15.9642 8.76236 15.8481V14.9755C8.76236 14.8594 8.80628 14.7482 8.88446 14.6661C8.96264 14.5841 9.06867 14.538 9.17923 14.538ZM3.76 9.72314C3.87056 9.72314 3.97659 9.67705 4.05477 9.595C4.13295 9.51296 4.17687 9.40168 4.17687 9.28564C4.17687 9.16961 4.13295 9.05833 4.05477 8.97629C3.97659 8.89424 3.87056 8.84814 3.76 8.84814H2.92628C2.81572 8.84814 2.70969 8.89424 2.63151 8.97629C2.55333 9.05833 2.50941 9.16961 2.50941 9.28564C2.50941 9.40168 2.55333 9.51296 2.63151 9.595C2.70969 9.67705 2.81572 9.72314 2.92628 9.72314H3.76ZM4.29859 4.16339C4.37675 4.08146 4.48271 4.03545 4.59317 4.03545C4.70364 4.03545 4.8096 4.08146 4.88776 4.16339L5.72148 5.03839C5.79512 5.12133 5.83521 5.23102 5.8333 5.34437C5.8314 5.45771 5.78765 5.56585 5.71127 5.64601C5.63489 5.72617 5.53185 5.77208 5.42386 5.77408C5.31586 5.77608 5.21134 5.73401 5.13232 5.65673L4.29859 4.78173C4.22053 4.6997 4.17668 4.5885 4.17668 4.47256C4.17668 4.35662 4.22053 4.24543 4.29859 4.16339ZM4.88776 14.4067C4.80873 14.484 4.70422 14.5261 4.59622 14.5241C4.48822 14.5221 4.38518 14.4762 4.30881 14.396C4.23243 14.3158 4.18868 14.2077 4.18678 14.0944C4.18487 13.981 4.22496 13.8713 4.29859 13.7884L5.13232 12.9134C5.21134 12.8361 5.31586 12.794 5.42386 12.796C5.53185 12.798 5.63489 12.844 5.71127 12.9241C5.78765 13.0043 5.8314 13.1124 5.8333 13.2258C5.83521 13.3391 5.79512 13.4488 5.72148 13.5317L4.88776 14.4067ZM14.0587 4.16339C13.9806 4.08146 13.8746 4.03545 13.7642 4.03545C13.6537 4.03545 13.5477 4.08146 13.4696 4.16339L12.6359 5.03839C12.5622 5.12133 12.5221 5.23102 12.524 5.34437C12.5259 5.45771 12.5697 5.56585 12.6461 5.64601C12.7224 5.72617 12.8255 5.77208 12.9335 5.77408C13.0415 5.77608 13.146 5.73401 13.225 5.65673L14.0587 4.78173C14.1368 4.6997 14.1807 4.5885 14.1807 4.47256C14.1807 4.35662 14.1368 4.24543 14.0587 4.16339ZM13.4701 14.4073C13.5083 14.4503 13.5543 14.4848 13.6055 14.5087C13.6566 14.5326 13.7118 14.5455 13.7678 14.5465C13.8237 14.5475 13.8793 14.5367 13.9312 14.5147C13.9831 14.4927 14.0303 14.46 14.0699 14.4184C14.1095 14.3769 14.1407 14.3274 14.1616 14.2729C14.1826 14.2184 14.1929 14.1601 14.1919 14.1013C14.1909 14.0426 14.1787 13.9847 14.1559 13.931C14.1331 13.8773 14.1003 13.829 14.0593 13.789L13.2256 12.914C13.1874 12.871 13.1414 12.8365 13.0903 12.8126C13.0391 12.7887 12.9839 12.7758 12.928 12.7748C12.872 12.7738 12.8164 12.7846 12.7645 12.8066C12.7126 12.8286 12.6654 12.8613 12.6258 12.9029C12.5862 12.9444 12.555 12.9939 12.5341 13.0484C12.5131 13.1029 12.5028 13.1612 12.5038 13.2199C12.5048 13.2787 12.517 13.3366 12.5398 13.3903C12.5626 13.444 12.5955 13.4923 12.6364 13.5323L13.4701 14.4073Z"
                                fill="#FEB800" />
                        </svg>
                    </div>
                </div>
            </div>

            <div class="detail-item w-full flex flex-col items-center">
                <img class="w-6 h-6" src="img/assets/icons/sunrise.svg" alt="">
                <div class="mb-[6px] text-xs text-gray-300 dark:text-cosmic-400">Восход</div>
                <div class="sunrise font-semibold leading-5">${getTime2Digits(
					sunrise_time
				)}</div>
            </div>
            <div class="detail-item w-[150px] flex flex-col items-center grow z-10">
                <div class="mb-[6px] text-xs text-gray-300 dark:text-cosmic-400">Световой день</div>
                <div class="daylight font-semibold leading-5">${dayLight_time.getHours()} ч ${dayLight_time.getMinutes()} мин</div>
            </div>
            <div class="detail-item w-full flex flex-col items-center">
                <img class="w-6 h-6" src="img/assets/icons/sunset.svg" alt="">
                <div class="mb-[6px] text-xs text-gray-300 dark:text-cosmic-400">Закат</div>
                <div class="sunset font-semibold leading-5">${getTime2Digits(
					sunset_time
				)}</div>
            </div>
        </div>
    </div>
</section>
<section class="mx-8 flex gap-2.5">
    <img class="w-6 h-6" src="img/assets/icons/weather-conditions/clear-night.svg">
    <div>Убывающая луна</div>
</section>`;
	sun = section.querySelector(".sun");
	sky = section.querySelector(".sky");

	if (sun_position < -180 || sun_position > 0) {
		sun.classList.add("hidden");
		sky.classList.add("hidden");
	} else {
		sun.classList.remove("hidden");
		sky.classList.remove("hidden");
		sun.style.webkitTransform = "rotate(" + sun_position + "deg)";
		sun.style.mozTransform = "rotate(" + sun_position + "deg)";
		sun.style.msTransform = "rotate(" + sun_position + "deg)";
		sun.style.oTransform = "rotate(" + sun_position + "deg)";
		sun.style.transform = "rotate(" + sun_position + "deg)";
		sky.style.webkitTransform = "rotate(" + sun_position + "deg)";
		sky.style.mozTransform = "rotate(" + sun_position + "deg)";
		sky.style.msTransform = "rotate(" + sun_position + "deg)";
		sky.style.oTransform = "rotate(" + sun_position + "deg)";
		sky.style.transform = "rotate(" + sun_position + "deg)";
	}
}

function windDegreeToString(degree) {
	// Wind direction calc
	let winddir = Math.round(Number(degree));
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

// function sunPositionDegreeOld(sunrise_time, dayLight_time, location_date) {
// 	const daytimeInMinutes =
// 		dayLight_time.getHours() * 60 + dayLight_time.getMinutes();
// 	const sunriseInMinutes =
// 		sunrise_time.getHours() * 60 + sunrise_time.getMinutes();
// 	const currentTimeInMinutes =
// 		location_date.getHours() * 60 + location_date.getMinutes();
// 	const deltaInMinutes = currentTimeInMinutes - sunriseInMinutes;
// 	const deltaInPersentage = (deltaInMinutes * 100) / daytimeInMinutes;
// 	let deltaDegrees = Math.round(-180 + (180 * deltaInPersentage) / 100);
// 	return deltaDegrees;
// }

// sun position in degrees
function sunPositionDegree(sunriseEpoch, sunsetEpoch, sunPositionEpoch) {
	sunrise = moment.unix(sunriseEpoch);
	sunPosition = moment.unix(sunPositionEpoch);
	daylightInMinutes = moment
		.duration(moment.unix(sunsetEpoch).diff(sunrise))
		.as("minutes");
	sunPositionInMinutes = moment
		.duration(sunPosition.diff(sunrise))
		.as("minutes");
	deltaInPercentage = (sunPositionInMinutes * 100) / daylightInMinutes;
	deltaInDegrees = Math.round(-180 + (180 * deltaInPercentage) / 100);
	if (deltaInDegrees > 0 || deltaInDegrees < -180) {
		deltaInDegrees = false;
	}
	return deltaInDegrees;
}
