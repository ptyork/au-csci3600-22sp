/*
  Adapted from:
  https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_stores
  
  Modified to use sessionStorage AND to handle default values when "hydrating" on the server, since
  sessionStoage is not available there.
*/

import { writable } from 'svelte/store';
import { browser } from '$app/env';

export const sessionStore = (key:string, initial:any) => {      // receives the key of the local storage and an initial value

  if (browser) {
    if (sessionStorage.getItem(key) === null) {                   // item not present in local storage
      sessionStorage.setItem(key, JSON.stringify(initial));       // initialize local storage with initial value
    }
  }

  let saved = initial;
  if (browser) {
    try {
      saved = JSON.parse(sessionStorage.getItem(key) as string)   // convert to object
    } catch {
      console.warn(`Error reading saved value ${key} from sessionState`);
    }
  }

  const { subscribe, set, update } = writable(saved)              // create the underlying writable store

  return {
    subscribe,
    set: (value:any) => {
      saved = value;
      if (browser) {
        sessionStorage.setItem(key, JSON.stringify(saved))
      }
      set(value)
    },
    get: () => {
      return saved;
    },
    clear: () => {
      set({});
    },
    update
  }
}
