const boxes = document.querySelectorAll('.box');
const resetBtn = document.querySelector('#resetBtn');
const newGameBtn = document.querySelector('#newGameBtn');
const winScreen = document.getElementById('winScreen');
const winnerIs = document.querySelector('#winnerIs');
const prevGameBtn = document.querySelector('#prevGameBtn');
const playerForm = document.querySelector('#playerForm');
const closeBtn = document.querySelector('#closeBtn');
const player1 = document.querySelector('#player1');
const player2 = document.querySelector('#player2');
const changeName = document.querySelector('#changeName');
const turn1 = document.querySelector('#turn1');
const turn2 = document.querySelector('#turn2');
const player1Name = document.querySelector('#player1Name');
const player2Name = document.querySelector('#player2Name');
const score1Name = document.querySelector('#score1Name');
const score2Name = document.querySelector('#score2Name');
const body = document.querySelector('html');
const darkMode = document.querySelector('#darkModeToggle');

darkMode.addEventListener('click', () => {
  body.classList.toggle('dark');
});

let score1 = 0,
  score2 = 0;
let turnO = true; // flag to tell whose turn we're on

closeBtn.addEventListener('click', () => {
  playerForm.style.display = 'none';
});

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

let name1 = 'Player1 (X)';
let name2 = 'Player2 (O)';

changeName.addEventListener('click', () => {
  if (player1.value != '') name1 = player1.value.toUpperCase();
  if (player2.value != '') name2 = player2.value.toUpperCase();

  turn1.innerText = `${name1}'s turn`;
  turn2.innerText = `${name2}'s turn`;
  playerForm.style.display = 'none';

  player1Name.innerText = name1;
  player2Name.innerText = name2;
});

turn2.style.display = 'none';

const checkWinner = () => {
  for (let pattern of winningPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 != '' && pos2 != '' && pos3 != '') {
      if (pos1 === pos2 && pos1 === pos3) {
        winScreen.classList.remove('hidden');
        const winner = document.createElement('span');
        if (pos1 === 'X') {
          winner.innerText = `${name1} `;
          winner.setAttribute('class', 'text-red-500');
          score1++;
        } else {
          winner.setAttribute('class', 'text-green-500');
          winner.innerText = `${name2} `;
          score2++;
        }
        score1Name.innerText = score1;
        score2Name.innerText = score2;
        winnerIs.prepend(winner);
        return true;
      }
    }
  }
};

const gameDraw = () => {
  winScreen.classList.remove('hidden');
  winScreen.classList.add('text-green-400');
  winnerIs.innerText = 'Game Draw ! 😮‍💨';
  score1Name.innerText = score1;
  score2Name.innerText = score2;
};
// logic to mark O's and X's
let count = 0;
boxes.forEach((box) => {
  box.addEventListener('click', () => {
    if (box.getAttribute('alreadyClicked') === 'true') return;

    if (turnO) {
      box.style.color = 'red';
      box.innerText = 'X';
      turn1.style.display = 'none';
      turn2.style.display = 'block';

      turnO = false;
    } else {
      if (body.classList.contains('dark')) {
        box.style.color = 'lightgreen';
      } else {
        box.style.color = 'green';
      }
      box.innerText = 'O';
      turn2.style.display = 'none';
      turn1.style.display = 'block';
      turnO = true;
    }

    box.setAttribute('alreadyClicked', 'true');

    count++;
    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const enableBoxes = () => {
  for (box of boxes) {
    box.innerText = '';
    box.setAttribute('alreadyClicked', 'false');
    count = 0;
    winnerIs.innerText = 'Won 🥳 ';
  }
};

const disableBoxes = () => {
  for (box of boxes) {
    box.setAttribute('alreadyClicked', 'true');
  }
};
// Reset button working
resetBtn.addEventListener('click', enableBoxes);

// Winner Game :
const showGame = () => {
  winScreen.classList.add('hidden');
};

prevGameBtn.addEventListener('click', () => {
  disableBoxes();
  showGame();
});

newGameBtn.addEventListener('click', () => {
  count = 0;
  enableBoxes();
  showGame();
  winnerIs.innerText = 'WON 🎊🥳 ';
});
