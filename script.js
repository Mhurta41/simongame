//GRABBED ELEMENTS
const howToPlayBtn = document.querySelector('.how-to-btn');
const startBtn = document.querySelector('.start-btn');
const modal = document.querySelector('#modal');
const close = document.querySelector('#close-btn');
const bottomButtons = document.querySelector('.bottom-buttons');
const level = document.querySelector('.level');
const payAtnMsg = document.querySelector('#pay-atn');
const urTurnMsg = document.querySelector('#ur-turn');

//MODAL
const openModal = () => {
	modal.style.display = 'block';
};
howToPlayBtn.addEventListener('click', openModal);

function closeModal() {
	modal.style.display = 'none';
}
close.addEventListener('click', closeModal);

//HITTING START BUTTON HIDES BOTTOM BUTTONS
const hideButtons = () => {
	bottomButtons.style.display = 'none';
};
startBtn.addEventListener('click', hideButtons);

//LEVEL OPERATOR
const showLevel = () => {
	level.style.display = 'block';
};
startBtn.addEventListener('click', showLevel);

//INFORMATION MESSAGES
const showAtnMsg = () => {
	payAtnMsg.style.display = 'block';
};
startBtn.addEventListener('click', showAtnMsg);

// const showUrTurnMsg = () => {
// 	urTurnMsg.style.display = 'block';
// };
// startBtn.addEventListener('click', showUrTurnMsg);
