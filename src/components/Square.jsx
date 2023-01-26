import React from 'react'

export function Square ({ children, isSelected, updateBoard, rowIndex, colIndex }) {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(rowIndex, colIndex)
  }

  return (
    <div
      className={className}
      onClick={handleClick}
    >
      {children}
    </div>
  )
}
