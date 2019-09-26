// Async setInterval function.
const setIntervalAsync = (fn, ms) => {
  fn().then(() => {
    setTimeout(() => setIntervalAsync(fn, ms), ms);
  });
};

// Delayed response.
const delayReport = deplayMs =>
  new Promise(resolve => {
    setTimeout(resolve, deplayMs);
  });
