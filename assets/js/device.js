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
  // Mobile reset
  gn.init(args).then(() => {
    gn.start((data) => {
      const x = data.dm.x;
      const y = data.dm.y;

      circle.innerHTML = `${x}, ${y}`;

      if (x !== 0) {
        resetTimer();
      }
    });
  });
} else {
  // Desktop reset
  document.addEventListener('mousemove', resetTimer);
  document.addEventListener('keydown', resetTimer);
  document.addEventListener('visibilitychange', resetTimer);
};
