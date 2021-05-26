import { Firebase } from '../util/Firebase'

export class Upload{

    static send(file, from){
        return new Promise((resolve, reject) => {

            let storagedFile = Firebase.hd().ref(from).child(`${Date.now()}_${file.name}`).put(file)

            storagedFile.on('state_changed', () => {

            }, error => {
                reject(error)
            }, () => {
                storagedFile.snapshot.ref.getDownloadURL().then(downloadURL => {
                    resolve(downloadURL)
                }).catch(error => {
                    reject(error)
                })
            })
        })
    }
}