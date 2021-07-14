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

//функция передачи данных в поле формы адреса из объекта
const setFormAddress = (input, object) => {
  input.value = Object.values(object).join(', ');
};

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

//функция показа модали с автозакрытием
const getPopupShowTimeout = (modal) => {
  document.body.append(modal);
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      modal.remove();
    }
  });
  setTimeout(() => {
    modal.remove();
  }, POPUP_SHOW_TIME);
};

//функция показа модалки без автозакрытия
const getPopupShow = (modal, button) => {
  document.body.append(modal);

  button.addEventListener('click', (evt) => {
    evt.preventDefault();
    modal.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      modal.remove();
    }
  });

  document.addEventListener('click', (evt) => {
    evt.preventDefault();
    modal.remove();
  });
};

// функция удаления модалки
const getPopupClose = (button, modal) => {

  button.removeEventListener('click', (evt) => {
    evt.preventDefault();
    modal.remove();
  });

  document.removeEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      modal.remove();
    }
  });

  document.removeEventListener('click', (evt) => {
    evt.preventDefault();
    modal.remove();
  });
};


export{
  getRandomInteger,
  getRandomFloat,
  getRandomArrayElement,
  randomArrayValues,
  getPopupShowTimeout,
  getPopupShow,
  getPopupClose,
  setFormAddress
};

