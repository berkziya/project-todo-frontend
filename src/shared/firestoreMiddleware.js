import { doc, setDoc, deleteField, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const firestoreMiddleware = store => next => async action => {
  const result = next(action);
  const state = store.getState();

  const userId = 'userId';
  const userDocRef = doc(db, 'users', userId);

  try {
    if (action.type === 'todo/deleteList') {
      const { listId } = action.payload;
      const updatePayload = { [`state.lists.${listId}`]: deleteField() };
      console.log('updatePayload', updatePayload);
      await updateDoc(userDocRef, updatePayload, { merge: true });
    } else {
      await setDoc(userDocRef, { state: state.todo }, { merge: true });
    }
  } catch (error) {
    console.error('Error writing document: ', error);
  }

  return result;
};

export default firestoreMiddleware;
