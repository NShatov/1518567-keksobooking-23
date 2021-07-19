// модуль для работы с сервером
import {getMarkerMap} from './map.js';
import {
  getPopupShow,
  errorServer,
  buttonCloseErrorServer
} from './modal.js';

const DATA_COUNT = 10;


fetch('https://23.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then ((ads) => {
    getMarkerMap(ads.slice(0, DATA_COUNT));
  })
  .catch(() => {
    getPopupShow(errorServer, buttonCloseErrorServer);
  });
