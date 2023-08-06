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

const datetimePicker = flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        const currentDate = new Date();

        if (selectedDate <= currentDate) {
            window.alert("Please choose a date in the future");
            document.querySelector('[data-start]').disabled = true;
        } else {
            document.querySelector('[data-start]').disabled = false;
        }
    },
});

let countdownIntervalId;

function updateTimerDisplay(time) {
    document.querySelector('[data-days]').textContent = addLeadingZero(time.days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(time.hours);
    document.querySelector('[data-minutes]').textContent = addLeadingZero(time.minutes);
    document.querySelector('[data-seconds]').textContent = addLeadingZero(time.seconds);
}

function startCountdown() {
    const selectedDate = datetimePicker.selectedDates[0];
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

document.querySelector('[data-start]').addEventListener('click', startCountdown);
