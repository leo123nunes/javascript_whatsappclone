const firebase = require('firebase')
require('firebase/firestore')

export class Firebase{
    constructor(){
        this._firebaseConfig = {
            apiKey: "AIzaSyC3IjOrguuqgcj64yyEXmhss1HpiSiHzPY",
            authDomain: "whatsappclone-javascript.firebaseapp.com",
            projectId: "whatsappclone-javascript",
            storageBucket: "whatsappclone-javascript.appspot.com",
            messagingSenderId: "59902326086",
            appId: "1:59902326086:web:1d8263b09fde59f721e147"
          };

        
          this.init()
        
    }

    init(){

        if(!this._initialized){

            firebase.initializeApp(this._firebaseConfig)

            this._initialized = true

        }

    }

    static db(){
        return firebase.firestore()
    }

    static hd(){
        return firebase.storage()
    }
}