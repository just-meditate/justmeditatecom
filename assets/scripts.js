const canvas = document.querySelector('#circle');
const ctx = canvas.getContext('2d');
const scale = window.devicePixelRatio;
const vw = window.innerWidth;

let size = vw;

canvas.style.width = `${size}px`;
canvas.style.height = `${size}px`;
canvas.width = size * scale;
canvas.height = size * scale;

const cx = canvas.width / 2;
const cy = canvas.height / 2;
const r = 250;

// Circle
ctx.beginPath();
ctx.arc(cx, cy, r, 0, 2 * Math.PI, false);
ctx.fillStyle = '#046B99';
ctx.fill();
ctx.scale(scale, scale);