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

// начнем с поиска заголовка формы
const formTitle = form.querySelector('#title');
const formPrice = form.querySelector('#price'); // найдем поле с ценой

// зададим максимальные и минимальные значения полей формы
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MIN_PRICE = 0;
const MAX_PRICE = 1000000;

// изменим способ валидации поля - будем проверять при вводе данных
formTitle.addEventListener('input', () => {
  const formTitleLength = formTitle.value.length;

  if (formTitleLength < MIN_TITLE_LENGTH) {
    formTitle.setCustomValidity('Братан! Минимальная длина 30 символов!');
  } else if (formTitleLength >= MAX_TITLE_LENGTH) {
    formTitle.setCustomValidity('Братан! 100 символов достаточно!');
  } else {
    formTitle.setCustomValidity('');
  }
  formTitle.reportValidity();
});

formPrice.addEventListener('input', () => {
  const formPriceValue = formPrice.value;

  if (formPriceValue === MIN_PRICE) {
    formPrice.setCustomValidity('Братан, живи бесплатно!');
  } else if (formPriceValue < MIN_PRICE) {
    formPrice.setCustomValidity('Цена не может быть меньше нуля!');
  } else if (formPriceValue >= MAX_PRICE) {
    formPrice.setCustomValidity('Стоп, цена! Хватит!');
  } else {
    formPrice.setCustomValidity('');
  }
  formPrice.reportValidity();
});

console.log(formTitle.validity);


export {getInactiveForm};
