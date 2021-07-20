// модуль для получения данных с сервера

const getData = (onSuccess, onFail) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then ((ads) => {
      onSuccess(ads);
    })
    .catch(() => {
      onFail('Ошибка загрузки');
    });
};

export {getData};


