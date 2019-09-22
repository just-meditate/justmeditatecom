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
    motion: "Don't move your phone for a couple of seconds",
  },
};
const meditation = {
  d1: 'Press SPACE to pause',
  d2: 'Press ENTER to start over',
  m1: 'Flip your phone ot pause',
  m2: 'Shake your phone to start over',
};
const end = {
  d1: 'Or press ENTER to start over',
  d2: 'Scroll page at any time to visit our blog and news',
  m1: 'Or shake your phone to start over',
  m2: 'Swipe up at anytime to visit our blog and news',
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
}

const endInstructions = () => {
  setTimeout(() => {
    hintEnd.classList.toggle('hidden');
    hintEnd.classList.toggle('visible');
  }, 1000);
}

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
