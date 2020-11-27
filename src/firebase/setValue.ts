import firebase from 'firebase/app';
import { sanitizePathAndValue } from './sanitizePathAndValue';

export const setValue = async (path: string, value: any) => {
  const valueToSet = sanitizePathAndValue(path, value);
  const ref = firebase.database().ref(path);
  try {
    await ref.set(valueToSet);
  } catch (e) {
    console.warn('setValue ERROR', e);
    return null;
  }
};
