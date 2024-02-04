/**
 * 
 * @param {Number} start The start number
 * @param {Number} end  The end number 
 * @param {Boolean} inclusive The Boolean value wether to include end number 
 *                            or not, defaults to true
 * @returns {Number} a random integer
 */
function randint(start, end, inclusive) {
    if (start >= end)
        throw Error("ValueError: \'start\' must be less than \'end\'");
    const factor = (end - start);
    if (inclusive)
        return Math.floor(Math.random() * (factor + 1));
    return Math.floor(Math.random() * (factor));
}

/**
 * Class representing a Grid.
 *
 * @class
 * @classdesc This class represents a randomly generated grid and 
 *            with BFS and DFS traversal method for it.
 */
class Grid {
    /**
     * @param {Number} nrows The number of rows in grid.
     * @param {Number} ncols The number of columns in grid. 
     * @param {Number} start The start number for random integer  
     * @param {Number} end The end number for random integer
     * @param {Boolean} inclusive The boolean value indicating 
     *                            inclusiveness of end number
     */
    constructor(nrows, ncols) {
        this.nrows = nrows;
        this.ncols = ncols;
        this.gridArray = this.generateGrid();
    }

    /**
     * Generates a grid with random integer values.
     *
     * @returns {Array} The generated grid.
     */
    generateGrid() {
        return Array.from({length: this.nrows}, () => 
            Array.from({length: this.ncols}, () => randint(0, 9, true))
        );
    }

    /**
     * Determines if a given position is valid within the grid.
     *
     * @param {Number} row - The row index of the position.
     * @param {Number} col - The column index of the position.
     * @returns {Boolean} - True if the position is valid, false otherwise.
     */
    isValidPosition(row, col) {
        if (row < 0 || col < 0)
            return false;   
        if (row < this.nrows && col < this.ncols)
            return true;
        return false;
    }

    /**
     * Performs a breadth-first search (BFS) traversal on the grid starting from the given position.
     *
     * @param {Array} start - The starting position [row, col] in the grid.
     * @returns {Array} - An array containing the values of the grid cells traversed in BFS order.
    */
    BFS(start) {
        const visited = new Array(this.nrows).fill(null).map(() => {
            return new Array(this.ncols).fill(false);
        });
        const queue = [start];
        const dirY = [0, 1, 0, -1];
        const dirX = [1, 0, -1, 0];
        const traversedResult = [this.gridArray[start[0]][start[1]]];
        visited[start[0]][start[1]] = true;
    
        while (queue.length > 0) {
            const poppedCell = queue.shift();
            
            for (let i = 0; i < dirX.length; i++) {
                const newRow = dirX[i] + poppedCell[0];
                const newCol = dirY[i] + poppedCell[1];
                if (this.isValidPosition(newRow, newCol) && !visited[newRow][newCol]) {
                    queue.push([newRow, newCol]);
                    visited[newRow][newCol] = true;
                    traversedResult.push(this.gridArray[newRow][newCol]);
                } 
            }
        }

        return traversedResult;
    }

    /**
     * Performs a depth-first search (DFS) traversal on the grid starting from the given position.
     *
     * @param {Array} start - The starting position [row, col] in the grid.
     * @returns {Array} - An array containing the values of the grid cells traversed in BFS order.
    */
    DFS(start) {
        const visited = new Array(this.nrows).fill(null).map(() => {
            return new Array(this.ncols).fill(false);
        })
        const stack = [start];
        const dirY = [0, 1, 0, -1];
        const dirX = [1, 0, -1, 0];
        const traversedResult = [];

        while (stack.length > 0) {
            const [row, col] = stack.pop();
            if (!this.isValidPosition(row, col) || visited[row][col])
                continue;
            visited[row][col] = true;
            traversedResult.push(this.gridArray[row][col]);

            for (let i = 0; i < dirX.length; i++) {
                const newRow = row + dirX[i];
                const newCol = col + dirY[i];
                stack.push([newRow, newCol]);
            }
        }

        return traversedResult;
    }
}

const grid = new Grid(5, 5);
console.log("Grid: ", grid.gridArray);
console.log("DFS: ", grid.DFS([0, 0]));
console.log("BFS: ", grid.BFS([0, 0]));