const timerBtn = document.querySelectorAll('.timer__btn');
const settingBtn = document.querySelector('.header__btn');
const modalWindow = document.querySelector('.setting-modal');
const overlay = document.querySelector('.overlay');
const modalWindowBtn = document.querySelector('.setting-modal__btn');
const timerButtons = document.getElementById('timer__buttons');
const timeEl = document.querySelector('.time');
const timerButtonStart = document.querySelector('.timer__button-start');
const timerButtonPause = document.querySelector('.timer__button-pause');
const timerButtonProceed = document.querySelector('.timer__button-proceed');
const valueFirst = document.querySelector('.value');
const messege = document.querySelector('.timer__messege');
const settingInput = document.querySelectorAll('.parameters-item__input');
const pauseBtn = document.querySelector('.pause');
let inputBigTime = document.querySelector('.input-big-time');
let inputMinTime = document.querySelector('.input-min-time');
let inputMidTime = document.querySelector('.input-mid-time');

let countdown;
let time = 0;

timerButtons.addEventListener('click', event => {
   changeBtn(event.target);
})

const changeBtn = elem => {
   for (btn of timerBtn) {
      btn.classList.remove('active');
   }
   elem.classList.add('active');

   if (elem.getAttribute('value') === '2') {
      colorScreenMinTime();
      setTimeFirst(inputMinTime.value);
      timer(inputMinTime.value * 60)
   } else if (elem.getAttribute('value') === '3') {
      colorScreenMiddleTime();
      setTimeFirst(inputMidTime.value);
      timer(inputMidTime.value * 60)
   } else {
      colorScreenBigTime();
      setTimeFirst(inputBigTime.value);
   }
}

const colorScreenBigTime = () => {
   document.body.style.background = '';
   document.querySelector('.header__btn').style.background = '';
   document.querySelector('.timer__wpapper').style.background = '';
   timerButtonStart.style.color = '';
   messege.innerHTML = `Время работать!`;
   for (btn of timerBtn) {
      btn.style.background = '';
   }
}

const colorScreenMinTime = () => {
   document.body.style.background = 'rgb(59, 189, 206)';
   document.querySelector('.header__btn').style.background = 'rgb(123, 224, 238)';
   document.querySelector('.timer__wpapper').style.background = 'rgb(123, 224, 238)';
   timerButtonStart.style.color = 'rgb(59, 189, 206)';
   messege.innerHTML = `Время перерыва!`;
   for (btn of timerBtn) {
      if (btn.classList.contains('active')) {
         document.querySelector('.timer__btn.active').style.background = 'rgb(59, 189, 206)';
      } else {
         btn.style.background = 'rgb(123, 224, 238)';
      }
   }
}

const colorScreenMiddleTime = () => {
   document.body.style.background = 'rgb(41, 114, 173)';
   document.querySelector('.header__btn').style.background = 'rgb(66, 146, 211)';
   document.querySelector('.timer__wpapper').style.background = 'rgb(66, 146, 211)';
   document.querySelector('.timer__btn.active').style.background = 'rgb(41, 114, 173)';
   timerButtonStart.style.color = 'rgb(41, 114, 173)';
   messege.innerHTML = `Время перерыва!`;
   for (btn of timerBtn) {
      if (btn.classList.contains('active')) {
         document.querySelector('.timer__btn.active').style.background = 'rgb(41, 114, 173)';
      } else {
         btn.style.background = 'rgb(66, 146, 211)';
      }
   }
}

const setTimeFirst = (value) => {
   valueFirst.innerHTML = value;
}

const setTime = (value) => {
   timeEl.innerHTML = value;
}

const changeInput = () => {
   setTimeFirst(inputBigTime.value);
   inputBigTime.addEventListener('change', () => {
      let inputBigTimeVal = inputBigTime.value;
      inputBigTime.dataset.time = inputBigTimeVal * 60;
      setTimeFirst(inputBigTimeVal);
      timer(inputBigTime.dataset.time);
   })
   inputMinTime.addEventListener('change', () => {
      let inputMinTimeVal = inputMinTime.value;
      inputMinTime.dataset.time = inputMinTimeVal * 60;
      setTimeFirst(inputMinTimeVal);
      timer(inputMinTime.dataset.time);
   })
   inputMidTime.addEventListener('change', () => {
      let inputMidTimeVal = inputMidTime.value;
      inputMidTime.dataset.time = inputMidTimeVal * 60;
      setTimeFirst(inputMidTimeVal);
      timer(inputMidTime.dataset.time);
   })
}

changeInput()

const timer = (seconds) => {
   timerButtonStart.addEventListener('click', () => {
      timerButtonStart.style.display = 'none';
      timerButtonPause.style.display = 'block';
      clearInterval(countdown);
      const now = Date.now();
      const then = now + seconds * 1000;
      decreaseTime(seconds);

      countdown = setInterval(() => {
         const seondsLeft = Math.round((then - Date.now()) / 1000);
         if (seondsLeft < 0) {
            clearInterval(countdown);
            return;
         }
         decreaseTime(seondsLeft);
      }, 1000);
   });
   timerButtonPause.addEventListener('click', () => {
      clearInterval(countdown);
      timerButtonPause.style.display = 'none';
      timerButtonStart.style.display = 'block';
      timerButtonStart.innerHTML = `Продолжить`
   });

}

timer(inputBigTime.value * 60)

const decreaseTime = (seconds) => {
   const minutes = Math.floor(seconds / 60);
   const sec = seconds % 60;
   const display = `${minutes}:${sec < 10 ? '0' : ''}${sec}`;

   setTime(display);
}

// modal window
settingBtn.addEventListener('click', () => {
   modalWindow.classList.add('active');
})

const closeModalWindow = () => {
   modalWindow.classList.remove('active');
}

modalWindowBtn.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);
// modal window



