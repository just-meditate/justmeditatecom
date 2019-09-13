const counter = document.querySelector('.counter');
const circle = document.querySelector('#circle');
const circleRad = circle.getAttribute('r');

let cr = parseInt(circleRad, 10.0);
let timer = 0,
  timerInterval;

// call mytimer function every sec.
const myTimer = () => {
  timer = timer + 1;
  counter.innerText = timer;

  if (timer > 15) {
    cr += 0.15;
    circle.setAttribute('r', cr.toFixed(2));
  }
};

const startTimer = () => (timerInterval = setInterval(myTimer, 1000));

const resetTimer = () => {
  clearInterval(timerInterval);

  timer = 0;
  counter.innerText = timer;
  circle.setAttribute('r', circleRad);

  startTimer();
};
