import boardData from '../Config';

const { cellTypes, initBoard } = boardData;

function resetMoves(board){
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === 1) {
                board[i][j] = 0;
            }
        }
    }

    return board;
}

function countGame(board){
    let blackCount = 0;
    let whiteCount = 0;
    let finishGame = true;

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === 1) {
                finishGame = false;
            } else if (board[i][j] === 3) {
                blackCount++;
            } else if (board[i][j] === 2) {
                whiteCount++;
            }
        }
    }

    return { blackCount, whiteCount, finishGame }
}

export function addMoves(board, turn){
    const enemy = (turn === cellTypes.BLACK) ? cellTypes.WHITE : cellTypes.BLACK;

    for (let row = 0; row < 8; row++){
        for (let col = 0; col < 8; col++){
            if (board[row][col] === turn) {
                console.log('Analizando ficha: fila='+row+', columna='+col);
                //move hacia arriba
                if (row > 0) {
                    if (board[row-1][col] === enemy) {
                        for (let i = row-1; i >= 0; i--) {
                            if (board[i][col] === turn || board[i][col] === cellTypes.MOVE) { 
                                break;
                            } else if (board[i][col] === cellTypes.EMPTY) {
                                board[i][col] = cellTypes.MOVE; 
                                break;
                            } 
                        }
                    }
                } 

                //move hacia abajo
                if (row < 7) {
                    if (board[row+1][col] === enemy) {
                        for (let i = row+1; i <= 7; i++) {
                            if (board[i][col] === turn || board[i][col] === cellTypes.MOVE) { 
                                break;
                            } else if (board[i][col] === cellTypes.EMPTY) {
                                board[i][col] = cellTypes.MOVE; 
                                break;
                            } 
                        }
                    }
                } 

                //move hacia izquierda
                if (col > 0) {
                    if (board[row][col-1] === enemy) {
                        for (let i = col-1; i >= 0; i--) {
                            if (board[row][i] === turn || board[row][i] === cellTypes.MOVE) { 
                                break;
                            } else if (board[row][i] === cellTypes.EMPTY) {
                                board[row][i] = cellTypes.MOVE; 
                                break;
                            } 
                        }
                    }
                }

                //move hacia derecha
                if (col < 7) {
                    if (board[row][col+1] === enemy) {
                        for (let i = col+1; i <= 7; i++) {
                            if (board[row][i] === turn || board[row][i] === cellTypes.MOVE) { 
                                break;
                            } else if (board[row][i] === cellTypes.EMPTY) {
                                board[row][i] = cellTypes.MOVE; 
                                break;
                            } 
                        }
                    }
                } 

                //diagonales
                if (row > 0 && col > 0) {
                    if (board[row-1][col-1] === enemy) {
                        let rows = row-1
                        let cols = col-1

                        while (rows >= 0 && cols >= 0) {
                            if (board[rows][cols] === turn || board[rows][cols] === cellTypes.MOVE) { 
                                break;
                            } else if (board[rows][cols] === cellTypes.EMPTY) {
                                board[rows][cols] = cellTypes.MOVE; 
                                break;
                            } 
                
                            rows--;
                            cols--;
                        }
                    }
                }

                //diagonales
                if (row < 7 && col < 7) {
                    if (board[row+1][col+1] === enemy) {
                        let rows = row+1
                        let cols = col+1

                        while (rows <= 7 && cols <= 7) {
                            if (board[rows][cols] === turn || board[rows][cols] === cellTypes.MOVE) { 
                                break;
                            } else if (board[rows][cols] === cellTypes.EMPTY) {
                                board[rows][cols] = cellTypes.MOVE; 
                                break;
                            } 
                
                            rows++;
                            cols++;
                        }
                    }
                }

                //diagonales
                if (row < 7 && col > 0) {
                    if (board[row+1][col-1] === enemy) {
                        let rows = row+1
                        let cols = col-1

                        while (rows <= 7 && cols >= 0) {
                            if (board[rows][cols] === turn || board[rows][cols] === cellTypes.MOVE) { 
                                break;
                            } else if (board[rows][cols] === cellTypes.EMPTY) {
                                board[rows][cols] = cellTypes.MOVE; 
                                break;
                            }
                
                            rows++;
                            cols--;
                        }
                    }
                }

                //diagonales
                if (row > 0 && col < 7) {
                    if (board[row-1][col+1] === enemy) {
                        let rows = row-1
                        let cols = col+1

                        while (rows >= 0 && cols <= 7) {
                            if (board[rows][cols] === turn || board[rows][cols] === cellTypes.MOVE) { 
                                break;
                            } else if (board[rows][cols] === cellTypes.EMPTY) {
                                board[rows][cols] = cellTypes.MOVE; 
                                break;
                            } 
                
                            rows--;
                            cols++;
                        }
                    }
                }
            } 
        }
    }

    return {board, turn};
}

