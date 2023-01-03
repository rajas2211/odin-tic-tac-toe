/* eslint-disable no-underscore-dangle */
const gameBoard = (() => {
    const _gameState = [``, `` , ``, ``, ``, ``, ``, ``, ``];
    const getGameState = () => _gameState;
    return {getGameState}
})();

console.log(gameBoard.getGameState())