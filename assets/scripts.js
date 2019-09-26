// Audio
const tracks = ['bells', 'fire', 'forest', 'jungle', 'pond', 'rain'];
const file = tracks[Math.floor(Math.random() * tracks.length)];

const audio = new Audio(`/audio/${file}.mp3`);
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
// Instructions
const hintList = document.querySelectorAll('.hint-list');
const hintW1 = document.querySelector('.hint-w1');
const hintW2 = document.querySelector('.hint-w2');
const hintW3 = document.querySelector('.hint-w3');
const hintMed = document.querySelector('.hint-med');
const med1 = document.querySelector('.hint-item.med1');
const med2 = document.querySelector('.hint-item.med2');
const hintEnd = document.querySelector('.hint-end');
const end1 = document.querySelector('.hint-item.end1');
const end2 = document.querySelector('.hint-item.end2');
const icons = document.querySelector('.icons');
let instructionsInterval;
let medInstructionsInterval;

const welcome = {
  w1: {
    desktop: "Don't move your mouse and don't press any keys",
    mobile: 'Tap the circle to begin',
    motion: "Don't move your phone for a couple of seconds"
  }
};
const meditation = {
  d1: 'Press SPACE to pause',
  d2: 'Press ENTER to start over',
  m1: 'Flip your phone ot pause',
  m2: 'Shake your phone to start over'
};
const end = {
  d1: 'Or press ENTER to start over',
  d2: 'Scroll page at any time to visit our blog and news',
  m1: 'Or shake your phone to start over',
  m2: 'Swipe up at anytime to visit our blog and news'
};

const cycleInstuctions = () => {
  switch (timer) {
    case 10:
      hintW1.classList.add('hidden');
      hintW1.classList.remove('visible');

      hintW2.classList.add('visible');
      hintW2.classList.remove('hidden');

      icons.classList.add('visible');
      icons.classList.remove('hidden');
      break;
    case 30:
      hintW2.classList.add('hidden');
      hintW2.classList.remove('visible');

      hintW3.classList.add('visible');
      hintW3.classList.remove('hidden');
      break;
    case 40:
      hintW3.classList.add('hidden');
      hintW3.classList.remove('visible');

      hintMed.classList.add('visible');
      hintMed.classList.remove('hidden');
      break;
    default:
      break;
  }
};

const toggleMedInstructions = () => {
  hintMed.classList.toggle('visible');
  hintMed.classList.toggle('hidden');
};

const endInstructions = () => {
  setTimeout(() => {
    hintEnd.classList.toggle('hidden');
    hintEnd.classList.toggle('visible');
  }, 1000);
};

const resetHints = () => {
  hintW1.classList.remove('hidden');
  hintW1.classList.add('visible');

  hintEnd.classList.add('hidden');
  hintEnd.classList.remove('visible');
};

const startInstructions = () => {
  instructionsInterval = setInterval(() => {
    if (!isPaused) cycleInstuctions();
  }, 1000);
};

const startMedInstructionsToggle = () => {
  instructionsInterval = setInterval(() => {
    if (!isPaused) toggleMedInstructions();
  }, 30000);
};

const resetInstructions = () => {
  clearInterval(instructionsInterval);
  clearInterval(medInstructionsInterval);

  textTimer = 0;

  hintW1.classList.remove('hidden');
  hintW1.classList.add('visible');

  icons.classList.remove('visible');
  icons.classList.add('hidden');

  hintList.forEach(el => {
    el.classList.remove('visible');
    el.classList.add('hidden');
  });

  startInstructions();
};
// Start session timer with a little delay to wait for fade in animation
setTimeout(() => {
  startTimer();
  startInstructions();
}, 600);

// Reset session on circle click within the first 10s
// Pause session on circle click after 10s
circle.addEventListener('click', () => {
  if (timer < 10) {
    if (!isPaused) {
      resetTimer();
      resetInstructions();
      resetHints();
    }
  } else if (timer > 10) {
    isPaused = !isPaused;
  }
});

// Reset session on tab change within the first 10s
document.addEventListener('visibilitychange', () => {
  if (timer < 10) {
    if (!isPaused) {
      resetTimer();
      resetInstructions();
      resetHints();
    }
  }
});

// Check OS
if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
  // Inset desktop hints
  hintW1.innerText = welcome.w1.motion;
  med1.innerText = meditation.m1;
  med2.innerText = meditation.m2;
  end1.innerText = end.m1;
  end2.innerText = end.m2;
} else {
  // Inset mobile hints
  hintW1.innerText = welcome.w1.desktop;
  med1.innerText = meditation.d1;
  med2.innerText = meditation.d2;
  end1.innerText = end.d1;
  end2.innerText = end.d2;

  // Reset session with SPACE
  // Pause session with START
  document.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
      resetTimer();
      resetInstructions();
      resetHints();
      isPaused = false;
    } else if (e.keyCode === 32) {
      isPaused = !isPaused;
    }
  });
}
