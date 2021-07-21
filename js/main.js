import './card.js';
import {getMarkerMap, createMap} from './map.js';
import {getInactiveForm,  getInactiveFilter} from  './form.js';
import {getData} from './server.js';
import {setFilterChange} from './filter.js';
import {debounce} from './utils/debounce.js';


let loadedItems = [];
createMap(() => {
  getInactiveForm(false);
  getData((items) => {
    loadedItems = items;
    getMarkerMap(loadedItems);
    getInactiveFilter(false);
  });
}),
setFilterChange(debounce(() => getMarkerMap(loadedItems), 500));
