const timerButtons = document.getElementById('timer__buttons');
const timerBtn = document.querySelectorAll('.timer__btn');
const timerBtnFirst = document.querySelectorAll('.timer__btn-first');
const settingBtn = document.querySelector('.header__btn');
const modalWindow = document.querySelector('.setting-modal');
const overlay = document.querySelector('.timer__overlay');
const modalWindowBtn = document.querySelector('.setting-modal__btn');
const timeEl = document.querySelector('.time');
const timerButtonStart = document.querySelector('.timer__button-start');
const timerButtonPause = document.querySelector('.timer__button-pause');
const timerButtonProceed = document.querySelector('.timer__button-proceed');
const timerButtonStop = document.querySelector('.timer__button-stop');
const valueTimeBig = document.querySelector('.value__time-big');
const valueTimeMin = document.querySelector('.value__time-min');
const valueTimeMid = document.querySelector('.value__time-mid');
const messege = document.querySelector('.timer__messege');
const settingInput = document.querySelectorAll('.parameters-item__input');
const pauseBtn = document.querySelector('.pause');
const bell = document.querySelector('audio');

let inputBigTime = document.querySelector('.input-big-time');
let inputMinTime = document.querySelector('.input-min-time');
let inputMidTime = document.querySelector('.input-mid-time');
let time = inputBigTime.value * 60;
let relaxTime;
let relaxBigTime;
let workTime;
let clockRun = false;
let type = "Work";

// modal window
const closeModalWindow = () => {
   modalWindow.classList.remove('active');
}

settingBtn.addEventListener('click', () => {
   modalWindow.classList.add('active');
})

modalWindowBtn.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);
// modal window

const changeBtn = elem => {
   for (btn of timerBtn) {
      btn.classList.remove('active');
   }
   elem.classList.add('active');

   if (elem.getAttribute('value') === '2') {
      valueTimeMin.style.display = 'block';
      valueTimeBig.style.display = 'none';
      valueTimeMid.style.display = 'none';
      colorScreenMinTime();
      setMinTimeFirst(inputMinTime.value);
      time = inputMinTime.value * 60;
   } else if (elem.getAttribute('value') === '3') {
      valueTimeMid.style.display = 'block';
      valueTimeBig.style.display = 'none';
      valueTimeMin.style.display = 'none';
      colorScreenMiddleTime();
      setMidTimeFirst(inputMidTime.value);
      time = inputMidTime.value * 60;
   } else if (elem.getAttribute('value') === '1') {
      valueTimeBig.style.display = 'block';
      valueTimeMid.style.display = 'none';
      valueTimeMin.style.display = 'none';
      colorScreenBigTime();
      setBigTimeFirst(inputBigTime.value);
      time = inputBigTime.value * 60;
   }
}

const colorScreenBigTime = () => {
   document.getElementById('section-timer').style.background = '';
   document.querySelector('.header__btn').style.background = '';
   document.querySelector('.timer__wpapper').style.background = '';
   timerButtonStart.style.color = '';
   timerButtonStop.style.color = '';
   timerButtonPause.style.color = '';
   timerButtonProceed.style.color = '';
   messege.innerHTML = `Время работать!`;
   for (btn of timerBtn) {
      btn.style.background = '';
   }
}

const colorScreenMinTime = () => {
   document.getElementById('section-timer').style.background = 'rgb(59, 189, 206)';
   document.querySelector('.header__btn').style.background = 'rgb(123, 224, 238)';
   document.querySelector('.timer__wpapper').style.background = 'rgb(123, 224, 238)';
   timerButtonStart.style.color = 'rgb(59, 189, 206)';
   timerButtonStop.style.color = 'rgb(59, 189, 206)';
   timerButtonPause.style.color = 'rgb(59, 189, 206)';
   timerButtonProceed.style.color = 'rgb(59, 189, 206)';
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
   document.getElementById('section-timer').style.background = 'rgb(41, 114, 173)';
   document.querySelector('.header__btn').style.background = 'rgb(66, 146, 211)';
   document.querySelector('.timer__wpapper').style.background = 'rgb(66, 146, 211)';
   document.querySelector('.timer__btn.active').style.background = 'rgb(41, 114, 173)';
   timerButtonStart.style.color = 'rgb(41, 114, 173)';
   timerButtonStop.style.color = 'rgb(41, 114, 173)';
   timerButtonPause.style.color = 'rgb(41, 114, 173)';
   timerButtonProceed.style.color = 'rgb(41, 114, 173)';
   messege.innerHTML = `Время перерыва!`;
   for (btn of timerBtn) {
      if (btn.classList.contains('active')) {
         document.querySelector('.timer__btn.active').style.background = 'rgb(41, 114, 173)';
      } else {
         btn.style.background = 'rgb(66, 146, 211)';
      }
   }
}

