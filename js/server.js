// модуль для получения данных с сервера

import {
  getPopupShow,
  errorServer,
  buttonCloseErrorServer,
  getPopupShowTimeout,
  successForm,
  errorForm,
  buttonCloseErrorForm
} from './modal.js';
import {form} from './form.js';
import {getResetForm} from './form-util.js';

const getData = (onSuccess) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then ((ads) => {
      onSuccess(ads);
    })
    .catch(() => {
      getPopupShow(errorServer, buttonCloseErrorServer);
    });
};

const setUserFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch (
      'https://23.javascript.pages.academy/keksobooking ',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => {
        if (response.ok) {
          getResetForm();
          getPopupShowTimeout(successForm);
        } else {
          getPopupShow(errorForm, buttonCloseErrorForm);
        }
      })
      .catch(() => {
        getPopupShow(errorForm, buttonCloseErrorForm);
      });
  });
};

export {
  getData,
  setUserFormSubmit
};


