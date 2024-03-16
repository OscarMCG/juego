const playBoard = document.querySelector(".play-board");

let finDelJuego = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocidadX = 0, velocidadY = 0;
let setIntervalId;

const changFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const Juego = () => {
    clearInterval(setIntervalId);
    alert("fin  del juego");
    location.reload();
}

const changeDirection = (e) => {
    //console.log(e);
    if(e.key === "ArrowUp" && velocidadY != 1){
        velocidadX = 0;
        velocidadY = -1;
    } else if(e.key === "ArrowDown" && velocidadY != -1) {
        velocidadX = 0;
        velocidadY = 1;
    }else if(e.key === "ArrowLeft" && velocidadX != 1) {
        velocidadX = -1;
        velocidadY = 0;
    }else if(e.key === "ArrowRight" && velocidadX != -1) {
        velocidadX = 1;
        velocidadY = 0;
    }  
    
}

const iniGame = () => {
    if(finDelJuego) return Juego();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    

    if(snakeX === foodX &&  snakeY === foodY){
        changFoodPosition();
        snakeBody.push([foodX, foodY]);
        //console.log(snakeBody)
    }

    for(let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];

    snakeX += velocidadX;
    snakeY += velocidadY; 

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
       finDelJuego = true
    }

    for(let i = 0;  i < snakeBody.length; i++){
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody [i][1]} / ${snakeBody[i][0]}"></div>`;
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            finDelJuego = true;
        }
    }
    
    htmlMarkup += `<div class="head" style="grid-area: ${snakeY} / ${snakeX}"></div>`;
    playBoard.innerHTML = htmlMarkup;
}


changFoodPosition();
//iniGame();
setIntervalId = setInterval(iniGame,125);
document.addEventListener("keydown", changeDirection);