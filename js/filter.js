// зададим константные значения
const MAX_PRICE = 50000;
const MIN_PRICE = 10000;
const EMPTY = 'any';

// найдем селекты и чекбоксы внутри формы с фильтрами
const mapFiltersForm = document.querySelector('.map__filters'); // фильтр карты
const mapFiltersHouseType = mapFiltersForm.querySelector('#housing-type'); // тип жилья
const mapFiltersHousePrice = mapFiltersForm.querySelector('#housing-price'); // цена
const mapFiltersHouseRooms = mapFiltersForm.querySelector('#housing-rooms'); // кол-во комнат
const mapFiltersHouseGuests = mapFiltersForm.querySelector('#housing-guests'); // кол-во гостей
const mapFilterHouseFeatures = mapFiltersForm.querySelector('#housing-features'); // фичи

//функция фильтрации типа жилья
const isMatchHouseType = (offer) => mapFiltersHouseType.value === EMPTY || offer.type === mapFiltersHouseType.value;

// функция фильтрации по кол-ву комнат, для перевода строки в число используем parseInt
const isMatchHouseRooms = (offer) => mapFiltersHouseRooms.value === EMPTY || offer.rooms === parseInt(mapFiltersHouseRooms.value, 10);

// функция фильтрации по кол-ву гостей
const isMatchHouseGuests = (offer) => {
  if (mapFiltersHouseGuests.value === EMPTY) {
    return true;
  }

  if (mapFiltersHouseGuests.value !== '0') {
    offer.guests === parseInt(mapFiltersHouseGuests.value, 10);
  } else {
    offer.guests >= 3;
  }
};

// функция фильтрации по цене за квартиру
const isMatchHousePrice = (offer) => {
  switch (mapFiltersHousePrice.value) {
    case 'low':
      return offer.price < MIN_PRICE;
    case 'middle':
      return offer.price >= MIN_PRICE && offer.price < MAX_PRICE;
    case 'high':
      return offer.price >= MAX_PRICE;
  }
  return true;
};

// функция фильтрации фичей
const isMatchHouseFeatures = (offer) => {
  const checkedFeatures = [...mapFilterHouseFeatures.querySelectorAll(':checked')].map((item) => item.value);
  if (checkedFeatures.length === 0) {
    return true;
  }

  if (!offer.features) {
    return false;
  }
  return checkedFeatures.every((item) => offer.features.includes(item));
};

// запишем функции в массив
const filtersFuncs = [isMatchHouseType, isMatchHousePrice, isMatchHouseRooms, isMatchHouseGuests, isMatchHouseFeatures];

const filterOffer = (offer) => filtersFuncs.every((filterFunc) => filterFunc(offer));

const filter = (arr, count) => {
  arr = arr.filter(({offer}) => filterOffer(offer));
  return arr.slice(0, count);
};

const filterForm = document.querySelector('.map__filters');
const setFilterChange = (cb) => {
  filterForm.addEventListener('change', cb);
  filterForm.addEventListener('reset', cb);
};

export {
  filter,
  setFilterChange,
  mapFiltersForm,
  mapFilterHouseFeatures
};
