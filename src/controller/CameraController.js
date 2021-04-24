export class CameraController{
    constructor(video){
        this._videoCamera = video

        navigator.mediaDevices.getUserMedia({video: true}).then( mediaStream => {
            
            this._stream = mediaStream
            this._videoCamera.srcObject = mediaStream
            this._videoCamera.play()

        }).catch(error => {
            console.log('error opening the camera.')
            console.log(error)
        })
        
    }

    stop(){
        this._stream.getTracks().forEach(track => {
            track.stop()
        })
    }
}