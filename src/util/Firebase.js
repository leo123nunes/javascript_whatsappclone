const firebase = require('firebase')
require('firebase/firestore')

export class Firebase{
    constructor(){
        // Use your firebase configuration here

        this._firebaseConfig = {
            apiKey: "",
            authDomain: "",
            projectId: "",
            storageBucket: "",
            messagingSenderId: "",
            appId: ""
          };
       
          this.init()
        
    }

    init(){

        if(!this._initializedFirebase){

            firebase.initializeApp(this._firebaseConfig)

            this._initializedFirebase = true

        }

    }

    initAuth(){
        let provider = new firebase.auth.GoogleAuthProvider()

        return new Promise((resolve, reject) => {

            firebase.auth().signInWithPopup(provider).then(resp => {
                resolve(resp)
            }).catch(error => {
                reject(error)
            })

        })
    }

    static db(){
        return firebase.firestore()
    }

    static hd(){
        return firebase.storage()
    }
}