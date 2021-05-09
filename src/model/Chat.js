import { Firebase } from "../util/Firebase";
import { Model } from "./Model";
import { User } from "./User";

export class Chat extends Model{
    constructor(){
        super()
    }

    get users(){ return this._data.users}
    set users(value){
        this._data.users = value
    }

    get timeStamp(){ return this._data.timeStamp}
    set timeStamp(value){
        this._data.timeStamp = value
    }

    static getRef(){
        return Firebase.db().collection('chat')
    }

    static find(meEmail, contactEmail){

        return Chat.getRef()
        .where(`users.${btoa(meEmail)}`, '==', true)
        .where(`users.${btoa(contactEmail)}`, '==', true)
        .get()

    }

    static create(meEmail, contactEmail){

        var meEmailId = btoa(meEmail)
        var contactEmailId = btoa(contactEmail)

        var users = {}

        users[meEmailId] = true
        users[contactEmailId] = true

        return new Promise((resolve, reject) => {

            Chat.getRef().add({
                timeStamp: new Date(),
                users
            }).then(doc => {
                resolve(doc.id)
            }).catch(error => {
                reject(error)
            })
            
        })

    }

    static createIfNotExists(meEmail, contactEmail){

        return new Promise((resolve, reject) => {
            Chat.find(meEmail, contactEmail).then(resp => {

                if(resp.empty){

                    Chat.create(meEmail, contactEmail).then(resp => {
                        resolve(resp)
                    }).catch(error => {
                        console.log('error creating chat')
                        reject(error)
                    })

                }else{

                    resp.docs.forEach(doc => {
                        resolve(doc.id)
                    })

                }

            }).catch(error => {
                reject(error)
            })
        })
    }
}