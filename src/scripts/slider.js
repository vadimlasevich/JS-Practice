const prev = document.querySelector('.btn-prev'),
   next = document.querySelector('.btn-next'),
   slides = document.querySelectorAll('.slide'),
   dots = document.querySelectorAll('.dot');

let index = 0;

const activeSlide = function (n) {
   for (slide of slides) {
      slide.classList.remove('active');
   }
   slides[n].classList.add('active');
};

const activeDot = function (n) {
   for (dot of dots) {
      dot.classList.remove('active');
   }
   dots[n].classList.add('active');
};

const prepareCurrentSlide = function (ind) {
   activeSlide(ind);
   activeDot(ind);
}

const nextSlide = function () {
   if (index == slides.length - 1) {
      index = 0;
      prepareCurrentSlide(index);
   } else {
      index++;
      prepareCurrentSlide(index);
   }
};

const prevSlide = function () {
   if (index == 0) {
      index = slides.length - 1
      prepareCurrentSlide(index);
   } else {
      index--;
      prepareCurrentSlide(index);
   }
};

dots.forEach(function (item, indexDot) {
   item.addEventListener('click', function () {
      index = indexDot;
      prepareCurrentSlide(index);
   })
})

next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);

// setInterval(nextSlide, 2000);   автоматическое переключение слайдера