//импортируем ф-ию генерации объектов
import {similarData} from './object.js';

// найдем блок в который нужно отрисовать первый элемент #map-canvas
const mapCanvas = document.querySelector('#map-canvas');

// найдем в разметке шаблон #card и в нём попап
const cardPopupTemplate = document.querySelector('#card').content.querySelector('.popup');

// console.log(cardPopupTemplate);
//запишем функцию генерации массива объектов в переменную
// const createCard = createData();
// создадим фрагмент
const cardFragment = document.createDocumentFragment();

similarData.forEach(({offer, author}) => {
  const cardPopup = cardPopupTemplate.cloneNode(true);
  cardPopup.querySelector('.popup__title').textContent = offer.title;
  cardPopup.querySelector('.popup__text--address').textContent = offer.address;
  cardPopup.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  cardPopup.querySelector('.popup__type').textContent = offer.type;
  cardPopup.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardPopup.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  cardPopup.querySelector('.popup__features').textContent = offer.features;
  cardPopup.querySelector('.popup__description').textContent = offer.description;
  cardPopup.querySelector('.popup__photos').textContent = offer.photos;
  cardPopup.querySelector('.popup__avatar').innerHTML = `<img src="${author.avatar}" class="popup__avatar" width="70" height="70" alt="Аватар пользователя">`;

  cardFragment.appendChild(cardPopup);
});

mapCanvas.appendChild(cardFragment);
