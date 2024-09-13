const modeSelection = document.querySelector('#modeSelection');
const gameBoxes = document.querySelectorAll('.box');
const winScreen = document.querySelector('#winScreen');
const newGameBtn = document.querySelector('#newGameBtn');
const resetBtn = document.querySelector('#resetBtn');
const playerTurn = document.querySelector('#playersTurn');
const closeBtn = document.querySelector('#closeBtn');
const prevGameBtn = document.querySelector('#prevGameBtn');
const darkMode = document.querySelector('#darkModeToggle');
const changeModeBtn = document.querySelector("#changeModeBtn");
const body = document.querySelector('html');

function toggleDarkMode() {
  body.classList.toggle('dark');
  if(body.classList.contains("dark"))
    localStorage.setItem("theme" , JSON.stringify("dark"));
  else
    localStorage.setItem("theme" , JSON.stringify("light"));
}
// Logic for dark mode
darkMode.addEventListener('click', () => {
 toggleDarkMode();
});

const themeCheck = JSON.parse(localStorage.getItem("theme"));
if(themeCheck){
    if(themeCheck == "dark") body.classList.add("dark");
    else body.classList.remove("dark");
}

document.addEventListener('keydown', (event) => {
  if (event.key === ' ' || event.key === 'd' || event.key === 'D') {
    toggleDarkMode();
  }
});

let vsCom = false;

const mode = JSON.parse(localStorage.getItem("mode"));

if(mode){
    modeSelection.style.display = "none";
    if(mode === "multiplayer") vsCom = false;
    else if(mode === "AI") vsCom= true;
}


let turnO = false;
const playerNames =JSON.parse(localStorage.getItem("playerNames"));
let player1 = "PLAYER 1(X)" , player2 = "Player 2"
if(playerNames){
   player1 =playerNames[0];
   player2 = playerNames[1];
}


let htmlForTurn = `<span class="text-red-500 font-bold transition-all" > X </span>`;
let score1 = 0,score2 = 0,count = 0;

function updateHtml() {
  let playerNameDiv = playerTurn.children[0];
  if (turnO) {
    playerNameDiv.innerText = `${player2}'s Turn `;
    htmlForTurn = `<span class="text-green-500 font-bold transition-all" >O</span>`;

    /* Basic Color Change*/
    playerNameDiv.classList.add('text-green-500');
    playerNameDiv.classList.remove('text-red-500');
  } else {
    playerNameDiv.innerText = `${player1}'s Turn`;
    htmlForTurn = `<span class="text-red-500 font-bold transition-all" > X </span>`;

    /* Basic Color Change*/
    playerNameDiv.classList.remove('text-green-500');
    playerNameDiv.classList.add('text-red-500');
  }

  
  if(vsCom){
    document.getElementById("msgForMode").innerText = "AI MODE 🤖";
  }

  else{
    document.getElementById("msgForMode").innerText = "HUMAN MODE 🧑‍💼";
  }
}

updateHtml();

function updateScores() {
  const player1Score = document.querySelector('#player1Score');
  const player2Score = document.querySelector('#player2Score');

  player1Score.children[0].innerText = player1;
  player1Score.children[1].innerText = score1;

  player2Score.children[0].innerText = player2;
  player2Score.children[1].innerText = score2;
  console.log('Successfully Updated scores');
}

function updateWinscreen(winner) {
  let winnerName = document.querySelector('#winnerText');
  let winnerText = winnerName.children[0];
  const drawMsg = winnerName.children[1];

  drawMsg.classList.add('hidden');
  winnerText.classList.remove('hidden');

  if (winner === 'O') {
    winnerText.children[0].innerText = player2;
    winnerText.children[0].classList.remove('text-red-500');
    winnerText.children[0].classList.add('text-green-500');
    winnerName.children[2].src = './asset/memeWin.webp';
    console.log(winnerName.children[1]);
  } else if (winner === 'X') {
    winnerName.children[0].children[0].innerText = player1;
    winnerText.children[0].classList.add('text-red-500');
    winnerText.children[0].classList.remove('text-green-500');
    winnerName.children[2].src = './asset/machineWins.webp';
  } else {
    drawMsg.classList.remove('hidden');
    winnerText.classList.add('hidden');
    winnerName.children[2].src = './asset/memeGameDraw.gif';
    console.log(winnerName.children[1]);
  }
  winScreen.classList.remove('hidden');
}

function disableBoxes() {
  gameBoxes.forEach((box) => {
    turnO = false;
    box.classList.add('clicked');
  });
}

function clearBoxes() {
  turnO = false;
  count = 0;
  gameBoxes.forEach((box) => {
    box.innerText = '';
    box.classList.remove('clicked');
    box.style.backgroundColor = ''; // Reset background color
  });
  updateHtml();
}

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
    const [a, b, c] = pattern;
    const [pos1, pos2, pos3] = [
      gameBoxes[a].innerText,
      gameBoxes[b].innerText,
      gameBoxes[c].innerText,
    ];
    if (pos1 != '' && pos2 != '' && pos3 != '') {
      if (pos1 === pos2 && pos1 === pos3) {
        // Highlight winning pattern
        const winColor = pos1 === 'X' ? '#ffcccc' : '#ccffcc';
        gameBoxes[a].style.backgroundColor = winColor;
        gameBoxes[b].style.backgroundColor = winColor;
        gameBoxes[c].style.backgroundColor = winColor;

        updateWinscreen(pos1);
        disableBoxes();

        if (pos1 === 'O') score2++;
        else score1++;

        updateScores();

        return true;
      }
    }
  }
  return false;
};

