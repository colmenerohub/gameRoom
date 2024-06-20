const cellTypes = {
    EMPTY: 0,
    MOVE: 1,
    WHITE: 2,
    BLACK: 3
};

const initBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 3, 2, 1, 0, 0],
    [0, 0, 1, 2, 3, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];


export default { cellTypes, initBoard };