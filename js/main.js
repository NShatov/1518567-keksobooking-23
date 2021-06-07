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

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const AVATARS = [];

for (let param = 1; param <= 8; param++) {
  AVATARS[param] = `img/avatars/user0${param}.png`;
}
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

const createData = () => ({
  avatar: getRandomArrayElement(AVATARS),
  title: TITLE,
  address: '23, 45',
  price: getRandomInteger(1, 1000),
  type: getRandomArrayElement(TYPE),
  rooms: getRandomInteger(1, 100),
  guests: getRandomInteger(1, 10),
  checkin: getRandomArrayElement(CHECKIN),
  checkout: getRandomArrayElement(CHECKOUT),
  features: getRandomArrayElement(FEATURES),
  description: DESCRIPTION,
  photos: getRandomArrayElement(PHOTOS),
  lat: getRandomFloat(35.65000,35.70000,5),
  lng: getRandomFloat(139.70000,139.80000,5),
});

const similarData = new Array(COUNT).fill(null).map(() => createData());
similarData;
