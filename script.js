const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');

let painting = false;
let erasing = false;

// Start and stop painting
canvas.addEventListener('mousedown', () => painting = true);
canvas.addEventListener('mouseup', () => painting = false);
canvas.addEventListener('mouseout', () => painting = false);

// Draw or erase on canva
canvas.addEventListener('mousemove', draw);

function draw(e) {
  if (!painting) return;

  const size = document.getElementById('brushSize').value;

  if (erasing) {
    ctx.clearRect(e.offsetX - size/2, e.offsetY - size/2, size, size);
  } else {
    const color = document.getElementById('colorPicker').value;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(e.offsetX, e.offsetY, size / 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Button actions
document.getElementById('clearBtn').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById('drawBtn').addEventListener('click', () => {
  erasing = false;
});

document.getElementById('eraseBtn').addEventListener('click', () => {
  erasing = true;
});