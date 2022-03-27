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

let score = 0;
const scoreText = document.querySelector('#score');
scoreText.textContent = score;

let startButton = document.querySelector('#start');
startButton.addEventListener('click', start);

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

    if (head.x == foodX && head.y == foodY) {
        score++;
        scoreText.textContent = score;
        genFood();
    } else {
        snake.pop();
    }
};

function changeDirection(key) {
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const keyPress = key.keyCode;
    const goingLeft = (dx == -10);
    const goingRight = (dx == 10);
    const goingUp = (dy == -10);
    const goingDown = (dy == 10);

    if (keyPress == LEFT && !goingRight) {
        dx = -10;
        dy = 0;
    }

    if (keyPress == RIGHT && !goingLeft) {
        dx = 10;
        dy = 0;
    }

    if (keyPress == UP && !goingDown) {
        dx = 0;
        dy = -10;
    }

    if (keyPress == DOWN && !goingUp) {
        dx = 0;
        dy = 10;
    }

}

function checkForHit() {
    for (let part = 4; part < snake.length; part++) {
        if (snake[0].x == snake[part].x && snake[0].y == snake[part].y) {
            return true;
        }
    }

    const hitLeftWall = snake[0].x < 0;  
    const hitRightWall = snake[0].x > board.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > board.height - 10;
   
    return hitLeftWall ||  hitRightWall || hitToptWall || hitBottomWall;
}

function eating(part) {
    if (part.x == foodX && part.y == foodY) {
        genFood();
    }
}

function makeFood() {
    apple = new Image();
    apple.src = 'apple.png';
    board_ctx.drawImage(apple, foodX, foodY);
}

function randomFood(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

let foodX = randomFood(0, board.width - 10);
let foodY = randomFood(0, board.height - 10);

function genFood() {
    foodX = randomFood(0, board.width - 10);
    foodY = randomFood(0, board.height - 10);

    for (part in snake) {
        eating(part);
    }
}

document.addEventListener('keydown', changeDirection);

let gameOver = false;

function start() {
    startButton.removeEventListener('click', start);
    main();
}

function restart() {
    clear();
    snake = [
        {x: 300 , y: 300},
        {x: 290 , y: 300},
        {x: 280 , y: 300},
        {x: 270 , y: 300},
        {x: 260 , y: 300}
    ];

    dx = 10;
    dy = 0;

    score = 0;
}

function main() {
    if (gameOver) {
        return;
    }
    setTimeout(function onTick() {
        clear();
        makeFood();
        moveSnake();
        drawSnake();
        if (checkForHit()) {
            gameOver = true;
            clear();
            startButton.textContent = 'Restart';
            startButton.addEventListener('click', start);
        }
        main();
    }, 100)
}
