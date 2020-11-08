var a = parseInt(prompt("Enter the value of a: ", ""))
var b = parseInt(prompt("Enter the value of b: ", ""))
var c = parseInt(prompt("Enter the value of c: ", ""))

var x = 2 * Math.pow(a, b - 4) - Math.pow(7 * a - c, b * b) / (Math.pow(5 * c + Math.sqrt(a + b), 1 / 4) + c / b)

console.log(x);