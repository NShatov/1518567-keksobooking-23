//импортируем ф-ию генерации объектов
import {similarData} from './object.js';

// найдем блок в который нужно отрисовать первый элемент #map-canvas
const mapCanvas = document.querySelector('#map-canvas');

// найдем в разметке шаблон #card и в нём попап
const cardPopupTemplate = document.querySelector('#card').content.querySelector('.popup');
// console.log(cardPopupTemplate);
//запишем функцию генерации массива объектов в переменную
// const createCard = similarData[0];
// создадим фрагмент
const cardFragment = document.createDocumentFragment();

similarData.forEach(({offer, author}) => {
  const cardPopup = cardPopupTemplate.cloneNode(true);
  cardPopup.querySelector('.popup__title').textContent = offer.title;
  cardPopup.querySelector('.popup__text--address').textContent = offer.address;
  cardPopup.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  cardPopup.querySelector('.popup__type').textContent = (offer.type === 'flat') ? 'Квартира' : (offer.type === 'bungalow') ? 'Бунгало' : (offer.type === 'house') ? 'Дом' : (offer.type === 'palace') ? 'Дворец' : (offer.type === 'hotel') ? 'Отель' : 'НИЧЕГО!';
  cardPopup.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardPopup.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  cardPopup.querySelector('.popup__features').textContent = offer.features;
  cardPopup.querySelector('.popup__description').textContent = offer.description;
  cardPopup.querySelector('.popup__photos').innerHTML = (`<img src="${offer.photos}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
  cardPopup.querySelector('.popup__avatar').src = author.avatar;

  cardFragment.appendChild(cardPopup);
});


mapCanvas.appendChild(cardFragment);
