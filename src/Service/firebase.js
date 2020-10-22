import * as firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
	apiKey: "AIzaSyCRJfjdRaY5iMOMOJxGYbwNdtZrSE_glXY",
	authDomain: "rate-experience.firebaseapp.com",
	databaseURL: "https://rate-experience.firebaseio.com",
	projectId: "rate-experience",
	storageBucket: "rate-experience.appspot.com",
	messagingSenderId: "706492035021",
	appId: "1:706492035021:web:0f1325e0fa06e982535e84",
});

export default app;
