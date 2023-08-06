function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
let intervalId = null;

function changeBackgroundColor() {
    document.body.style.backgroundColor = getRandomHexColor();
}

function startColorSwitching() {
    if (intervalId === null) {
        intervalId = setInterval(changeBackgroundColor, 1000);
        startButton.disabled = true;
    }
}

function stopColorSwitching() {
    clearInterval(intervalId);
    intervalId = null;
    startButton.disabled = false;
}

startButton.addEventListener('click', startColorSwitching);
stopButton.addEventListener('click', stopColorSwitching);

