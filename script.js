const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const uiStart = document.querySelector('.start');
const uiGameOver = document.querySelector('.game-over');
const btnStart = document.querySelector('.btn-start');
const btnReload = document.querySelector('.btn-reload');

const jump = () => {
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

var loop = null;

function game() {
    const pipePosition = pipe.offsetLeft;
    const cloudsPosition = clouds.offsetLeft;
    // O Mario tem 120px de altura. A tela tem 500px de altura.
    const marioPosition = 380 - mario.offsetTop;

    if (pipePosition <= 100 && pipePosition >= 0 && marioPosition <= 102) {

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