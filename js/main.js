import {getRandomInteger} from './get-random.js';
import {getRandomFloat} from './get-random.js';

//Создаём массив из 10-ти сгенерированных объектов

const COUNT = 10; //кол-во объектов

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

//offer
const TITLE = 'Добро пожаловать!'; //заголовок предложения
const TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel']; //тип жилья
const CHECKIN = ['12:00', '13:00','14:00']; //время регистрации
const CHECKOUT = ['12:00', '13:00','14:00']; //время выезда
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']; //список услуг
const DESCRIPTION = 'Это лучшее предложение на рынке!'; //описание
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const INT_MIN = 1;
const INT_MAX = 1000;
const LAT_FLT_MIN = 35.65000;
const LAT_FLT_MAX = 35.70000;
const LNG_FLT_MIN = 139.70000;
const LNG_FLT_MAX = 139.80000;
const DIGIT = 5;

const loc = {
  lat: 0,
  lng: 0,
};

const createData = function (number) {
  loc.lat = getRandomFloat(LAT_FLT_MIN,LAT_FLT_MAX,DIGIT);
  loc.lng = getRandomFloat(LNG_FLT_MIN,LNG_FLT_MAX,DIGIT);

  const str = (number >= 9) ? '' : '0';
  const param = str + (number + 1);

  return {
    'author': {
      'avatar':`img/avatars/user${param}.png`,
    },
    'offer': {
      'title': TITLE,
      'address': Object.values(loc).join(', '),
      'price': getRandomInteger(INT_MIN, INT_MAX),
      'type': getRandomArrayElement(TYPE),
      'rooms': getRandomInteger(INT_MIN, INT_MAX),
      'guests': getRandomInteger(INT_MIN, INT_MAX),
      'checkin': getRandomArrayElement(CHECKIN),
      'checkout': getRandomArrayElement(CHECKOUT),
      'features': getRandomArrayElement(FEATURES),
      'description': DESCRIPTION,
      'photos': getRandomArrayElement(PHOTOS),
    },
  };
};

const similarData = new Array(COUNT).fill(null).map((it, number) => createData(number));
console.log(similarData);
