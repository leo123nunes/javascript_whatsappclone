import { Firebase } from '../util/Firebase'
import { Model } from '../model/Model'

export class User extends Model{

    constructor(user){
        super()

        if(user.email){

            this.getUserById(user).then(() => {

                this.userLoaded()

            }).catch(error => {
                alert(error)
            })

        }

    }

    getRef(){
        return Firebase.db().collection('users')
    }

    getUserById(user){

        return new Promise((resolve, reject) => {

            this.getRef().doc(user.email).get().then(data => {

                if(!data.data()){

                    this.saveUser(user).then(newUser => {

                        this.getRef().doc(user.email).onSnapshot(data => {
                            this.getJson(data.data())
                        })

                        resolve(newUser)
                    })

                }else{

                    this.getRef().doc(user.email).onSnapshot(data => {
                        this.getJson(data.data())
                    })

                    resolve(data.data())
                }

            }).catch(error => {
                reject(error)
            })
            
        })
        

    }

    saveUser(user){

        return new Promise((resolve, reject) => {

            this.getRef().doc(user.email).set({
                name: user.name,
                email: user.email,
                photo: user.photo
            }).then(() => {
                resolve(user)
            }).catch(error => {
                reject(error)
            })
        })

    }

}