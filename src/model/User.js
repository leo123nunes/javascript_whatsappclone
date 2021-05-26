import { Firebase } from '../util/Firebase'
import { Model } from '../model/Model'
import { Chat } from './Chat'

export class User extends Model{

    constructor(id){
        super()

        if(id){

            this.getUserById(id)

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

    getUserById(id){

        User.getRef().doc(id).get().then(data => {

            if(!data.data() && this._data.name){        

                this.createNewUser().then(() => {

                    User.getRef().doc(id).onSnapshot(newData => {
                        this.fromJson(newData.data())
                    })

                }).catch(error => {
                    console.log(error)
                })

            }else if(!data.data() && !this._data.name){
                console.log(`erro ao adicionar um novo usuario`)
            }else{

                User.getRef().doc(id).onSnapshot(newData => {
                    this.fromJson(newData.data())
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

        if(contact.email == this.email){
            return new Promise((resolve, reject) => {
                reject('voce nao pode se adicionar')
            })
        }else{
            return User.getContactsRef(this.email).doc(btoa(contact.email)).set(contact)
        }

    }

    loadContacts(filter = ''){

        if(filter == ''){

            return new Promise((success, failure) => {
    
                User.getContactsRef(this.email).onSnapshot(docs => {
    
                    if(docs.empty){
                        failure("No contacts.")
                    }
    
                    var data = []  
    
                    docs.forEach(doc => {
        
                        data.push(doc.data())
                    })
    
                    this.trigger('contactschange', data)
    
                    success(docs)
                })
            })

        }else{

            return new Promise((success, failure) => {
    
                User.getContactsRef(this.email).where('name', '==', filter).onSnapshot(docs => {
    
                    if(docs.empty){
                        failure("No users found.")
                    }
    
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

    searchContacts(filter = ''){

        if(filter == ''){

            return new Promise((success, failure) => {
    
                User.getContactsRef(this.email).onSnapshot(contactUsers => {

                    User.getContactsRef(this.email).onSnapshot(() => {})

                    var notUpdatedContactUsers = []

                    if(contactUsers.empty){
                        failure("No users found.")
                    }

                    contactUsers.forEach(contactUser => {
                                    
                        notUpdatedContactUsers.push(contactUser.data())                        
                    })

                    var updatedContactUsers = []

                    User.getRef().onSnapshot(users => {

                        User.getRef().onSnapshot(() => {})

                        let promises = []

                        users.forEach(user => {
                            notUpdatedContactUsers.forEach(oldUser => {
                                if(oldUser.email == user.data().email){
                                    updatedContactUsers.push(user.data())

                                    promises.push(new Promise((resolve, reject) => {

                                        User.getRef().doc(this.email).collection('contacts').doc(btoa(user.data().email)).set({
                                            name: user.data().name,
                                            photo: user.data().photo,
                                            email: user.data().email
                                        },{
                                            merge: true
                                        }).then(resp => {
                                            resolve()
                                        }).catch(error => {
                                            reject()
                                        })

                                    }))

                                }
                            })
                        })

                        Promise.all(promises).then(resp => {
                            this.trigger('contactschange', updatedContactUsers)
        
                            success(updatedContactUsers)
                        })
                    })
                })
            })

        }else{

            return new Promise((success, failure) => {
    
                User.getContactsRef(this.email).where('name', '==', filter).onSnapshot(docs => {
    
                    if(docs.empty){
                        failure("No users found.")
                    }
    
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

}