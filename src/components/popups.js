export const editProfilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');

const imagePopup = document.querySelector('.popup_type_image');
const imageElementImagePopup = document.querySelector('.popup__image');
const captionElementImagePopup = document.querySelector('.popup__caption');

export function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
}

export function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
}


export function openAddCardPopup() {
  openPopup(addCardPopup);
  addPopupEventListeners();
}

export function openImagePopup(imageUrl, caption) {
  imageElementImagePopup.src = imageUrl;
  imageElementImagePopup.alt = caption;
  captionElementImagePopup.textContent = caption;

  openPopup(imagePopup);
  addPopupEventListeners();
}

export function closePopups() {
  closePopup(addCardPopup);
  closePopup(editProfilePopup);
  closePopup(imagePopup);
}

export function addPopupEventListeners() {
  window.addEventListener('click', handleClosePopupClick);
  window.addEventListener('keydown', handleClosePopupKeydown);
}

function removePopupEventListeners() {
  window.removeEventListener('click', handleClosePopupClick);
  window.removeEventListener('keydown', handleClosePopupKeydown);
}

function handleClosePopupClick(evt) {
  if (evt.target.classList.contains('popup__close')) {
    closePopups();
    removePopupEventListeners();
  }
  if (evt.target.classList.contains('popup_is-opened')) {
    closePopups();
    removePopupEventListeners();
  }
}

function handleClosePopupKeydown(evt) {
  if (evt.key === 'Escape') {
    closePopups();
    removePopupEventListeners();
  }
}

