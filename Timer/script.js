const timerBtn = document.querySelectorAll('.timer__btn');
const timerButtons = document.getElementById('timer__buttons');
const timeEl = document.querySelector('.time');
const timerButton = document.querySelector('.timer__button');

let time = 0;

timerButton.addEventListener('click', () => {
   startTimer();
})

timerButtons.addEventListener('click', event => {
   time = parseInt(event.target.getAttribute('data-time'));
   setTime(time);
   changeBtn(event.target);
})

const changeBtn = elem => {
   for (btn of timerBtn) {
      btn.classList.remove('active');
   }
   elem.classList.add('active');
}

const startTimer = () => {
   setInterval(decreaseTime, 1000);
}

const setTime = (value) => {
   timeEl.innerHTML = `${value}:00`;
}
const decreaseTime = () => {
   if (time === 0) {
      finichTime();
   } else {
      let current = --time;
      if (current < 10) {
         current = `0${current}`
      }
   }
   setTime(current);
}

const finichTime = () => {
   alert('!!!')
}