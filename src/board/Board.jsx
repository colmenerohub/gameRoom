import './board.css'
import boardData from '../Config';
import { nextMove } from '../services/board'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useState, useEffect } from 'react';

export function Board() {
    const MySwal = withReactContent(Swal)
    const { cellTypes, initBoard } = boardData;
    const [turn, setTurn] = useState(cellTypes.BLACK);
    const [board, setBoard] = useState(initBoard);
    const [finishGame, setFinishGame] = useState(false);
    const [blackCells, setBlackCells] = useState(2);
    const [whiteCells, setWhiteCells] = useState(2);
    const [tableRows, setTableRows] = useState([]);



    function renderCell(cell, rowIndex, colIndex) {
        switch (cell) {
            case cellTypes.EMPTY:
                return <td key={colIndex}></td>;
            case cellTypes.MOVE:
                return <td key={colIndex} onClick={() => handleCellClick(rowIndex, colIndex)}><div className='move'></div></td>;
            case cellTypes.WHITE:
                return <td key={colIndex}><div className='white'></div></td>;
            case cellTypes.BLACK:
                return <td key={colIndex}><div className='black'></div></td>;
        }
    }

    const handleCellClick = (rowIndex, colIndex) => {
        const resultFromNextMove = nextMove([...board], turn, rowIndex, colIndex);
        setBoard(resultFromNextMove.board);
        setTurn(resultFromNextMove.turn);
        setFinishGame(resultFromNextMove.finishGame)
        setBlackCells(resultFromNextMove.blackCount);
        setWhiteCells(resultFromNextMove.whiteCount);
    };

    function printBoard(){
        const newTableRows = board.map((row, rowIndex) => (
            <tr key={rowIndex}>
                {row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))}
            </tr>
        ));
        setTableRows(newTableRows);
    }

    function resetGame(){
        let winner = blackCells > whiteCells ? 'Negras' : 'Blancas';

        MySwal.fire({
            title: winner +  " ganan",
            text: "¿Desea Jugar de Nuevo?",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "rgb(72, 239, 72)",
            cancelButtonColor: "#d33",
            confirmButtonText: "Play Again"
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = window.location.href;
            }
        });
    }

    useEffect(() => {
        printBoard();
        if (finishGame) resetGame();
        console.log("Board updated:", board);
    }, [board]);

    useEffect(() => {
        if (turn === cellTypes.WHITE) {
            // Se ejecutará después de 1000 milisegundos (1 segundo)
            const timeoutId = setTimeout(() => {
                const positionsWithOne = [];
                const cornerPositions = [[0, 0], [0, 7], [7, 0], [7, 7]];
    
                for (let i = 0; i < board.length; i++) {
                    for (let j = 0; j < board[i].length; j++) {
                        if (board[i][j] === 1) {
                            positionsWithOne.push([i, j]);
                        }
                    }
                }
    
                let randomPosition;
                const matchingCorner = positionsWithOne.find(pos => cornerPositions.some(corner => corner[0] === pos[0] && corner[1] === pos[1]));

                if (matchingCorner) {
                    randomPosition = matchingCorner;
                } else {
                    const randomIndex = Math.floor(Math.random() * positionsWithOne.length);
                    randomPosition = positionsWithOne[randomIndex];
                }
    
                const resultFromNextMove = nextMove([...board], turn, randomPosition[0], randomPosition[1]);
                setBoard(resultFromNextMove.board);
                setTurn(resultFromNextMove.turn);
                setFinishGame(resultFromNextMove.finishGame)
                setBlackCells(resultFromNextMove.blackCount);
                setWhiteCells(resultFromNextMove.whiteCount);
            }, 1000);
    
            // Limpia el timeout si el componente se desmonta o si el turno cambia antes de que se ejecute el código dentro de setTimeout
            return () => clearTimeout(timeoutId);
        }
    }, [turn]);



    return (
        <>
            <table id='reversiBoard'>
                <caption>REVERSI</caption>
                <tbody>{tableRows}</tbody>
            </table>
            
            <div id='scoreboard'>
                <span>Negras: {blackCells}</span>
                <span>Turno de {turn === 3 ? 'negras' : 'blancas'}</span>
                <span>Blancas: {whiteCells}</span>
            </div>
        </>
    );
}