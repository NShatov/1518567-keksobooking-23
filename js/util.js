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

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export{
  getRandomInteger,
  getRandomFloat,
  getRandomArrayElement
};

