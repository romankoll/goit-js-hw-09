import Notiflix from 'notiflix';
// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const datePicker = document.querySelector('#datetime-picker');
const timerOnBtn = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let timerId = null;

flatpickr(datePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] >= new Date()) {
      Notiflix.Notify.success('Ready to start');
      timerOnBtn.disabled = false;
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
      timerOnBtn.disabled = true;
    }
  },
});

timerOnBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    let countStart = new Date(datePicker.value) - new Date();
    timerOnBtn.disabled = true;
    datePicker.disabled = true;

    if (countStart >= 0) {
      let timeData = convertMs(countStart);

      days.textContent = addLeadingZero(timeData.days);
      hours.textContent = addLeadingZero(timeData.hours);
      minutes.textContent = addLeadingZero(timeData.minutes);
      seconds.textContent = addLeadingZero(timeData.seconds);
    } else {
      Notiflix.Notify.success('Finished');
      clearInterval(timerId);
      timerOnBtn.disabled = false;
      datePicker.disabled = false;
    }
  }, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
