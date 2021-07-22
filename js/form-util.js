import {form, formFieldsets, mapFiltersSelects, mapFiltersForm, formAddress} from './form.js';
import {mapFilterHouseFeatures} from './filter.js';
import {addressTokio, mainPinMarker} from './map.js';

//функция передачи данных в поле формы адреса из объекта
const setFormAddress = (input, object) => {
  input.value = Object.values(object).join(', ');
};

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


// сопоставление данных из полей Кол-во комнат и кол-во мест
const optionsPriceMapping = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};


// функция для сопастовления выбора времени заезда и выезда
const getMatchingTime = function(select1, select2) {
  select2.value = select1.value;
};

//функция сброса формы в исходное состояние
const getResetForm = () => {
  form.reset(); // сбросим заполненную форму
  mapFiltersForm.reset(); // сбросим форму с фильтрами
  setFormAddress(formAddress, addressTokio);
  mainPinMarker.setLatLng(addressTokio);
};

export {
  getInactiveForm,
  getInactiveFilter,
  getMatchingSelect,
  getOptionSelect,
  optionsPriceMapping,
  getMatchingTime,
  getResetForm,
  setFormAddress
};
