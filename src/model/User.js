import { Firebase } from '../util/Firebase'
import { Model } from '../model/Model'

export class User extends Model{

    constructor(id){
        super()

        if(id){

            this.getUserById(id)

            // this.getUserById(id).then(resp => {
                
            // }).catch(error => {
            //     console.log(error)
            // })

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

    get chatId(){
        return this._data.chatId
    }

    set chatId(chatId){
        this._data.chatId = chatId
    }

    get data(){
        return this._data
    }

    static getRef(){
        return Firebase.db().collection('users')
    }

    static getContactsRef(id){
        return User.getRef().doc(id).collection('contacts')
    }

    // getUserById(id){

    //     return new Promise((resolve, reject) => {

    //         User.getRef().doc(id).get().then(data => {

    //             if(!data.data() && this._data.name){        

    //                 this.createNewUser().then(newUser => {

    //                     User.getRef().doc(id).onSnapshot(data => {
    //                         this.toJson(data.data())
    //                     })

    //                     resolve(newUser)
    //                 }).catch(error => {
    //                     console.log('error creating new user: ', error)
    //                 })

    //             }else if(!data.data() && !this._data.name){
    //                 resolve(`user not found: ${data.data()}`)
    //             }else{

    //                 User.getRef().doc(id).onSnapshot(data => {
    //                     console.log(`data changed, new data: ${data.data()}`)
    //                     this.toJson(data.data())
    //                 })

    //                 resolve(data.data())
    //             }

    //         }).catch(error => {
    //             reject(error)
    //         })
            
    //     })
        

    // }

    getUserById(id){

        User.getRef().doc(id).get().then(data => {

            if(!data.data() && this._data.name){        

                this.createNewUser().then(() => {

                    User.getRef().doc(id).onSnapshot(newData => {
                        this.toJson(newData.data())
                    })

                }).catch(error => {
                    console.log('error creating new user: ', error)
                })

            }else if(!data.data() && !this._data.name){
                console.log(`user not found: ${data.data()}`)
            }else{

                User.getRef().doc(id).onSnapshot(newData => {
                    // console.log(`data changed, new data: ${newData.data()}`)
                    this.toJson(newData.data())
                })

            }

        }).catch(error => {
            reject(error)
        })
        
    }

    createNewUser(){
        return new Promise((resolve, reject) => {

            User.getRef().doc(this._data.email).set(this._data).then(user => {
                resolve(user)
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

    saveContactData(contact){

        return new Promise((resolve, reject) => {

            User.getContactsRef(this.email).doc(btoa(contact.email)).set(contact).then(resp => {
                resolve(resp)
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
    
                    data.push(doc.data())
                })

                this.trigger('contactschange', data)

                success(docs)
            })
        })
        
    }

}