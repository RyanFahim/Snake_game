// Variables and Constants
let inputDir = {x:0, y:0}
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 7;
let lastPaintTime = 0;
let snakeArr =[
    {x:13 , y:15}
];

food = {x:7, y:8};
let score = 0;

//Main function
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime -lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    //console.log(ctime);
    gameEngine();
}



function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}



function gameEngine(){
    //Part 1: Update game Engine and Food

    //collision
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0; 
    }
    // If the snake eats any food and generate new postion for the food
    if(snakeArr[0].x  === food.x && snakeArr[0].y === food.y){
        foodSound.play();
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        score += 1;

        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "High Score: " + hiscoreval;
        }

        scoreBox.innerHTML = "Score " + score;
        let a= 3;
        let b = 15;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}

    }

    //Moving the snake
     for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

     snakeArr[0].x += inputDir.x;
     snakeArr[0].y += inputDir.y;

    //part 2: Render snake and food
    

    //Display the Snake

    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // Display the food
     foodElement = document.createElement('div');
     foodElement.style.gridRowStart = food.y;
     foodElement.style.gridColumnStart = food.x;
     foodElement.classList.add('food')
     board.appendChild(foodElement);
}

//Main Logic

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);

    //key press code
window.addEventListener('keydown',e=>{
    inputDir = {x:0, y:1}
    moveSound.play();

    switch (e.key){
        case "ArrowDown":
            inputDir.x= 0 ;
            inputDir.y= 1 ;
            break;
        
        case "ArrowUp":
            inputDir.x= 0;
            inputDir.y= -1;
            break;

        case "ArrowRight":
            inputDir.x= 1;
            inputDir.y= 0;
            break;

        case "ArrowLeft":
            inputDir.x= -1;
            inputDir.y= 0;
            break;

        default:
            break;
    }
})

