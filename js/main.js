import './card.js';
import {getMarkerMap} from './map.js';
import {getInactiveForm,  getInactiveFilter} from  './form.js';
import {getData} from './server.js';
import {setFilterChange} from './filter.js';
import {debounce} from './util/debounce.js';
import {
  getPopupShow,
  errorServer,
  buttonCloseErrorServer
} from './modal.js';


let loadedItems = [];
createMap(() => {
  getInactiveForm(false);
  getData((items) => {
    loadedItems = items;
    getMarkerMap(loadedItems);
    getInactiveFilter(false);
  },
  getPopupShow(errorServer, buttonCloseErrorServer));
});
setFilterChange(debounce(() => getMarkerMap(loadedItems), 500));
