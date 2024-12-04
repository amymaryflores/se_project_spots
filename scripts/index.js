const initialCards = [
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the tree",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "San Francisco Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
];

// Modal Elements
const editModalBtn = document.querySelector(".profile__edit-btn");
const cardModalBtn = document.querySelector(".profile__add-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const editModal = document.querySelector("#edit-modal");
const editForm = editModal.querySelector(".modal__form");
const editModalCloseButton = document.querySelector(".modal__close-btn");
const nameInput = editModal.querySelector("#profile-name-input");
const descriptionInput = editModal.querySelector("#profile-description-input");

const cardModal = document.querySelector("#add-card-modal");
const cardForm = cardModal.querySelector(".modal__form");
const cardModalCloseBtn = cardModal.querySelector(".modal__close-btn");
const cardNameInput = cardModal.querySelector("#add-card-name-input");
const cardLinkInput = cardModal.querySelector("#add-card-link-input");

const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");
const previewModalCloseButton = document.querySelector(".modal__close-preview");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

// Create a new card element
function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-btn_liked");
  });

  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.name;
    previewModalCaptionEl.textContent = data.name;
  });

  return cardElement;
}

function disableButton(buttonEl) {
  buttonEl.classList.add(config.inactiveButtonClass); 
  buttonEl.disabled = true; 
}

// Function to enable the submit button
function enableSubmitButton(buttonEl) {
  buttonEl.classList.remove(config.inactiveButtonClass);
  buttonEl.disabled = false;
}

// Open modal
function openModal(modal) {
  modal.classList.add("modal_opened");
  resetErrorMessages(); // Reset errors when opening the modal

  const form = modal.querySelector(".modal__form");
  if (form) {
    const inputList = Array.from(form.querySelectorAll(".modal__input"));
    const submitButton = form.querySelector(".modal__submit-btn");

    toggleButtonState(inputList, submitButton, config); // Update button state based on input validity
  }
}

// Close modal
function closeModal(modal) {
  modal.classList.remove("modal_opened");

  // Reset form values and button state
  const form = modal.querySelector(".modal__form");
  if (form) {
    const submitButton = form.querySelector(".modal__submit-btn");
    enableSubmitButton(submitButton); // Ensure submit button is enabled when closing modal
  }

  // Reset form inputs
  if (modal === cardModal) {
    cardForm.reset();
  } else if (modal === editModal) {
    editForm.reset();
  }

  resetErrorMessages(); // Clear error messages when closing the modal
}

// Handle Add Card Submit
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const inputValues = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement); // Add new card to the list
  cardForm.reset();
  const submitButton = cardForm.querySelector(".modal__submit-btn");
  disableButton(submitButton); // Disable submit button after card is added
  closeModal(cardModal); // Close modal
}

// Handle Edit Form Submit
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editModal); // Close modal after form submission
  editForm.reset();
}

// Event listeners for modals and forms
editModalBtn.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(editModal); // Open edit modal
});

editModalCloseButton.addEventListener("click", () => {
  closeModal(editModal); // Close edit modal
});

cardModalBtn.addEventListener("click", () => {
  openModal(cardModal); // Open add card modal
});

cardModalCloseBtn.addEventListener("click", () => {
  closeModal(cardModal); // Close add card modal
});

previewModalCloseButton.addEventListener("click", () => {
  closeModal(previewModal); // Close preview modal
});

// Submit forms
editForm.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", handleAddCardSubmit);

// Handle Escape Key to Close Modal
function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    if (openModal) {
      closeModal(openModal);
    }
  }
}
document.addEventListener("keydown", handleEscapeKey);

// Close Modal When Clicking Outside (Overlay)
const closeOverlay = (evt) => {
  const overlay = evt.target;
  if (overlay.classList.contains("modal")) {
    closeModal(overlay); // Close modal when clicking outside
  }
};
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("mousedown", closeOverlay);
});

// Add Initial Cards
initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardsList.prepend(cardElement); // Prepend initial cards
});
