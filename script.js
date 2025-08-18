const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');

let painting = false;

canvas.addEventListener('mousedown', () => painting = true);
canvas.addEventListener('mouseup', () => painting = false);
canvas.addEventListener('mouseout', () => painting = false);

canvas.addEventListener('mousemove', draw);

function draw(e) {
  if (!painting) return;

  const color = document.getElementById('colorPicker').value;
  const size = document.getElementById('brushSize').value;

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(e.offsetX, e.offsetY, size / 2, 0, Math.PI * 2);
  ctx.fill();
}

document.getElementById('clearBtn').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});