const COUNT = 1; //кол-во объектов

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

export {
  COUNT,
  TITLE,
  TYPE,
  CHECKIN,
  CHECKOUT,
  FEATURES,
  DESCRIPTION,
  PHOTOS,
  INT_MIN,
  INT_MAX,
  LAT_FLT_MIN,
  LAT_FLT_MAX,
  LNG_FLT_MIN,
  LNG_FLT_MAX,
  DIGIT,
  loc
};
