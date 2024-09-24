import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const delay = formData.get('delay');
  const state = formData.get('state');
  console.log(delay);
  console.log(formData);
  console.log(state);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  promise
    .then(message => {
      iziToast.show({
        class: 'stroke',
        title: 'OK',
        message: message,
        position: 'topRight',
        backgroundColor: '#59a10d',
      });
    })
    .catch(error => {
      iziToast.show({
        class: 'stroke',
        title: 'Error!',
        message: error,
        position: 'topRight',
        backgroundColor: '#ef4040',
      });
    });
  form.reset();
}
