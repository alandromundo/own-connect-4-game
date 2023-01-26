import React from 'react'
import { Square } from './Square';
import { checkWinner } from '../logic/game';
import { TURN } from '../constants';

function Game({ board, turn, winner, setBoard, setTurn, setWinner }) {

  function updateBoard(rowIndex, colIndex) {

    if (board[rowIndex][colIndex]) return 
  
    const newBoard = [...board];
  
    let newRowPosition = board.length - 1;
  
    if(newBoard[board.length - 1][colIndex] === null){
      newRowPosition = board.length - 1;
      newBoard[board.length - 1][colIndex] = turn;
    } else if(newBoard[board.length - 2][colIndex] === null){
      newRowPosition = board.length - 2;
      newBoard[board.length - 2][colIndex] = turn;
    } else if(newBoard[board.length - 3][colIndex] === null){
      newRowPosition = board.length - 3;
      newBoard[board.length - 3][colIndex] = turn;
    } else if(newBoard[board.length - 4][colIndex] === null){
      newRowPosition = board.length - 4;
      newBoard[board.length - 4][colIndex] = turn;
    } else {
      newRowPosition = board.length - 5;
      newBoard[board.length - 5][colIndex] = turn;
    }
  
    setBoard(newBoard);
  
    const newWinner = checkWinner(newBoard, newRowPosition, colIndex)
    if (newWinner){
      setWinner(turn)
    }
    const newTurn = turn === TURN[1] ? TURN[2] : TURN[1];
    setTurn(newTurn);
  }

  return (
    <section className='game'>
          {
            board.map((row, rowIndex) => {
              return(
                row.map((col, colIndex) => {
                  return (
                    // <div key={`${rowIndex}${colIndex}`} className='square' onClick={() => updateBoard(rowIndex, colIndex)}>{col}</div>
                    <Square
                      key={`${rowIndex}${colIndex}`}
                      className='square'
                      rowIndex={rowIndex}
                      colIndex={colIndex}
                      updateBoard={updateBoard}
                    >
                      {board[rowIndex][colIndex]}
                    </Square>
                  )
                })
              )
            })
          }
      </section>
  )
}

export default Game