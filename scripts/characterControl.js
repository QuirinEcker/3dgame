let points = 0;
let characterCoordinates = {
	x: 960,
	y: 540
}

let stageCoordinates = {
	stageOne: 100,
	stageTwo: 540,
	stageThree: 900
}

let stageGoalCoordinates = {
	stageOne: 50,
	stageTwo: 400,
	stageThree: 750
}

let stages = [];

function getHole(borderNumber, verticalPosition) {
	const borderOne = document.getElementById(borderNumber);
	const borderOneLeft = document.getElementById(borderNumber + "-left");
	const borderOneRight = document.getElementById(borderNumber + "-right");
	
	return {
		verticalPosition: verticalPosition,
		holeStart: borderOneLeft.clientWidth,
		holeEnd: borderOne.clientWidth - borderOneRight.clientWidth
	}
}

window.addEventListener("load", () => {
	var holeOfStage1 = getHole("border-one", stageCoordinates.stageOne);
	stages.push(holeOfStage1);
	console.log("Stage1: " + stages[0].holeStart + " : " + stages[0].holeEnd)
	var holeOfStage2 = getHole("border-two", stageCoordinates.stageTwo);
	stages.push(holeOfStage2);
	console.log("Stage2: " + stages[1].holeStart + " : " + stages[1].holeEnd)
	stages.push({verticalPosition: stageCoordinates.stageThree, holeStart: -1, holeEnd: -1});
});

window.addEventListener('keydown', (e) => {
	let characterObject = document.getElementById("character");
	
	if (e.key === 'd') {
		moveRight(20, characterObject);
	} else if (e.key === 'a') {
		moveLeft(20, characterObject);
	} else if(e.keyCode === 32 || e.key === 'w') {
		jump(characterObject, getAmountToJump());
	}
	borderStop();
	ckeckGoals();
	checkGround(characterObject);
});

function moveLeft(amount, object) {
	moveHorizontal(amount, -1, object);
}

function moveHorizontal(amount, direction, object) {
	for(let i = 0; i < amount; i++) {
		characterCoordinates.x = characterCoordinates.x + direction;
		object.style.left = characterCoordinates.x + "px";
	}
	console.log("New ps: (" + characterCoordinates.x + ", " + characterCoordinates.y + ")");
}

function moveRight(amount, object) {
	moveHorizontal(amount, 1, object);
}

function borderStop() {
	let game = document.getElementById("game");
	let gameX = game.clientWidth - 110;
	let gameY = game.clientHeight - 110;
	
	if(characterCoordinates.x > gameX) {
		characterCoordinates.x = 0;
	}
	
	if(characterCoordinates.y > gameY) {
		characterCoordinates.y = gameY;
	}
	
	if(characterCoordinates.x < 0) {
		characterCoordinates.x = gameX;
	}
}

function ckeckGoals() {
	let goals = document.getElementsByClassName("object");
	for (let goal of goals) {
		//console.log(getGoalStage(goal));
		if (getStage() === getGoalStage(goal)) {
			console.log("checkGoal" + goal.style.left)
			if (characterCollidesWith(goal)) {
				console.log("hit , " + goal);
				goal.style.display = "none"
				points++;
			}
		}
	}
}
	
function getGoalStage(goal) {
	switch (parseInt(goal.style.top)) {
		case stageGoalCoordinates.stageOne:
			return 0;
			break;
		case stageGoalCoordinates.stageTwo:
			return 1;
			break;
		default:
			return 2;
			break;
	}
}

function characterCollidesWith(goal) {
	centerOfCharacter = characterCoordinates.x + document.getElementById("character").clientWidth/2;
	goalLeft = parseInt(goal.style.left);
	goalRight = parseInt(goal.style.left) + goal.clientWidth;
	
	return (goalLeft <= centerOfCharacter && centerOfCharacter <= goalRight);
}

let interval = 0;
function jump(object, amountToJump) {
	let newEndPosition = characterCoordinates.y - amountToJump;
	const time = 1;
	console.log("Jump " + amountToJump);
	interval = setInterval(() => moveVertical(object, -1, newEndPosition), time);
}

function moveVertical(object, direction, endPosition) {
	characterCoordinates.y = characterCoordinates.y + direction;
	object.style.top = characterCoordinates.y + "px";
	if (characterCoordinates.y == endPosition) {
		clearInterval(interval);
		console.log("New pos: (" + characterCoordinates.x + ", " + characterCoordinates.y + ")");
	}
}

function getStage() {
	switch (characterCoordinates.y) {
		case stageCoordinates.stageOne:
			return 0;
			break;
		case stageCoordinates.stageTwo:
			return 1;
			break;
		default:
			return 2;
			break;
	}
}

function getAmountToJump() {
	const currentStage = getStage(characterCoordinates.y);
	if (currentStage > 0) {
		return stages[currentStage].verticalPosition - stages[currentStage - 1].verticalPosition;
	} else {
		return 400;
	}
}

function checkGround(characterObject) {
	if (isOverHole()) {
		console.log("Fall down " + getAmountToFall());
		fallDown(characterObject, getAmountToFall())
	}
}

function getAmountToFall() {
	const currentStage = getStage(characterCoordinates.y);
	if (currentStage < 2) {
		return stages[currentStage + 1].verticalPosition - stages[currentStage].verticalPosition;
	} else {
		return 400;
	}
}

function fallDown(object, amountToFall) {
	let newEndPosition = characterCoordinates.y + amountToFall;
	const time = 1;
	console.log("Fall " + amountToFall);
	interval = setInterval(() => moveVertical(object, 1, newEndPosition), time);
}

function isOverHole() {
	let currentStage = getStage();
	let characterWidth = document.getElementById("character").clientWidth;
	return (stages[currentStage].holeStart <= characterCoordinates.x &&
		   characterCoordinates.x + 100 <= stages[currentStage].holeEnd);
}