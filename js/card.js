import {similarData} from './object.js'; // импортируем массив с объектами
import {getInsertData} from './util.js'; // импортируем ф-ию для отрисовки данных в карточку

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

// через деструктуризацию записываем данные из массива в шаблон
const {offer, author} = similarData[2]; // выведем 2-ой элемент массива
const cardPopup = cardPopupTemplate.cloneNode(true);
cardPopup.querySelector('.popup__avatar').src = author.avatar;
cardPopup.querySelector('.popup__title').textContent = offer.title;
cardPopup.querySelector('.popup__text--address').textContent = offer.address;
cardPopup.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
cardPopup.querySelector('.popup__description').textContent = offer.description;
cardPopup.querySelector('.popup__type').textContent = housingType[offer.type];
cardPopup.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
cardPopup.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

// найдем элементы списка с фичами
const featureElement = cardPopup.querySelectorAll('.popup__feature');

// отобразим только те фичи, которые есть в массиве features объекта offer
const modifiers = (offer.features).map((feature) => `popup__feature--${feature}`);

featureElement.forEach((item) => {
  const modifier = item.classList[1];

  if (!modifiers.includes(modifier)) {
    item.remove(); // удаляем фичи, которых нет в массиве
  }
});

//добавляем фотографии
const photoListElement = cardPopup.querySelector('.popup__photos');
photoListElement.querySelector('.popup__photo').remove();

offer.photos.forEach((address) => {
  photoListElement.insertAdjacentHTML('beforeend', `<img src="${address}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
});

cardFragment.appendChild(cardPopup);

getInsertData(mapCanvas, cardFragment);
