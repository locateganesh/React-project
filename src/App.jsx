

import { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/Gameboards';
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './winning-combinations';
import GameOver from './components/GameOver.jsx';

const PLAYRES = {
  X: 'Player 1',
  O: 'Player 2'
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function derivedActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function winnerLogic(gameBoard, playerName) {
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSqaureSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSqaureSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSqaureSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSqaureSymbol && firstSqaureSymbol === secondSqaureSymbol && firstSqaureSymbol === thirdSqaureSymbol) {
      winner = playerName[firstSqaureSymbol];
    }
  }
  return winner;
}
function derivedGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(innerArray => [...innerArray])];
  for (const turn of gameTurns) {
      const {sqaure, player} = turn;
      const {row, col} = sqaure;
      gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerName, setPlayerName] = useState(PLAYRES);

  const activePlayer = derivedActivePlayer(gameTurns);
  let gameBoard = derivedGameBoard(gameTurns);
  let winner = winnerLogic(gameBoard, playerName);
  const hasDraw = gameTurns.length === 9 && !winner;

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns(prevTurns => {
      let currentPlayer = derivedActivePlayer(prevTurns);
      const updatedTurns = [
        {sqaure: {row: rowIndex, col: colIndex}, player: currentPlayer},
        ...prevTurns
      ];
      return updatedTurns;
    });

  }

  const handleRestart = () => {
    setGameTurns([]);
  };

  const handlePlayerNameChange = (symbol, newName) => {
    setPlayerName(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player name={playerName.X} symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange} />
          <Player name={playerName.O} symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
