//GRABBED ELEMENTS
const howToPlayBtn = document.querySelector('.how-to-btn');
const startBtn = document.querySelector('.start-btn');
const modal = document.querySelector('#modal');
const close = document.querySelector('#close-btn');
const bottomButtons = document.querySelector('.bottom-buttons');
const level = document.querySelector('.level');
const score = document.querySelector('.score');
const simonTurnMsg = document.querySelector('#simon-turn');
const urTurnMsg = document.querySelector('#ur-turn');
const quarterSlices = document.querySelectorAll('.quarter');
const audio = document.querySelector('audio');
const logo = document.querySelector('.logo');
const body = document.querySelector('body');
let levelNumber = 0;
let isClickDisabled = true;
let playerSequence = [];
let simonSequence = [];
let soundEffects = [
	new Audio('./sounds/green.mp3'),
	new Audio('./sounds/red.mp3'),
	new Audio('./sounds/yellow.mp3'),
	new Audio('./sounds/blue.mp3'),
	new Audio('./sounds/wrong.mp3'),
];

// ***----audio snippet from stackoverflow.com---**
// ***----background music from soundcloud---***

//MODAL
const openModal = () => {
	modal.style.display = 'block';
};

function closeModal() {
	modal.style.display = 'none';
}

//HITTING START BUTTON HIDES BOTTOM BUTTONS
const hideButtons = () => {
	bottomButtons.style.display = 'none'
};

//SHOW LEVEL NUMBER
const showLevel = () => {
	level.style.visibility = 'visible';
	level.style.opacity = 1;
};

//SHOW SCORE NUMBER
const showScore = () => {
	score.style.visibility = 'visible';
	score.style.opacity = 1;
};

//SCORE INCREMENTOR
const scoreIncrementor = () => {
	let newScore = (levelNumber - 1) * 1000;
	score.innerText = `Score: ${newScore}`;
};

//SHOW INFORMATION MESSAGES
const showSimonTurnMsg = () => {
	simonTurnMsg.style.display = 'block';
};

const showUrTurnMsg = () => {
	urTurnMsg.style.display = 'block';
};

//HIDE INFORMATION MESSAGES
const hideSimonTurnMsg = () => {
	simonTurnMsg.style.display = 'none';
};

const hideUrTurnMsg = () => {
	urTurnMsg.style.display = 'none';
};

//HIDE LOGO WHEN GAME STARTS
const hideLogo = () => {
	logo.style.display = 'none';
};

//SIMON RANDOM SEQUENCE GENERATOR
function randomSimonSequence() {
	simonSequence.push(Math.floor(Math.random() * 4));
}

//PREVENT USER FROM INPUTTING DURING SIMON'S TURN
function preventUserInput() {
	isClickDisabled = true;
}
//ENABLE USER INPUT
function enableUserInput() {
	isClickDisabled = false;
}

//PAUSE BETWEEN SIMON AND USER
function pause(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// ***----async and pause code from sitepoint.com----****

//SHOW SIMON'S SEQUENCE
function showSimonSequence() {
	let slice = null;
	let transformBy = null;
	const lastSimonInput = simonSequence[simonSequence.length - 1];
	switch (lastSimonInput) {
		case 0:
			slice = document.querySelector('#green');
			soundEffects[0].play();
			transformBy = 'translateY(-9px) translateX(-9px)';
			break;
		case 1:
			soundEffects[1].play();
			slice = document.querySelector('#red');
			transformBy = 'translateY(-9px) translateX(9px)';
			break;
		case 2:
			soundEffects[2].play();
			slice = document.querySelector('#yellow');
			transformBy = 'translateY(9px) translateX(-9px)';
			break;
		case 3:
			soundEffects[3].play();
			slice = document.querySelector('#blue');
			transformBy = 'translateY(9px) translateX(9px)';
			break;
	}
	slice.style.transform = transformBy;
	setTimeout(() => {
		slice.style.transform = 'translate(0, 0)';
	}, 500);
}

//RESTART LEVEL
const restartLevel = async () => {
	body.style.backgroundColor = '#bae8e8';
	level.style.color = '#01a9b4';
	audio.loop = true;
	audio.volume = 0.2;
	audio.play();
	levelNumber++;
	level.innerText = `Level: ${levelNumber}`;
	playerSequence = [];
	scoreIncrementor();
	showSimonTurnMsg();
	await pause(3000);
	hideSimonTurnMsg();
	randomSimonSequence();
	preventUserInput();
	await pause(1000);
	showSimonSequence();
	await pause(1000);
	showUrTurnMsg();
	await pause(2000);
	enableUserInput();
	await pause(1000);
	hideUrTurnMsg();
};

//RESET GAME
const resetGame = async () => {
	levelNumber = 0;
	simonSequence = [];
	newScore = 0;
	simonTurnMsg.innerText = `SIMON'S TURN`;
	restartLevel();
};

//START GAME
const startGame = () => {
	audio.loop = true;
	audio.volume = 0.2;
	audio.play();
	hideButtons();
	hideLogo();
	showLevel();
	showScore();
	restartLevel();
};

//GAME OVER FUNCTION
const gameOver = () => {
	level.innerText = 'GAME OVER!!!!';
	soundEffects[4].play();
	audio.pause();
	simonTurnMsg.innerText = 'PRESS ENTER TO RESTART';
	showSimonTurnMsg();
};

//CHECKING CORRECT SEQUENCES
function checkSequence(indexOfArray) {
	if (playerSequence[indexOfArray] === simonSequence[indexOfArray]) {
		if (simonSequence.length === playerSequence.length) {
			restartLevel();
		}
	} else {
		gameOver();
		body.style.backgroundColor = '#cf1b1b';
		level.style.color = '#cf1b1b';
		document.addEventListener('keypress', function (e) {
			if (e.key === 'Enter') {
				resetGame();
			}
		});
	}
}

const chosenSlice = (event) => {
	if (isClickDisabled) {
		return;
	}
	let slice = null;
	let transformBy = null;
	const userClicked = event.target.id;
	switch (userClicked) {
		case 'green':
			playerSequence.push(0);
			slice = document.querySelector('#green');
			soundEffects[0].play();
			transformBy = 'translateY(-9px) translateX(-9px)';
			break;
		case 'red':
			playerSequence.push(1);
			slice = document.querySelector('#red');
			soundEffects[1].play();
			transformBy = 'translateY(-9px) translateX(9px)';
			break;
		case 'yellow':
			playerSequence.push(2);
			slice = document.querySelector('#yellow');
			soundEffects[2].play();
			transformBy = 'translateY(9px) translateX(-9px)';
			break;
		case 'blue':
			playerSequence.push(3);
			slice = document.querySelector('#blue');
			soundEffects[3].play();
			transformBy = 'translateY(9px) translateX(9px)';
			break;
	}
	slice.style.transform = transformBy;
	setTimeout(() => {
		slice.style.transform = 'translate(0, 0)';
	}, 500);
	checkSequence(playerSequence.length - 1);
};

//EVENT LISTENERS
howToPlayBtn.addEventListener('click', openModal);
close.addEventListener('click', closeModal);
startBtn.addEventListener('click', startGame);
quarterSlices.forEach((slice) => {
	slice.addEventListener('click', chosenSlice);
});
