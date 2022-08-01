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
        if (response.ok) {
            return;
        }
        return Promise.reject(response.status);

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
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response.status);
    })
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
        if (response.ok) {
            return response.json()
        }
        return Promise.reject(response.status);
    })
}
