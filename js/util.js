const ERROR_MSG = 'Выбран неверный диапазон';
const POPUP_SHOW_TIME = 3000;

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

const randomArrayValues = (lengthArray, array) => {
  const newArray = [];
  while (newArray.length < lengthArray) {
    const arrayIndex = getRandomInteger(0, array.length - 1);
    if (newArray.includes(array[arrayIndex]) === false) {
      newArray.push(array[arrayIndex]);
    }
  }
  return newArray;
};

//функция для отрисовки данных в карточку
const getInsertData = (block, fragment) => block.appendChild(fragment);

//функция показа модали с сообщением
const getPopupShow = (modal) => {
  document.body.append(modal);
  setTimeout(() => {
    modal.remove();
  }, POPUP_SHOW_TIME);
};

//функция передачи данных в поле формы из объекта
const setFormAddress = (input, object) => {
  input.value = Object.values(object).join(', ');
};

export{
  getRandomInteger,
  getRandomFloat,
  getRandomArrayElement,
  randomArrayValues,
  getInsertData,
  getPopupShow,
  setFormAddress
};

