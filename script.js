const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');

let painting = false;
let erasing = false;
let lastX = 0;
let lastY = 0;

// Start painting
canvas.addEventListener('mousedown', (e) => {
  painting = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

// Stop painting
canvas.addEventListener('mouseup', () => painting = false);
canvas.addEventListener('mouseout', () => painting = false);

// Draw or erase
canvas.addEventListener('mousemove', draw);

function draw(e) {
  if (!painting) return;

  const size = document.getElementById('brushSize').value;

  if (erasing) {
    ctx.clearRect(e.offsetX - size/2, e.offsetY - size/2, size, size);
  } else {
    ctx.strokeStyle = document.getElementById('colorPicker').value;
    ctx.lineWidth = size;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
  }
}

// Buttons
document.getElementById('clearBtn').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById('drawBtn').addEventListener('click', () => erasing = false);
document.getElementById('eraseBtn').addEventListener('click', () => erasing = true);

// Download button
document.getElementById('downloadBtn').addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'painting.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});