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
        // eslint-disable-next-line no-use-before-define
        Display.reset();
        // eslint-disable-next-line no-use-before-define
        Control.reset();
    };
    const getGameState = () => _gameState;
    const getGridState = (position) => _gameState[position];
    const getWinner = () => _winner;
    const isGameOver = () => {
        if (!_gameState.includes(null) || _winner) {
            _gameOver = true;
            console.log(`Game Over`);
        }
        return _gameOver;
    };
    const setWinner = player => {_winner = player};
    const finishGame = () => {_gameOver = true};
    const play = (position, player) => {
        _gameState[position] = player;
        // eslint-disable-next-line no-use-before-define
        Display.play(position, player);
    };
    return {
        getGameState, getGridState,
        reset, isGameOver, finishGame,
        getWinner, setWinner,
        play
    };
})();

const Display = (() => {
    const reset = () => {
        const grids = document.querySelectorAll(`div.grid`);
        grids.forEach(grid => {
            grid.textContent = null;
        });
        const winner = document.querySelector(`p.winner`);
        winner.textContent = null;
        // winner.textContent = `${Game.getWinner()} wins!`;
    };
    const play = (position, player) => {
        const grid = document.querySelector(`#grid-${position}`);
        grid.textContent = player.getPlayerMarker();
    };
    return {reset, play}
})();

const Player = (marker, name=null) => {
    const getPlayerMarker = () => marker;
    const getPlayerName = () => name;
    const setPlayerName = newName => {
        name=newName;
    };
    const setPlayerMarker = newMarker => {
        marker = newMarker;
    }
    return {getPlayerMarker, getPlayerName, setPlayerMarker, setPlayerName};
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
        if (!Game.isGameOver()){
            if (!Game.getGridState(position)) {
                console.log(`Move will be made by ${_currentPlayer.getPlayerMarker()}`);
                Game.play(position, _currentPlayer);
                console.log(`Move made by ${_currentPlayer.getPlayerMarker()}`);
                toggleCurrentPlayer();
                Game.isGameOver();
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
    return {grids, reset};
})();

