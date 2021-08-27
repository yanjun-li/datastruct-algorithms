// function apply(context, args) {

// }
Function.prototype.myApply = function (context, args) {
    console.log('context: ', context);
}


const person = {
    firstName: 'John',
    lastName: 'Doe'
}
function greet(greeting, message) {
    return `${greeting} ${this.firstName}. ${message}`;
}

// Math.max.myApply({})
let a = [1, 2, 3]
let b = [4, 5, 6]
// a.push.myApply(b)

// let result = greet.myApply(person, ['Hello', 'How are you?']);
// console.log('result: ', result);

let result = greet.apply(1, ['Hello', 'How are you?']);
console.log('result: ', result);

Function.prototype.construct = function (aArgs) {
    var oNew = Object.create(this.prototype);
    this.apply(oNew, aArgs);
    return oNew;
};

function MyConstructor() {
    for (let nProp = 0; nProp < arguments.length; nProp++) {
        this['property' + nProp] = arguments[nProp];
    }
}

let myArray = [4, 'Hello world!', false];
let myInstance = MyConstructor.construct(myArray);

console.log(myInstance.property1);                // logs 'Hello world!'
console.log(myInstance instanceof MyConstructor); // logs 'true'
console.log(myInstance.constructor);              // logs 'MyConstructor'
            // logs "MyConstructor"