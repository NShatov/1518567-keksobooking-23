//функция передачи данных в поле формы адреса из объекта
const setFormAddress = (input, object) => {
  input.value = Object.values(object).join(', ');
};

export{
  setFormAddress
};

