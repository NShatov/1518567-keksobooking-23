import {housingType} from './card.js';
import {mapFiltersForm} from './filter.js';
import {setUserFormSubmit} from './server.js';
import {
  getInactiveForm,
  getInactiveFilter,
  getMatchingSelect,
  getOptionSelect,
  optionsPriceMapping,
  getMatchingTime,
  getResetForm
} from './form-util.js';

// элементы формы
const form = document.querySelector('.ad-form'); // найдем форму заполнения информации об объявлении
const formFieldsets = form.querySelectorAll('fieldset'); // найдем филдсеты внутри формы
const mapFiltersSelects = mapFiltersForm.querySelectorAll('select'); // найдем селекты внутри фильтра
const resetForm = form.querySelector('.ad-form__reset'); // кнопка очистки формы

// валидация формы
const formTitle = form.querySelector('#title'); // заголовок формы
const formPrice = form.querySelector('#price'); // поле с ценой
const formRooms = form.querySelector('#room_number'); // поле с комнатами
const formCapacity = form.querySelector('#capacity'); // поле с гостями
const formHouseType = form.querySelector('#type'); // тип жилья
const formTimeIn = form.querySelector('#timein'); // время заезда
const formTimeOut = form.querySelector('#timeout'); // время выезда
const formAddress = form.querySelector('#address'); // поле адреса

// зададим максимальные и минимальные значения полей формы
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MIN_PRICE = 0;
const MAX_PRICE = 1000000;

// изменим способ валидации поля - будем проверять при вводе данных
formTitle.addEventListener('input', () => {
  const formTitleLength = formTitle.value.length;

  if (formTitleLength < MIN_TITLE_LENGTH) {
    formTitle.setCustomValidity('Пользователь! Минимальная длина 30 символов!');
  } else if (formTitleLength > MAX_TITLE_LENGTH) {
    formTitle.setCustomValidity('Пользователь! 100 символов достаточно!');
  } else if (formTitleLength === 0) {
    formTitle.setCustomValidity('Пользователь! Напиши пару строк от души!');
  } else {
    formTitle.setCustomValidity('');
  }
  formTitle.reportValidity();
});

// проверка поля при нажатии кнопки "Опубликовать" с заголовком
formTitle.addEventListener('invalid', () => {
  if (formTitle.validity.valueMissing) {
    formTitle.setCustomValidity('Пользователь! Напиши пару строк от души!');
  } else if (formTitle.validity.tooShort) {
    formTitle.setCustomValidity('Пользователь! Минимальная длина 30 символов!');
  } else if (formTitle.validity.tooLong) {
    formTitle.setCustomValidity('Пользователь! 100 символов достаточно!');
  } else {
    formTitle.setCustomValidity('');
  }
});

// будем проверять поле с ценой после нажатия кнопки "Опубликовать"
formPrice.addEventListener('invalid', () => {
  if (formPrice.validity.valueMissing) {
    formPrice.setCustomValidity('Пользователь! Нужно ввести значение в поле');
  } else if (formPrice.validity.rangeUnderflow) {
    formPrice.setCustomValidity(`Пользователь! Цена должна быть выше ${formPrice.min}`);
  } else if (formPrice.validity.rangeOverflow) {
    formPrice.setCustomValidity(`Пользователь! Цена не должна быть выше ${formPrice.max}`);
  } else {
    formPrice.setCustomValidity('');
  }
});

//проверка поля с ценой при вводе данных
formPrice.addEventListener('input', () => {
  if (!formPrice.value) {
    formPrice.setCustomValidity('Пользователь! Нужно ввести значение в поле');
  } else if (formPrice.value < MIN_PRICE) {
    formPrice.setCustomValidity(`Пользователь! Цена должна быть выше ${MIN_PRICE}`);
  } else if (formPrice.value > MAX_PRICE) {
    formPrice.setCustomValidity(`Пользователь! Цена не должна быть выше ${MAX_PRICE}`);
  } else {
    formPrice.setCustomValidity('');
  }
  formPrice.reportValidity();
});


formTimeIn.addEventListener('change', () => {
  getMatchingTime(formTimeIn, formTimeOut);
});

formTimeOut.addEventListener('change', () => {
  getMatchingTime(formTimeOut, formTimeIn);
});

formHouseType.addEventListener('change', () => {
  getOptionSelect(formHouseType, formPrice, housingType);
});

formRooms.addEventListener('change', () => {
  getMatchingSelect(formRooms, formCapacity, optionsPriceMapping);
});


//повесим обработчик событий на кнопку очистки полей формы и возврата метки в начальное значение
const getResetButtonForm = () => {
  resetForm.addEventListener('click', (evt) => {
    evt.preventDefault();
    getResetForm();
  });
};

getResetButtonForm();
setUserFormSubmit();
getInactiveForm(true); // установим форму в неактивное состояние
getInactiveFilter(true); // установим форму с фильтрми в неактивное состояние

export {
  getInactiveForm,
  getInactiveFilter,
  formAddress,
  setUserFormSubmit,
  form,
  formFieldsets,
  mapFiltersSelects,
  mapFiltersForm
};
