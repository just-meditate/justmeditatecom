const counter = document.querySelector('.counter');

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

startTimer();

const resetTimer = () => {
  clearInterval(timerInterval);

  timer = 0;
  counter.innerText = timer;
  circle.setAttribute('r', circleRad);

  startTimer();
};

// event listeners to reset timer.
document.addEventListener('mousemove', resetTimer);
document.addEventListener('keydown', resetTimer);
document.addEventListener('visibilitychange', resetTimer);
