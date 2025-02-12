import './styles/index.css'; 
import { 
  initialCards, 
  createCard, 
  likeCard, 
  deleteCard 
} from './components/cards'

import {
  openAddCardPopup,
  openImagePopup,
  openEditProfilePopup,
  handleEditFormSubmit,
  handleAddCardFormSubmit,
} from './components/popups'

const cardsContainer = document.querySelector('.places__list');

const editProfileForm = document.forms['edit-profile'];
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const addCardForm = document.forms['new-place'];

initialCards.forEach(card => addCardToContainer(cardsContainer, card, deleteCard, likeCard, openImagePopup));

addCardButton.addEventListener('click', openAddCardPopup);
editProfileButton.addEventListener('click', () => openEditProfilePopup(profileName.textContent, profileDescription.textContent));
editProfileForm.addEventListener('submit', (e) => {
  const { name, description } = handleEditFormSubmit(e, profileName, profileDescription);
  profileName.textContent = name;
  profileDescription.textContent = description;
});

addCardForm.addEventListener('submit', (e) => {
  const newCardData = handleAddCardFormSubmit(e);
  addCardToContainer(cardsContainer, newCardData, deleteCard, likeCard, openImagePopup)
});

function addCardToContainer(cardsContainer, newCardData, deleteCard, likeCard, openImagePopup) {
  cardsContainer.prepend(createCard(newCardData, deleteCard, likeCard, openImagePopup));
}
