let turn = true;
let turns = 9;
let tileTurns = Array(9).fill(undefined);
let running = false;
let tiles = document.querySelectorAll('.tile');
let resetBoard = document.getElementById('reset');
resetBoard.addEventListener('click', reset);

let vsComputer = document.getElementById('vscomputer');
vsComputer.addEventListener('click', () => {
    mode = 'vsComputer';
});

let twoplayer = document.getElementById('2player');
twoplayer.addEventListener('click', () => {
    mode = '2player';
});

// beginning FUNCTION
function init() {
    let gameBoard = document.getElementById('gameBoard');
// beginning FOR
    for (let i = 0; i < turns; i++) {
        let tile = document.createElement('div');
        tile.classList.add('tile');

            tiles.forEach((tile, i) => {
        tile.addEventListener('click', () => {
        // beginning IF
            if (turn != 0 && !running) {
                    let empty = !tile.innerText;
            // beginning IF
                if (empty) {
                        tile.innerText = 'X';
                    tileTurns[i] = turn;
                    turns--;
                    let win = checkWin(turn);
                // beginning IF
                    if (win) {
                    // beginning IF
                        if (turn) { console.log('X Wins'); }
                    // end IF

                    // beginning ELSE
                        else { console.log('O Wins'); }
                    // end ELSE
                    
                        scoreBoard(turn);
                        strike(win);
                        turns = 0;
                    }
                // end IF
                // beginning ELSE IF
                    else if (turns == 0 && !checkWin()) {
                        console.log('Cat Game');
                        reset();
                    }
                // end ELSE IF
                    else {
                        turn = !turn;
                        computersTurn();
                    }// end ELSE
                }// end IF
            }// end IF
        });// end 
    }); // end
    tile.addEventListener('mouseover', () =>{
            if (turn) {
                tile.classList.add('x');
            } else {
                tile.classList.add('o');
            }
        });
        tile.addEventListener('mouseout', () => {
            tile.classList.remove('x', 'o');
        });
    gameBoard.appendChild(tile);
    } // end FOR
} // end FUNCTION
function getrandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
}
// computersturn completed
function computersTurn() {
    running = true;
    let tiles = document.querySelectorAll('.tile');
    let emptySquares = [];
    for (const idx in tileTurns) {
        if (tileTurns[idx] == undefined) {
            emptySquares.push(idx); // 0
        }
    }
    let timer = setInterval(() => {
        let idx = emptySquares[getrandomInt(emptySquares.length)];
        tiles[idx].classList.add('o');
        setTimeout(() => {
            tiles[idx].classList.remove('o');
        }, 525);
    }, 500);
    
    setTimeout(() => {
        clearInterval(timer);
        let i = emptySquares[getrandomInt(emptySquares.length)];
        tiles[i].innerText = 'O';
        turns--;
        tileTurns[i] = turn;
        let win = checkWin(turn);
                        
        if (win) {
            scoreboard(turn);
            strike(win);
            turns = 0;
        } else if (turns == 0 && !checkWin(turn)) {
            console.log('Cat Game!');
            scoreboard('cat');
        } else {
            running = false;
            turn = !turn;
        }
    }, emptySquares.length * 550);
} // end function

// checkWin is (false)
// not completed
function checkWin() {
    let win = false;
    if ( // 1
        tileTurns[0] == turn &&
        tileTurns[1] == turn &&
        tileTurns[2] == turn) {
        win = 1;
    }
    if ( //2
        tileTurns[3] == turn &&
        tileTurns[4] == turn &&
        tileTurns[5] == turn) {
        win = 2;
    }
    if ( // 3
        tileTurns[6] == turn &&
        tileTurns[7] == turn &&
        tileTurns[8] == turn) {
        win = 3;
    }
    // if ( // 4
    //     tileTurns[0] )
    if ( tileTurns[0] == turn && tileTurns[3] == turn && tileTurns[6] == turn ) {
        win = 4;
    }
    if ( tileTurns[1] == turn && tileTurns[4] == turn && tileTurns[7] == turn ) {
        win = 5;
    }
    if ( tileTurns[2] == turn && tileTurns[5] == turn && tileTurns[8] == turn ) {
        win = 6;
    }
    // if ( // 7
    //     tileTurns[0] == turn && tileTurns[4] == turn )
    if ( tileTurns[0] == turn && tileTurns[4] == turn && tileTurns[8] == turn ) {
            win = 7;
        }
    if ( tileTurns[2] == turn && tileTurns[4] == turn && tileTurns[6] == turn ) {
        win = 8;
    }
    return win;
} // end function

// scoreboard completed
function scoreBoard(turn) {
    let player1 = document.getElementById('.player1');
    let player2 = document.getElementById('.player2');
    let catgame = document.getElementById('catgame');

    switch (turn) {
        case true:
            score = Number(player1.innerText);
            score++;
            player1.innerText = score;
            break;
        case false:
            score = Number(player2.innerText);
            score++;
            player2.innerText = score;
        default:
            score = Number(catgame.innerText);
            score++;
            catgame.innerText = score;
            break;
    }
} // end function

// reset is (undefined)
// reset completed
function reset() {
    turn = true;
    tileTurns = [];
    turns = 9;

    let tiles = document.querySelectorAll('.tiles');
    let strike = document.querySelectorAll('.strike');
    tiles.forEach((tile) => {
        tile.innerText = '';
    });
    strike.className = '';
} // end function

// strike completed
function strike(winscenario) {
    let strike = document.getElementById('strike');
    switch (winscenario) {
        case 1:
            strike.classList.add('strike');
            break;
        case 2:
            strike.classList.add('strike','row2');
            break; 
        case 3:
            strike.classList.add('strike','row3');
            break; 
        case 4:
            strike.classList.add('strike','horiz',);
            break;
        case 5:
            strike.classList.add('strike','horiz','col2');
            break; 
        case 6:
            strike.classList.add('strike','horiz','col3');
            break; 
        case 7:
            strike.classList.add('strike','diag1');
            break;
        case 8:
            strike.classList.add('strike','diag2');
            break;
    }
} // end function

init();

console.log(init());
console.log(checkWin());
console.log(strike());
console.log(reset());
console.log(scoreBoard());
console.log(computersTurn());
