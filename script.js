/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const Game = (() => {
    let _gameState = new Array(9).fill(null);
    let _gameOver = false;
    let _winner = null;
    const reset = () => {
        _gameState = new Array(9).fill(null);
        _gameOver = false;
        _winner = null;
        Display.reset();
        Control.reset();
    };
    const getGameState = () => _gameState;
    const getGridState = (position) => _gameState[position];
    const getWinner = () => _winner;
    const checkWinner = () => {
        const OnCondition = (subGridPositions) => {
            // console.log(`Checking  for winner on ${subGridPositions}`)
            const subGrid = [_gameState[subGridPositions[0]],
                             _gameState[subGridPositions[1]],
                             _gameState[subGridPositions[2]]];
            if (subGrid.every(grid => grid === Control.getPlayer1())){
                return Control.getPlayer1();
            }
            if (subGrid.every(grid => grid === Control.getPlayer2())){
                return Control.getPlayer2();
            }
                return false;
        }
        const conditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
                            [0, 3, 6], [1, 4, 7], [2, 5, 8],
                            [0, 4, 8], [2, 4, 6]];
        conditions.forEach(condition => {
            const isWinner = OnCondition(condition);
            if (isWinner){
                _winner = isWinner;
            }
        });
        if (_winner) console.log(`${_winner.getMarker()} WINS!`);
        return _winner;
    };
    const isOver = () => {
        if (_gameOver) return _gameOver;
        checkWinner();
        if (!_gameState.includes(null) || _winner) {
            _gameOver = true;
            console.log(`Game Over`);
        }
        return _gameOver;
    };
    const setWinner = player => {_winner = player};
    const finish = () => {Display.declareWinner(_winner)};
    const play = (position, player) => {
        _gameState[position] = player;
        Display.play(position, player);
    };
    return {
        getGameState, getGridState,
        reset, isOver, finish,
        getWinner, setWinner,
        play
    };
})();

const Display = (() => {
    const grids = document.querySelectorAll(`div.grid`);
    const winner = document.querySelector(`h2.winner`);
    const reset = () => {
        grids.forEach(grid => {
            grid.textContent = null;
        });
        winner.textContent = null;
        // winner.textContent = `${Game.getWinner()} wins!`;
    };
    const play = (position, player) => {
        const grid = document.querySelector(`#grid-${position}`);
        grid.textContent = player.getMarker();
    };
    const declareWinner = (player) => {
        if (player) {
            winner.textContent = `${player.getMarker()} WINS!`;
        }
        else {
            winner.textContent = `It's a DRAW!`;
        }

    }
    return {reset, play, declareWinner}
})();

const Player = (marker, name=null) => {
    const getMarker = () => marker;
    const getName = () => name;
    const setName = newName => {
        name=newName;
    };
    const setPlayerMarker = newMarker => {
        marker = newMarker;
    }
    return {getMarker, getName, setPlayerMarker, setName};
};

const Control = (() => {
    const _player1 = Player('X');
    const _player2 = Player('O');
    let _currentPlayer = _player1;
    const resetBtn = document.querySelector('button.reset');
    resetBtn.addEventListener('click', Game.reset);
    // Game.play(0, _player1);
    // Game.play(4, _player2);
    const toggleCurrentPlayer = () => {
        if (_currentPlayer === _player1) {
            _currentPlayer = _player2;
        } else if (_currentPlayer === _player2) {
            _currentPlayer = _player1;
        }
    };
    const play = (event) => {
        const position = event.target.id[event.target.id.length - 1];
        if (!Game.isOver()){
            if (!Game.getGridState(position)) {
                // console.log(`Move will be made by ${_currentPlayer.getMarker()}`);
                Game.play(position, _currentPlayer);
                // console.log(`Move made by ${_currentPlayer.getMarker()}`);
                toggleCurrentPlayer();
                if (Game.isOver()) Game.finish();
            }
        }
    };

    const grids = document.querySelectorAll('div.grid');
    grids.forEach((grid) => {
        grid.addEventListener('click', play);
    });

    const reset = () => {
        _currentPlayer=_player1;
    };
    const getPlayer1 = () => _player1;
    const getPlayer2 = () => _player2;
    return {grids, reset, getPlayer1, getPlayer2};
})();

