const getException = () => 'Неверно указан диапазон!';

const getRandomInteger = function(min, max) {
  if (min >= 0 && min !== max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  getException();
};

getRandomInteger(2,15);


const getRandomFloar = function(min, max, num) {
  if (min >= 0 && min !== max && num > 0) {
    return ((Math.random() * (max - min + 1)) + min).toFixed(num);
  }
  getException();
};

getRandomFloar(4,12,3);
