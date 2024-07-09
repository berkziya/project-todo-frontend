import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const firestoreMiddleware = store => next => async action => {
  const result = next(action);
  const state = store.getState();

  const userId = 'userId';
  const userDocRef = doc(db, 'users', userId);

  try {
    await setDoc(userDocRef, { state: state.todo }, { merge: true });
    console.log('Document written with ID: ', userDocRef.id);
  } catch (error) {
    console.error('Error writing document: ', error);
  }

  return result;
};

export default firestoreMiddleware;
