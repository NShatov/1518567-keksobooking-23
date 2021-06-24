//импортируем массив с объектами
import {similarData} from './object.js';

// найдем блок в который нужно отрисовать первый элемент #map-canvas
const mapCanvas = document.querySelector('#map-canvas');

// найдем в разметке шаблон #card и в нём попап
const cardPopupTemplate = document.querySelector('#card').content.querySelector('.popup');

// создадим словарь для типа жилья
const housingType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

// создадим фрагмент
const cardFragment = document.createDocumentFragment();
// проходим по массиву и записываем данные из массива в шаблон
similarData.forEach(({offer, author}) => {
  const cardPopup = cardPopupTemplate.cloneNode(true);
  cardPopup.querySelector('.popup__title').textContent = offer.title;
  cardPopup.querySelector('.popup__text--address').textContent = offer.address;
  cardPopup.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  cardPopup.querySelector('.popup__type').textContent = housingType[offer.type];
  cardPopup.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardPopup.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  cardPopup.querySelector('.popup__features').textContent = offer.features;
  cardPopup.querySelector('.popup__description').textContent = offer.description;
  cardPopup.querySelector('.popup__photo').src = offer.photos;
  cardPopup.querySelector('.popup__avatar').src = author.avatar;

  cardFragment.appendChild(cardPopup);
});

mapCanvas.appendChild(cardFragment);
