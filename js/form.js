const form = document.querySelector('.ad-form'); // найдем форму заполнения информации об объявлении

const formFieldsets = form.querySelectorAll('fieldset'); // найдем филдсеты внутри формы

const mapFiltersForm = document.querySelector('.map__filters'); // найдем форму с фильтрами

const mapFiltersSelects = mapFiltersForm.querySelectorAll('select'); // найдем селекты внутри фильтра

const mapFeatures = mapFiltersForm.querySelector('.map__features'); // найдем область с кнопка-фичами

// создадим функцию для перевода страницы в неактивное и активное состояние с помощью флага inactive - 'неактивное'
const getInactiveForm = (inactive) => {
  //добавим атрибут disabled через перебор
  formFieldsets.forEach((item) => {
    item.disabled = inactive;
  });
  // пепеберем коллекцию и установим атрибут diabled на элементы
  mapFiltersSelects.forEach((item) => {
    item.disabled = inactive;
  });
  mapFeatures.disabled = inactive; // установим атрибут disabled на блоке с кнопками-фичами
  if (inactive) {
    form.classList.add('ad-form--disabled');
    mapFiltersForm.classList.add('map__filters--disabled'); // повесим класс блокировки
  } else {
    form.classList.remove('ad-form--disabled');
    mapFiltersForm.classList.remove('map__filters--disabled');
  }
};

getInactiveForm(false);

// валидация формы
const formTitle = form.querySelector('#title'); // заголовок формы
const formPrice = form.querySelector('#price'); // поле с ценой
const formRooms = form.querySelector('#room_number'); // поле с комнатами
const formCapacity = form.querySelector('#capacity'); // поле с гостями

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
    formPrice.setCustomValidity(`Пользователь! Цена должна быть выше ${MIN_PRICE}`);
  } else if (formPrice.validity.rangeOverflow) {
    formPrice.setCustomValidity(`Пользователь! Цена не должна быть выше ${MAX_PRICE}`);
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

/*const selectedValueRoom = formRooms.options.selectedIndex; // поилучение индекса, выбранного значения
formRooms.options[selectedValueRoom].defaultSelected = true; // снятие выбранного значения по умолчанию
const selectedValueCapacity = formCapacity.options.selectedIndex;
formCapacity.options[selectedValueCapacity].defaultSelected = false;*/

/*formCapacity.options[2].defaultSelected = true;
formCapacity.options[0].hidden = true;
formCapacity.options[1].hidden = true;
formCapacity.options[3].hidden = true;*/

/*formRooms.addEventListener('change', () => {
  formRooms.options[0].defaultSelected = false;
  if (formRooms.options[1].selected) {
    formRooms.options[1].defaultSelected = true;
    formCapacity.options[2].selected = true;
    formCapacity.options[1].hidden = false;
  } else if (formRooms.options[2].selected) {
    formRooms.options[1].defaultSelected = false;
    formRooms.options[2].defaultSelected = true;
    formCapacity.options[2].selected = true;
    formCapacity.options[0].hidden = false;
    formCapacity.options[1].hidden = false;
  } else if (formRooms.options[3].selected) {
    formRooms.options.forEach((item) => {
      item.defaultSelected = false;
    });
    formRooms.options[3].defaultSelected = true;
    formCapacity.options[0].hidden = true;
    formCapacity.options[1].hidden = true;
    formCapacity.options[2].hidden = true;
    formCapacity.options[3].hidden = false;
  }
});*/

// напишем функцию сопастовления данных из одного селекта в другой

const getMatchingSelect = function (select1, select2) {
  const matchSelect = {
    1: ['для 1 гостя'],
    2: ['для 1 гостя', 'для 2 гостей'],
    3: ['для 1 гостя', 'для 2 гостей', 'для 3 гостей'],
    100: ['не для гостей'],
  };

  const value = +select1.value; // получаем значение в 1-м селекте
  const options = select2.options; // получаем массив со значениями из 2-го селекта
  const optionsLength = options.length; // запишем длину массива в переменную
  const availableOptions = matchSelect[value]; // запишем значение с выбранным значением option

  for (let index = 0; index < optionsLength; index++) {
    if (availableOptions.indexOf(+options[index].value) !== -1) {
      options[index].hidden = false;
    } if (+options[index].value === value && availableOptions.length === 1) {
      options[index].selected = true;
    } else {
      options[index].hidden = true;
    }
  }

};

formRooms.addEventListener('onchange', getMatchingSelect(formRooms, formCapacity));

/*const getById = (id) => form.querySelector(id);

const disableItems = (element, from, to) => {
  for (let index = from; index < to; index++) {
    getById(element)[index].disabled = true;
  }
};

const enableAll = (element) => {
  const item = getById(element);
  for (let index = 0; index < item.length; index++) {
    item[index].disabled = false;
  }
};

const changeDynamicly = () => {
  const selectIndex = getById('#capacity').selectedIndex;
  enableAll('#capacity');
  disableItems('#capacity', selectIndex+1, getById('#capacity').length);
};

getById('#room_number').addEventListener('change', changeDynamicly);

export {getInactiveForm};*/
