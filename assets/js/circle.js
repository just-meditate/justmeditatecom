// Circle
const counter = document.querySelector('.counter');
const circle = document.querySelector('#circle');
const circleRad = circle.getAttribute('r');

// Timer
let isPaused = false;
let cr = parseInt(circleRad, 10.0);
let timer = 0;
let timerInterval;

// call mytimer function every sec.
const myTimer = () => {
  timer = timer + 1;
  counter.innerText = timer;

  if (timer > 10) {
    cr += 0.10;
    circle.setAttribute('r', cr.toFixed(2));
  }

  if (timer > 10 && timer < 18) {
    increaseVol();
    audio.volume = vol;
  }

  if (timer === 45) startMedInstructionsToggle();

  if (timer === 640) endInstructions();
};

const resetTimer = () => {
  clearInterval(timerInterval);

  timer = 0;
  cr = parseInt(circleRad, 10.0);
  counter.innerText = timer;
  vol = 0.2;
  audio.volume = vol;
  circle.setAttribute('r', circleRad);

  startTimer();
};

const stopTimer = () => {
  isPaused = !isPaused;
  resetTimer();
};

const startTimer = () => {
  timerInterval = setInterval(() => {
    if (!isPaused) myTimer();
    if (timer > 640) stopTimer();
    // playAudio();
  }, 1000);
};