import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateTimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

startButton.addEventListener('click', startTimer);

let intervalId = null;
let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      return iziToast.error({
        position: 'topRight',
        message: 'Please choose a date in the future',
      });
    }
    userSelectedDate = selectedDates[0];
    startButton.disabled = false;
  },
};

flatpickr(dateTimePicker, options);

function startTimer() {
  intervalId = setInterval(updateTimer, 1000);
  startButton.disabled = true;
  dateTimePicker.disabled = true;
  return;
}

function updateTimer() {
  const curentTime = userSelectedDate - new Date();

  if (curentTime <= 0) {
    dateTimePicker.disabled = false;
    clearInterval(intervalId);
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(curentTime);

  daysEl.textContent = String(days).padStart(2, 0);
  hoursEl.textContent = String(hours).padStart(2, 0);
  minutesEl.textContent = String(minutes).padStart(2, 0);
  secondsEl.textContent = String(seconds).padStart(2, 0);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
