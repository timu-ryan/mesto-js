const editProfilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');

const imagePopup = document.querySelector('.popup_type_image');
const imageElementImagePopup = document.querySelector('.popup__image');
const captionElementImagePopup = document.querySelector('.popup__caption');

const editProfileForm = document.forms['edit-profile'];
const profileNameInput = editProfileForm.elements['name'];
const profileDescriptionInput = editProfileForm.elements['description'];

const addCardForm = document.forms['new-place'];
const placeNameInput = addCardForm.elements['place-name'];
const placeImageLinkInput = addCardForm.elements['link'];

function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
}

function closePopup(popupElement) {
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

export function openEditProfilePopup(name, description) {
  profileNameInput.value = name;
  profileDescriptionInput.value = description;
  openPopup(editProfilePopup);
  addPopupEventListeners();
}

export function handleEditFormSubmit(evt, profileName, profileDescription) {
  evt.preventDefault();
  profileName = profileNameInput.value;
  profileDescription = profileDescriptionInput.value;
  editProfileForm.reset();
  closePopups();
  return ({ name: profileName, description: profileDescription });
}

// TODO: add onload handling (?)
export function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCardData = {
    name: placeNameInput.value,
    link: placeImageLinkInput.value,
  }
  addCardForm.reset();
  closePopups();
  return newCardData;
}

export function closePopups() {
  closePopup(addCardPopup);
  closePopup(editProfilePopup);
  closePopup(imagePopup);
}

function addPopupEventListeners() {
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

