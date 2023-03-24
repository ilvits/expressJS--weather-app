const languageStrings = {
	ru: {
		headers: {
			legend: "Обозначения",
		},
		common: {
			warning: "Внимание",
			buttons: {
				ok: "OK",
				cancel: "Отмена",
				add: "Добавить",
				reset: "Сбросить",
				delete: "Удалить",
				locations: "Мои локации",
				settings: "Настройки",
				weather: "Погода",
				addUserLocation: ["Найти мою геолокацию", "Ищем вас..."],
			},
		},
		datetime: {
			hourShort: "ч",
			minShort: "мин",
			now: "Сейчас",
			today: "Сегодня",
			tomorrow: "Завтра",
			morning: "Утром",
			noon: "Днем",
			evening: "Вечером",
			night: "Ночью",
			sunrise: "Восход",
			sunset: "Закат",
			daylight: "Световой день",
			moon: "Фаза луны",
		},
		weather: {
			feelslike: "Ощущается как",
			tempmax: "t° максимум",
			tempmin: "t° минимум",
			precipitation: "Осадки",
			precipprob: "Вероятность осадков",
			pressure: "Давление",
			wind: "Ветер",
			windgust: "Порывы ветра до",
			humidity: "Влажность",
			skylights: "Небесные светила",
			units: {
				pressure: ["мм рт. ст.", "гПа"],
				wind: ["м/с", "км/ч"],
				winddir: ["СВ", "СЗ", "ЮЗ", "ЮВ", "В", "С", "З", "Ю"],
			},
			moonphase: {
				new: "Новолуние",
				waxingcrescent: "Молодая луна",
				firstquarter: "Первая четверть",
				waxinggibbous: "Прибывающая луна",
				fullmoon: "Полнолуние",
				waninggibbous: "Убывающая луна",
				lastquarter: "Последняя четверть",
				waningcrescent: "Старая луна",
			},
		},
		slides: {
			header: {
				details: ["Подробнее", "Свернуть"],
			},
			headers: {
				tenDaysForecast: "Подробный прогноз на 10 дней",
				monthlyForecast: "Краткий прогноз на 30 дней",
			},
		},
		locations: {
			header: "Мои локации",
			searchPlaceholder: "Найти новую локацию",
			edit: ["Изм.", "Готово"],
			restoreName: "Вернуть оригинальное название",
		},
		settings: {
			header: "Настройки",
			temperature: "Градусы",
			wind: {
				label: "Скорость ветра",
			},
			pressure: {
				label: "Давление",
			},
			lang: {
				label: "Язык",
				switchOff: "РУС",
				switchOn: "ENG",
			},
			theme: {
				label: "Тема оформления",
				themes: ["Светлая", "Темная", "Системная"],
			},
			details: "Показывать подробный прогноз",
			about: {
				header: "О приложении",
				text: "<p>Будьте в курсе всех погодных условий и их изменений, где бы вы ни находились! Получайте информацию о температуре, влажности, атмосферном давлении и других факторах, влияющих на погоду, в режиме реального времени и стройте планы с уверенностью, что неподходящая погода их не испортит. </p> <p> Наше приложение просто в использовании, с интуитивно понятным интерфейсом и легким доступом к различным функциям, таким как составление списка избранных локаций, выбор единиц измерения, темы оформления, прогноз на 10 дней вперед и на месяц. </p> <p> Мы всегда рады обратной связи и готовы улучшать наше приложение в будущем, поэтому с нетерпением ждем ваших отзывов! </p>",
				links: [
					"Отправить отзыв",
					"Заказать дизайн и разработку",
					"Пожертвовать деньги",
				],
			},
			clearLocations: "Очистить список локаций",
			reset: "Сбросить настройки",
		},
		modal: {
			clearLocations: {
				text: "Вы уверены, что хотите удалить все добавленные вами локации?",
			},
			resetSettings: {
				text: "Вы уверены, что хотите сбросить все настройки приложения?",
			},
		},
	},
	en: {
		headers: {
			legend: "Abbreviations",
		},
		common: {
			warning: "Warning",
			buttons: {
				ok: "OK",
				cancel: "Cancel",
				add: "Add",
				reset: "Reset",
				delete: "Delete",
				locations: "My locations",
				settings: "Settings",
				weather: "Weather",
				addUserLocation: ["Add user location", "Searching..."],
			},
		},
		datetime: {
			hourShort: "h",
			minShort: "min",
			now: "Now",
			today: "Today",
			tomorrow: "Tomorrow",
			morning: "Morning",
			noon: "Noon",
			evening: "Evening",
			night: "Night",
			sunrise: "Sunrise",
			sunset: "Sunset",
			daylight: "Daylight",
			moon: "Moon Phase",
		},
		weather: {
			feelslike: "Feels like",
			tempmax: "t° maximum",
			tempmin: "t° minimum",
			precipitation: "Precipprob",
			precipprob: "Precipprob",
			pressure: "Pressure",
			wind: "Wind",
			windgust: "Wind gust",
			humidity: "Humidity",
			skylights: "Sky Lights",
			units: {
				pressure: ["mmHg", "hPa"],
				wind: ["m/s", "km/h"],
				winddir: ["NE", "NW", "SW", "SE", "E", "N", "W", "S"],
			},
			moonphase: {
				new: "New Moon",
				waxingcrescent: "Waxing Crescent",
				firstquarter: "First Quarter",
				waxinggibbous: "Waxing Gibbous",
				fullmoon: "Full Moon",
				waninggibbous: "Waning Gibbous",
				lastquarter: "Last Quarter",
				waningcrescent: "Waning Crescent",
			},
		},
		slides: {
			header: {
				details: ["Details", "Hide"],
			},
			headers: {
				tenDaysForecast: "10-day forecast",
				monthlyForecast: "Monthly Forecast",
			},
		},
		locations: {
			header: "My Locations",
			searchPlaceholder: "Find new location",
			edit: ["Edit", "Done"],
			restoreName: "Restore original name",
		},
		settings: {
			header: "Settings",
			temperature: "Degrees",
			wind: {
				label: "Wind",
			},
			pressure: {
				label: "Pressure",
			},
			lang: {
				label: "Language",
				switchOff: "РУС",
				switchOn: "ENG",
			},
			theme: {
				label: "Theme",
				themes: ["Light", "Dark", "System"],
			},
			details: "Show Details",
			about: {
				header: "About App",
				text: "<p>Be aware of all the weather conditions and their changes, wherever you are! Get real-time information about temperature, humidity, barometric pressure and other factors that affect the weather, and make plans with the confidence that the wrong weather won't ruin them. </p> <p> Our application is easy to use, with an intuitive interface and easy access to various features, such as listing your favorite locations, choosing units of measurement, themes, 10-day and monthly forecasts. </p> <p> We always welcome feedback and are ready to improve our application in the future, so we look forward to your feedback! </p>",
				links: [
					"Send review",
					"Заказать дизайн и разработку",
					"Donations",
				],
			},
			clearLocations: "Clear List of Locations",
			reset: "Reset Settings",
		},
		modal: {
			clearLocations: {
				text: "Are you sure you want to delete all the locations you added?",
			},
			resetSettings: {
				text: "Are you sure you want to reset all app settings?",
			},
		},
	},
};
