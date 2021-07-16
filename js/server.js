// модуль для работы с сервером
import {getMarkerMap} from './map.js';
import {
  getPopupShow,
  errorServer,
  buttonCloseErrorServer
} from './modal.js';


fetch('https://23.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then ((ads) => {
    getMarkerMap(ads);
  })
  .catch(() => {
    getPopupShow(errorServer, buttonCloseErrorServer);
  });
