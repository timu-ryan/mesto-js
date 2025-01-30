// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
const createCard = (cardData, deleteCard) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardDeleteButton.addEventListener('click', deleteCard);

  return cardElement;
}

// @todo: Функция удаления карточки
const deleteCard = evt => evt.target.parentElement.remove();

// @todo: Вывести карточки на страницу
initialCards.forEach(card => cardsContainer.append(createCard(card, deleteCard)));
