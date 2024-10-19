const initialCards = [
    { name: "Val Thores", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg"},
    { name: "Restaurant terrace", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg"},
    { name: "An outdoor cafe", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg"},
    { name: "A very long bridge, over the forest and through the tree", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg"},
    { name: "Tunnel with morning light", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg"},
    { name: "Mountain house", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg"}
];

const profileEditButton = document.querySelector('.profile__edit-btn');
const editModal = document.querySelector('#edit-modal'); 
const editModalCloseButton = document.querySelector(".modal__close-btn");

function openModal() {
    editModal.classList.add("modal__opened");
}

function closeModal() {
    editModal.classList.remove("modal__opened");
}

profileEditButton.addEventListener("click", openModal);

editModalCloseButton.addEventListener("click", closeModal);