// Audio
const tracks = ['bells', 'fire', 'forest', 'jungle', 'pond', 'rain'];
const file = tracks[Math.floor(Math.random() * tracks.length)];

// New random audio track.
const audio = new Audio(`/audio/${file}.mp3`);
audio.loop = true;

// Played flag.
let audioPlayed = false;

// Set volume.
let vol = 0.2;
audio.volume = vol;

// Play audio.
const playAudio = async () => {
  try {
    await audio.play();
    // Mark as unplayed until desired volume is reached.
    audioPlayed = false;
  } catch (error) {
    console.error(error);
  }
};

// Pause audio.
const pauseAudio = () => {
  // Gradually lower volume and then pause it.
  setIntervalAsync(async () => {
    if (vol > 0.2) {
      vol -= 0.1;
      audio.volume = vol;
    }
    // Once volume is down, pause is and mark as unplayed.
    if ((Math.round(vol * 100) / 100) === 0.1) {
      audioPlayed = false;
      audio.pause();
    }
    await delayReport(500);
  }, 500);
};

// Increase volume
const increaseVol = () => {
  // Gradually increase volume.
  setIntervalAsync(async () => {
    // Increase volume until it's at 0.7 and has been marked played.
    if (!audioPlayed && vol < 0.7) {
      vol += 0.1;
      audio.volume = vol;
    }
    // Mark as played when desired volume is reached.
    if (vol === 0.7) audioPlayed = true;
    await delayReport(500);
  }, 500);
};
