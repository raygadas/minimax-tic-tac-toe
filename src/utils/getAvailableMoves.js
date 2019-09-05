// Util function to get all possible moves in the board
const getAvailableMoves = boardState => {
  const moves = [];
  boardState.forEach((boardSquare, index) => {
    if (!boardSquare) {
      moves.push(index);
    }
  });
  return moves;
};

export default getAvailableMoves;
