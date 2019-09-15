// Circle
const counter = document.querySelector('.counter');
const circle = document.querySelector('#circle');
const circleRad = circle.getAttribute('r');

// Audio
const audio = document.getElementById('audio');
const playAudio = async () => {
  try {
    await audio.play();
  } catch (error) {
    console.error(error);
  }
};
let vol = 0.2;
audio.volume = vol;

// increase volume
const increaseVol = () => {
  vol += 0.1;
};

// Timer
let isPaused = false;
let cr = parseInt(circleRad, 10.0);
let timer = 0;
let timerInterval;

// call mytimer function every sec.
const myTimer = () => {
  timer = timer + 1;
  counter.innerText = timer;

  if (timer > 15) {
    cr += 0.15;
    circle.setAttribute('r', cr.toFixed(2));
  }

  if (timer > 15 && timer < 23) {
    increaseVol();
    audio.volume = vol;
    console.log(audio.volume);
  }
};

const startTimer = () => {
  timerInterval = setInterval(() => {
    if (!isPaused) myTimer();
    playAudio();
  }, 1000);
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
