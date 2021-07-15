// модуль для работы с сервером
import {getMarkerMap} from './map.js';
import {
  getPopupShow
  // getPopupClose
} from './util.js';
import {errorServer, buttonCloseErrorServer} from './form.js';

fetch('https://23.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then ((ads) => {
    getMarkerMap(ads);
  })
  .catch(() => {
    getPopupShow(errorServer, buttonCloseErrorServer);
    // getPopupClose(errorServer);
  });
