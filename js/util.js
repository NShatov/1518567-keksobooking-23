const POPUP_SHOW_TIME = 3000;

//функция передачи данных в поле формы адреса из объекта
const setFormAddress = (input, object) => {
  input.value = Object.values(object).join(', ');
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

// функция добавления обработчика на ESC
const onPopupEscKeydown = (modal) => {
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      modal.remove();
    }
  });
};
// функция удаления обработчика на ESC
const offPopupEscKeydown = (modal) => {
  document.removeEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      modal.remove();
    }
  });
};
// функция добавления обработчика на клик по области
const onPopupClickDown = (modal) => {
  document.addEventListener('click', (evt) => {
    evt.preventDefault();
    modal.remove();
  });
};
// функция добавления удаления обработчика на клик по области
const offPopupClickDown = (modal) => {
  document.removeEventListener('click', (evt) => {
    evt.preventDefault();
    modal.remove();
  });
};
// функция добавления обработчика на кнопку
const onPopupButtonClick = (modal, button) => {
  button.addEventListener('click', (evt) => {
    evt.preventDefault();
    modal.remove();
  });
};
// функция удаления обработчика на кнопку
const offPopupButtonClick = (modal, button) => {
  button.removeEventListener('click', (evt) => {
    evt.preventDefault();
    modal.remove();
  });
};

//функция показа модали с автозакрытием
const getPopupShowTimeout = (modal) => {
  document.body.append(modal);
  onPopupEscKeydown(modal);
};

//функция скрытия модали с автозакрытием
const getPopupCloseTimeout = (modal) => {
  offPopupEscKeydown(modal);
  setTimeout(() => {
    modal.remove();
  }, POPUP_SHOW_TIME);
};

//функция показа модалки без автозакрытия
const getPopupShow = (modal, button) => {
  document.body.append(modal);
  onPopupButtonClick(modal, button);
  onPopupEscKeydown(modal);
  onPopupClickDown(modal);
};

// функция удаления модалки без автозакрытия
const getPopupClose = (modal, button) => {
  offPopupButtonClick(modal, button);
  offPopupEscKeydown(modal);
  offPopupClickDown(modal);
};


export{
  getPopupShowTimeout,
  getPopupCloseTimeout,
  getPopupShow,
  getPopupClose,
  setFormAddress
};

