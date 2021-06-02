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

getRandomInteger(2,15);

const getRandomFloar = function(min, max, num) {
  try {
    if (min < 0 || max <= min || num < 0) {
      throw new Error('Ошибка!');
    }
    return ((Math.random() * (max - min + 1)) + min).toFixed(num);
  }
  catch(error) {
    return ERROR_MSG;
  }
};

getRandomFloar(4,12,3);
