const POPUP_SHOW_TIME = 3000;

//функция передачи данных в поле формы адреса из объекта
const setFormAddress = (input, object) => {
  input.value = Object.values(object).join(', ');
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

//функция показа модали с автозакрытием
const getPopupShowTimeout = (modal) => {
  document.body.append(modal);

  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      modal.remove();
    }
  });
};

//функция скрытия модали с автозакрытием
const getPopupCloseTimeout = (modal) => {

  document.removeEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      modal.remove();
    }
  });

  setTimeout(() => {
    modal.remove();
  }, POPUP_SHOW_TIME);
};

//функция показа модалки без автозакрытия
const getPopupShow = (modal, button) => {
  document.body.append(modal);

  button.addEventListener('click', (evt) => {
    evt.preventDefault();
    modal.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      modal.remove();
    }
  });

  document.addEventListener('click', (evt) => {
    evt.preventDefault();
    modal.remove();
  });
};

const popupEscClose = (modal) => {
  modal.remove();

  document.removeEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      modal.remove();
    }
  });
};

const popupClickClose = (modal) => {
  modal.remove();

  document.removeEventListener('click', (evt) => {
    evt.preventDefault();
    modal.remove();
  });
};

export{
  getPopupShowTimeout,
  getPopupCloseTimeout,
  getPopupShow,
  popupEscClose,
  popupClickClose,
  isEscEvent,
  setFormAddress
};

