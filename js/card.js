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

const cardFragment = document.createDocumentFragment(); // создадим фрагмент

// через деструктуризацию записываем данные из массива в шаблон
const {offer, author} = similarData[2]; // выведем 2-ой элемент массива

const getCreateCard = () => {
  const cardPopup = cardPopupTemplate.cloneNode(true); // клонируем шаблон в переменную

  // запишем в переменные блоки шаблона чтобы удобнее было с ними работать
  const popupAvatar = cardPopup.querySelector('.popup__avatar');
  const popupTitle = cardPopup.querySelector('.popup__title');
  const popupAddress = cardPopup.querySelector('.popup__text--address');
  const popupPrice = cardPopup.querySelector('.popup__text--price');
  const popupDescription = cardPopup.querySelector('.popup__description');
  const popupType = cardPopup.querySelector('.popup__type');
  const popupCapacity = cardPopup.querySelector('.popup__text--capacity');
  const popupTime = cardPopup.querySelector('.popup__text--time');

  popupAvatar.src = (!author.avatar) ? popupAvatar.remove() : author.avatar;
  popupTitle.textContent = (!offer.title) ? popupTitle.remove() : offer.title;
  popupAddress.textContent = (!offer.address) ? popupAddress.remove() : offer.address;
  popupPrice.textContent = (!offer.price) ? popupPrice.remove() : `${offer.price} ₽/ночь`;
  popupDescription.textContent = (!offer.description) ? popupDescription.remove() : offer.description;
  popupType.textContent = (!offer.type) ? popupType.remove() : housingType[offer.type];
  popupCapacity.textContent = (!offer.rooms || !offer.guests) ? popupCapacity.remove() : `${offer.rooms} комнаты для ${offer.guests} гостей`;
  popupTime.textContent = (!offer.checkin || !offer.checkout) ? popupTime.remove(): `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  // найдем список с фичами
  const featureElements = cardPopup.querySelector('.popup__features');
  // проверим наличие в массиве объекта с фичами
  if (!offer.features) {
    featureElements.remove(); // удаляем список с фичами
  } else {
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
  }

  // находим блок с фотографиями
  const photoListElement = cardPopup.querySelector('.popup__photos');
  // проверяем наличие в массиве объекта с фотографиями
  if (!offer.photos) {
    photoListElement.remove(); // удаляем блок с фото
  } else {
    photoListElement.querySelector('.popup__photo').remove(); // удаляем пустую картинку

    // проходим по массиву с адресами фотографий и записываем в src адрес
    offer.photos.forEach((address) => {
      photoListElement.insertAdjacentHTML('beforeend', `<img src="${address}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
    });
  }

  // добавляем данные во фрагмент
  cardFragment.appendChild(cardPopup);

  getInsertData(mapCanvas, cardFragment); // записываем через функцию фрагмент в блок
};

getCreateCard();

