import React from 'react'

function WinnerModal({ winner }) {

  if(winner === null) return null

  return (
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
  )
}

export default WinnerModal