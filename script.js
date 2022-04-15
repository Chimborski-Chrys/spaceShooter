const yourShip = document.querySelector('.player-shooter');
const playArea = document.querySelector('#main-play-area');
const aliensImg = ['img/monster-1.png', 'img/monster-2.png', 'img/monster-3.png'];

// movimento e tiro da nave
function flyShip(event){
    if(event.key === 'ArrowUp'){
        event.preventDefault();
        moveUp();
    } else if(event.key === 'ArrowDown'){
        event.preventDefault();
        moveDown();
    }else if(event.key === " "){
        event.preventDefault();
        fireLaser();
    }
}

// função de subir
function moveUp(){
    let topPosition = getComputerStyle(yourShip).getPropertyValue('top');
    if(topPosition === "0px"){
        return
    }else{
        let position = parseInt(topPosition);
        position -= 50;
        yourShip.style.top = `${position}px`;
    }
}

// função de descer

function moveDown(){
    let topPosition = getComputerStyle(yourShip).getPropertyValue('top');
    if(topPosition === "540px"){
        return
    }else{
        let position = parseInt(topPosition);
        position += 50;
        yourShip.style.top = `${position}px`;
    }
}

// função de tiro
function fireLaser(){
    let laser = createLaserElement();
    playArea.appendChild(laser);
    moveLaser(laser);
}

function createLaserElement(){
    let xPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'));
    let yPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'));
    let newLaser = document.createElement('img');
    newLaser.src = 'img/shoot.png';
    newLaser.classList.add('laser');
    newLaser.style.left = `${xPosition}px`;
    newLaser.style.top = `${yPosition - 10}px`;
    return newLaser;
}

function moveLaser(laser){
    let laserInterval = setInterval(() => {
        let xPosition = parseInt(laser.style.left);

        if(xPosition === 340){
            laser.remove();
        }else{
            laser.style.left = `${xPosition + 8}px`;
        }
    }, 10);
}

// criar inimigos
function createAliens(){
    let newAlien = document.createElement('img');
    let alienSprite = aliensImg[Math.floor(Math.random() * aliensImg.length)]; // sortei imgs
    newAlien.src = alienSprite;
    newAlien.classList.add('alien');
    newAlien.classList.add('alien-transition');
    newAlien.style.left = '370px';
    newAlien.style.top = `${Math.floor(Math.random() * 330 ) + 30}px`;
    playArea.appendChild(newAlien);
    moveAlien(newAlien);
}

// movimentar inimigos
function moveAlien(alien){
    let moveAlienInterval = setInterval(() => {
        let xPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'), 10);
        if(xposition <= 50){
            if(Array.from(alien.classList).includes('dead-alien')){
                alien.remove();
            }else{
               // gameOver();
            }
        }else{
            alien.style.left = `${xPosition - 4}px`;
        }
    }, 30);
}

// função de colisão

// video 7 tempo 07:30


window.addEventListener('keydown', flyShip);