const gameDraw = () => {
  winScreen.classList.remove('hidden');
  updateWinscreen('draw');
};


// Select what mode?
modeSelection.addEventListener('click', (evt) => {
  if (evt.target.id == 'multiBtn') {
    modeSelection.style.display = 'none';
    localStorage.setItem("mode" , JSON.stringify("multiplayer"));
  } else if (evt.target.id == 'vsComBtn') {
    modeSelection.style.display = 'none';
    vsCom = true;
    localStorage.setItem("mode" , JSON.stringify("AI"));
  }

  if(vsCom){
    document.getElementById("msgForMode").innerText = "AI MODE 🤖";
  }

  else{
    document.getElementById("msgForMode").innerText = "HUMAN MODE 🧑‍💼";
  }
});

playerTurn.addEventListener('click', () => {
  const playerForm = document.getElementById('playerForm');
  const player1input = document.querySelector('#player1');
  const player2input = document.querySelector('#player2');
  const changeNamebtn = document.getElementById('changeName');
  playerForm.classList.remove('hidden');

  player1input.value = player1;
  player2input.value = player2;


  changeNamebtn.addEventListener('click', () => {
    player1 = player1input.value.toUpperCase();
    player2 = player2input.value.toUpperCase();
    
  let stringFormatPlayerNames = JSON.stringify([player1 , player2]);
  localStorage.setItem("playerNames" , stringFormatPlayerNames);
    updateHtml();
    playerForm.classList.add('hidden');
  });
});

newGameBtn.addEventListener('click', () => {
  clearBoxes();
  winScreen.classList.add('hidden');
});

resetBtn.addEventListener('click', () => {
  clearBoxes();
});

closeBtn.addEventListener('click', () => {
  playerForm.classList.add('hidden');
});

prevGameBtn.addEventListener('click', () => {
  winScreen.classList.add('hidden');
});

changeModeBtn.addEventListener('click' , ()=>{
    clearBoxes();
    const oldMode = JSON.parse(localStorage.getItem("mode"));
    let newMode =  "multiplayer";
    
    if(oldMode){
    if(oldMode == "multiplayer")  newMode = "AI";
    localStorage.setItem("mode" , JSON.stringify(newMode));

    }
   



    vsCom = !vsCom;
   updateHtml();
})

let boardLocked = false;
function comMoveEasy() {
  const movesList = Array.from(gameBoxes).filter(
    (box) => !box.classList.contains('clicked')
  );

  if (movesList.length > 0) {
    boardLocked = true; // Lock the board
    setTimeout(() => {
      let randomIndex = Math.floor(Math.random() * movesList.length);
      movesList[randomIndex].innerHTML = htmlForTurn;
      movesList[randomIndex].classList.add('clicked');
      turnO = !turnO;
      count++;
      let isWinner = checkWinner();
      if (count == 9 && !isWinner) gameDraw();
      updateHtml();
      boardLocked = false; // Unlock the board
    }, 300);
  }
}

function comMoveMedium() {
  let index = -1;
  // Check if any blocking Move is there;
  let signForPlayer1 = 'X';
  let signForPlayer2 = 'O';

  // Check if we're winning the game*
  for (pattern of winningPatterns) {
    const [a, b, c] = pattern;
    const [pos1, pos2, pos3] = [
      gameBoxes[a].innerText,
      gameBoxes[b].innerText,
      gameBoxes[c].innerText,
    ];

    if (pos1 === signForPlayer2 && pos2 === signForPlayer2 && pos3 === '') {
      index = c;
      break;
    } else if (
      pos1 === '' &&
      pos2 === signForPlayer2 &&
      pos3 === signForPlayer2
    ) {
      index = a;
      break;
    } else if (
      pos1 === signForPlayer2 &&
      pos2 === '' &&
      pos3 === signForPlayer2
    ) {
      index = b;
      break;
    }
  }

  // If Not winning , then check if we can block any move*
  if (index === -1) {
    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;
      const [pos1, pos2, pos3] = [
        gameBoxes[a].innerText,
        gameBoxes[b].innerText,
        gameBoxes[c].innerText,
      ];

      if (pos1 === signForPlayer1 && pos2 === signForPlayer1 && pos3 === '') {
        index = c;
        break;
      } else if (
        pos1 === '' &&
        pos2 === signForPlayer1 &&
        pos3 === signForPlayer1
      ) {
        index = a;
        break;
      } else if (
        pos1 === signForPlayer1 &&
        pos2 === '' &&
        pos3 === signForPlayer1
      ) {
        index = b;
        break;
      }
    }
  }

  if (index === -1) {
    comMoveEasy();
    return;
  }
  // Logic to implement
  boardLocked = true;
  
  setTimeout(() => {
    gameBoxes[index].innerHTML = htmlForTurn;
    gameBoxes[index].classList.add('clicked');
    turnO = !turnO;
    count++;
    let isWinner = checkWinner();
    if (count == 9 && !isWinner) gameDraw();
    updateHtml();
    boardLocked = false; // Unlock the board
  }, 500);
}

// Main game Logic
gameBoxes.forEach((box) => {
  box.addEventListener('click', () => {
    if (!box.classList.contains('clicked') && !boardLocked) {
      box.classList.add('clicked');
      box.innerHTML = htmlForTurn;
      turnO = !turnO;
      updateHtml();
      count++;
      let isWinner = checkWinner();
      if (count == 9 && !isWinner) gameDraw();
      if(!isWinner && vsCom) comMoveMedium();
    }
  });
});