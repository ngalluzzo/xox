window.Game = {
  init: function() {
    console.log('Starting new game...');
    this.reset();
    this.makeOfficialMove(0,true);
    this.makeOfficialMove(1,false);
    this.makeOfficialMove(2,true);
    this.makeOfficialMove(3,false);
    //this.makeOfficialMove(4,false);
    this.makeOfficialMove(5,true);
    //this.makeOfficialMove(6,true);
    //this.makeOfficialMove(7,'X');
    //this.makeOfficialMove(8, 'O');
  },
  reset: function() {
    this.board = [ null, null, null, null, null, null, null, null, null ];
    this.AI_move = false;
    this.$squares = document.querySelectorAll('.square');
  },
  getAvailableMoves: function(board) {
    let moves = [];
    for(let i = 0; i < board.length; i++) {
      if (!board[i]) moves.push(i)
    }
    return moves;
  },
  makeOfficialMove: function(index, player) {
    this.drawSquare(index, player);
    this.board = this.advanceBoard(this.board, index, player);
  },
  drawSquare: function(index, player) {
    let symbol = player ? 'X' : 'O';
    this.$squares[index].innerHTML = symbol;
  },
  advanceBoard: function(board, index, player) {
    let symbol = player ? 'X' : 'O';
    let new_board = board.slice();
    new_board[index] = symbol;
    return new_board;
  },
  findBestMove: function(board, player) {
    
  },
  checkScore: function(board) {
    //console.log('Checking score for this board:', board);
    let available_moves = this.getAvailableMoves(board);
    for(var i = 0; i <= 7; i = i+3) {
      if(board[i] && board[i] === board[i+1] && board[i] === board[i+2]) {
        //console.log(board[i] + ' wins!')
        if (board[i] === 'O') { return 100 - available_moves.length; }
        else { return -100 + available_moves.length; }
      }
    }
    for(var i = 0; i <= 2; i++) {
      if(board[i] && board[i] === board[i+3] && board[i] === board[i+6]) {
        //console.log(board[i] + ' wins!')
        if (board[i] === 'O') { return 100 - available_moves.length; }
        else { return -100 + available_moves.length; }
      }
    }
    for(var i = 0, j = 4; i <= 2 ; i = i + 2, j = j - 2) {
      if(board[i] && board[i] === board[i + j] && board[i + j] === board[i + 2*j]) {
          //console.log(board[i] + ' wins!');
          if (board[i] === 'O') { return 100 - available_moves.length; }
          else { return -100 + available_moves.length; }
      }
    }
    if(available_moves.length === 0) {
      //console.log('Tie game!');
      return 0;
    }
  }
}

window.Game.init();