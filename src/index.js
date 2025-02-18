import './styles/index.css'; 
import { 
  initialCards, 
  createCard, 
  likeCardInDOM,
  dislikeCardInDOM,
  deleteCardFromDOM 
} from './components/cards'

import {
  openAddCardPopup,
  openImagePopup,
  openEditProfilePopup,
  openUpdateAvatarPopup,
  openDeleteConfirmationPopup,
  handleEditFormSubmit,
  handleAddCardFormSubmit,
  handleUpdateAvatarFormSubmit,
  handleDeleteConfirmationFromSubmit,
  closePopups,
} from './components/popups'

import {
  enableValidation,
  clearValidation,
} from './components/validation'

import * as api from './components/api'

import {
  extractQuotedText,
} from './components/utils'

const cardsContainer = document.querySelector('.places__list');

const editProfileForm = document.forms['edit-profile'];
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const addCardForm = document.forms['new-place'];

const updateAvatarForm = document.forms['avatar'];
const profileImage = document.querySelector('.profile__image');

const deleteConfirmationForm = document.forms['delete-confirmation'];
const deleteConfirmationSubmitButton = deleteConfirmationForm.querySelector('.button');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

// initialCards.forEach(card => addCardToContainer(cardsContainer, card, deleteCard, likeCard, openImagePopup));

addCardButton.addEventListener('click', () => {
  openAddCardPopup();
  clearValidation(addCardForm, validationConfig);
});

editProfileButton.addEventListener('click', () => {
  openEditProfilePopup(profileName.textContent, profileDescription.textContent);
  clearValidation(editProfileForm, validationConfig);
});

editProfileForm.addEventListener('submit', (e) => {
  const { name, description } = handleEditFormSubmit(e, profileName, profileDescription);
  api.editProfile(name, description)
    .then(newUser => {
      profileName.textContent = newUser.name;
      profileDescription.textContent = newUser.about;
    })
    .catch(err => console.log(err));
});

addCardForm.addEventListener('submit', (e) => {
  const cardData = handleAddCardFormSubmit(e);
  api.isValidImageUrl(cardData.link)
    .then(res => {
      if (res) {
        return res;
      }
      return Promise.reject(`error: ${res}`);
    })
    .then(() => {
      return api.addNewCard(cardData.name, cardData.link)
    })
    .then(newCard => {
      newCard.isCurrentUserCard = true;
      newCard.isCurrentUserLiked = false;
      addCardToContainer(cardsContainer, newCard, deleteCard, handleLikeCard, openImagePopup);
    })
    .catch(err => console.log(err));
});

function addCardToContainer(cardsContainer, newCardData, deleteCard, handleLikeCard, openImagePopup) {
  cardsContainer.prepend(createCard(newCardData, deleteCard, handleLikeCard, openImagePopup));
}

profileImage.addEventListener('click', () => {
  const currentLink = extractQuotedText(profileImage.style.backgroundImage)
  openUpdateAvatarPopup(currentLink);
  clearValidation(updateAvatarForm, validationConfig);
})

updateAvatarForm.addEventListener('submit', (e) => {
  const newAvatarLink = handleUpdateAvatarFormSubmit(e);
  api.isValidImageUrl(newAvatarLink)
    .then(res => {
      if (res) {
        return res;
      }
      return Promise.reject(`Error: ${res}`)
    })
    .then(() => {
      return api.updateAvatar(newAvatarLink)
    })
    .then(newProfile => {
      profileImage.style.backgroundImage = `url("${newAvatarLink}")`;
    })
    .catch(err => console.log(err));
})

deleteConfirmationForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const cardId = deleteConfirmationSubmitButton.getAttribute('data-card-id');
  const cards = Array.from(document.querySelectorAll('.card'));
  const currentCardElement = cards.find(cardElement => cardElement.getAttribute('data-id') === cardId);
  api.deleteCard(cardId)
    .then(card => {
      deleteCardFromDOM(currentCardElement);
      closePopups();
    })
    .catch(err => console.log(err))
})

enableValidation(validationConfig);

function deleteCard(e) {
  const currentCardElement = e.target.closest('.card');
  const cardId = currentCardElement.getAttribute('data-id');
  openDeleteConfirmationPopup(cardId);
}

function handleLikeCard(e) {
  const currentCardElement = e.target.closest('.card');
  const likeCountElement = currentCardElement.querySelector('.card__like-count');
  const cardLikeButton = currentCardElement.querySelector('.card__like-button');
  let isLiked = cardLikeButton.classList.contains('card__like-button_is-active');

  const cardId = currentCardElement.getAttribute('data-id');
  if (!isLiked) {
    api.likeCard(cardId)
      .then(card => {
        likeCardInDOM(cardLikeButton);
        likeCountElement.textContent = Number(likeCountElement.textContent) + 1;
      })
      .catch(err => console.log(err))
  } else {
    api.dislikeCard(cardId)
      .then(card => {
        dislikeCardInDOM(cardLikeButton);
        likeCountElement.textContent = Number(likeCountElement.textContent) - 1;
      })
      .catch(err => console.log(err))
  }
}

Promise.all([api.getCurrentUser(), api.getCards()])
  .then((data) => {
    const [currenUser, cards] = data;
    profileName.textContent = currenUser.name;
    profileDescription.textContent = currenUser.about;
    profileImage.style.backgroundImage = `url("${currenUser.avatar}")`;
    cards.reverse().forEach(card => {
      card.isCurrentUserCard = currenUser._id === card.owner._id;
      card.isCurrentUserLiked = card.likes.findIndex(user => user._id === currenUser._id) !== -1;
      addCardToContainer(cardsContainer, card, deleteCard, handleLikeCard, openImagePopup);
    });
  })
  .catch(err => console.log(err))




api.isValidImageUrl('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnDAwNU_4d1MjmGSdMlbJhYXdaqnd9cWWg7WqrTh-d6G2DxOCmKBncQZ34LvniBPNeR2IZ')
  .catch(err => console.log(`error: ${err}`))
