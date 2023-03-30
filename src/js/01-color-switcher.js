function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

let timeSelector = null;
refs.startBtn.addEventListener('click', onBtn);
refs.stopBtn.addEventListener('click', offBtn);

function onBtn() {
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
  timeSelector = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function offBtn() {
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
  clearInterval(timeSelector);
}
