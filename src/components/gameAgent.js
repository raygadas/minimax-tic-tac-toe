/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { isTerminal } from "../utils/boardUtils";
import getAvailableMoves from "../utils/getAvailableMoves";

export const BoardContext = React.createContext([0, () => {}]);
export const GameStatusContext = React.createContext([0, () => {}]);
export const TurnContext = React.createContext([0, () => {}]);

const GameAgent = ({ children }) => {
  const [boardState, setBoardState] = useState(Array(9).fill(""));
  const [gameStatus, setGameStatus] = useState("User starts");
  const [userTurn, setUserTurn] = useState(true);

  // Evaluate each possible move, and recurvisvely evaluate subsequent moves
  // Return the value when a terminal state is reached
  const evaluateAvailableMove = (
    currentBoardState,
    maximizing = true,
    depth = 0
  ) => {
    // If this is a terminal state (leaf of tree)
    if (isTerminal(currentBoardState)) {
      const winner = isTerminal(currentBoardState).winner;
      // User wins
      if (winner === "X") {
        return -100 + depth;
      }
      // Agent wins
      if (winner === "O") {
        return 100 - depth;
      }
      // Draw
      return 0;
    }

    // Simulate agent turn
    if (maximizing) {
      let bestValue = -10000;

      getAvailableMoves(currentBoardState).forEach(availableMoveIndex => {
        var tempBoardState = currentBoardState.slice();
        tempBoardState[availableMoveIndex] = "O";
        var moveValue = evaluateAvailableMove(tempBoardState, false, depth + 1);
        if (moveValue > bestValue) {
          bestValue = moveValue;
        }
      });
      return bestValue;
    }

    // Simulate user turn
    if (!maximizing) {
      let bestValue = 10000;

      getAvailableMoves(currentBoardState).forEach(availableMoveIndex => {
        var tempBoardState = currentBoardState.slice();
        tempBoardState[availableMoveIndex] = "X";
        var moveValue = evaluateAvailableMove(tempBoardState, true, depth + 1);
        if (moveValue < bestValue) {
          bestValue = moveValue;
        }
      });

      return bestValue;
    }
  };

  const getBestMoveIndex = (board = boardState) => {
    var bestValue = -1000;
    var bestIndex = -1;

    // Evaluate every possible move on the first level and make the decision tree for each
    // Keep the index that has the greatest value
    getAvailableMoves(board).forEach(availableMoveIndex => {
      var tempBoardState = boardState.slice();
      tempBoardState[availableMoveIndex] = "O";

      var moveValue = evaluateAvailableMove(tempBoardState, false, 0);
      if (moveValue > bestValue) {
        bestValue = moveValue;
        bestIndex = availableMoveIndex;
      }
    });

    return bestIndex;
  };

  const sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

  const makeMove = async i => {
    if (gameStatus === "Finished") return;
    const newBoardState = boardState.slice();
    !userTurn ? await sleep(500) : await sleep(0);
    newBoardState[i] = userTurn ? "X" : "O";
    setBoardState(newBoardState);
    setUserTurn(!userTurn);
  };

  useEffect(() => {
    const agentTurn = !userTurn;
    if (agentTurn) {
      if (
        getAvailableMoves(boardState) &&
        getAvailableMoves(boardState).length
      ) {
        console.log(getAvailableMoves(boardState));
        var bestIndex = getBestMoveIndex();
        makeMove(bestIndex);
      }
    }
  }, [userTurn]);

  return (
    <BoardContext.Provider value={[boardState, setBoardState]}>
      <GameStatusContext.Provider value={[gameStatus, setGameStatus]}>
        <TurnContext.Provider value={[userTurn, setUserTurn]}>
          <div className="w-full flex justify-center">
            <p className="w-auto px-4 py-3  bg-gray-100 rounded-lg shadow-inner mb-2 text-gray-700">
              {gameStatus}
            </p>
          </div>
          {children}
        </TurnContext.Provider>
      </GameStatusContext.Provider>
    </BoardContext.Provider>
  );
};

export default GameAgent;
