// Configuration for form validation
const config = {
  formSelector: '.modal__form',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__submit-btn',
  inactiveButtonClass: 'modal__submit-btn_disabled',
  inputErrorClass: 'modal__input_type_error',
  errorClass: 'modal__error_visible'
};

// Show input error
function showInputError(formEl, inputEl, errorMsg, config) {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = errorMsg;
  inputEl.classList.add(config.inputErrorClass);
}

// Hide input error
function hideInputError(formEl, inputEl, config) {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = "";
  inputEl.classList.remove(config.inputErrorClass);
}

// Check input validity
function checkInputValidity(formEl, inputEl, config) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }
}

// Toggle submit button state
function toggleButtonState(inputList, buttonEl, config) {
  if (hasInvalidInput(inputList)) {
    buttonEl.classList.add(config.inactiveButtonClass);
    buttonEl.disabled = true;
  } else {
    buttonEl.classList.remove(config.inactiveButtonClass);
    buttonEl.disabled = false;
  }
}

// Check for invalid input
function hasInvalidInput(inputList) {
  return inputList.some((input) => !input.validity.valid);
}

// Reset error messages
function resetErrorMessages() {
  const errorMessages = document.querySelectorAll('.modal__error');
  errorMessages.forEach((message) => {
    message.textContent = ''; // Clear error message text
  });

  const inputFields = document.querySelectorAll('.modal__input');
  inputFields.forEach((input) => {
    input.classList.remove('modal__input_type_error'); // Remove error styling
  });
}

// Set event listeners for the form
function setEventListeners(formEl, config) {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonEl = formEl.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonEl, config);

  formEl.addEventListener("reset", () => {
    toggleButtonState(inputList, buttonEl, config); // Disable button on reset
  });

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", function () {
      checkInputValidity(formEl, inputEl, config);
      toggleButtonState(inputList, buttonEl, config);
    });
  });
}

// Enable validation for all forms
function enableValidation(config) {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
}

enableValidation(config);
