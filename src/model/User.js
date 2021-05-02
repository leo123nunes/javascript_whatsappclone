import { Firebase } from '../util/Firebase'
import { Model } from '../model/Model'

export class User extends Model{

    constructor(id){
        super()

        if(id){

            this.getUserById(id).then(() => {

            }).catch(error => {
                console.log(error)
            })

        }

    }

    get name(){
        return this._data.name
    }

    set name(name){
        this._data.name = name
    }

    get photo(){
        return this._data.photo
    }

    set photo(photo){
        this._data.photo = photo
    }

    get email(){
        return this._data.email
    }

    set email(email){
        this._data.email = email
    }

    static getRef(){
        return Firebase.db().collection('users')
    }

    static getContactsRef(id){
        return User.getRef().doc(id).collection('contacts')
    }

    getUserById(id){

        return new Promise((resolve, reject) => {

            User.getRef().doc(id).get().then(data => {

                if(!data.data() && this._data.name){        

                    this.saveUserData().then(newUser => {

                        User.getRef().doc(id).onSnapshot(data => {
                            this.toJson(data.data())
                        })

                        resolve(newUser)
                    }).catch(error => {
                        console.log('error saving new user: ', error)
                    })

                }else if(!data.data() && !this._data.name){
                    resolve()
                }else{

                    User.getRef().doc(id).onSnapshot(data => {
                        this.toJson(data.data())
                    })

                    resolve(data.data())
                }

            }).catch(error => {
                reject(error)
            })
            
        })
        

    }

    saveUserData(){
        return new Promise((resolve, reject) => {

            User.getRef().doc(this._data.email).set(this._data).then(user => {
                resolve(user)
            }).catch(error => {
                reject(error)
            })
        })
    }

    addContact(contact){

        return User.getContactsRef(this.email).doc(btoa(contact.email)).set(contact)

    }

    loadContacts(){

        return new Promise((success, failure) => {

            User.getContactsRef(this.email).onSnapshot(docs => {

                var data = []  

                docs.forEach(doc => {

                    console.log(doc.data())
    
                    data.push(doc.data())
                })

                this.trigger('contactschange', data)

                success(docs)
            })
        })
        
    }

}