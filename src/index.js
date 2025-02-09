import './styles/index.css'; 
import { initialCards } from './cards'

const cardTemplate = document.querySelector('#card-template').content;

const cardsContainer = document.querySelector('.places__list');

const editProfilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');

const imagePopup = document.querySelector('.popup_type_image');
const imageElementImagePopup = document.querySelector('.popup__image');
const captionElementImagePopup = document.querySelector('.popup__caption');

const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const editProfileForm = document.forms['edit-profile'];
const profileNameInput = editProfileForm.elements['name'];
const profileDescriptionInput = editProfileForm.elements['description'];

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const createCard = (cardData, deleteCard, handleImageClick) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardDeleteButton.addEventListener('click', deleteCard);

  cardImage.addEventListener('click', function () {
    handleImageClick(cardData.link, cardData.name);
  })

  return cardElement;
}

// TODO: при удалении карточек надо бы удалять и слушатели 
const deleteCard = evt => evt.target.parentElement.remove();

initialCards.forEach(card => cardsContainer.append(createCard(card, deleteCard, openImagePopup)));

function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
}

function openAddCardPopup() {
  openPopup(addCardPopup);
  addPopupEventListeners();
}

function openEditProfilePopup() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(editProfilePopup);
  addPopupEventListeners();
}

function openImagePopup(imageUrl, caption) {
  imageElementImagePopup.src = imageUrl;
  imageElementImagePopup.alt = caption;
  captionElementImagePopup.textContent = caption;

  openPopup(imagePopup);
  addPopupEventListeners();
}

function closePopups() {
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

addCardButton.addEventListener('click', openAddCardPopup);
editProfileButton.addEventListener('click', openEditProfilePopup);

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  editProfileForm.reset();
  closePopups();
 }

editProfileForm.addEventListener('submit', handleEditFormSubmit);
