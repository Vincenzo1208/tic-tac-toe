const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");



let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// initializaTION

function initGame(){
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    //one more thing is missing, initialise box with css properties again
    box.classList = `box box${index+1}`;
});
 
  newGameBtn.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currentPlayer}` ;

};
initGame();

function swapTurn(){

    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }

    //UI Updated
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
//    newGameBtn.classList.add("active");
let answer = "";
 
winningPositions.forEach((position) =>{
    if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
    && (gameGrid[position[0]] === gameGrid[position[1]]) &&( gameGrid[position[1]] === gameGrid[position[2]])){


        // ch3eck is winner x hai
        if(gameGrid[position[0]] === "X")
            answer = "X";
        else{
        answer = "O"
        }

        // disable pointer events
        boxes.forEach((box) =>{
            box.style.pointerEvents = "none";
        })
        // now we know X ya O is winner
       boxes[position[0]].classList.add("win");
       boxes[position[1]].classList.add("win");
       boxes[position[2]].classList.add("win");
    };
});

// winner was founded!
 if(answer != ""){
    gameInfo.innerText = `Winner Player - ${answer}`;
    newGameBtn.classList.add("active");
    return;
 }

//  let cvheck whether there is a tie situation
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
            fillCount++;
    });

    // board bhar gaya aur game tie ho gya
    if(fillCount === 9){
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
    }

}



function handleClick(index){ 
    if(gameGrid[index] === ""){
        boxes[index].innerHTML = currentPlayer; // ui ke boxes ko show kr rh h
        gameGrid[index] = currentPlayer; //js ki grid ko show kr rh h
        boxes[index].style.pointerEvents = "none";
        //swap krna h turn ko
        swapTurn();
        // check koi jeeta toh nhi
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", ()=>{
     handleClick(index);
    })
})


newGameBtn.addEventListener("click", initGame);
