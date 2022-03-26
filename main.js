const board = document.querySelector('canvas');
const board_ctx = board.getContext('2d');

const boardBackground = '#2b2b2b';
const boardBorder = '#f76a6a';

const snakeColor = '#f76a6a';
const snakeBorder = '#2b2b2b';

let snake = [
    {x: 300 , y: 300},
    {x: 290 , y: 300},
    {x: 280 , y: 300},
    {x: 270 , y: 300},
    {x: 260 , y: 300}
]

let dx = 10;
let dy = 0;

function drawSnakePart(snakePart) {
    board_ctx.fillStyle = snakeColor;
    board_ctx.strokeStyle = snakeBorder;
    board_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    board_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}
function clear() {
    board_ctx.fillStyle = boardBackground;
    board_ctx.strokestyle = boardBorder;
    board_ctx.fillRect(0, 0, board.width, board.height);
    board_ctx.strokeRect(0, 0, board.width, board.height);
  }

function drawSnake() {
    snake.forEach(drawSnakePart);
}

function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    snake.pop();
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

function main() {
    setTimeout(function onTick() {
        clear();
        moveSnake();
        drawSnake();
        main();
    }, 100)
}

main();
