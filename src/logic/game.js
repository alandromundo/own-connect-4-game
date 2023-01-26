export function checkWinner (boardToCheck, actualRowIndex, actualColIndex) {
  if (checkHorizontalWinning(boardToCheck, actualRowIndex, actualColIndex) ||
      checkVerticalWinning(boardToCheck, actualRowIndex, actualColIndex) ||
      checkDiagonal10To4Winning(boardToCheck, actualRowIndex, actualColIndex) ||
      checkDiagonal8To2Winning(boardToCheck, actualRowIndex, actualColIndex)
  ) {
    return true
  }
}

function checkHorizontalWinning (boardToCheck, actualRowIndex, actualColIndex) {
  let counter = 0
  let newColIndex = actualColIndex + 1
  const newColIndexPlus4 = actualColIndex + 4
  const newColIndexMinus4 = actualColIndex - 4

  while (newColIndex < newColIndexPlus4) {
    if (boardToCheck[actualRowIndex][actualColIndex] === boardToCheck[actualRowIndex][newColIndex]) {
      counter++
    } else {
      break
    }
    newColIndex++
  }

  newColIndex = actualColIndex - 1

  while (newColIndex > newColIndexMinus4) {
    if (boardToCheck[actualRowIndex][actualColIndex] === boardToCheck[actualRowIndex][newColIndex]) {
      counter++
    } else {
      break
    }
    newColIndex--
  }

  return counter === 3
}

function checkVerticalWinning (boardToCheck, actualRowIndex, actualColIndex) {
  let counter = 0
  const newRowIndexPlus4 = actualRowIndex + 4
  let newRowIndex = actualRowIndex + 1

  if (newRowIndex < boardToCheck.length) {
    while (newRowIndex < newRowIndexPlus4) {
      try {
        if (boardToCheck[actualRowIndex][actualColIndex] === boardToCheck[newRowIndex][actualColIndex]) {
          counter++
        } else {
          break
        }
        newRowIndex++
      } catch (error) {
        newRowIndex++
      }
    }
  }

  return counter === 3
}

function checkDiagonal10To4Winning (boardToCheck, actualRowIndex, actualColIndex) {
  let counter = 0
  let newColIndex = actualColIndex + 1
  let newRowIndex = actualRowIndex + 1
  const newRowIndexPlus4 = actualRowIndex + 4

  if (newRowIndex < boardToCheck.length) {
    while (newRowIndex < newRowIndexPlus4) {
      try {
        if (boardToCheck[actualRowIndex][actualColIndex] === boardToCheck[newRowIndex][newColIndex]) {
          counter++
        } else {
          break
        }
        newRowIndex++
        newColIndex++
      } catch (error) {
        newRowIndex++
        newColIndex++
      }
    }
  }

  newColIndex = actualColIndex - 1
  newRowIndex = actualRowIndex - 1
  const newRowIndexMinus4 = actualRowIndex - 4

  if (newRowIndex < boardToCheck.length) {
    while (newRowIndex > newRowIndexMinus4) {
      try {
        if (boardToCheck[actualRowIndex][actualColIndex] === boardToCheck[newRowIndex][newColIndex]) {
          counter++
        } else {
          break
        }
        newRowIndex--
        newColIndex--
      } catch (error) {
        newRowIndex--
        newColIndex--
      }
    }
  }

  return counter === 3
}

function checkDiagonal8To2Winning (boardToCheck, actualRowIndex, actualColIndex) {
  let counter = 0
  let newColIndex = actualColIndex + 1
  let newRowIndex = actualRowIndex - 1
  const newRowIndexMinus4 = actualRowIndex - 4

  // console.log(`newRowIndex: ${newRowIndex}, newRowIndexMinus4: ${newRowIndexMinus4}`);

  while (newRowIndex > newRowIndexMinus4) {
    try {
      if (boardToCheck[actualRowIndex][actualColIndex] === boardToCheck[newRowIndex][newColIndex]) {
        counter++
      } else {
        break
      }
      newRowIndex--
      newColIndex++
    } catch (error) {
      newRowIndex--
      newColIndex++
    }
  }

  newColIndex = actualColIndex - 1
  newRowIndex = actualRowIndex + 1
  const newRowIndexPlus4 = actualRowIndex + 4

  while (newRowIndex < newRowIndexPlus4) {
    try {
      if (boardToCheck[actualRowIndex][actualColIndex] === boardToCheck[newRowIndex][newColIndex]) {
        counter++
      } else {
        break
      }
      newRowIndex++
      newColIndex--
    } catch (error) {
      newRowIndex++
      newColIndex--
    }
  }

  return counter === 3
}
