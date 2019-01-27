let points = 0;
let characterCoordinates = {
	x: 960,
	y: 540
}

window.addEventListener('keydown', (e) => {
	let characterObject = document.getElementById("character");
	
	if (e.key === 'd') {
		moveLeft(20, characterObject);
	} else if (e.key === 'a') {
		moveRight(20, characterObject);
	} else if(e.keyCode === 32 || e.key === 'w') {
		jump(400, characterObject);
	}
});

function moveLeft(amount, object) {
	for(let i = 0; i < amount; i++) {
		characterCoordinates.x = characterCoordinates.x + 1;
		object.style.left = characterCoordinates.x + "px";
		borderStop();
		ckeckGoals();
	}
}

function moveRight(amount, object) {
	for(let i = 0; i < amount; i++) {
		characterCoordinates.x = characterCoordinates.x - 1;
		object.style.left = characterCoordinates.x + "px";
		borderStop();
		ckeckGoals();
	}
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
	let objects = document.getElementsByClassName("object");

	for(let objectID = 0; objectID < objects.length; objectID++) {
		let object = objects[objectID]
		//alert(parseInt(object.style.left)) 
		if(parseInt(object.style.top) === 400) {
			if(characterCoordinates.x === parseInt(object.style.left) + (object.clientWidth/4)) {
				object.style.display = "none"
				points++;
			}
		}
	}
}

function jump(amount, object) {
	let time = 10;
	
	setTimeout(amount*time, () => {
		clearInterval(interval);
	});
	
	let interval = setInterval(() => {
		characterCoordinates.y = characterCoordinates.y - 1;
		object.style.top = characterCoordinates.y + "px";
	}, time);
}
