circle.addEventListener('click', () => {
  if (timer === 0) {
    // Start session.
    playAudio();
    startTimer();
    startInstructions();
  } else if (timer < 10) {
    // Reset session on circle click within the first 10s.
    // Pause session on circle click after 10s.
    if (!isPaused) {
      resetTimer();
      resetInstructions();
      resetHints();
    }
  } else if (timer > 10) {
    isPaused = !isPaused;
  }
});

// Reset session on tab change within the first 10s.
document.addEventListener('visibilitychange', () => {
  if (timer > 0 && timer < 10 && !isPaused) {
    resetTimer();
    resetInstructions();
    resetHints();
  }
});

// Check OS
if (
  navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)
) {
  // (mobile) //
  // Inset desktop hints.
  hintW1.innerText = welcome.w1.motion;
  med1.innerText = meditation.m1;
  med2.innerText = meditation.m2;
  end1.innerText = end.m1;
  end2.innerText = end.m2;
} else {
  // (desktop) //
  // Inset mobile hints.
  hintW1.innerText = welcome.w1.desktop;
  med1.innerText = meditation.d1;
  med2.innerText = meditation.d2;
  end1.innerText = end.d1;
  end2.innerText = end.d2;

  // Reset session with SPACE.
  // Pause session with START.
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
