let turn = 'X';
let winner = '';
let numOfTurns = 0;
let tie = false;

let board = [
    ['', '', ''], 
    ['', '', ''], 
    ['', '', '']
];

function checkWinner() {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== '') {
            winner = board[i][0];
            return true;
        }
        if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== '') {
            winner = board[0][i];
            return true;
        }
    }
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '') {
        winner = board[0][0];
        return true;
    }   
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== '') {
        winner = board[0][2];
        return true;
    }
    if (numOfTurns === 9) {
        tie = true;
        $('#turn').html('It\'s a tie!');
        $('#reset').removeClass('hide');
        return true;
    }
    return false;
}

$(document).ready(function() {
    $('#title').hover(function() {
        $(this).text('Tic-Tac-Toe');
    }, function() {
        $(this).text('TTT');
    });

    $('.box').click(function() {
        let row = this.id[1] - 1;
        let col = this.id[4] - 1;
        numOfTurns += 1;
        board[row][col] = turn;
        $(this).html(turn);
        if (turn === 'X') {
            turn = 'O';
            $("#turn").html("O's turn")
        } else {
            $("#turn").html("X's turn")
            turn = 'X';
        }
        $(this).addClass('clicked');
        $(this).prop('disabled', true);
        if (checkWinner() && !tie) {
            $('#turn').html(winner + ' wins!');
            $('#reset').removeClass('hide');
            $('.box').prop('disabled', true);
            return;
        } if (tie) {
            $('.box').prop('disabled', true);
            return;
        }
    });
    $('#reset').click(function() {
        board = [];
        $('.box').html('');
        $('.box').removeClass('clicked');
        $('.box').prop('disabled', false);
        $('#reset').addClass('hide');
        $('#turn').html("X's turn");
        turn = 'X';
        winner = '';
        numOfTurns = 0;
    });
});