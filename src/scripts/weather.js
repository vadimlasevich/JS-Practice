const hour = document.querySelector('.time__hour');
const minutes = document.querySelector('.time__minutes');
const seconds = document.querySelector('.time__seconds');
const date = document.querySelector('.date__number');
const month = document.querySelector('.date__month');
const year = document.querySelector('.date__year');

const inputButton = document.querySelector('.location__button');
const input = document.querySelector('.location__input');
const city = document.querySelector('.main-block__city-name');
const temperature = document.querySelector('.main-block__temperature');
const iconWeather = document.querySelector('.main-block__icon-weather');
const iconDescription = document.querySelector('.main-block__icon-description');
const messageError = document.querySelector('.message-error');
const radioButtonCelsius = document.querySelector('.location__temperature-celsius');
const radioButtonFahrenheit = document.querySelector('.location__temperature-fahrenheit');
const radioButtons = document.querySelectorAll('.location__temperature-btn');

const kelvin = 273;
const apiKey = "527d4b39cceaa23fab450417f1ce50ac";
let api;

api = `http://api.openweathermap.org/data/2.5/weather?q=Brest&lang=ru&appid=527d4b39cceaa23fab450417f1ce50ac`;

fetch(api)
	.then(function (resp) { return resp.json() })
	.then(function (data) {
		city.textContent = data.name;
		iconDescription.textContent = data.weather[0].description;
		iconWeather.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
		if (radioButtonCelsius.checked === true) {
			temperature.innerHTML = Math.floor(data.main.temp - kelvin) + '&deg';
		}
		if (radioButtonFahrenheit.checked === true) {
			temperature.innerHTML = Math.floor((data.main.temp - kelvin) * 9 / 5 + 32) + ' F';
		}

		radioButtonCelsius.addEventListener('click', () => {
			if (radioButtonCelsius.checked === true) {
				temperature.innerHTML = Math.floor(data.main.temp - kelvin) + '&deg';
			}
		})
		radioButtonFahrenheit.addEventListener('click', () => {
			if (radioButtonFahrenheit.checked === true) {
				temperature.innerHTML = Math.floor((data.main.temp - kelvin) * 9 / 5 + 32) + ' F';
			}
		})
	})

function clickButton() {
	let value = input.value;
	api = `http://api.openweathermap.org/data/2.5/weather?q=${value}&lang=ru&appid=527d4b39cceaa23fab450417f1ce50ac`;

	fetch(api)
		.then(function (resp) { return resp.json() })
		.then(function (data) {
			city.textContent = data.name;
			iconDescription.textContent = data.weather[0].description;
			iconWeather.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;

			if (radioButtonCelsius.checked === true) {
				temperature.innerHTML = Math.floor(data.main.temp - kelvin) + '&deg';
			}
			if (radioButtonFahrenheit.checked === true) {
				temperature.innerHTML = Math.floor((data.main.temp - kelvin) * 9 / 5 + 32) + ' F';
			}
		})
		.catch(function () {
			errorMessage()
		});
	messageError.style.display = 'none';
}

function errorMessage() {
	messageError.style.display = 'block';

	api = `http://api.openweathermap.org/data/2.5/weather?q=Brest&appid=527d4b39cceaa23fab450417f1ce50ac`;

	fetch(api)
		.then(function (resp) { return resp.json() })
		.then(function (data) {
			console.log(data)
			city.textContent = data.name;
			temperature.innerHTML = Math.floor(data.main.temp - kelvin) + '&deg';
			iconDescription.textContent = data.weather[0].description;
			iconWeather.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
		})
}

function moveTime() {
	let time = new Date();

	let hr = time.getHours();
	let min = time.getMinutes();
	let sec = time.getSeconds();
	let dat = time.getDate();
	let yer = time.getFullYear();
	let mon = new Date().toLocaleString('ru', { month: 'long' });

	hour.textContent = `${hr < 10 ? '0' : ''}${hr}`;
	minutes.textContent = `:${min < 10 ? '0' : ''}${min}`;
	seconds.textContent = `:${sec < 10 ? '0' : ''}${sec}`;
	date.textContent = dat;
	year.textContent = yer;

	switch (mon) {
		case 'январь':
			mon = mon.replace(/.$/, 'я');
			month.textContent = mon;
			break;
		case 'февраль':
			mon = mon.replace(/.$/, 'я');
			dateMonth.textContent = mon;
			break;
		case 'март':
			mon = mon + 'а';
			month.textContent = mon;
			break;
		case 'апрель':
			mon = mon.replace(/.$/, 'я');
			month.textContent = mon;
			break;
		case 'май':
			mon = mon.replace(/.$/, 'я');
			month.textContent = mon;
			break;
		case 'июнь':
			mon = mon.replace(/.$/, 'я');
			month.textContent = mon;
			break;
		case 'июль':
			mon = mon.replace(/.$/, 'я');
			month.textContent = mon;
			break;
		case 'август':
			mon = mon + 'а';
			month.textContent = mon;
			break;
		case 'сентябрь':
			mon = mon.replace(/.$/, 'я');
			month.textContent = mon;
			break;
		case 'октябрь':
			mon = mon.replace(/.$/, 'я');
			month.textContent = mon;
			break;
		case 'ноябрь':
			mon = mon.replace(/.$/, 'я');
			month.textContent = mon;
			break;
		case 'декабрь':
			mon = mon.replace(/.$/, 'я');
			month.textContent = mon;
			break;
	}
}

setInterval(moveTime, 1000);
inputButton.addEventListener('click', clickButton);