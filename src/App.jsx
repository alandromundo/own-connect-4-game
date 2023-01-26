import './App.css'
import { useState } from 'react'
import { TURN } from './constants'
import { Square } from './components/Square'

/* function Square() {
  return(
    <div className='square'>

    </div>
  );
} */



function App() {

  const [board, setBoard] = useState(Array(5).fill(0).map(row => new Array(7).fill(null)))
  const [turn, setTurn] = useState(TURN[1]);
  const [winner, setWinner] = useState();

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

  function resetGame() {
    setBoard(Array(5).fill(0).map(row => new Array(7).fill(null)))
    setTurn(TURN[1])
    setWinner(null);
  }

  function checkWinner(boardToCheck, actualRowIndex, actualColIndex) {
    
    if (checkHorizontalWinning(boardToCheck, actualRowIndex, actualColIndex) ||
        checkVerticalWinning(boardToCheck, actualRowIndex, actualColIndex) ||
        checkDiagonal10To4Winning(boardToCheck, actualRowIndex, actualColIndex) ||
        checkDiagonal8To2Winning(boardToCheck, actualRowIndex, actualColIndex)
        ){
          return true
      }
      
      
  }

  function checkHorizontalWinning (boardToCheck, actualRowIndex, actualColIndex) {

    let counter = 0;
    let newColIndex = actualColIndex + 1
    let newColIndexPlus4 = actualColIndex + 4
    let newColIndexMinus4 = actualColIndex - 4

    while (newColIndex < newColIndexPlus4) {
      if(boardToCheck[actualRowIndex][actualColIndex] == boardToCheck[actualRowIndex][newColIndex]){
        counter++;
      } else {
        break
      }
      newColIndex++;
    }

    newColIndex = actualColIndex - 1

    while (newColIndex > newColIndexMinus4) {
      if(boardToCheck[actualRowIndex][actualColIndex] == boardToCheck[actualRowIndex][newColIndex]){
        counter++;
      } else {
        break
      }
      newColIndex--;
    }

    return counter === 3

  }

  function checkVerticalWinning (boardToCheck, actualRowIndex, actualColIndex) {

    let counter = 0;
    let newRowIndexPlus4 = actualRowIndex + 4
    let newRowIndex = actualRowIndex + 1

    if(newRowIndex < boardToCheck.length) {
      while (newRowIndex < newRowIndexPlus4) {

        try {
          if(boardToCheck[actualRowIndex][actualColIndex] == boardToCheck[newRowIndex][actualColIndex]){
            counter++;
          } else {
            break
          }
          newRowIndex++;
        } catch (error) {
          newRowIndex++
        }
        

      }
    }

    return counter === 3
  }

  function checkDiagonal10To4Winning(boardToCheck, actualRowIndex, actualColIndex) {
    let counter = 0;
    let newColIndex = actualColIndex + 1
    let newRowIndex = actualRowIndex + 1
    let newRowIndexPlus4 = actualRowIndex + 4

    if(newRowIndex < boardToCheck.length) {
      while (newRowIndex < newRowIndexPlus4) {

        try {
          if(boardToCheck[actualRowIndex][actualColIndex] == boardToCheck[newRowIndex][newColIndex]){
            counter++;
          } else {
            break
          }
          newRowIndex++;
          newColIndex++
        } catch (error) {
          newRowIndex++
          newColIndex++
        }
        
      }
    }

    newColIndex = actualColIndex - 1
    newRowIndex = actualRowIndex - 1
    let newRowIndexMinus4 = actualRowIndex - 4

    if(newRowIndex < boardToCheck.length) {
      while (newRowIndex > newRowIndexMinus4) {

        try {
          if(boardToCheck[actualRowIndex][actualColIndex] == boardToCheck[newRowIndex][newColIndex]){
            counter++;
          } else {
            break
          }
          newRowIndex--;
          newColIndex--
        } catch (error) {
          newRowIndex--
          newColIndex--
        }
        
      }
    }

    return counter === 3
  }  

  function checkDiagonal8To2Winning(boardToCheck, actualRowIndex, actualColIndex) {
    let counter = 0;
    let newColIndex = actualColIndex + 1
    let newRowIndex = actualRowIndex - 1
    let newRowIndexMinus4 = actualRowIndex - 4

    // console.log(`newRowIndex: ${newRowIndex}, newRowIndexMinus4: ${newRowIndexMinus4}`);

    while (newRowIndex > newRowIndexMinus4) {

      try {
        if(boardToCheck[actualRowIndex][actualColIndex] == boardToCheck[newRowIndex][newColIndex]){
          counter++;
        } else {
          break
        }
        newRowIndex--;
        newColIndex++
      } catch (error) {
        newRowIndex--
        newColIndex++
      }
      
    }

    newColIndex = actualColIndex - 1
    newRowIndex = actualRowIndex + 1
    let newRowIndexPlus4 = actualRowIndex + 4

      while (newRowIndex < newRowIndexPlus4) {

        try {
          if(boardToCheck[actualRowIndex][actualColIndex] == boardToCheck[newRowIndex][newColIndex]){
            counter++;
          } else {
            break
          }
          newRowIndex++;
          newColIndex--
        } catch (error) {
          newRowIndex++
          newColIndex--
        }
    }

    return counter === 3
  }

  return (
    <main className="board">
      <h1>Connect 4!</h1>
      <button onClick={resetGame}>Start again</button>
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
      <section className="turn">
        <Square isSelected={turn === TURN[1]}>
          {TURN[1]}  
        </Square>      
        <Square isSelected={turn === TURN[2]}>
          {TURN[2]}  
        </Square>      
      </section>
      {
        winner && 
        <section className='winner'>
      <div className="text">
        <h2>
          {winner === false ? 'Draw' : 'Won'}
        </h2>

        <header className='win'>
          {winner && <Square>{winner}</Square>}
        </header>

        <footer>
          <button onClick={resetGame}>Start again</button>
        </footer>

      </div>
    </section>
      }
    </main>
  )
}

export default App
