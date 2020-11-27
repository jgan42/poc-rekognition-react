import { useEffect, useState } from 'react';
import firebase from 'firebase/app';

export const useGetList = <T>(query: firebase.database.Query) => {
  const [list, setList] = useState<T[]>([]);
  // @ts-ignore stringRef is missing queryParams to be unique
  const stringRef = query.toJSON() + JSON.stringify(query.queryParams_);
  const onValue = (snap: firebase.database.DataSnapshot) => {
    const newList: T[] = [];
    snap.forEach((s) => {
      newList.push({
        id: s.key,
        ...s.val(),
      });
    });
    setList(newList);
  };

  const onError = (error: firebase.FirebaseError) => {
    console.warn(error);
  };

  useEffect(() => {
    query.on('value', onValue, onError);

    return () => query.off('value', onValue);
    // eslint-disable-next-line
  }, [stringRef]);

  return list;
};
