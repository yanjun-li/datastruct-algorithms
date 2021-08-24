/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var movingCount = function (m, n, k) {
    const directions = [[0, -1], [0, 1], [-1, 0], [1, 0]]
    let count = 0
    const visited = Array(m).fill(0).map(_ => Array(n).fill(0))
    // dfs(0, 0)
    // function dfs(x, y) {
    //     visited[x][y] = 1
    //     count++
    //     for (const [dx, dy] of directions) {
    //         const nx = x + dx
    //         const ny = y + dy
    //         if(0<= nx && nx < m && 0 <= ny && ny < n && visited[nx][ny] === 0 && validPosition(nx, ny, k)) {
    //             dfs(nx, ny)
    //         }
    //     }
    // }
    bfs(0, 0)
    function bfs(x, y) {
        let queue = [[x, y]]
        visited[x][y] = 1
        while (queue.length > 0) {
            let [x , y] = queue.shift()
            count++
            for (const [dx, dy] of directions) {
                const nx = x + dx
                const ny = y + dy
                if (0 <= nx && nx < m && 0 <= ny && ny < n && visited[nx][ny] === 0 &&  validPosition(nx, ny, k)) {
                    visited[nx][ny] = 1
                    queue.push([nx, ny])
                }
            }
        }
    }
    return count
};

function validPosition(x, y, k) {
    const sum = bitNumSum(x) + bitNumSum(y)
    return sum <= k
}

function bitNumSum(value) {
    let sum = 0;
    while (value > 0) {
        sum += value % 10
        value = Math.floor(value / 10)
    }
    return sum
}

const count = movingCount(3, 2, 17)
console.log('count: ', count);