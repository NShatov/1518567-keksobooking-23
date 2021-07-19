// зададим константные значения
const MAX_PRICE = 50000;
const MIN_PRICE = 10000;
const EMPTY = 'any';

// найдем селекты и чекбоксы внутри формы с фильтрами
const mapFilters = document.querySelector('.map__filters'); // фильтр карты
const mapFiltersHouseType = mapFilters.querySelector('#housing-type'); // тип жилья
const mapFiltersHousePrice = mapFilters.querySelector('#housing-price'); // цена
const mapFiltersHouseRooms = mapFilters.querySelector('#housing-rooms'); // кол-во комнат
const mapFiltersHouseGuests = mapFilters.querySelector('#housing-guests'); // кол-во гостей

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
      offer.price < MIN_PRICE;
      break;
    case 'middle':
      offer.price >= MIN_PRICE && offer.price < MAX_PRICE;
      break;
    case 'high':
      offer.price >= MAX_PRICE;
      break;
  }
};
