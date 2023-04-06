import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  //state
  // 9 moves on game board.  array of strings
  squares: any[];

  // determine current player
  xIsNext: boolean;

  //X or O
  winner: string | null;

  //runs immediately when class is created.  Just for injecting dependencies
  constructor() {}

  //used for initializing when component first loads.
  //contains the new game method.  sets initial values when creating a new game
  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    //creates an array with 9 null elements.  When the user clicks on a square, these values with be spliced with an X or O
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
  }

  //Display who's turn it is in the UI based on the value of xIsNext in state.  If true, X, if false, O.
  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  // event handler for when a user clicks on a button to make a move
  makeMove(idx: number) {
    if (!this.squares[idx]) {
      //check index of the array item clicked on and replace it with the value of this.player as text
      this.squares.splice(idx, 1, this.player);
      //switch who is next
      this.xIsNext = !this.xIsNext;
    }
    //call the calculateWinner function
    this.winner = this.calculateWinner();
  }
  calculateWinner() {
    //win conditions as arrays
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    //check each win condition by looping over lines
    for (let i = 0; i < lines.length; i++) {
      // destructure lines
      const [a, b, c] = lines[i];

      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }
}
