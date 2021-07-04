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
const formHouseType = form.querySelector('#type');
const formTimeIn = form.querySelector('#timein');
const formTimeOut = form.querySelector('#timeout');

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

  return () => {
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
};

// функция сопастовления данных селекта и инпута
const getOptionSelect = function(select, input) {

  return () => {
    const options = select.options;
    const selind = options.selectedIndex;

    switch(selind) {
      case 0:
        input.placeholder = 0;
        input.min = 0;
        break;
      case 1:
        input.placeholder = 1000;
        input.min = 1000;
        break;
      case 2:
        input.placeholder = 3000;
        input.min = 3000;
        break;
      case 3:
        input.placeholder = 5000;
        input.min = 5000;
        break;
      case 4:
        input.placeholder = 10000;
        input.min = 10000;
        break;
    }
  };
};

// функция для сопастовления выбора времени заезда и выезда
const getMatchingTime = function(select1, select2) {

  return () => {
    const options1 = select1.options;
    const selind1 = options1.selectedIndex;
    const options2 = select2.options;

    switch(selind1) {
      case 0:
        options2[0].selected = true;
        break;
      case 1:
        options2[1].selected = true;
        break;
      case 2:
        options2[2].selected = true;
        break;
    }
  };
};

formTimeIn.addEventListener('change', getMatchingTime(formTimeIn, formTimeOut));

formTimeOut.addEventListener('change', getMatchingTime( formTimeOut, formTimeIn));

formHouseType.addEventListener('change', getOptionSelect(formHouseType, formPrice));

formRooms.addEventListener('change', getMatchingSelect(formRooms, formCapacity, optionsPriceMapping));

export {getInactiveForm};
