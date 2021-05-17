export class Base64 {
    static getMimeType(base64Url){
        let arr = base64Url.split(',')
        let type = arr[0].match(/:(.*?);/)[1]

        return type
    }

    static toFile(base64Url, filename){
        let arr = base64Url.split(',')
        let type = arr[0].match(/:(.*?);/)[1]
        let bstr = atob(arr[1])
        let n = bstr.length
        let u8arr = new Uint8Array(n)
                
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }

        
        let file =  new File([u8arr], `${filename}.${type.split('/')[1]}`, {type})

        return file
    }
}