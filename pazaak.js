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
var PLAYER_LIBRARY = [
	1, -1,
	2, -2,
	3, -3,
	4, -4,
	5, -5,
	6, -6
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

//check the round count
function checkRound(gameState){
	if (gameState.round === null) {
		return 0;
	} else if (gameState.round > 0 && gameState.round < 3) {
		return gameState.round;
	} else {
		return 0;
	}
}

//
// GAME TEST //
//

function gameTest(){
	var gameState = playAction(null, 'init');
	console.log("init");
	console.log("This is round " + gameState.round);
	gameState = playAction(gameState, 'deal');
	gameState = playAction(gameState, 'deal');
	gameState = playAction(gameState, 'deal');
	gameState = playAction(gameState, 'deal');
	console.log("deal 4");
	console.log("the total is " + gameState.total);
	console.log("the player will now play " + gameState.playerHand[0]);
	gameState = playAction(gameState, 'playerAction0');
	console.log("total is now " + gameState.total);
	gameState = playAction(gameState, 'playerAction0');
	console.log(gameState);
}

// model
// The model is the gamestate


// view

//controller
// The controller is the reducer
function playAction(gameState, action){
	switch (action) {
		default:
			throw new Error("Whoops");
		case 'init': {
			var newGameState = {
				dealerDeck: shuffle(DEALER_LIBRARY), //deck cards are delt from
				playerDeck: shuffle(PLAYER_LIBRARY), //deck player hand is delt from
				playerTable: [], //what's on the table
				playerHand: [], //what's in the player hand
				total: 0,
				// round: checkRound(gameState)
			};
			for (i = 3; i >= 0; i--){
				var card = newGameState.playerDeck.pop();
				newGameState.playerHand.push(card);
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
		case 'playerAction0': {
			var newGameState = copyGameState(gameState);
			if (newGameState.playerHand[0] != null) {
				newGameState.playerTable.push(newGameState.playerHand[0]);
				newGameState.total += newGameState.playerHand[0];
				newGameState.playerHand[0] = null;
			} else {
				console.log("Illegal move; cannot play same card twice");
			}
			return newGameState;
		}
		case 'playerAction1': {
			var newGameState = copyGameState(gameState);
			if (newGameState.playerHand[1] != null) {
				newGameState.playerTable.push(newGameState.playerHand[1]);
				newGameState.total += newGameState.playerHand[1];
				newGameState.playerHand[1] = null;
			} else {
				console.log("Illegal move; cannot play same card twice");
			}
			return newGameState;
		}
		case 'playerAction2': {
			var newGameState = copyGameState(gameState);
			if (newGameState.playerHand[2] != null) {
				newGameState.playerTable.push(newGameState.playerHand[2]);
				newGameState.total += newGameState.playerHand[2];
				newGameState.playerHand[2] = null;
			} else {
				console.log("Illegal move; cannot play same card twice");
			}
			return newGameState;
		}
		case 'playerAction3': {
			var newGameState = copyGameState(gameState);
			if (newGameState.playerHand[3] != null) {
				newGameState.playerTable.push(newGameState.playerHand[3]);
				newGameState.total += newGameState.playerHand[3];
				newGameState.playerHand[3] = null;
			} else {
				console.log("Illegal move; cannot play same card twice");
			}
			return newGameState;
		}
		case 'stand': {
			var newGameState = copyGameState(gameState);
			return newGameState;
		}
	}
}

function checkVictoryCondition(gameState) {
	if (gameState.total === 20) {
		alert("YAY");
	} else {
		alert("SAD");
	}
	return gameState;
}

function gameController (gameState, action) {
	return checkVictoryCondition(
		playAction(
			state, action
		)
	);
}
