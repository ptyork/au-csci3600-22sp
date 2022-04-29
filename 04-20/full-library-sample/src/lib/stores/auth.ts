import { writable } from 'svelte/store';
import { sessionStore } from './sessionStore';

export const isAuthenticated = sessionStore('library-isAuthenticated', false);
export const user = sessionStore('library-user', {});
export const popupOpen = writable(false);
