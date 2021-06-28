// добавление неактивного состояния

const form = document.querySelector('.ad-form'); // найдем форму заполнения информации об объявлении

// найдем филдсеты внутри формы
const formFieldsets = form.querySelectorAll('fieldset');

const mapFiltersForm = document.querySelector('.map__filters'); // найдем форму с фильтрами

// найдем селекты внутри фильтра
const mapFiltersSelects = mapFiltersForm.querySelectorAll('select');

// найдем область с кнопка-фичами
const mapFeatures = mapFiltersForm.querySelector('.map__features');

// создадим функцию для перевода страницы в неактивное состояние
const getInactiveForm = () => {
  form.classList.add('ad-form--disabled');

  //добавим атрибут disabled через перебор
  formFieldsets.forEach((item) => {
    item.setAttribute('disabled', '');
  });

  mapFiltersForm.classList.add('map__filters--disabled');

  mapFiltersSelects.forEach((item) => {
    item.setAttribute('disabled', '');
  });

  mapFeatures.setAttribute('disabled', '');

};

getInactiveForm();

// добавление активного состояния

const getActiveForm = () => {
  if (form.classList.contains('ad-form--disabled')) {
    form.classList.remove('ad-form--disabled');
  }
  formFieldsets.forEach((item) => {
    item.removeAttribute('disabled', '');
  });
  if (mapFiltersForm.classList.contains('map__filters--disabled')) {
    mapFiltersForm.classList.remove('map__filters--disabled');
  }
  mapFiltersSelects.forEach((item) => {
    item.removeAttribute('disabled', '');
  });
  mapFeatures.removeAttribute('disabled', '');
};

getActiveForm();

