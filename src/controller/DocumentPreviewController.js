const pdfJsLibrary = require('pdfjs-dist')
const path = require('path')
pdfJsLibrary.GlobalWorkerOptions.workerSrc = path.resolve(__dirname, "../../dist/pdf.worker.bundle.js")

export class DocumentPreviewController{
    constructor(file){
        this._file = file
    }

    getFilePreview(){
        return new Promise((resolve, reject) => {
            let file = new FileReader()

            file.readAsDataURL(this._file)

            file.onload = event => {

                if(this._file.type == 'application/pdf'){

                    let reader = new FileReader()

                    reader.readAsArrayBuffer(this._file)

                    reader.onload = () => {

                        pdfJsLibrary.getDocument(new Uint8Array(reader.result)).then(pdf => {
                    
                            pdf.getPage(1).then(page => {
                                
                                const viewport = page.getViewport(1)

                                let canvas = document.createElement('canvas')
                                let canvasContext = canvas.getContext('2d')

                                canvas.width = viewport.width
                                canvas.height = viewport.height

                                const renderContext = {
                                    canvasContext,
                                    viewport
                                }

                                page.render(renderContext).then(resp => {

                                    let s = pdf.numPages > 1 ? "s" : ""

                                    resolve({
                                        fileName: `${pdf.numPages} page${s}`,
                                        size: this._file.size,
                                        type: this._file.type,
                                        src: canvas.toDataURL('image/png')
                                    })

                                }).catch(error => {
                                    reject(error)
                                })
                            }).catch(error => {
                                reject(error)
                            })
    
                        }).catch(error => {
                            reject(error)
                        })

                    }
                }else{
                    resolve({
                        fileName: this._file.name,
                        size: this._file.size,
                        type: this._file.type,
                        src: file.result
                    })
                }
            }

            file.onerror = event => {
                reject('error ', event)
            }
        })
    }

}