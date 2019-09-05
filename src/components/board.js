/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import BoardSquare from "./boardSquare";
import { BoardContext, GameStatusContext, TurnContext } from "./gameAgent";
import { isEmpty, isTerminal } from "../utils/boardUtils";

const Board = props => {
  const [boardState, setBoardState] = useContext(BoardContext);
  const [gameStatus, setGameStatus] = useContext(GameStatusContext);
  const [userTurn, setUserTurn] = useContext(TurnContext);

  const makeMove = i => {
    if (gameStatus === "Finished") return;
    const newBoardState = boardState.slice();
    newBoardState[i] = userTurn ? "X" : "O";
    setBoardState(newBoardState);
    setUserTurn(!userTurn);
  };

  const renderSquare = i => {
    return (
      <BoardSquare
        disabled={
          gameStatus === "Finished" || boardState[i] !== "" || !userTurn
            ? true
            : false
        }
        key={i}
        value={boardState[i]}
        onClick={async () => {
          await makeMove(i);
        }}
      />
    );
  };

  useEffect(() => {
    if (isTerminal(boardState)) {
      setGameStatus("Finished");
    } else if (isEmpty(boardState)) {
      setGameStatus("User starts");
    } else if (userTurn) {
      setGameStatus("User turn");
    } else {
      setGameStatus("Agent turn");
    }
  }, [boardState, gameStatus, isTerminal, setGameStatus, userTurn]);

  const restart = () => {
    setBoardState(Array(9).fill(""));
    setUserTurn(true);
  };

  return (
    <React.Fragment>
      {boardState.map((_, i) => {
        return renderSquare(i);
      })}
      {gameStatus === "Finished" && isTerminal(boardState) ? (
        <div className="absolute w-full h-full flex justify-center">
          <div className="w-full h-full bg-gray-100 opacity-75 absolute z-0"></div>
          <div className="z-10">
            <div className="mt-32 z-10 py-8 px-4 z-10 bg-white shadow-lg w-64 rounded-lg flex flex-wrap">
              <p className="text-center w-full">
                {isTerminal(boardState).message}
              </p>
              <button
                className="bg-gray-300 mt-5 px-5 py-2 rounded mx-auto"
                onClick={() => restart()}
              >
                Restart
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

Board.propTypes = {};

export default Board;
