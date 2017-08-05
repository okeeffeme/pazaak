var min = 1;
var max = 10;
var card;

function cardGen() {
    return Math.floor(Math.random() * (max - min) + min);
}

function deal() {
    return cardGen();
}

function updateWindow(id, a){
	document.getElementById(id).innerHTML = a;
}

total = 0;

function playGame(){
	var card = deal();
	total += card;
	console.log(card);
	updateWindow("display", (document.getElementById("display").innerHTML + " " + card));
	updateWindow("total", total);
}

playGame();
//this looks so wrong
var DEALER_LIBRARY = [
	1,1,1,1,
	2,2,2,2,
	3,3,3,3,
	4,4,4,4,
	5,5,5,5,
	6,6,6,6,
	7,7,7,7,
	8,8,8,8,
	9,9,9,9,
	10,10,10,10
]
//Fisher-Yates shuffle
function shuffle(a){
	a = a.slice(); //creating a copy of the original array
	let i = a.length;
	while (i > 0) {
		let index = Math.floor(Math.random() * i);
		--i;
		let temp = a[i];
		a[i] = a[index];
		a[index] = temp;
	}
	return a;
}
//copy the game state
function copyGameState(oldState){
	var copiedState = {
		dealerDeck: oldState.dealerDeck.slice(),
		playerDeck: oldState.playerDeck.slice(),
		playerTable: oldState.playerTable.slice(),
		playerHand: oldState.playerHand.slice(),
		total: oldState.total,
	}
	return copiedState;
}

function gameTest(){
	var gameState = gameController(null, 'init');
	console.log("init");
	gameState = gameController(gameState, 'deal');
	gameState = gameController(gameState, 'deal');
	gameState = gameController(gameState, 'deal');
	console.log("deal 3");
	gameState = gameController(gameState, 'stand');
	console.log("total");
	console.log(gameState);
}

// model
// The model is the gamestate


// view

//controller
// The controller is the reducer
function gameController(gameState, action){
	switch (action) {
		default:
			throw new Error("Whoops");
		case 'init': {
			var newGameState = {
				dealerDeck: shuffle(DEALER_LIBRARY), //deck cards are delt from
				playerDeck: [], //deck player hand is delt from
				playerTable: [], //what's on the table
				playerHand: [], //what's in the player hand
				total: 0,
			};
			return newGameState;
		}
		case 'deal': {
			var newGameState = copyGameState(gameState);
			let card = newGameState.dealerDeck.pop();
			newGameState.playerTable.push(card);
			newGameState.total = newGameState.total + card;
			return newGameState;
		}
		case 'stand': {
			var newGameState = copyGameState(gameState);
			if (newGameState.total === 20) {
				alert("YAY");
			} else {
				alert("SAD");
			}
			return newGameState;
		}
	}
}
