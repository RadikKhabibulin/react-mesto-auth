import { createContext } from 'react';

export const CurrentUserContext = createContext();

export const defaultUser = {
    about: '',
    name: '',
    avatar: '',
    cohort: '',
    _id: ''
};
