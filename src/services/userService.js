import { authHeader } from '../helpers/authHeader';
import axios from 'axios';

const config = {
    apiUrl: ""
}

export const userService = {
    login,
    logout,
    register,
    getById
};

function login(username, password){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username, password})
    };

    return axios.post(`api/users/authentication/`, requestOptions)
    .then(handleResponse)
    .then(user => {
        console.log(JSON.stringify(user));
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout(); // auto logout if 401 response returned from api
                window.location.reload(true); //used for when user is logged in if auth token becomes invalid
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        console.log("sdfghjgfdsadfghfds");
        return data;
    });
}