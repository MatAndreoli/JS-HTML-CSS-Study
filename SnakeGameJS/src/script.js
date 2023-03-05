import {
  SNAKE_SPEED,
  update as updateSnake,
  draw as drawSnake,
  getSnakeHead,
  snakeIntersection,
} from './snake.js';

import { update as updateFood, draw as drawFood } from './food.js';
import { outsideGrid } from './grid.js';

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board');

function main(currentTime) {
  if (gameOver) {
    if (confirm('You lost. Press ok to restart')) {
      window.location = '/SnakeGameJS/src/index.html';
    }
    return;
  }

  window.requestAnimationFrame(main);
  const secsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  update();
  draw();
}

window.requestAnimationFrame(main);

export function update() {
  updateSnake();
  updateFood();
  checkForDeath();
}

export function draw() {
  gameBoard.innerHTML = '';
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkForDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}
