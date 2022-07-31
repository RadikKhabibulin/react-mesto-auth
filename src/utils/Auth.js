import { authBaseUrl } from './constants';

export const register = (email, password) => {
    return fetch(`${authBaseUrl}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
    .then((response) => {
        try {
            if (response.ok) {
                return;
            }

            return Promise.reject();
        }
        catch (err) {
            return err;
        }
    });
}

export const login = (email, password) => {
    return fetch(`${authBaseUrl}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
    .then((response) => {
        try {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response.status);
        }
        catch (err) {
            return err;
        }
    })
    .then((res) => {
        if (res.token) {
            localStorage.setItem('jwt', res.token);
            return res;
        }
    })
    .catch((err) => {
        if (err === 400)
            console.log(`Не передано одно из полей. Код ошибки: ${err}`);
        else if (err === 401)
            console.log(`Пользователь с таким email не найден! Код ошибки: ${err}`);
        else
            console.log('Что-то пошло не так! Попробуйте еще раз.');
    });
}

export const getContent = (token) => {
    return fetch(`${authBaseUrl}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
    .then((response) => {
        if (response.ok)
            return response.json()
        return Promise.reject(response.status);
    })
    .then(data => data)
    .catch(err => {
        if (err === 400)
            console.log(`Токен не передан или передан не в том формате. Код ошибки: ${err}`);
        else if (err === 401)
            console.log(`Переданный токен некорректен. Код ошибки: ${err}`);
        else
            console.log(`Что-то пошло не так. Код ошибки: ${err}`);
    })
}
