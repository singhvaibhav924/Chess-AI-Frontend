import React from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import generateAIMove from "../Utility/MoveGenerator.js";
import BoardStateManager from "../Utility/BoardStateManager.js";
import PawnPromotion from "./PawnPromotion.js";
import "./Styles/PlayArea.css";
export default class PlayArea extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    if (props.fen === "new") {
      let board = new Chess()
      this.boardState = new BoardStateManager(board.fen())
      this.state = {
        board: board,
        selectedSquare: null,
        side: Math.random() < 0.5 ? "white" : "black",
        dim: this.getDim(),
        selectedPromotion: "q",
      };
    } else {
      this.boardState = new BoardStateManager(props.fen)
      this.state = {
        board: new Chess(this.boardState.getCurrState()),
        selectedSquare: null,
        side: props.fen.split("_")[5],
        dim: this.getDim(),
        selectedPromotion: "q",
      };
    }
  }

  componentDidMount() {
    //console.log("Game Launched with Players side - " + this.state.side);
    const { board, side } = this.state;
    window.addEventListener("resize", () => {
      this.setState({
        dim: this.getDim(),
      });
    });
    if (board.turn() !== side[0]) {
      generateAIMove(board, this.boardState, this.setStateFromOtherModule);
    }
  }

  handleSquareClick = (square) => {
    const { board, selectedSquare, side } = this.state;
    if (side[0] === board.turn()) {
      console.log({
        turni: board.turn(),
        selectedi: selectedSquare,
      });
      if (selectedSquare) {
        const piece = board.get(square);
        if (
          piece &&
          board.moves({ square: square, verbose: false }).length > 0
        ) {
          //this.calculateHighlightedSquare(square);
          this.setState(
            {
              selectedSquare: square,
            },
            () => {
              //console.log("Selected square changed to " + this.state.selectedSquare);
            }
          );
          return;
        }
        this.applyMove(square);
      } else {
        const piece = board.get(square);
        if (
          piece &&
          board.moves({ square: square, verbose: false }).length > 0
        ) {
          // this.calculateHighlightedSquare(square);
          this.setState(
            {
              selectedSquare: square,
            },
            () => {
              //console.log("Square selected is " + this.state.selectedSquare);
            }
          );
        }
      }
    } else {
      console.log("Not your Turn");
    }
  };
  applyMove = (square, promote = null) => {
    const { board, selectedSquare } = this.state;
    if (
      (parseInt(square[1]) === 1 || parseInt(square[1]) === 8) &&
      board.get(selectedSquare).type === "p"
    ) {
      if (promote) {
        try {
          board.move({
            from: selectedSquare,
            to: square,
            promotion: promote,
          });
          this.boardState.push(board.fen())
          if (!board.isGameOver()) {
            generateAIMove(board, this.boardState, this.setStateFromOtherModule);
          }
        } catch (error) {}
        // this.calculateHighlightedSquare(null);
        this.setState({
          selectedSquare: null,
          selectedPromotion: promote,
        });
      } else {
        this.square = square;
        this.setState({
          selectedPromotion: "",
        });
      }
    } else {
      try {
        board.move({
          from: selectedSquare,
          to: square,
        });
        this.boardState.push(board.fen())
        if (!board.isGameOver()) {
          generateAIMove(board, this.boardState, this.setStateFromOtherModule);
        }
      } catch (error) {
        console.log("Invalid move. Try again.");
      }
      // this.calculateHighlightedSquare(null);
      this.setState({
        selectedSquare: null,
      });
    }
  };
  calculateHighlightedSquare = (selectedSquare) => {
    const { board } = this.state;
    if (selectedSquare) {
      this.highlightedSquares = [
        selectedSquare,
        ...board.moves({ square: selectedSquare, verbose: false }),
      ];
    } else {
      if (board.inCheck()) {
        const squares = board.squares;
        for (let i = 0; i < squares.length; i++) {
          const piece = board.get(squares[i]);
          if (piece && piece.type === "k" && piece.color === board.turn()) {
            this.highlightedSquares = [squares[i]];
            break;
          }
        }
        this.highlightedSquares = [];
      } else {
        this.highlightedSquares = [];
      }
    }
  };

  getDim() {
    let height = window.innerHeight - 50 - 64;
    if (window.innerWidth > height) {
      return height * 0.85;
    }
    return window.innerWidth * 0.85;
  }
  setStateFromOtherModule = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    const { board, side, dim, selectedPromotion } = this.state;
    return (
      <div className="play-area">
        <div id="board-area">
          {(() => {
            const style = {
              display: "inline-block",
              width: `${Math.round(dim)}px`,
            };
            if (board.isGameOver()) {
              if (board.isCheckmate()) {
                if (board.turn() === side[0]) {
                  return (
                    <div className="result" style={style}>
                      <p>You Lost the Game</p>
                    </div>
                  );
                } else {
                  return (
                    <div className="result" style={style}>
                      <p>You Won the Game</p>
                    </div>
                  );
                }
              } else {
                return (
                  <div className="result" style={style}>
                    <p>No One Won the Game</p>
                  </div>
                );
              }
            } else {
              return (
                <Chessboard
                  position={board.fen()}
                  onSquareClick={this.handleSquareClick}
                  boardOrientation={side}
                  boardWidth={dim}
                  arePiecesDraggable={false}
                  customSquare={"div"}
                />
              );
            }
          })()}
        </div>
        {selectedPromotion === "" && (
          <PawnPromotion
            dim={dim}
            square={this.square}
            applyMove={this.applyMove}
          />
        )}
        <div
          className="home-btn"
          onClick={() => {
            this.props.setPage("");
          }}
        >
          <p>Main Menu</p>
        </div>
      </div>
    );
  }
}