const setBigTimeFirst = (value) => {
   valueTimeBig.innerHTML = value;
}

const setMinTimeFirst = (value) => {
   valueTimeMin.innerHTML = value;
}

const setMidTimeFirst = (value) => {
   valueTimeMid.innerHTML = value;
}

const setTime = (value) => {
   timeEl.innerHTML = value;
}

const changeInput = () => {
   inputBigTime.addEventListener('change', () => {
      let inputBigTimeVal = inputBigTime.value;
      inputBigTime.dataset.time = inputBigTimeVal * 60;
      setBigTimeFirst(inputBigTimeVal);
      time = inputBigTime.value * 60;
   })
   inputMinTime.addEventListener('change', () => {
      let inputMinTimeVal = inputMinTime.value;
      inputMinTime.dataset.time = inputMinTimeVal * 60;
      setMinTimeFirst(inputMinTimeVal);
   })
   inputMidTime.addEventListener('change', () => {
      let inputMidTimeVal = inputMidTime.value;
      inputMidTime.dataset.time = inputMidTimeVal * 60;
      setMidTimeFirst(inputMidTimeVal);
   })
}

const toggleClock = (reset) => {
   if (reset) {
      stopTimer();
   } else if (clockRun === true) {
      clockRun = false;
      clearInterval(clockTimer);
   } else {
      clockRun = true;
      clockTimer = setInterval(() => {
         stepDown();
         timer();
      }, 1000);
   }
};

const timer = () => {
   let minutes = Math.floor(time / 60);
   let seconds = Math.floor(time % 60);
   const display = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
   minutes = minutes < 10 ? "0" + minutes : minutes;
   seconds = seconds < 10 ? "0" + seconds : seconds;
   setTime(display);
}

const stopTimer = () => {
   for (btn of timerBtn) {
      if (btn.classList.contains('active')) {
         if (btn.getAttribute('value') === '1') {
            clearInterval(clockTimer);
            time = workTime;
            timer();
         } else if (btn.getAttribute('value') === '2') {
            clearInterval(clockTimer);
            time = relaxTime;
            timer();
         } else {
            clearInterval(clockTimer);
            time = relaxBigTime;
            timer();
         }
      }
   }
};

const stepDown = () => {
   if (time > 0) {
      time--;
   } else if (time === 0) {
      bell.play();
   }
};

timerButtonStart.addEventListener('click', () => {
   timerButtonStart.style.display = 'none';
   timerButtonPause.style.display = 'block';
   timerButtonStop.style.display = 'block';

   workTime = inputBigTime.value * 60;
   relaxBigTime = inputMidTime.value * 60;
   relaxTime = inputMinTime.value * 60;

   for (let btn of timerBtn) {
      btn.addEventListener('click', () => {
         if (confirm('Время таймера будет остановленно!') === true) {
            timerButtonProceed.style.display = 'none';
            timerButtonPause.style.display = 'none';
            timerButtonStop.style.display = 'none';
            timerButtonStart.style.display = 'block';
            stopTimer();
         } else {
            stepDown();
         }
      })
   }
   toggleClock();
});

timerButtonPause.addEventListener('click', () => {
   timerButtonPause.style.display = 'none';
   timerButtonStop.style.display = 'block';
   timerButtonProceed.style.display = 'block';
   toggleClock();
});

timerButtonProceed.addEventListener('click', () => {
   timerButtonProceed.style.display = 'none';
   timerButtonPause.style.display = 'block';
   toggleClock();
})

timerButtonStop.addEventListener('click', () => {
   timerButtonProceed.style.display = 'none';
   timerButtonPause.style.display = 'none';
   timerButtonStop.style.display = 'none';
   timerButtonStart.style.display = 'block';
   toggleClock(true);
})

timerButtons.addEventListener('click', event => {
   changeBtn(event.target);
});

setBigTimeFirst(inputBigTime.value);
changeInput();