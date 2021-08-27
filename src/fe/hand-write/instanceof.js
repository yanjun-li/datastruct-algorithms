function myInstanceof(object, constructor) {
    let proto = object.__proto__
    let prototype = constructor.prototype
    let current = proto
    while(current) {
        if(current === prototype) {
            return true
        }
        current = current.__proto__
    }
    return false
}
function C() {

}

class A {

}

class B extends A{
    constructor(){
        super()
    }
}
function getNumber(){

}
a = new A()
b = new B()
c = new C()
d1 = new getNumber()
// console.log(b)

console.log(myInstanceof(a, B))
console.log(myInstanceof(b, B))
console.log(myInstanceof(b, A))
console.log(myInstanceof(b, C))

console.log('有趣的例子：')
console.log(myInstanceof(Object, Object))
console.log(myInstanceof(Function, Object))
console.log(myInstanceof(A, A))
console.log(myInstanceof(a, Function))
console.log(myInstanceof(a, Object))