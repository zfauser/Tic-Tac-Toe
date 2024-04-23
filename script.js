let turn = "X";
let winner = "";
let numOfTurns = 0;
let tie = false;
let xWins = 0;
let oWins = 0;
let ties = 0;
let xWinPercent = 0;
let oWinPercent = 0;
let tiePercent = 0;

let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function checkWinner() {
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2] &&
      board[i][0] !== ""
    ) {
      winner = board[i][0];
      return true;
    }
    if (
      board[0][i] === board[1][i] &&
      board[1][i] === board[2][i] &&
      board[0][i] !== ""
    ) {
      winner = board[0][i];
      return true;
    }
  }
  if (
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2] &&
    board[0][0] !== ""
  ) {
    winner = board[0][0];
    return true;
  }
  if (
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0] &&
    board[0][2] !== ""
  ) {
    winner = board[0][2];
    return true;
  }
  if (numOfTurns === 9) {
    tie = true;
    return true;
  }
  return false;
}

function refreshStats() {
  xWinPercent = Math.round((xWins / (xWins + oWins + ties)) * 100);
  oWinPercent = Math.round((oWins / (xWins + oWins + ties)) * 100);
  tiePercent = Math.round((ties / (xWins + oWins + ties)) * 100);
  $("#x-wins").html("X Wins: " + xWins + " (" + xWinPercent + "%)");
  $("#o-wins").html("O Wins: " + oWins + " (" + oWinPercent + "%)");
  $("#ties").html("Ties: " + ties + " (" + tiePercent + "%)");
}

$(document).ready(function () {
  $("#title").hover(
    function () {
      $(this).text("Tic-Tac-Toe");
    },
    function () {
      $(this).text("TTT");
    }
  );
  $("#instructions").click(
    function () {
      if ($(this).html() === "Open Instructions") {
        $(this).html("Close Instructions");
      } else {
        $(this).html("Open Instructions");
      }
      $("#instructions-text").slideToggle();
    }
  )
  $(".box").click(function () {
    let row = this.id[1] - 1;
    let col = this.id[4] - 1;
    numOfTurns += 1;
    board[row][col] = turn;
    $(this).html(turn);
    if (turn === "X") {
      $("#turn").html("O's turn");
      turn = "O";
    } else {
      $("#turn").html("X's turn");
      turn = "X";
    }
    $(this).addClass("clicked");
    $(this).prop("disabled", true);
    if (checkWinner() && !tie) {
      $("#turn").html(winner + " wins!");
      if (winner === "X") {
        xWins++;
      } else {
        oWins++;
      }
      $("#reset").removeClass("hide");
      $(".box").prop("disabled", true);
      refreshStats();
      return;
    }
    if (tie) {
      ties++;
      $("#turn").html("It's a tie!");
      $("#reset").removeClass("hide");
      $(".box").prop("disabled", true);
      refreshStats();
      return;
    }
  });
  $("#reset").click(function () {
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]
    $(".box").html("");
    $(".box").removeClass("clicked");
    $("#reset").addClass("hide");
    $("#turn").html("X's turn");
    $(".box").prop("disabled", false);
    turn = "X";
    winner = "";
    numOfTurns = 0;
    tie = false;
  });
});
