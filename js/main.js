const score = document.querySelector('.score'),
    startBtn = document.querySelector('.start'),
    board = document.querySelector('.game'),
    gameArea = document.querySelector('.gameArea'),
    ourCar = document.createElement('div');

ourCar.classList.add('car');

gameArea.style.display = 'none'

startBtn.addEventListener('click', startGame)
document.addEventListener('keydown', startRun)
document.addEventListener('keydown', stopRun)

const SETTINGS = {
    start: false,
    score: 0,
    speed: 0,
}

const KEYS = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false,
}

function startGame() {
    gameArea.style.display = 'flex';
    board.style.background = 'none'
    startBtn.style.display = 'none';
    SETTINGS.start = true;
    gameArea.appendChild(ourCar);
    requestAnimationFrame(playGame)
}

function playGame() {
    SETTINGS.start && requestAnimationFrame(playGame)
}

function startRun(event) {
    event.preventDefault();
    KEYS[event.key] = true;
    return 0;
}

function stopRun(event) {
    event.preventDefault();
    KEYS[event.key] = false;
    return 0
}
