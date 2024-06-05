// firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSyBjXLpAO2FIk6aJR-bhNAyXMLYSD20xUBY",
  authDomain: "srcm-2e013.firebaseapp.com",
  projectId: "srcm-2e013",
  storageBucket: "srcm-2e013.appspot.com",
  messagingSenderId: "263204066963",
  appId: "1:263204066963:web:469fbb319d63f751ef5f66",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
