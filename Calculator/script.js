const items = document.querySelectorAll('.item');
const input = document.getElementById('input');
const clean = document.querySelector('.clean');
const back = document.querySelector('.back');
const equal = document.querySelector('.equal');
const multiply = document.querySelector('.multiply');
const division = document.querySelector('.division');


for (let item of items) {
   item.addEventListener('click', () => {
      let number = item.innerHTML;
      input.value = input.value + number;
   })
}

clean.addEventListener('click', () => {
   input.value = '';
})

back.addEventListener('click', () => {
   let exp = input.value;
   input.value = exp.substring(0, exp.length - 1);
})

equal.addEventListener('click', () => {
   let exp = input.value;
   if (exp) {
      input.value = eval(exp);
   }
})