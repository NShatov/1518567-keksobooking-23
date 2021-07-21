import {getCreateCard} from './card.js';
import {formAddress} from './form.js';
import {filter} from './filter.js';
import {setFormAddress} from './util.js';

const MARKER_LAT = 35.6894;
const MARKER_LNG = 139.69235;
const COUNT = 10;
const ZOOM = 10;

const addressTokio = {
  lat: MARKER_LAT,
  lng: MARKER_LNG,
};
// устновим начальные данные в поле адреса формы
setFormAddress(formAddress, addressTokio);

// создадим иконку для маркера
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

// создадим метку - центр Токио
const mainPinMarker = L.marker(
  {
    lat: MARKER_LAT,
    lng: MARKER_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
const markerGroup = L.layerGroup();

const createMap = (onLoadCallback) => {
  const map = L.map('map-canvas')
    .on('load', () => {
      onLoadCallback();
    })
    .setView({
      lat: MARKER_LAT,
      lng: MARKER_LNG,
    }, ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  markerGroup.addTo(map);
  mainPinMarker.addTo(map);// добавим метку на карту
};

mainPinMarker.on('moveend', (evt) => {
  const address = evt.target.getLatLng();
  const lat = address.lat.toFixed(5);
  const lng = address.lng.toFixed(5);
  formAddress.value = `${lat}, ${lng}`;
});

//выведем метки объявлений на карту
const getMarkerMap = (arr) => {
  markerGroup.clearLayers();
  const ads = filter(arr, COUNT);
  ads.forEach(({location, offer, author}) => {
    const lat = location.lat;
    const lng = location.lng;
    const icon = L.icon({
      iconUrl: './img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
    const marker = L.marker({
      lat: lat,
      lng: lng,
    },
    {
      icon,
    },
    );
    marker
      .addTo(markerGroup)
      .bindPopup(
        (getCreateCard({offer, author})),
        {
          keepInView: true,
        },
      );
  });
};

export {
  getMarkerMap,
  addressTokio,
  mainPinMarker,
  createMap
};
