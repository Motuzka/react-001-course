import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyBd5-VahwQL6KrfM3z689taxn6F7-pIA7E",
	authDomain: "very-hot-burgers-6eee0.firebaseapp.com",
	databaseURL: "https://very-hot-burgers-6eee0-default-rtdb.europe-west1.firebasedatabase.app",
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;