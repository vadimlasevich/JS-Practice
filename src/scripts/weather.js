const hour = document.querySelector('.time__hour');
const minutes = document.querySelector('.time__minutes');
const seconds = document.querySelector('.time__seconds');
const date = document.querySelector('.date__number');
const month = document.querySelector('.date__month');
const year = document.querySelector('.date__year');

const inputButton = document.querySelector('.location__button');
const input = document.querySelector('.location__input');
const city = document.querySelector('.main-block__city-name');

city.textContent = 'Брест';

function clickButton() {
    let value = input.value;
    city.textContent = value;
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
    month.textContent = mon;
    year.textContent = yer;
}

setInterval(moveTime, 1000);
inputButton.addEventListener('click', clickButton);