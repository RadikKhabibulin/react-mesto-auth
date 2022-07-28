import {
    mestoApiLink,
    token
} from './constants';

class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _getData(url) {
        return fetch(url, {
            method: 'GET',
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            }

            return Promise.reject(res.status);
        });
    }

    _sendData(url, method, data) {
        return fetch(url, {
            method: method,
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(res.status);
        });
    }

    getUserInfo() {
        return this._getData(`${this._baseUrl}/users/me`);
    }

    updateUserInfo(data) {
        return this._sendData(`${this._baseUrl}/users/me`, 'PATCH', data);
    }

    updateUserAvatar(data) {
        return this._sendData(`${this._baseUrl}/users/me/avatar`, 'PATCH', data)
    }

    getCards() {
        return this._getData(`${this._baseUrl}/cards`);
    }

    setLike(cardId) {
        return this._sendData(`${this._baseUrl}/cards/${cardId}/likes`, 'PUT', {});
    }

    deleteLike(cardId) {
        return this._sendData(`${this._baseUrl}/cards/${cardId}/likes`, 'DELETE', {});
    }

    changeLikeCardStatus(cardId, setLike) {
        return setLike ? this.setLike(cardId) : this.deleteLike(cardId);
    }

    createCard({ name, link }) {
        return this._sendData(`${this._baseUrl}/cards`, 'POST', { name, link });
    }

    deleteCard(cardId) {
        return this._sendData(`${this._baseUrl}/cards/${cardId}`, 'DELETE', {});
    }
}

const api = new Api({
    baseUrl: mestoApiLink,
    headers: {
        authorization: token,
        'Content-Type': 'application/json'
    }
});

export default api;
