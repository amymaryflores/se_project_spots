const setEventListener = (formEl) => {
const inputList = Array.from(formEl.querySelectorAll(".modal__input"));
const buttonEl = formEl.querySelector(".modal__submit-btn");

toggleButtonState(inputList, buttonEl);

inputList.forEach(inputEl) => {
    inputElement.addEventListener("input", function () {
        checkInputValidity(formEl, inputEl);
        toggleButtonState(inputList, buttonEl);
     });
    };
};

const showInputError(formEl, inputEl, errorMsg) => {
  const errorMsg = inputEl.id + "-error";
  const errorMsgEl  = formEl.querySelector("#" + errorMsg);
  errorMsgEl.textContent = errorMsg; 
  inputEl.classList.add("modal__input_type_error")
};

const hideInputError = (formEl, inputEl) => {
  const errorMsgID = inputEl.id + "-error";
  errorMsgEl.textContent - "";
  inputEl.classList.remove("modal__input_type_error");

};

const checkInputValidity = (formEl, inputEl) => {
    if (!inputEl.validity.valid) {
      showInputError(formEl, inputEl, inputEl.validationMessage);
    };
  } else {
    hideInputError(formEl, inputEl);
  };
  

const hasInvalidInput = (inputList) => {
 return inputList.some((input)) => {
  return !input.validity.valid;
 }
};

const toggleButtonState = (inputList, buttonEl) => {
  if (hasInvalidInput(inputList)) {
    buttonEl.disabled = true;
    } else {
      buttonEl.disabled = false;
}
};

const enableVaildation = () => {
    const formList = document.querySelectorAll(".modal__form");
    formList.forEach((formEl) => {
        setEventListener(formEl);
    });
};

enableVaildation();

  function enableValidation(config) {
    const formList = document.querySelectorAll(config.formSelector);
    formList.forEach((formEl) => {
      setEventListeners(formEl, config);
    });
  };
  