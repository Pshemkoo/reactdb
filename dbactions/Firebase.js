import * as firebase from 'firebase';

export default class Firebase {
    constructor() {}
    // Your web app's Firebase configuration
    // Initialize Firebase
    initialize(){
        const firebaseConfig = {
            apiKey: "AIzaSyDmaAWCEaviaCq_i3gs3IaXzNyQOjVHUxQ",
            authDomain: "myfirebase-6b7663.firebaseapp.com",
            databaseURL: "https://myfirebase-6b7663.firebaseio.com",
            projectId: "myfirebase-6b7663",
            storageBucket: "myfirebase-6b7663.appspot.com",
            messagingSenderId: "19712580540",
            appId: "1:19712580540:web:74d4eb829f044f00bfe9b9",
            measurementId: "G-8F0XDCG66L"
          };

        firebase.initializeApp(firebaseConfig);
    }

    addRaport(raport) {
        firebase.database().ref('/raports').push(raport);
    }

    fetchRaports(onRaportsFetched) {
        firebase.database().ref('/raports')
          .on('value', function(raport) {
            const mappedRaport = Object.keys(raport.val()).map(key => ({
              id: key, ...raport.val()[key]
            }));
            onRaportsFetched([...mappedRaport]);
          });
      }
    
      removeRaport(id) {
        firebase.database().ref('/raports').child(id).remove();
      }
}