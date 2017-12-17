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
//Copy the game state
function copyGameState(oldState){
	var copiedState = {
		dealerDeck: oldState.dealerDeck.slice(),
		playerDeck: oldState.playerDeck.slice(),
		playerTable: oldState.playerTable.slice(),
		playerHand: oldState.playerHand.slice(),
		total: oldState.total,
		turn: oldState.turn
	}
	return copiedState;
}
//Check the round count
function checkRound(gameState){
	if (gameState.round === null) {
		return 0;
	} else if (gameState.round > 0 && gameState.round < 3) {
		return gameState.round;
	} else {
		return 0;
	}
}
var turnLimit = 4; 	// traditional turn limit is 9 - changing to 5 for single player

// model
// The model is the gamestate
var gameState;
var playerSettings;
var flag;
var modal = document.getElementById('modal');

// view
function buttonReset(){
	flag = 0; //ugh - still looking at better handling for this
	gameState = gameController(null, 'init');
	gameState = gameController(gameState, 'deal');
	modal.style.display = "none";
	updateDisplay();
}
function playerReset(){
	playerSettings = playerSettings(playerSettings, 'setup');
}

window.onload = buttonReset();
window.onload = playerReset();
window.onload = updateDisplay();

function buttonDeal() {
	gameState = gameController(gameState, 'deal');
	console.log("deal button clicked");
	updateDisplay();
}

function buttonStand() {
	gameState = gameController(gameState, 'stand');
	console.log("stand button clicked");
	updateDisplay();
}

function buttonEndTurn() {
	gameState = gameController(gameState, 'endTurn');
	console.log("endTurn button clicked");
	updateDisplay();
}

function runBot() {
	gameState = bot();
	//console.log("deal button clicked");
	updateDisplay();
}
function buttonStand() {
	gameState = gameController(gameState, 'stand');
	updateDisplay();
}

function button1() {
	gameState = gameController(gameState, 'playerAction0');
	updateDisplay();
}
function button2() {
	gameState = gameController(gameState, 'playerAction1');
	updateDisplay();
}
function button3() {
	gameState = gameController(gameState, 'playerAction2');
	updateDisplay();
}
function button4() {
	gameState = gameController(gameState, 'playerAction3');
	updateDisplay();
}

// let a = b || c || d || e || f;
//
// let a;
// if(b){
// 	a = b;
// } else if (c) {
// 	a = c;
// } else if (d) {
//
// }
//
//
// let a = b && c;
//
// let a;
// if(b) {
// 	a = c;
// } else {
// 	a = b;
// }
//
// let a;
//
// if(isString(b)) {
// 	a = b;
// } else if(isObject(b) && isString(b.id)) {
// 	a = b.id;
// } else {
// 	a = null;
// }
//
// const a = undefined || null || '' || 0 || false || 'done!';
//
// const a =
// 	(isString(b) ? b : null) ||
// 	(isObject(b) && isString(b.id) ? b.id : null) ||
// 	null;
//

function updateDisplay() {
	//document.getElementById('display').innerHTML = gameState.playerTable;
	//the below can only work if 0 is not a card value
	//else evaluate as shown above
	document.getElementById('card_1').innerHTML = gameState.playerTable[0] || ''; 	document.getElementById('card_2').innerHTML = gameState.playerTable[1] || '';
	document.getElementById('card_3').innerHTML = gameState.playerTable[2] || '';
	document.getElementById('card_4').innerHTML = gameState.playerTable[3] || '';
	document.getElementById('total').innerHTML = gameState.total;
	document.getElementById('wins').innerHTML = playerSettings.playerWins;
	document.getElementById('losses').innerHTML = playerSettings.playerLosses;
	document.getElementById('pc0').innerHTML = gameState.playerHand[0];
	document.getElementById('pc1').innerHTML = gameState.playerHand[1];
	document.getElementById('pc2').innerHTML = gameState.playerHand[2];
	document.getElementById('pc3').innerHTML = gameState.playerHand[3];
	console.log('PlayerSettings ' + playerSettings.playerWins);
	if (!flag) {
		document.getElementById('deal').disabled = false;
	} else {
		document.getElementById('deal').disabled = true;
	}
}

//controller
// The controller is the reducer
function playerSettings(player, action){
	switch (action) {
		default:
			throw new Error("Player Settings Error");
		case 'setup': {
			var newPlayerSettings = {
				playerWins: 0,
				playerLosses: 0,
				playerGameTotal: 0,
			}
			return newPlayerSettings;
		}
	}
}

