// Instructions
const hintList = document.querySelectorAll('.hint-list');
const hintW1 = document.querySelector('.hint-w1');
const hintW2 = document.querySelector('.hint-w2');
const hintW3 = document.querySelector('.hint-w3');
const hintMed = document.querySelector('.hint-med');
const med1 = document.querySelector('.hint-item.med1');
const med2 = document.querySelector('.hint-item.med2');
const icons = document.querySelector('.icons');
let instructionsInterval;

const welcome = {
  w1: {
    desktop: "Don't move your mouse and don't press any keys",
    mobile: 'Tap the circle to begin',
    motion: "Don't move your phone for a couple of seconds",
  },
};
const meditation = {
  d1: 'Press SPACE to pause',
  d2: 'Press ENTER to start over',
  m1: 'Flip your phone ot pause',
  m2: 'Shake your phone to start over',
};

const cycleInstuctions = () => {
  switch (timer) {
    case 15:
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
    case 45:
      hintW3.classList.add('hidden');
      hintW3.classList.remove('visible');

      hintMed.classList.add('visible');
      hintMed.classList.remove('hidden');
      break;
    default:
      break;
  }
};

const startInstructions = () =>
  (instructionsInterval = setInterval(cycleInstuctions, 1000));

const resetInstructions = () => {
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

// Gyronorm
const args = {
  decimalCount: 1,
  frequency: 60,
  gravityNormalized: true,
  logger: null,
  screenAdjusted: false,
};
const gn = new GyroNorm();

// Check OS
if (
  navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)
) {
  hintW1.innerText = welcome.w1.motion;
  med1.innerText = meditation.m1;
  med2.innerText = meditation.m2;

  // Mobile reset
  gn.init(args).then(() => {
    gn.start(data => {
      const x = data.dm.x;
      const y = data.dm.y;

      circle.innerHTML = `${x}, ${y}`;

      if (x !== 0) {
        resetTimer();
        resetInstructions();
      }
    });
  });
} else {
  hintW1.innerText = welcome.w1.desktop;
  med1.innerText = meditation.d1;
  med2.innerText = meditation.d2;

  setTimeout(() => {
    startTimer();
    startInstructions();
  }, 600);

  // Desktop reset
  document.addEventListener('mousemove', () => {
    resetTimer();
    resetInstructions();
  });

  document.addEventListener('keydown', () => {
    resetTimer();
    resetInstructions();
  });

  document.addEventListener('visibilitychange', () => {
    resetTimer();
    resetInstructions();
  });
}
