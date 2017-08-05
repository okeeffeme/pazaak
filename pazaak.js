var min = 1;
var max = 52;

function cardGen() {
    return Math.floor(Math.random() * (max - min) + min);
}

function deal() {
    var card = cardGen();
    console.log(card);
		document.getElementById("display").innerHTML = card;
}

deal();
