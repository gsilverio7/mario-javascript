const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const uiStart = document.querySelector('.start');
const uiGameOver = document.querySelector('.game-over');
const btnStart = document.querySelector('.btn-start');
const btnReload = document.querySelector('.btn-reload');
const btnSound = document.querySelector('.btn-sound');
const music = new Audio('./sounds/music.mp3');
//const jumpSound = new Audio('/sounds/jump.mp3');
const gameOverSound = new Audio('./sounds/game-over.mp3');

var isJumping = false;
const jump = () => {
    if (! isJumping) {
        isJumping = true;
        musicIsPlaying ? new Audio('./sounds/jump.mp3').play() : '';
        mario.classList.add('jump');
        setTimeout(() => {
            mario.classList.remove('jump');
            isJumping = false;
        }, 500);
    }
}

var loop = null;
var isGameOver = false;

function game() {
    const pipePosition = pipe.offsetLeft;
    const cloudsPosition = clouds.offsetLeft;
    // O Mario tem 120px de altura. A tela tem 500px de altura.
    const marioPosition = 380 - mario.offsetTop;

    if (pipePosition <= 100 && pipePosition >= 0 && marioPosition <= 102) {

        musicIsPlaying ? new Audio('./sounds/game-over.mp3').play() : '';
        musicIsPlaying ? music.pause() : '';
        isGameOver = true;

        mario.src = 'imgs/game-over.png';
        mario.style.width = '62px';
        mario.style.left = '48px';
        mario.style.bottom = marioPosition + 'px';
        mario.style.animation = 'none';

        pipe.style.left = pipePosition + 'px';
        pipe.classList.remove('pipe-animation');

        clouds.style.left = cloudsPosition + 'px';
        clouds.classList.remove('cloud-animation');

        uiGameOver.classList.add('ui-move-down');

        clearInterval(loop);        
    }
};


addEventListener('keypress', jump);

btnStart.onclick = () => {
    uiStart.classList.add('ui-start-move-up');
    pipe.classList.add('pipe-animation');

    loop = setInterval(game, 10);
}

btnReload.onclick = () => {
    musicIsPlaying ? music.currentTime = 0 : '';
    musicIsPlaying ? music.play() : '';
    isGameOver = false;

    uiGameOver.classList.remove('ui-move-down');
    uiGameOver.classList.add('ui-game-over-move-up');

    mario.src = 'imgs/mario.gif';
    mario.style.width = '120px';
    mario.style.left = null;
    mario.style.bottom = '0';
    mario.style.animation = null;

    pipe.style.left = null;
    pipe.classList.add('pipe-animation');

    clouds.style.left = null;
    clouds.classList.add('cloud-animation');

    loop = setInterval(game, 10);
}

var musicIsPlaying = false;
btnSound.onclick = () => {
    if (musicIsPlaying) {
        musicIsPlaying = false;
        btnSound.innerHTML = 'TURN SOUND ON';
        music.pause();
    } else {
        musicIsPlaying = true;
        btnSound.innerHTML = 'TURN SOUND OFF';
        !isGameOver ? music.play() : '';
    }
}

music.addEventListener('ended', () => {
    music.currentTime = 0;
    music.play();
    console.log('ended');
}, false);