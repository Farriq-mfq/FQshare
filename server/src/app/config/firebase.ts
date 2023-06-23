import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCOTtYSkhwDRzEURB0DxqHcyWdxgz5SeIM",
    authDomain: "fqshare-4e8a3.firebaseapp.com",
    projectId: "fqshare-4e8a3",
    storageBucket: "fqshare-4e8a3.appspot.com",
    messagingSenderId: "1085222721680",
    appId: "1:1085222721680:web:23cdba06eec13da5696015"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;