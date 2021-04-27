import { ClassEvents } from "../util/ClassEvents"

export class MicrophoneController extends ClassEvents{
    constructor(){

        super()

        this._available = false

        this._mimeType = "audio/webm"

        this._mediaError = null

        navigator.mediaDevices.getUserMedia({audio: true}).then(mediaStream => {

            this._available = true
            
            this._stream = mediaStream

            this.trigger('ready', this._stream)

        }).catch(error => {
            if(error.name == 'NotAllowedError'){
                this._mediaError = 'NotAllowedError'
                this.trigger('error', 'The user did not allow the use of a microphone.')
            }else{
                this._mediaError = error.name
                this.trigger('error', this._mediaError)
            }
        })
    }

    stop(){
        this._stream.getTracks().forEach(track => {
            track.stop()
        })
    }

    isAvailable(){
        return this._available
    }

    startRecorder(){
        if(this.isAvailable()){

            this._mediaRecorder = new MediaRecorder(this._stream, { mimeType: this._mimeType })

            this._recorderChunks = []

            this._mediaRecorder.addEventListener('dataavailable', e => {
                if(e.data.size > 0){
                    this._recorderChunks.push(e.data)
                }
            })

            this._mediaRecorder.addEventListener('stop', e => {
                let blob = new Blob(this._recorderChunks, { type: this._mimeType })

                let fileName = `rec${Date.now()}.webm`

                let file = new File([blob], fileName, { type: this._mimeType, lastModified: Date.now()})
                
                let fileReader = new FileReader()

                fileReader.onload = () => {

                    let audio = new Audio(fileReader.result)

                    audio.play()
                }

                fileReader.readAsDataURL(file)
            })

            this._mediaRecorder.start()
        }
    }
    
    stopRecorder(){
        this._mediaRecorder.stop()
        this.stop()
    }
}