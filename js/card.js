//импортируем ф-ию генерации объектов
import {createData} from './object.js';

// найдем блок в который нужно отрисовать первый элемент #map-canvas
const mapCanvas = document.querySelector('#map-canvas');

// найдем в разметке шаблон #card и в нём попап
const cardPopupTemplate = document.querySelector('#card').content.querySelector('.popup');

// console.log(cardPopupTemplate);
//запишем функцию генерации массива объектов в переменную
const createCard = createData();
// создадим фрагмент
const cardFragment = document.createDocumentFragment();

createCard.forEach(({title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}) => {
  const cardPopup = cardPopupTemplate.cloneNode(true);
  cardPopup.querySelector('.popup__title').textContent = title;
  cardPopup.querySelector('.popup__text--address').textContent = address;
  cardPopup.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  cardPopup.querySelector('.popup__type').textContent = type;
  cardPopup.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
  cardPopup.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  cardPopup.querySelector('.popup__features').textContent = features;
  cardPopup.querySelector('.popup__description').textContent = description;
  cardPopup.querySelector('.popup__photos').textContent = photos;

  cardFragment.appendChild(cardPopup);
});


mapCanvas.appendChild(cardFragment);
