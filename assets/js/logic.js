// Gyronorm
const args = {
  decimalCount: 1,
  frequency: 60,
  gravityNormalized: true,
  logger: null,
  screenAdjusted: false,
};
const gn = new GyroNorm();

// Mobile reset
const checkMotion = () => {
  gn.init(args).then(() => {
    gn.start(data => {
      const x = data.dm.x;
      const y = data.dm.y;

      circle.innerHTML = `${x}, ${y}`;

      if (x !== 0 && timer >= 0 && timer <= 10) {
        isPaused = !isPaused;
      }
    });
  });
};

// Grand Permission
const grandPremission = () => {
  DeviceOrientationEvent.requestPermission()
    .then(permissionState => {
      if (permissionState === 'granted') {
        checkMotion();
        audio.volume = vol;
      }
    })
    .catch(console.error);
};

// Check OS
if (
  navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)
) {
  hintW1.innerText = welcome.w1.motion;
  med1.innerText = meditation.m1;
  med2.innerText = meditation.m2;

  setTimeout(() => {
    startTimer();
    startInstructions();
  }, 600);

  setTimeout(() => {
    startMedInstructionsToggle();
  }, 45000);

  checkMotion();
} else {
  hintW1.innerText = welcome.w1.desktop;
  med1.innerText = meditation.d1;
  med2.innerText = meditation.d2;

  setTimeout(() => {
    startTimer();
    startInstructions();
  }, 600);

  setTimeout(() => {
    startMedInstructionsToggle();
  }, 75000);

  // Desktop reset
  document.addEventListener('mousemove', () => {
    if (timer < 10) {
      resetTimer();
      resetInstructions();
    } else if (timer >= 0 && timer <= 10) {
      isPaused = !isPaused;
    }
  });

  document.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
      resetTimer();
      resetInstructions();
    } else if (e.keyCode === 32) {
      isPaused = !isPaused;
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (timer < 10) {
      resetTimer();
      resetInstructions();
    } else if (timer >= 0 && timer <= 10) {
      isPaused = !isPaused;
    }
  });
}
