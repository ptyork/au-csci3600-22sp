import { writable } from 'svelte/store';
import { browser } from '$app/env';

export const sessionStore = (key:string, initialValue:any) => {

  let initialJSON = JSON.stringify(initialValue);

  let savedValue = initialValue;
  let savedJSON = initialJSON;

  if (browser) {
    try {
      savedJSON = sessionStorage.getItem(key) as string;

      if (savedJSON == null) {
        sessionStorage.setItem(key, initialJSON);
        savedJSON = initialJSON;
      } else {
        savedValue = JSON.parse(savedJSON);
      }
    } catch {
      console.warn(`Error reading saved value ${key} from sessionStorage`);
    }
  }

  const { subscribe, set, update } = writable(savedValue)

  return {
    subscribe,
    set: (newValue:any) => {
      savedValue = newValue;
      savedJSON = JSON.stringify(savedValue);
      if (browser) {
        sessionStorage.setItem(key, savedJSON);
      }
      set(newValue)
    },
    get: () => {
      return savedValue;
    },
    hasValue: () => {
      return savedJSON !== initialJSON;
    },
    clear: () => {
      set(initialValue);
    },
    update
  }
}
