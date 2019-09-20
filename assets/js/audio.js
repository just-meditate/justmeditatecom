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