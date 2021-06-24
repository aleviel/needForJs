const
    startBtn = document.querySelector('.start'),
    board = document.querySelector('.game'),
    gameArea = document.querySelector('.gameArea'),
    ourCar = document.createElement('div');

ourCar.classList.add('car');

gameArea.style.display = 'none'

startBtn.addEventListener('click', startGame)
document.addEventListener('keydown', startRun)
document.addEventListener('keyup', stopRun)

const SETTINGS = {
    start: false,
    score: 0,
    speed: 5,
    traffic: 3,
}

const KEYS = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false,
}

function startGame() {
    gameArea.style.display = 'flex';
    board.style.background = 'url("../images/forest.jpg") center center/cover no-repeat'
    startBtn.style.display = 'none';
    SETTINGS.start = true;

    for (let i = 0; i < getNumberOfElements(100); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = `${i * 100}px`;
        line.y = i * 100;
        gameArea.appendChild(line)
    }

    for (let i = 0; i < getNumberOfElements(100 * SETTINGS.traffic); i++) {
        const enemy = document.createElement('div')
        enemy.classList.add('car', 'enemy');
        enemy.y = -100 * SETTINGS.traffic * (i + 1);
        enemy.style.top = `${enemy.y}px`;
        enemy.style.left = `${Math.floor(Math.random() * (gameArea.offsetWidth - 50))}px`;
        gameArea.appendChild(enemy)
    }

    gameArea.appendChild(ourCar);
    SETTINGS.x = ourCar.offsetLeft;
    SETTINGS.y = 0;
    requestAnimationFrame(playGame)
}

function getNumberOfElements(height) {
    return document.documentElement.clientHeight / height + 1
}

function moveRoad() {
    const lines = document.querySelectorAll('.line');
    lines.forEach(line => {
        line.y += SETTINGS.speed / 2;
        line.style.top = `${line.y}px`;
        if (line.y >= document.documentElement.clientHeight) {
            line.y = -100;
        }
    });
}

function moveEnemy() {
    const enemy = document.querySelectorAll('.enemy');
    enemy.forEach(item => {
        item.y += SETTINGS.speed;
        item.style.top = `${item.y}px`;
        if (item.y >= gameArea.offsetHeight) {
            item.y = -100 * SETTINGS.traffic;
            item.style.left = `${Math.floor(Math.random() * (gameArea.offsetWidth - 50))}px`;
        }
    });
}

function playGame() {
    if (SETTINGS.start) {
        moveRoad();
        moveEnemy();
        KEYS.ArrowLeft && SETTINGS.x > 0 && (SETTINGS.x -= SETTINGS.speed);
        KEYS.ArrowRight && SETTINGS.x < gameArea.offsetWidth - ourCar.offsetWidth && (SETTINGS.x += SETTINGS.speed);
        KEYS.ArrowUp && SETTINGS.y < gameArea.offsetHeight - ourCar.offsetHeight && (SETTINGS.y += SETTINGS.speed);
        KEYS.ArrowDown && SETTINGS.y > 0 && (SETTINGS.y -= SETTINGS.speed);
        ourCar.style.left = `${SETTINGS.x}px`;
        ourCar.style.bottom = `${SETTINGS.y}px`;
        requestAnimationFrame(playGame)
    }
}

function startRun(event) {
    event.preventDefault();
    KEYS[event.key] = true;
}

function stopRun(event) {
    event.preventDefault();
    KEYS[event.key] = false;
}
