import { useEffect, useState } from 'react';
import firebase from 'firebase/app';

export const useGetObject = <T>(query: firebase.database.Query) => {
  const [object, setObject] = useState<T | null>(null);
  const stringRef = query.toJSON();
  const onValue = (snap: firebase.database.DataSnapshot) => {
    if (!snap.val()) {
      return setObject(null);
    }
    const newObject = {
      id: snap.key,
      ...snap.val(),
    };
    setObject(newObject);
  };

  const onError = (error: firebase.FirebaseError) => {
    console.warn(error);
  };

  useEffect(() => {
    query.on('value', onValue, onError);

    return () => query.off('value', onValue);
    // eslint-disable-next-line
  }, [stringRef]);

  return object;
};
