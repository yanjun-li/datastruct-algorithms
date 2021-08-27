function create(proto) {
    function F() { }
    F.prototype = proto;
    return new F()
}

function extend(child, parent) {
    let parentProto = parent.prototype
    let obj = Object.create(parentProto)
    child.prototype = Object.create(parentProto)
    child.prototype.constructor = child
}

// Shape - 父类(superclass)
function Shape() {
    this.x = 0;
    this.y = 0;
}

// 父类的方法
Shape.prototype.move = function (x, y) {
    this.x += x;
    this.y += y;
    console.info('Shape moved.');
};

// Rectangle - 子类(subclass)
function Rectangle() {
    Shape.call(this); // call super constructor.
}
extend(Rectangle, Shape)
var rect = new Rectangle();
let rect1 = Object.preventExtensions(rect)
console.log('Is rect an instance of Rectangle?',
    rect instanceof Rectangle); // true
console.log('Is rect an instance of Shape?',
    rect instanceof Shape); // true
rect.move(1, 1); // Outputs, 'Shape moved.'