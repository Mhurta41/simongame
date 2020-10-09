const howToPlayBtn = document.querySelector('.how-to-btn');
console.log(howToPlayBtn);
const modal = document.querySelector('#modal');
const close = document.querySelector('#close-btn');

const openModal = () => {
	modal.style.display = 'block';
};
howToPlayBtn.addEventListener('click', openModal);
function closeModal() {
	modal.style.display = 'none';
}
close.addEventListener('click', closeModal);
