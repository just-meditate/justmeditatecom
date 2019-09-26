// Circle
const counter = document.querySelector('.counter');
const circle = document.querySelector('#circle');
const circleRad = circle.getAttribute('r');

// Timer
let isPaused = false;
let cr = parseInt(circleRad, 10.0);
let timer = 0;
let timerInterval;

const myTimer = () => {
  timer = timer + 1;
  counter.innerText = timer;

  // Grow circle radius with timer.
  if (timer > 10) {
    cr += 0.1;
    circle.setAttribute('r', cr.toFixed(2));
  }

  // Start incrasing the volume until it hits 0.7.
  if (timer === 10) {
    increaseVol();
  }

  // Start cycling through meditaiton instructions.
  if (timer === 45) startMedInstructionsToggle();

  // At the 10:40 minute mark, end the session.
  if (timer === 640) endInstructions();
};

// Timer, circle radius, and volue are reset.
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

// Timer is reset and pause. Audio volume goes down and then pauses.
const stopTimer = () => {
  isPaused = !isPaused;
  pauseAudio();
  resetTimer();
};

// Timer interval starts.
const startTimer = () => {
  timerInterval = setInterval(() => {
    // Is paused flag is not true, run timer interval.
    if (!isPaused) myTimer();
    // If timer is at 10:40 mins, stop the whole session.
    if (timer > 640) stopTimer();
  }, 1000);
};
