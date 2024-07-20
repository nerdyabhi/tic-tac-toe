const boxes = document.querySelectorAll('.box');
const resetBtn = document.querySelector('#resetBtn');
const newGameBtn = document.querySelector('#newGameBtn');
const winScreen = document.getElementById('winScreen');
const winnerIs = document.querySelector('#winnerIs');
const prevGameBtn = document.querySelector('#prevGameBtn');
let turnO = true; // flag to tell whose turn we're on

const winningPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const checkWinner = () => {
  for (let pattern of winningPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 != '' && pos2 != '' && pos3 != '') {
      if (pos1 === pos2 && pos1 === pos3) {
        winScreen.classList.remove('hidden');
        const winner = document.createElement('span');
        winner.innerText = pos1;
        if (pos1 == 'X') {
          winner.setAttribute('class', 'text-red-500');
        } else {
          winner.setAttribute('class', 'text-green-500');
        }
        winnerIs.appendChild(winner);
        return true;
      }
    }
  }
};

const gameDraw = () => {
  winScreen.classList.remove('hidden');
  winScreen.classList.add('text-green-400');
  winnerIs.innerText = 'Oh ho , we had a draw';
};
// logic to mark O's and X's
let count = 0;
boxes.forEach((box) => {
  box.addEventListener('click', () => {

    if(box.getAttribute('alreadyClicked') === 'true') return;

    if (turnO) {
      box.style.color = 'red';
      box.innerText = 'X';
      turnO = false;
    } else {
      box.style.color = 'green';
      box.innerText = 'O';
      turnO = true;
    }

    box.setAttribute("alreadyClicked" , "true");


    count++;
    let isWinner =  checkWinner();

    if(count === 9 && !isWinner)
    {
        gameDraw();
    }
  });

});


const enableBoxes = () =>{
    for (box of boxes) {
        box.innerText = '';
        box.setAttribute('alreadyClicked' , 'false');
        count =0;
        winnerIs.innerText = "Winner Is ";
      }
}

const disableBoxes = () =>{
    for (box of boxes) {
        box.setAttribute('alreadyClicked' , 'true');
      }
}
// Reset button working
resetBtn.addEventListener('click', enableBoxes);

// Winner Game :
const showGame = () => {
  winScreen.classList.add('hidden');
};

prevGameBtn.addEventListener('click' , () =>{
    disableBoxes();
    showGame();
})

newGameBtn.addEventListener('click', () =>{
    count =0;
    enableBoxes();
    showGame();
    winnerIs.innerText = 'WINNER IS ';
});
