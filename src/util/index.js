export function equal(a,b){
    if(a===b){
        return true
    }
    return false
}
/**
 * get a two-dimensional-array
 * @param {Number} x 
 * @param {Number} y 
 * @returns {Array[]}
 */
export function twoDimensionalArray(x, y){
    // let arr = Array(x).fill(Array(y))  // 注意，使用Array.prototype.fill 时，如使用非基本类型，将指向同一地址
    let arr = Array.from(Array(x), i=> Array(y))
    return arr
}