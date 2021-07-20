import {housingType} from './card.js';
import {setFormAddress} from './util.js';
import {addressTokio, mainPinMarker} from './map.js';
import {mapFiltersForm, mapFilterHouseFeatures} from './filter.js';
import {
  getPopupShowTimeout,
  getPopupShow,
  successForm,
  errorForm,
  buttonCloseErrorForm
} from './modal.js';

// элементы формы
const form = document.querySelector('.ad-form'); // найдем форму заполнения информации об объявлении
const formFieldsets = form.querySelectorAll('fieldset'); // найдем филдсеты внутри формы
const mapFiltersSelects = mapFiltersForm.querySelectorAll('select'); // найдем селекты внутри фильтра
const resetForm = form.querySelector('.ad-form__reset'); // кнопка очистки формы

// создадим функцию для перевода формы в неактивное и активное состояние с помощью флага inactive - 'неактивное'
const getInactiveForm = (inactive) => {
  //добавим атрибут disabled через перебор
  formFieldsets.forEach((item) => {
    item.disabled = inactive;
  });
  if (inactive) {
    form.classList.add('ad-form--disabled');
  } else {
    form.classList.remove('ad-form--disabled');
  }
};

const getInactiveFilter = (inactive) => {
  // пепеберем коллекцию и установим атрибут diabled на элементы
  mapFiltersSelects.forEach((item) => {
    item.disabled = inactive;
  });
  mapFilterHouseFeatures.disabled = inactive; // установим атрибут disabled на блоке с кнопками-фичами
  if (inactive) {
    mapFiltersForm.classList.add('map__filters--disabled'); // повесим класс блокировки
  } else {
    mapFiltersForm.classList.remove('map__filters--disabled');
  }
};

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

// сопоставление данных из полей Кол-во комнат и кол-во мест
const optionsPriceMapping = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

// напишем функцию сопастовления данных из одного селекта в другой
const getMatchingSelect = function (select1, select2, mapping) {
  const value = +select1.value;
  const options = select2.options;
  const optionsLength = options.length;
  const availableOptions = mapping[value];

  for (let index = 0; index < optionsLength; index++) {
    if (availableOptions.indexOf(+options[index].value) !== -1) {
      options[index].disabled = false;
      if (+options[index].value === value || availableOptions.length === 1) {
        options[index].selected = true;
      }
    } else {
      options[index].disabled = true;
    }
  }
};

// функция сопастовления данных селекта и инпута
const getOptionSelect = function(select, input, mapping) {
  const selectValue = select.value;
  const price = mapping[selectValue].price;
  input.placeholder = price;
  input.min = price;
};

// функция для сопастовления выбора времени заезда и выезда
const getMatchingTime = function(select1, select2) {
  select2.value = select1.value;
};

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

//функция сброса формы в исходное состояние
const getResetForm = () => {
  form.reset(); // сбросим заполненную форму
  mapFiltersForm.reset(); // сбросим форму с фильтрами
  setFormAddress(formAddress, addressTokio);
  mainPinMarker.setLatLng(addressTokio);
};

//повесим обработчик событий на кнопку очистки полей формы и возврата метки в начальное значение
const getResetButtonForm = () => {
  resetForm.addEventListener('click', (evt) => {
    evt.preventDefault();
    getResetForm();
  });
};

// вешаем обработчик события на кнопку отправки формы на сервер
const setUserFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch (
      'https://23.javascript.pages.academy/keksobooking ',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => {
        if (response.ok) {
          getResetForm();
          getPopupShowTimeout(successForm);
        } else {
          getPopupShow(errorForm, buttonCloseErrorForm);
        }
      })
      .catch(() => {
        getPopupShow(errorForm, buttonCloseErrorForm);
      });
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
  setUserFormSubmit
};
