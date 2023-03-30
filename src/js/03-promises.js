console.log('Hi');

import Notiflix, { Notify } from 'notiflix';
const form = document.querySelector('.form');
const delay = document.querySelector('[name="delay"]');
const step = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  let userDelay = Number(delay.value);
  let userStep = Number(step.value);
  let userAmount = Number(amount.value);
  for (let position = 1; position <= userAmount; position += 1) {
    createPromise(position, userDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
          clickToClose: true,
          timeout: 10000,
        });
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
          clickToClose: true,
          timeout: 10000,
        });
      });
    userStep += userDelay;
  }
  e.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay }); // Fulfill
      } else {
        reject({ position, delay }); // Reject
      }
    }, delay);
  });
}
