const POPUP_SHOW_TIME = 3000; // время показа модального окна

// сообщения об успешной отправке и ошибках
const successForm = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorForm = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorServer = document.querySelector('#error-response').content.querySelector('.error').cloneNode(true);
// кнопки закрытия модалок
const buttonCloseErrorForm = errorForm.querySelector('.error__button');
const buttonCloseErrorServer = errorServer.querySelector('.error__button');

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

function getRemoveListener(evt) {
  evt.preventDefault();
  successForm.remove();
  errorForm.remove();
  errorServer.remove();
  document.removeEventListener('keydown', onPopupEscKeydown);
  document.removeEventListener('click', onPopupClickDown);
}

function onPopupEscKeydown(evt) {
  if (isEscEvent(evt)) {
    getRemoveListener(evt);
  }
}

function onPopupClickDown(evt) {
  getRemoveListener(evt);
}

//функция показа модали с автозакрытием
function getPopupShowTimeout(modal) {
  document.body.append(modal);
  document.addEventListener('keydown', onPopupEscKeydown);
  setTimeout(() => {
    modal.remove();
  }, POPUP_SHOW_TIME);
}

//функция показа модалки без автозакрытия
function getPopupShow(modal, button) {
  document.body.append(modal);

  button.addEventListener('click', (evt) => {
    evt.preventDefault();
    modal.remove();
  });
  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', onPopupClickDown);
}

export {
  getPopupShowTimeout,
  getPopupShow,
  successForm,
  errorForm,
  errorServer,
  buttonCloseErrorForm,
  buttonCloseErrorServer
};
