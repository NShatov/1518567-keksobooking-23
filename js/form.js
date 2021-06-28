const form = document.querySelector('.ad-form'); // найдем форму заполнения информации об объявлении

const formFieldsets = form.querySelectorAll('fieldset'); // найдем филдсеты внутри формы

const mapFiltersForm = document.querySelector('.map__filters'); // найдем форму с фильтрами

const mapFiltersSelects = mapFiltersForm.querySelectorAll('select'); // найдем селекты внутри фильтра

const mapFeatures = mapFiltersForm.querySelector('.map__features'); // найдем область с кнопка-фичами

// создадим функцию для перевода страницы в неактивное и активное состояние с помощью флага inactive - 'неактивное'
const getInactiveForm = (inactive) => {
  if (inactive === true) {
    form.classList.add('ad-form--disabled');

    //добавим атрибут disabled через перебор
    formFieldsets.forEach((item) => {
      item.disabled = true;
    });
    mapFiltersForm.classList.add('map__filters--disabled'); // повесим класс блокировки
    // пепеберем коллекцию и установим атрибут diabled на элементы
    mapFiltersSelects.forEach((item) => {
      item.disabled = true;
    });
    mapFeatures.disabled = true; // установим атрибут disabled на блоке с кнопками-фичами

  } else {
    form.classList.remove('ad-form--disabled');
    formFieldsets.forEach((item) => {
      item.disabled = false;
    });
    mapFiltersForm.classList.remove('map__filters--disabled');
    mapFiltersSelects.forEach((item) => {
      item.disabled = false;
    });
    mapFeatures.disabled = false;
  }
};

getInactiveForm(true);
