import firebase from 'firebase';

 var config = {
    apiKey: "AIzaSyC95cPyPUcri1tpNpiqX5EA2-BddO98opg",
    authDomain: "fir-up-a77c5.firebaseapp.com",
    databaseURL: "https://fir-up-a77c5.firebaseio.com",
    projectId: "fir-up-a77c5",
    storageBucket: "fir-up-a77c5.appspot.com",
    messagingSenderId: "170239092071"
  };


  
const fire = firebase.initializeApp(config);



export {fire};