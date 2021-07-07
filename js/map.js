import {
  getInactiveForm,
  formAddress
} from './form.js';

const MARKER_LAT = 35.6894;
const MARKER_LNG = 139.69235;
const ZOOM = 10;

const addressTokio = {
  lat: MARKER_LAT,
  lng: MARKER_LNG,
};
// установим начальное значение в поле адреса
formAddress.value = Object.values(addressTokio).join(', ');

const map = L.map('map-canvas')
  .on('load', () => {
    getInactiveForm(false);
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

// создадим иконку для маркера
const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
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

// добавим метку на карту
mainPinMarker.addTo(map);
// выведем в консоль новые координаты, когда пользователь отпустит маркер
mainPinMarker.on('moveend', (evt) => {
  const address = evt.target.getLatLng();
  const lat = address.lat.toFixed(5);
  const lng = address.lng.toFixed(5);
  formAddress.value = `${lat}, ${lng}`;
});
