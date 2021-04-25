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

    takePicture(imageType = "image/png"){

        let width = this._stream.getVideoTracks()[0].getSettings().width
        let height = this._stream.getVideoTracks()[0].getSettings().height

        let canvas = document.createElement('canvas')

        canvas.setAttribute('width', width)
        canvas.setAttribute('height', height)

        let ctx = canvas.getContext('2d')

        ctx.drawImage(this._videoCamera, 0, 0, canvas.width, canvas.height)

        return canvas.toDataURL(imageType)
    }
}