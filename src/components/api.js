const config = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: "becc8ca5-d976-4b95-9454-f44bbb906e9a",
    "Content-Type": "application/json",
  }
}

function handleResponseCheck(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

export function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then(res => handleResponseCheck(res))
}

export function getCurrentUser() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then(res => handleResponseCheck(res))
}

export function editProfile(newName, newDescrition) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newDescrition,
    })
  })
    .then(res => handleResponseCheck(res))
}

export function addNewCard(cardName, cardLink) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    })
  })
    .then(res => handleResponseCheck(res))
}

export function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId} `, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => handleResponseCheck(res))
}

export function likeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then(res => handleResponseCheck(res))
}

export function dislikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => handleResponseCheck(res))
}

export function updateAvatar(imgLink) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: imgLink,
    })
  })
    .then(res => handleResponseCheck(res))
}

export function isValidImageUrl(url) {
  return fetch(url, {
    method: 'HEAD',
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      const contentType = res.headers.get("Content-Type");
      return contentType && contentType.startsWith("image/");
    })
}
