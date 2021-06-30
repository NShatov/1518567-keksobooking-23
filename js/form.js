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
// const MIN_TITLE_LENGTH = 30;
// const MAX_TITLE_LENGTH = 100;

// изменим способ валидации поля - будем проверять при вводе данных
/*formTitle.addEventListener('input', () => {
  const formTitleLength = formTitle.value.length;

  if (formTitleLength < MIN_TITLE_LENGTH) {
    formTitle.setCustomValidity('Братан! Минимальная длина 30 символов!');
  } else if (formTitleLength > MAX_TITLE_LENGTH) {
    formTitle.setCustomValidity('Братан! 100 символов достаточно!');
  } else if (formTitleLength === 0) {
    formTitle.setCustomValidity('Братан! Напиши пару строк от души!');
  } else {
    formTitle.setCustomValidity('');
  }
  formTitle.reportValidity();
});*/

formTitle.addEventListener('invalid', () => {
  if (formTitle.validity.valueMissing) {
    formTitle.setCustomValidity('Братан! Напиши пару строк от души!');
  } else if (formTitle.validity.tooShort) {
    formTitle.setCustomValidity('Братан! Минимальная длина 30 символов!');
  } else if (formTitle.validity.tooLong) {
    formTitle.setCustomValidity('Братан! 100 символов достаточно!');
  } else {
    formTitle.setCustomValidity('');
  }
});


// будем проверять поле с ценой после нажатия кнопки "Опубликовать"
formPrice.addEventListener('invalid', () => {
  if (formPrice.validity.valueMissing) {
    formPrice.setCustomValidity('Братан! Нужно ввести значение в поле');
  } else if (formPrice.validity.rangeUnderflow) {
    formPrice.setCustomValidity(`Братан! Цена должна быть выше ${formPrice.min}`);
  } else if (formPrice.validity.rangeOverflow) {
    formPrice.setCustomValidity(`Братан! Цена не должна быть выше ${formPrice.max}`);
  } else {
    formPrice.setCustomValidity('');
  }
});

console.log(formRooms);
console.log(formRooms.options[0].text);
console.log(formCapacity.options[2].text);

const getValueForm = () => {
  const selectedValueRoom = formRooms.options.selectedIndex;
  const selectedValueCapacity = formCapacity.options.selectedIndex;

  if (formRooms.options[0].selected = true) {
    formCapacity.options[0].hidden = true;
    formCapacity.options[1].hidden = true;
    formCapacity.options[3].hidden = true;
    formCapacity.options[2].selected = true;
  } else if (formRooms.options[1].selected = true) {
    formCapacity.options[0].hidden = true;
    formCapacity.options[3].hidden = true;
    formCapacity.options[2].selected = true;
  }
};

getValueForm();

export {getInactiveForm};
