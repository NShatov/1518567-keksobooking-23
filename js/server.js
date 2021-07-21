// модуль для получения данных с сервера

import {
  getPopupShow,
  errorServer,
  buttonCloseErrorServer
} from './modal.js';

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

export {getData};


