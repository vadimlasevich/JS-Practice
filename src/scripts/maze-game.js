const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const startButton = document.querySelector('.maze-game__button')
const failMessage = document.querySelector('.maze-game__fail-message');
const winMessage = document.querySelector('.maze-game__win-message');
const restartButton = document.querySelectorAll('.restart-btn');
const overlay = document.querySelectorAll('.overlay');

const cellSize = 70;
const PADDING = 5;
const COLUMNS = 11;
const ROWS = 11;
const wallColor = 'black';
const freeColor = 'white';
const BACKGROUND = 'gray';

let xImage = 5;
let yImage = 5;
let xImageFinish = PADDING + 10 * cellSize;
let yImageFinish = PADDING + 10 * cellSize;
let matrix = createMatrix(COLUMNS, ROWS);

const tractor = {
   x: 0,
   y: 0
};

matrix[tractor.x][tractor.y] = true;

canvas.width = PADDING * 2 + COLUMNS * cellSize;
canvas.height = PADDING * 2 + ROWS * cellSize;

function main() {
   while (!isValidMaze()) {
      moveTractor()
   }
   drawMaze();
   addStartImage();
   addEndImage();
}

function addStartImage() {
   let startImage = new Image();

   startImage.onload = function () {
      context.drawImage(startImage, xImage, yImage, cellSize, cellSize);
   };

   startImage.src = "./assets/images/smile.png";
}

function addEndImage() {
   let endImage = new Image();

   endImage.onload = function () {
      context.drawImage(endImage, xImageFinish, yImageFinish, cellSize, cellSize);
   };

   endImage.src = "./assets/images/finish.png";
}

function createMatrix(columns, rows) {
   const matrix = [];

   for (let y = 0; y < rows; y++) {
      const row = []
      for (let x = 0; x < columns; x++) {
         row.push(false)
      }
      matrix.push(row)
   }
   return matrix;
};

function drawMaze() {
   context.beginPath();
   context.rect(0, 0, canvas.width, canvas.height);
   context.fillStyle = BACKGROUND;
   context.fill();

   for (let y = 0; y < COLUMNS; y++) {
      for (let x = 0; x < ROWS; x++) {
         const color = matrix[y][x] ? freeColor : wallColor;

         context.beginPath();
         context.rect(
            PADDING + x * cellSize,
            PADDING + y * cellSize,
            cellSize,
            cellSize
         );
         context.fillStyle = color;
         context.fill();
      }
   }
}

function moveTractor() {
   const directions = [];

   if (tractor.x > 0) {
      directions.push([-2, 0]);
   }

   if (tractor.x < COLUMNS - 1) {
      directions.push([2, 0]);
   }

   if (tractor.y > 0) {
      directions.push([0, -2]);
   }

   if (tractor.y < ROWS - 1) {
      directions.push([0, 2]);
   }

   const [dx, dy] = getRandomItem(directions);

   tractor.x += dx;
   tractor.y += dy;

   if (!matrix[tractor.y][tractor.x]) {
      matrix[tractor.y][tractor.x] = true;
      matrix[tractor.y - dy / 2][tractor.x - dx / 2] = true;
   }
}

function getRandomItem(array) {
   const index = Math.floor(Math.random() * array.length);
   return array[index];
}

function isValidMaze() {
   for (let y = 0; y < COLUMNS; y += 2) {
      for (let x = 0; x < ROWS; x += 2) {
         if (!matrix[y][x]) {
            return false;
         }
      }
   }
   return true;
}

function restartGame() {
   xImage = 5;
   yImage = 5;
   xImageFinish = PADDING + 10 * cellSize;
   yImageFinish = PADDING + 10 * cellSize;
   matrix = createMatrix(COLUMNS, ROWS);
   main();
}

document.addEventListener("keydown", pushKeyButtons);

function pushKeyButtons(event) {
   if (event.key == "ArrowLeft") {
      xImage -= 1 * cellSize;
      context.beginPath();
      context.fillStyle = "white";
      context.rect(xImage + cellSize, yImage, cellSize, cellSize);
      context.fill();

   } else if (event.key === "ArrowUp") {
      yImage -= 1 * cellSize;
      context.beginPath();
      context.fillStyle = "white";
      context.rect(xImage, yImage + cellSize, cellSize, cellSize);
      context.fill();

   } else if (event.key === "ArrowRight") {
      startButton.innerHTML = 'Сначала';
      xImage += 1 * cellSize;
      context.beginPath();
      context.fillStyle = "white";
      context.rect(xImage - cellSize, yImage, cellSize, cellSize);
      context.fill();

   } else if (event.key === "ArrowDown") {
      startButton.innerHTML = 'Сначала';
      yImage += 1 * cellSize;
      context.beginPath();
      context.fillStyle = "white";
      context.rect(xImage, yImage - cellSize, cellSize, cellSize);
      context.fill();
   }
   addStartImage();
   checkForCollision();

   if (
      xImage >= canvas.width - cellSize ||
      yImage >= canvas.height - cellSize ||
      xImage < 5 ||
      yImage < 5
   ) { openFailMessage() }

   if (xImageFinish == xImage && yImageFinish == yImage) {
      openWinMessage();
   }
}

function openFailMessage() {
   failMessage.style.display = 'flex';
}

function openWinMessage() {
   winMessage.style.display = 'flex';
}

function closeMessage() {
   failMessage.style.display = 'none';
   winMessage.style.display = 'none';
   startButton.innerHTML = 'Начать';
   main();
   restartGame();
}

function checkForCollision() {
   let imgData = context.getImageData(xImage, yImage, cellSize, cellSize);
   let pixels = imgData.data;

   for (let i = 0; i < pixels.length; i += 3) {
      let index1 = pixels[i];
      let index2 = pixels[i + 1];
      let index3 = pixels[i + 2];

      if (index1 == 0 && index2 == 0 && index3 == 0) {
         openFailMessage()
      }
      return false;
   }
}

startButton.addEventListener('click', () => {
   startButton.innerHTML = 'Начать';
   main();
   restartGame();
})

for (let item of overlay) {
   item.addEventListener('click', closeMessage);
}

for (let btn of restartButton) {
   btn.addEventListener('click', closeMessage)
}
