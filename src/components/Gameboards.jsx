// import { useState } from "react";

export default function GameBoard({onSelectSquare, board }) { // activePlayerSymbol
    // const [gameBoard, setGameBoard] = useState(InitialGame);

    // const handleClick = (rowIndex, colIndex) => {
    //     setGameBoard(prevBoard => {
    //         const updatedBoard = [...prevBoard.map(indexArray => [...indexArray])]; // Don't override state directly, always make a copy and update that, This is being updating data in immutable way.
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //     });

    //     onSelectSquare();
    // };
    // console.log("GameBoard", board);
    return <ol id="game-board">
        {board.map((row, rowIndex) => <li key={rowIndex}>
            <ol>
                {row.map((playerSymbol, colIndex) => <li key={colIndex}><button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button></li>)}
            </ol>
        </li>)}
    </ol>
}