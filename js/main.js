const ERROR_MSG = 'Выбран неверный диапазон';

const getRandomInteger = function(min, max) {
  try {
    if (min < 0 || max <= min) {
      throw new Error('Ошибка!');
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  catch(error) {
    return ERROR_MSG;
  }
};

const getRandomFloat = function(min, max, num) {
  try {
    if (min < 0 || max <= min || num < 0) {
      throw new Error('Ошибка!');
    }
    return ((Math.random() * (max - min)) + min).toFixed(num);
  }
  catch(error) {
    return ERROR_MSG;
  }
};

//Создаём массив из 10-ти сгенерированных объектов

const COUNT = 10; //кол-во объектов

const AVATARS = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
];
//offer
const TITLE = 'Добро пожаловать!'; //заголовок предложения
const ADDRESS = '23,54'; //адрес предложения
const PRICE = getRandomInteger(1, 1000); //стоимость
const TYPE = 'flat'; //тип жилья
const ROOMS = getRandomInteger(1, 100); //кол-во комнат
const GUESTS = getRandomInteger(1, 10); //кол-во гостей
const CHECKIN = '12:00'; //время регистрации
const CHECKOUT = '12:00'; //время выезда
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']; //список услуг
const DESCRIPTION = 'Это лучшее предложение на рынке!'; //описание
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
//location
const LAT = getRandomFloat(35.65000,35.70000,5); // широта
const LNG = getRandomFloat(139.70000,139.80000,5); // долгота

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createData = () => ({
  avatar: getRandomArrayElement(AVATARS),
  title: TITLE,
  address: ADDRESS,
  price: PRICE,
  type: TYPE,
  rooms: ROOMS,
  guests: GUESTS,
  checkin: CHECKIN,
  checkout: CHECKOUT,
  features: getRandomArrayElement(FEATURES),
  description: DESCRIPTION,
  photos: getRandomArrayElement(PHOTOS),
  lat: LAT,
  lng: LNG,
});

const similarData = new Array(COUNT).fill(null).map(() => createData());
similarData;
