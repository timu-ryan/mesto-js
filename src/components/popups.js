const editProfilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const updateAvatarPopup = document.querySelector('.popup_type_avatar');
const deleteConfirmationPopup = document.querySelector('.popup_type_delete-confirmation');

const imagePopup = document.querySelector('.popup_type_image');
const imageElementImagePopup = document.querySelector('.popup__image');
const captionElementImagePopup = document.querySelector('.popup__caption');

const editProfileForm = document.forms['edit-profile'];
const profileNameInput = editProfileForm.elements['name'];
const profileDescriptionInput = editProfileForm.elements['description'];

const addCardForm = document.forms['new-place'];
const placeNameInput = addCardForm.elements['place-name'];
const placeImageLinkInput = addCardForm.elements['place-link'];


const updateAvatarForm = document.forms['avatar'];
const avatarLinkInput = updateAvatarForm.elements['avatar-link'];

const deleteConfirmationForm = document.forms['delete-confirmation'];
const deleteConfirmationSubmitButton = deleteConfirmationForm.querySelector('.button');

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

export function openUpdateAvatarPopup(link) {
  avatarLinkInput.value = link;
  openPopup(updateAvatarPopup);
  addPopupEventListeners();
}

export function openDeleteConfirmationPopup(id) {
  openPopup(deleteConfirmationPopup);
  deleteConfirmationSubmitButton.setAttribute('data-card-id', id);
  addPopupEventListeners();
}

export function handleDeleteConfirmationFromSubmit(evt, id) {
  evt.preventDefault();
  return id;
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

export function handleUpdateAvatarFormSubmit(evt) {
  evt.preventDefault();
  const newAvatarLink = avatarLinkInput.value;
  updateAvatarForm.reset();
  closePopups();
  return newAvatarLink;
}

export function closePopups() {
  closePopup(addCardPopup);
  closePopup(editProfilePopup);
  closePopup(imagePopup);
  closePopup(updateAvatarPopup);
  closePopup(deleteConfirmationPopup);
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

