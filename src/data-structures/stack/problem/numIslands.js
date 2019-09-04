// import { twoDimensionalArray } from '../../../util/index'

const twoDimensionalArray = (x, y) => {
    let arr = Array.from(Array(x), i=> Array(y))
    return arr
}
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
    let islandCount = 0
    const nx = grid.length
    if (nx === 0) {
        return islandCount
    }
    const ny = grid[0].length

    //记录已被查询过的点
    const traversed = twoDimensionalArray(nx, ny)

    const inGrid = (x, y) => {
        return x >= 0 && x < nx && y >= 0 && y < ny
    }
    // 递归实质上是使用了系统的调用栈，也是使用Stack
    const dfs = (x, y) => {
        //对已遍历的点进行标记
        traversed[x][y] = true
        // 本身相邻的点，即每次查询的方向
        directions = [[-1, 0], [0, -1], [1, 0], [0, 1]];
        for (const direction of directions) {
            let nearbyX = x + direction[0]
            let nearbyY = y + direction[1]
            //如果没有被查询过，且与当前点相邻的’1‘，作为下一个查询的点
            if (inGrid(nearbyX, nearbyY) && grid[nearbyX][nearbyY] === '1' && !traversed[nearbyX][nearbyY]) {
                dfs(nearbyX, nearbyY)
            }
        }
    }

    for (let i = 0; i < nx; i++) {
        for (let j = 0; j < ny; j++) {
            // 从未被遍历，且为’1‘，则为一新大陆
            if (!traversed[i][j] && grid[i][j] == '1') {
                islandCount++
                dfs(i, j)
            }
        }
    }

    return islandCount
};

//test
const g = [["0", "1", "0"], ["1", "0", "1"], ["0", "1", "0"]]

console.log(numIslands(g));