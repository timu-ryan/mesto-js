
const cardTemplate = document.querySelector('#card-template').content;

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

export const createCard = (cardData, deleteCard, likeCard, handleImageClick) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardLikeCount = cardElement.querySelector('.card__like-count');

  cardElement.setAttribute('data-id', cardData._id);
  cardElement.setAttribute('data-owner-id', cardData.owner._id);

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardLikeCount.textContent = cardData.likes.length;

  if (cardData.isCurrentUserCard) {
    cardDeleteButton.addEventListener('click', deleteCard);
  } else {
    cardDeleteButton.style.display = 'none';
  }

  cardImage.addEventListener('click', function () {
    handleImageClick(cardData.link, cardData.name);
  })

  if (cardData.isCurrentUserLiked) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  cardLikeButton.addEventListener('click', likeCard)

  return cardElement;
}

export function likeCardInDOM(buttonElement) {
  buttonElement.classList.add('card__like-button_is-active');
}

export function dislikeCardInDOM(buttonElement) {
  buttonElement.classList.remove('card__like-button_is-active');
}

// TODO: при удалении карточек надо бы удалять и слушатели 
export const deleteCardFromDOM = cardElement => cardElement.remove();