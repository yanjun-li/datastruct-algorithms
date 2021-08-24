/**
 * 打印数位小于等于n的所有整数，n = 1, print 1 - 9; n = 3, print 1-999(n>0)
 * 方法1： 使用在数组中模拟加法，最后迭代输出数字
 * @param {*} n 
 */
function printNumbers(n) {
    let numbers = Array(n).fill(0);
    while(!increase(numbers)) {
        console.log(printNumber(numbers))
    }
    function increase(numbers) {
        let isOverflow = false;
        let carry = 0;
        for (let i = numbers.length - 1; i >= 0; i--) {
            let current = numbers[i]
            if(i === numbers.length - 1) {
                current++
            } else {
                current = current + carry
            }
            if(current === 10) {
                if(i === 0) {
                    isOverflow = true
                }
                current -= 10
                carry = 1
                numbers[i] = current
            } else {
                numbers[i] = current
                break
            }
        }
        return isOverflow
    }
}

/**
 * 方法2：使用排列的方式
 */
function printNumbers(n) {
    let numbers = Array(n).fill(0);
    let items = Array.from({length: 10}).map((_,index)=>index)
    dfs(0)
    function dfs(index) {
        for (let i = 0; i < items.length; i++) {
            numbers[index] = items[i]
            dfs(index+1)
        }
    }
}

/**
 * 
 * @param {Number[]} numbers 
 * @returns 
 */
function printNumber(numbers) {
    let index = 0;
    for (index = 0; index < numbers.length; index++) {
        if(numbers[index] !== 0) {
            return numbers.slice(index).join('')
        }  
    }
}

printNumbers(2)