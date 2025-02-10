import './styles/index.css'; 
import { 
  initialCards, 
  createCard, 
  likeCard, 
  deleteCard 
} from './components/cards'

import {
  openPopup,
  openAddCardPopup,
  openImagePopup,
  closePopups,
  editProfilePopup,
  addPopupEventListeners,
} from './components/popups'

const cardsContainer = document.querySelector('.places__list');

const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const editProfileForm = document.forms['edit-profile'];
const profileNameInput = editProfileForm.elements['name'];
const profileDescriptionInput = editProfileForm.elements['description'];

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const addCardForm = document.forms['new-place'];
const placeNameInput = addCardForm.elements['place-name'];
const placeImageLinkInput = addCardForm.elements['link'];

initialCards.forEach(card => cardsContainer.append(createCard(card, deleteCard, likeCard, openImagePopup)));

addCardButton.addEventListener('click', openAddCardPopup);
editProfileButton.addEventListener('click', openEditProfilePopup);

export function openEditProfilePopup() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(editProfilePopup);
  addPopupEventListeners();
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  editProfileForm.reset();
  closePopups();
}

editProfileForm.addEventListener('submit', handleEditFormSubmit);

// TODO: add onload handling (?)
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCardData = {
    name: placeNameInput.value,
    link: placeImageLinkInput.value,
  }
  cardsContainer.prepend(createCard(newCardData, deleteCard, likeCard, openImagePopup));
  addCardForm.reset();
  closePopups();
}

addCardForm.addEventListener('submit', handleAddCardFormSubmit);
