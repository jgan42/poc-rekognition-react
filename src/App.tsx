import React, { FC } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import { Home } from './pages/Home';

firebase.initializeApp({
  apiKey: 'AIzaSyBK0Qxvg1GL2lMa1gWyZGNmK_v0o25d6jc',
  authDomain: 'poc-focuspoint.firebaseapp.com',
  databaseURL: 'https://poc-focuspoint.firebaseio.com',
  projectId: 'poc-focuspoint',
  storageBucket: 'poc-focuspoint.appspot.com',
  messagingSenderId: '484040658105',
  appId: '1:484040658105:web:9f5995455813c0981a1f68',
});

export const App: FC = () => (
  <div className="App">
    <Home />
  </div>
);