function playAction(gameState, action){
	switch (action) {
		default:
			throw new Error("Player Action Error");
// Initialize round - nothing exists before this runs
		case 'init': {
			var newGameState = {
				dealerDeck: shuffle(DEALER_LIBRARY), //deck cards are delt from
				playerDeck: shuffle(PLAYER_LIBRARY), //deck player hand is delt from
				playerTable: [], //what's on the table
				playerHand: [], //what's in the player hand
				total: 0,
				turn: 0,
			};
			for (i = 3; i >= 0; i--){
				var card = newGameState.playerDeck.pop();
				newGameState.playerHand.push(card);
			};
			return newGameState;
		}
// Deals a card from dealerDeck to playerTable and ticks the turn counter by 1
		case 'deal': {
			var newGameState = copyGameState(gameState);
			let card = newGameState.dealerDeck.pop();
			newGameState.playerTable.push(card);
			newGameState.total = newGameState.total + card;
			console.log("delt card " + card);
			newGameState.turn += 1;
			return newGameState;
		}
// Plays first card from playerHand to playerTable and ticks counter by 1
		case 'playerAction0': {
			var newGameState = copyGameState(gameState);
			if (newGameState.playerHand[0] != null) {
				newGameState.playerTable.push(newGameState.playerHand[0]); //pushes value of index in playerHand to playerTable
				newGameState.total += newGameState.playerHand[0]; //adds value to total REMOVE ON TABLE COUNT
				console.log("Player card " + newGameState.playerHand[0]);
				newGameState.playerHand[0] = null; //nullifies index value in playerHand
				newGameState.turn += 1; //ticks counter
			} else {
				// prevents duplicate move, no counter tick
				console.log("Illegal move; card has already been played");
			}
			return newGameState;
		}
// Duplicate of playerAction0, just a hardcoded index for simplicity here
		case 'playerAction1': {
			var newGameState = copyGameState(gameState);
			if (newGameState.playerHand[1] != null) {
				newGameState.playerTable.push(newGameState.playerHand[1]);
				newGameState.total += newGameState.playerHand[1];
				newGameState.playerHand[1] = null;
				newGameState.turn += 1;
			} else {
				console.log("Illegal move; card has already been played");
			}
			return newGameState;
		}
		case 'playerAction2': {
			var newGameState = copyGameState(gameState);
			if (newGameState.playerHand[2] != null) {
				newGameState.playerTable.push(newGameState.playerHand[2]);
				newGameState.total += newGameState.playerHand[2];
				newGameState.playerHand[2] = null;
				newGameState.turn += 1;
			} else {
				console.log("Illegal move; card has already been played");
			}
			return newGameState;
		}
		case 'playerAction3': {
			var newGameState = copyGameState(gameState);
			if (newGameState.playerHand[3] != null) {
				newGameState.playerTable.push(newGameState.playerHand[3]);
				newGameState.total += newGameState.playerHand[3];
				newGameState.playerHand[3] = null;
				newGameState.turn += 1;
			} else {
				console.log("Illegal move; card has already been played");
			}
			return newGameState;
		}
// Forces the game to end, but gameController will still check for victory condition
		case 'stand': {
			var newGameState = copyGameState(gameState);
			newGameState.turn = turnLimit;
			return newGameState;
		}
		case 'endTurn': {
			var newGameState = copyGameState(gameState);
			newGameState.turn += 1;
			return newGameState;
		}
	}
}

function checkVictoryCondition(gameState) {
	if (gameState.total === 20) {
	//check to see if player won
		playerSettings.playerWins += 1;
		setTimeout( function() {
			document.getElementById('modal_text').innerHTML = ("You've won " + playerSettings.playerWins + " games");
			modal.style.display = "block";
		}, 400 );
		flag = 1;
	} else if (gameState.turn >= turnLimit && gameState.total != 20) {
		playerSettings.playerLosses += 1;
		setTimeout( function() {
			document.getElementById('modal_text').innerHTML = ("You've lost " + playerSettings.playerLosses + " games");
			modal.style.display = "block"; //might need to move this
		}, 400 );
		flag = 1;
	} else {
	// just checking
		console.log(gameState);
		console.log("victorycheck ran !!!");
	}
	console.log("returning gameState ---");
	return gameState;
}

function gameController(gameState, action) {
	if (!flag){
		console.log("the game runs " + action + " ***");
		return checkVictoryCondition(
			playAction(
				gameState, action
			)
		);
	} else {
		console.log('tried to click disabled bttn');
		return gameState;
	}
}

//
// BOT //
//
function testHand(hand) {
	for (i = 0; i < hand.length; i++) {
		if (gameState.total + hand[i] === 20) {
			console.log(gameState.total + ' + ' + i + " = 20");
			console.log(i);
			return i;
		}
	}
}
function evaluateHand() {
	if (testHand(gameState.playerHand) < 4) {
		console.log('running deal from hand');
		var index = testHand(gameState.playerHand);
		console.log(index);
		return 'playerAction'+index;
	} else {
		console.log('running deal');
		return 'deal';
	}
}
function bot() {
	if (gameState.total < 14) {
		console.log('bot decides to deal @@@');
		return gameController(gameState, 'deal');
	} else {
		console.log('bot decides to evaluate @@@');
		var action = evaluateHand();
		console.log('bot will ' + action + " @@@");
		return gameController(gameState, action);
	}
}
