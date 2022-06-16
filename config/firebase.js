// import { initializeApp } from 'firebase/compat/app';
// import { getAuth } from 'firebase/compat/auth';
// import { getFirestore } from 'firebase/compat/firestore';
import { initializeApp } from 'firebase/app'
import Constants from 'expo-constants';


// Firebase config
const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId,
  databaseURL: Constants.manifest.extra.databaseURL
};
// initialize firebase
export const firebaseApp = initializeApp(firebaseConfig);
// export const auth = getAuth();
// export const database = getFirestore();