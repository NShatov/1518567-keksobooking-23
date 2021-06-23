import {
  getRandomInteger,
  getRandomFloat,
  getRandomArrayElement
} from './util.js';

import {
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
} from './data.js';

//Создаём массив из 10-ти сгенерированных объектов
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
similarData;

export {createData};
