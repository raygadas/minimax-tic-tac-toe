export const isEmpty = boardState => {
  return boardState.every(boardSquare => boardSquare === "");
};

export const isFull = boardState => {
  return boardState.every(boardSquare => boardSquare !== "");
};

export const checkHorizontalWin = boardState => {
  // Row 1
  if (
    boardState[0] &&
    boardState[0] === boardState[1] &&
    boardState[0] === boardState[2]
  ) {
    const winner = boardState[0];
    const direction = "horizontal";
    const where = "row1";
    return {
      winner,
      direction,
      where,
      message: `"${winner}" wins the game at ${where} in ${direction} direction`
    };
  }

  // Row 2
  if (
    boardState[3] &&
    boardState[3] === boardState[4] &&
    boardState[3] === boardState[5]
  ) {
    const winner = boardState[3];
    const direction = "horizontal";
    const where = "row2";
    return {
      winner,
      direction,
      where,
      message: `"${winner}" wins the game at ${where} in ${direction} direction`
    };
  }

  // Row 3
  if (
    boardState[6] &&
    boardState[6] === boardState[7] &&
    boardState[6] === boardState[8]
  ) {
    const winner = boardState[6];
    const direction = "horizontal";
    const where = "row3";
    return {
      winner,
      direction,
      where,
      message: `"${winner}" wins the game at ${where} in ${direction} direction`
    };
  }

  return false;
};

export const checkVerticalWin = boardState => {
  // Column 1
  if (
    boardState[0] &&
    boardState[0] === boardState[3] &&
    boardState[0] === boardState[6]
  ) {
    const winner = boardState[0];
    const direction = "vertical";
    const where = "column1";
    return {
      winner,
      direction,
      where,
      message: `"${winner}" wins the game at ${where} in ${direction} direction`
    };
  }

  // Column 2
  if (
    boardState[1] &&
    boardState[1] === boardState[4] &&
    boardState[1] === boardState[7]
  ) {
    const winner = boardState[1];
    const direction = "vertical";
    const where = "column2";
    return {
      winner,
      direction,
      where,
      message: `"${winner}" wins the game at ${where} in ${direction} direction`
    };
  }

  // Column 3
  if (
    boardState[2] &&
    boardState[2] === boardState[5] &&
    boardState[2] === boardState[8]
  ) {
    const winner = boardState[2];
    const direction = "vertical";
    const where = "column3";
    return {
      winner,
      direction,
      where,
      message: `"${winner}" wins the game at ${where} in ${direction} direction`
    };
  }

  return false;
};

export const checkDiagonalWin = boardState => {
  if (
    boardState[0] &&
    boardState[0] === boardState[4] &&
    boardState[0] === boardState[8]
  ) {
    const winner = boardState[0];
    const direction = "diagonal";
    const where = "top left to bottom right";
    return {
      winner,
      direction,
      where,
      message: `"${winner}" wins the game at ${where} in ${direction} direction`
    };
  }

  if (
    boardState[2] &&
    boardState[2] === boardState[4] &&
    boardState[2] === boardState[6]
  ) {
    const winner = boardState[2];
    const direction = "diagonal";
    const where = "top right to bottom left";
    return {
      winner,
      direction,
      where,
      message: `"${winner}" wins the game at ${where} in ${direction} direction`
    };
  }

  return false;
};

export const isTerminal = boardState => {
  // 1. Board is empty - return false
  // 2. Horizontal win
  // 3. Vertical win
  // 4. Diagonal win
  // 5. Draw - none of the above and board is full
  // Default case - return false

  // 1. Board is empty - return false
  if (isEmpty(boardState)) {
    return false;
  }

  // 2. Horizontal win
  const horizontalWin = checkHorizontalWin(boardState);
  if (horizontalWin) {
    return horizontalWin;
  }

  // 3. Vertical win
  const verticalWin = checkVerticalWin(boardState);
  if (verticalWin) {
    return verticalWin;
  }

  // 4. Diagonal win
  const diagonalWin = checkDiagonalWin(boardState);
  if (diagonalWin) {
    return diagonalWin;
  }

  // 5. Draw - none of the above and board is full
  const draw = isFull(boardState);
  if (draw) {
    return {
      winner: "draw",
      message: `No one wins, it's a draw`
    };
  }

  // Default case
  return false;
};
