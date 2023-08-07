import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

const startButton = document.querySelector('[data-start]');
const inputField = document.getElementById('datetime-picker');
const textDays = document.querySelector('[data-days]');
const textHours = document.querySelector('[data-hours]');
const textMinutes = document.querySelector('[data-minutes]');
const textSeconds = document.querySelector('[data-seconds]');
let selectedDate = null;

const datetimePicker = flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = selectedDates[0];
        const currentDate = new Date();

        if (selectedDate <= currentDate) {
            window.alert("Please choose a date in the future");
            startButton.disabled = true;
        } else {
            startButton.disabled = false;
        }
    },
});

let countdownIntervalId;

function updateTimerDisplay(time) {
    textDays.textContent = addLeadingZero(time.days);
    textHours.textContent = addLeadingZero(time.hours);
    textMinutes.textContent = addLeadingZero(time.minutes);
    textSeconds.textContent = addLeadingZero(time.seconds);
}

function startCountdown() {
    inputField.disabled = true;
    startButton.disabled = true;
    const currentDate = new Date();
    const differenceMs = selectedDate - currentDate;

    if (differenceMs <= 0) {
        window.alert("Please choose a date in the future");
        return;
    }

    updateTimerDisplay(convertMs(differenceMs));

    countdownIntervalId = setInterval(() => {
        const updatedMs = selectedDate - new Date();
        if (updatedMs <= 0) {
            clearInterval(countdownIntervalId);
            updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        } else {
            updateTimerDisplay(convertMs(updatedMs));
        }
    }, 1000);
}

startButton.addEventListener('click', startCountdown);
