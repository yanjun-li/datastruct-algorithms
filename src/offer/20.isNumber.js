function isNumber() {
    const validChar = ['.', 'e', 'E', '+', '-']
    
}


const numbers = ["+100", "5e2", "-123", "3.1416", "-1E-16", "0123"]
for (const number of numbers) {
    console.log('number: ', isNumber(number));
}
const notNumbers = ["12e", "1a3.14", "1.2.3", "+-5", "12e+5.4"]
for (const notNumber of notNumbers) {
    console.log('notNumbers: ', isNumber(notNumber));
}