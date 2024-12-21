// Configuration for form validation
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
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

// Toggle button state
function toggleButtonState(inputList, buttonEl, config) {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonEl); // Reuse disableButton
  } else {
    enableSubmitButton(buttonEl); // Reuse enableSubmitButton
  }
}

// Check for invalid input
function hasInvalidInput(inputList) {
  return inputList.some((input) => !input.validity.valid);
}

// Disable button
function disableButton(buttonEl) {
  buttonEl.classList.add(config.inactiveButtonClass);
  buttonEl.disabled = true;
}

// Enable submit button
function enableSubmitButton(buttonEl) {
  buttonEl.classList.remove(config.inactiveButtonClass);
  buttonEl.disabled = false;
}

// Reset error messages for a specific form
function resetErrorMessages(formEl, config) {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  inputList.forEach((inputEl) => {
    hideInputError(formEl, inputEl, config); // Use hideInputError to remove error styles/messages
  });
} 

// Set event listeners for each form
function setEventListeners(formEl, config) {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonEl = formEl.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonEl, config);

  // Add reset event listener to form
  formEl.addEventListener("reset", () => {
    resetErrorMessages(formEl, config); // Reset error messages and styles
    disableButton(buttonEl, config); // Disable button on form reset
  });

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, config);
      toggleButtonState(inputList, buttonEl, config);
    });
  });
}

// Enable validation for all forms
function enableValidation(config) {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, config); // Set validation for each form
  });
}

// Initialize validation
enableValidation(config);
