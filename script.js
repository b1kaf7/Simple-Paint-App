const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');

let painting = false;
let erasing = false;
let lastX = 0;
let lastY = 0;

let undoStack = [];
let redoStack = [];

// Save current state for undo
function saveState() {
  undoStack.push(canvas.toDataURL());
  redoStack = []; // clear redo on new action
}

// Start painting
canvas.addEventListener('mousedown', (e) => {
  painting = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
  saveState();
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
    ctx.clearRect(e.offsetX - size / 2, e.offsetY - size / 2, size, size);
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
  saveState();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById('drawBtn').addEventListener('click', () => erasing = false);
document.getElementById('eraseBtn').addEventListener('click', () => erasing = true);

document.getElementById('undoBtn').addEventListener('click', () => {
  if (undoStack.length > 0) {
    redoStack.push(canvas.toDataURL());
    let lastState = undoStack.pop();
    let img = new Image();
    img.src = lastState;
    img.onload = () => ctx.drawImage(img, 0, 0);
  }
});

document.getElementById('redoBtn').addEventListener('click', () => {
  if (redoStack.length > 0) {
    undoStack.push(canvas.toDataURL());
    let nextState = redoStack.pop();
    let img = new Image();
    img.src = nextState;
    img.onload = () => ctx.drawImage(img, 0, 0);
  }
});

document.getElementById('fillBtn').addEventListener('click', () => {
  saveState();
  ctx.fillStyle = document.getElementById('colorPicker').value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

document.getElementById('downloadBtn').addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'drawing.png';
  link.href = canvas.toDataURL();
  link.click();
});