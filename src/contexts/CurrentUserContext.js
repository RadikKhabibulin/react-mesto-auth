import React from 'react';

export const CurrentUserContext = React.createContext();

export const defaultUser = {
    about: '',
    name: '',
    avatar: '',
    cohort: '',
    _id: ''
};
