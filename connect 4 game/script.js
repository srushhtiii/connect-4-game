
document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const message = document.getElementById('message');
    const rows = 6;
    const cols = 7;
    let currentPlayer = 'red';
    let gameOver = false;

    const cells = [];
    for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell', 'filled');
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener('click', () => placePiece(r, c));
            board.appendChild(cell);
            row.push(cell);
        }
        cells.push(row);
    }

    function placePiece(row, col) {
        if (gameOver) return;
        
  
        for (let r = rows - 1; r >= 0; r--) {
            if (cells[r][col].classList.contains('filled')) {
                cells[r][col].classList.remove('filled');
                cells[r][col].classList.add(currentPlayer);
                if (checkWin(r, col)) {
                    message.textContent = `${currentPlayer.toUpperCase()} WINS!`;
                    gameOver = true;
                } else {
                    currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
                }
                break;
            }
        }
    }

    function checkWin(row, col) {
        return (
            checkDirection(row, col, 1, 0) || 
            checkDirection(row, col, 0, 1) ||
            checkDirection(row, col, 1, 1) || 
            checkDirection(row, col, 1, -1)   
        );
    }

    function checkDirection(row, col, rowDelta, colDelta) {
        let count = 1;
        count += countPieces(row, col, rowDelta, colDelta);
        count += countPieces(row, col, -rowDelta, -colDelta);
        return count >= 4;
    }

    function countPieces(row, col, rowDelta, colDelta) {
        let count = 0;
        let r = row + rowDelta;
        let c = col + colDelta;
        while (
            r >= 0 && r < rows &&
            c >= 0 && c < cols &&
            cells[r][c].classList.contains(currentPlayer)
        ) {
            count++;
            r += rowDelta;
            c += colDelta;
        }
        return count;
    }
});
