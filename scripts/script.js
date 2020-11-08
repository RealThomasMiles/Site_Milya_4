var money = parseInt(prompt("Enter the amount of money you are ready to spend on kitchen appliences: ", ""))
var spanNode = document.createElement("span");
var output = document.getElementById("advice");

if (money >= 300 && money <=3000) {
    alert("Buy a kettle!")
    var textNode = document.createTextNode("Buy a kettle!")
    spanNode.appendChild(textNode)
    output.appendChild(spanNode)
} else if (money >= 3001 && money <= 10000) {
    alert("Buy a microwave!")
    var textNode = document.createTextNode("Buy a microwave!")
    spanNode.appendChild(textNode)
    output.appendChild(spanNode)
} else if (money >= 1000) {
    alert("Buy a fridge!")
    var textNode = document.createTextNode("Buy a fridge!")
    spanNode.appendChild(textNode)
    output.appendChild(spanNode)
}