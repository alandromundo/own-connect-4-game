import './App.css'
import { useState } from 'react'
import { TURN } from './constants'
import { Square } from './components/Square'
import Game from './components/Game'
import WinnerModal from './components/WinnerModal'

function App() {

  const [board, setBoard] = useState(Array(5).fill(0).map(row => new Array(7).fill(null)))
  const [turn, setTurn] = useState(TURN[1]);
  const [winner, setWinner] = useState();

  function resetGame() {
    setBoard(Array(5).fill(0).map(row => new Array(7).fill(null)))
    setTurn(TURN[1])
    setWinner(null);
  }

  return (
    <main className="board">
      <h1>Connect 4!</h1>
      <button onClick={resetGame}>Start again</button>
      <Game
        board={board}
        turn={turn}
        winner={winner}
        setBoard={setBoard}
        setTurn={setTurn}
        setWinner={setWinner}
      />
      <section className="turn">
        <Square isSelected={turn === TURN[1]}>
          {TURN[1]}  
        </Square>      
        <Square isSelected={turn === TURN[2]}>
          {TURN[2]}  
        </Square>      
      </section>
      <WinnerModal winner={winner}/>
    </main>
  )
}

export default App