export function nextMove(board, turn, rowIndex, colIndex){
    board[rowIndex][colIndex] = turn;
    const enemy = (turn === cellTypes.BLACK) ? cellTypes.WHITE : cellTypes.BLACK;
    console.log('Analizando ficha: fila='+rowIndex+', columna='+colIndex);
    let eaten = [];
    let canEat = false;

    //diagonales
    if (rowIndex > 0 && colIndex > 0) {
        if (board[rowIndex-1][colIndex-1] === enemy) {
            canEat = false;
            eaten = [];

            let rows = rowIndex-1;
            let cols = colIndex-1;

            while (rows >= 0 && cols >= 0) {
                if (board[rows][cols] === enemy) {
                    console.log('Ficha enemiga en: fila='+rows+', columna='+cols);
                    eaten.push([rows, cols])
                } else if (board[rows][cols] === turn) {
                    console.log('Ficha amiga en: fila='+rows+', columna='+cols);
                    canEat = true;
                    break;
                } else if (board[rows][cols] === cellTypes.EMPTY) {
                    break;
                }

                rows--;
                cols--;
            }

            if (canEat) {
                if (eaten.length > 0) {
                    eaten.forEach(eated => {
                        const [actualRowIndex, actualColIndex] = eated;
                        board[actualRowIndex][actualColIndex] = turn;
                    });
                }
            }
        }
    }

    //diagonales
    if (rowIndex < 7 && colIndex < 7) {
        if (board[rowIndex+1][colIndex+1] === enemy) {
            canEat = false;
            eaten = [];

            let rows = rowIndex+1;
            let cols = colIndex+1;

            while (rows <= 7 && cols <= 7) {
                if (board[rows][cols] === enemy) {
                    console.log('Ficha enemiga en: fila='+rows+', columna='+cols);
                    eaten.push([rows, cols])
                } else if (board[rows][cols] === turn) {
                    console.log('Ficha amiga en: fila='+rows+', columna='+cols);
                    canEat = true;
                    break;
                } else if (board[rows][cols] === cellTypes.EMPTY) {
                    break;
                }

                rows++;
                cols++;
            }

            if (canEat) {
                if (eaten.length > 0) {
                    eaten.forEach(eated => {
                        const [actualRowIndex, actualColIndex] = eated;
                        board[actualRowIndex][actualColIndex] = turn;
                    });
                }
            }
        }
    }

    //diagonales
    if (rowIndex < 7 && colIndex > 0) {
        if (board[rowIndex+1][colIndex-1] === enemy) {
            canEat = false;
            eaten = [];

            let rows = rowIndex+1;
            let cols = colIndex-1;
    
            while (rows <= 7 && cols >=0) {
                if (board[rows][cols] === enemy) {
                    console.log('Ficha enemiga en: fila='+rows+', columna='+cols);
                    eaten.push([rows, cols])
                } else if (board[rows][cols] === turn) {
                    console.log('Ficha amiga en: fila='+rows+', columna='+cols);
                    canEat = true;
                    break;
                } else if (board[rows][cols] === cellTypes.EMPTY) {
                    break;
                }
    
                rows++;
                cols--;
            }
    
            if (canEat) {
                if (eaten.length > 0) {
                    eaten.forEach(eated => {
                        const [actualRowIndex, actualColIndex] = eated;
                        board[actualRowIndex][actualColIndex] = turn;
                    });
                }
            }
        }
    }

    //diagonales
    if (rowIndex > 0 && colIndex < 7) {
        if (board[rowIndex-1][colIndex+1] === enemy) {
            canEat = false;
            eaten = [];

            let rows = rowIndex-1;
            let cols = colIndex+1;

            while (rows >= 0 && cols <= 7) {
                if (board[rows][cols] === enemy) {
                    console.log('Ficha enemiga en: fila='+rows+', columna='+cols);
                    eaten.push([rows, cols])
                } else if (board[rows][cols] === turn) {
                    console.log('Ficha amiga en: fila='+rows+', columna='+cols);
                    canEat = true;
                    break;
                } else if (board[rows][cols] === cellTypes.EMPTY) {
                    break;
                }

                rows--;
                cols++;
            }

            if (canEat) {
                if (eaten.length > 0) {
                    eaten.forEach(eated => {
                        const [actualRowIndex, actualColIndex] = eated;
                        board[actualRowIndex][actualColIndex] = turn;
                    });
                }
            }
        }
    }

    //comer hacia arriba
    if (rowIndex > 0) {
        canEat = false;
        eaten = [];

        if (board[rowIndex-1][colIndex] === enemy) {
            for (let i = rowIndex-1; i >= 0; i--) {
                if (board[i][colIndex] === enemy) {
                    console.log('Ficha enemiga en: fila='+i+', columna='+colIndex);
                    eaten.push([i, colIndex])
                } else if (board[i][colIndex] === turn) {
                    console.log('Ficha amiga en: fila='+i+', columna='+colIndex);
                    canEat = true;
                    break;
                } else if (board[i][colIndex] === cellTypes.EMPTY) {
                    break;
                }
            }
    
            if (canEat) {
                if (eaten.length > 0) {
                    eaten.forEach(eated => {
                        const [actualRowIndex, actualColIndex] = eated;
                        board[actualRowIndex][actualColIndex] = turn;
                    });
                }
            }
        }
    }

    //comer hacia abajo
    if (rowIndex < 7) {
        canEat = false;
        eaten = [];

        if (board[rowIndex+1][colIndex] === enemy) {
            for (let i = rowIndex+1; i <=7; i++) {
                if (board[i][colIndex] === enemy) {
                    console.log('Ficha enemiga en: fila='+i+', columna='+colIndex);
                    eaten.push([i, colIndex])
                } else if (board[i][colIndex] === turn) {
                    console.log('Ficha amiga en: fila='+i+', columna='+colIndex);
                    canEat = true;
                    break;
                } else if (board[i][colIndex] === cellTypes.EMPTY) {
                    break;
                }
            }
    
            if (canEat) {
                if (eaten.length > 0) {
                    eaten.forEach(eated => {
                        const [actualRowIndex, actualColIndex] = eated;
                        board[actualRowIndex][actualColIndex] = turn;
                    });
                }
            }
        }
    }

    //comer hacia izquierda
    if (colIndex > 0) {
        canEat = false;
        eaten = [];

        if (board[rowIndex][colIndex-1] === enemy) {
            for (let i = colIndex-1; i >=0; i--) {
                if (board[rowIndex][i] === enemy) {
                    eaten.push([rowIndex, i])
                } else if (board[rowIndex][i] === turn) {
                    canEat = true;
                    break;
                } else if (board[rowIndex][i] === cellTypes.EMPTY) {
                    break;
                }
            }
    
            if (canEat) {
                if (eaten.length > 0) {
                    eaten.forEach(eated => {
                        const [actualRowIndex, actualColIndex] = eated;
                        board[actualRowIndex][actualColIndex] = turn;
                    });
                }
            }
        }
    }

    //comer hacia derecha
    if (colIndex < 7) {
        canEat = false;
        eaten = [];

        if (board[rowIndex][colIndex+1] === enemy) {
            for (let i = colIndex+1; i <= 7; i++) {
                if (board[rowIndex][i] === enemy) {
                    eaten.push([rowIndex, i])
                } else if (board[rowIndex][i] === turn) {
                    canEat = true;
                    break;
                } else if (board[rowIndex][i] === cellTypes.EMPTY) {
                    break;
                }
            }
    
            if (canEat) {
                if (eaten.length > 0) {
                    eaten.forEach(eated => {
                        const [actualRowIndex, actualColIndex] = eated;
                        board[actualRowIndex][actualColIndex] = turn;
                    });
                }
            }
        }
    }

    board = resetMoves(board);

    let resultFromAddMoves = addMoves(board, enemy);
    let resultFromCount = countGame(board);

    board = resultFromAddMoves.board;
    turn = resultFromAddMoves.turn;
    let blackCount = resultFromCount.blackCount;
    let whiteCount = resultFromCount.whiteCount;
    let finishGame = resultFromCount.finishGame;

    return {board, turn, blackCount, whiteCount, finishGame };
}