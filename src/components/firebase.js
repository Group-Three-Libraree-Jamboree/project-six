import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyAFZe3GsqX7FKN8wgInodZi2hxUhMQgyF0',
	authDomain: 'project-six-group-three.firebaseapp.com',
	databaseURL: 'https://project-six-group-three.firebaseio.com',
	projectId: 'project-six-group-three',
	storageBucket: 'project-six-group-three.appspot.com',
	messagingSenderId: '136712194355',
	appId: '1:136712194355:web:d64e186c3ca40900601646',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebase;
