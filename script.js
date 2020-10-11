//GRABBED ELEMENTS
const howToPlayBtn = document.querySelector('.how-to-btn');
const startBtn = document.querySelector('.start-btn');
const modal = document.querySelector('#modal');
const close = document.querySelector('#close-btn');
const bottomButtons = document.querySelector('.bottom-buttons');
const level = document.querySelector('.level');
const payAtnMsg = document.querySelector('#pay-atn');
const urTurnMsg = document.querySelector('#ur-turn');
const quarterSlices = document.querySelectorAll('.quarter');
let levelNumber = 1;
let isClickDisabled = true;
const playerSequence = [];
const simonSequence = [];

//MODAL
const openModal = () => {
	modal.style.display = 'block';
};

function closeModal() {
	modal.style.display = 'none';
}

//HITTING START BUTTON HIDES BOTTOM BUTTONS
const hideButtons = () => {
	bottomButtons.style.display = 'none';
};

//LEVEL OPERATOR
const showLevel = () => {
	level.style.display = 'block';
};

//INFORMATION MESSAGES
const showAtnMsg = () => {
	payAtnMsg.style.display = 'block';
};

// const showUrTurnMsg = () => {
// 	urTurnMsg.style.display = 'block';
// };

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
//SHOW SIMON'S SEQUENCE
function showSimonSequence() {
	let slice = null;
	let transformBy = null;
	const lastSimonInput = simonSequence[simonSequence.length - 1];
	switch (lastSimonInput) {
		case 0:
			slice = document.querySelector('#green');
			transformBy = 'translateY(-9px) translateX(-9px)';
			break;
		case 1:
			slice = document.querySelector('#red');
			transformBy = 'translateY(-9px) translateX(9px)';
			break;
		case 2:
			slice = document.querySelector('#yellow');
			transformBy = 'translateY(9px) translateX(-9px)';
			break;
		case 3:
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
const restartLevel = () => {
	randomSimonSequence();
	preventUserInput();
	showSimonSequence();
	enableUserInput();
};

//START GAME
const startGame = () => {
	hideButtons();
	showLevel();
	showAtnMsg();
	//YOUR TURN MSG
	for (let i = 0; i < simonSequence.length; i++) {
		restartLevel();
	}
};

//NEW LEVEL FUNCTION
const newLevel = () => {
	levelNumber++;
	level.innerText = `Level: ${levelNumber}`;
};

//GAME OVER FUNCTION
const gameOver = () => {
	level.innerText = 'Game Over!!!!';
};

//CHECKING CORRECT SEQUENCES
function checkSequence(indexOfArray) {
	if (playerSequence[indexOfArray] === simonSequence[indexOfArray]) {
		if (simonSequence.length === playerSequence.length) {
			newLevel();
		}
	} else {
		gameOver();
	}
}

const chosenSlice = (event) => {
	if (isClickDisabled) {
		return;
	}
	const userClicked = event.target.id;
	switch (userClicked) {
		case 'green':
			playerSequence.push(0);
			break;
		case 'red':
			playerSequence.push(1);
			break;
		case 'yellow':
			playerSequence.push(2);
			break;
		case 'blue':
			playerSequence.push(3);
			break;
	}
	checkSequence(playerSequence.length - 1);
};

//EVENT LISTENERS
howToPlayBtn.addEventListener('click', openModal);
close.addEventListener('click', closeModal);
startBtn.addEventListener('click', startGame);
quarterSlices.forEach((slice) => {
	slice.addEventListener('click', chosenSlice);
});
