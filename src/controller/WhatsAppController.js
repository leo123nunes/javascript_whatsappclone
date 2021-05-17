import { CameraController } from './CameraController'
import { Format } from '../util/Format'
import { DocumentPreviewController } from './DocumentPreviewController'
import { MicrophoneController } from './MicrophoneController'
import { Firebase } from '../util/Firebase'
import { User } from '../model/User'
import { Chat } from '../model/Chat'
import { Message } from '../model/Message'
import { Base64 } from '../util/base64'

export class WhatsAppController{

    constructor(){

        this._firebase = new Firebase()

        this.initAuth()

        this.loadElementPrototypeCustomizedEvents()

        this.loadElements()

        this.initEvents()

    }

    initAuth(){
        this._firebase.initAuth().then(resp => {

            this._user = new User(resp.user.email)

            this._user._data.name = resp.user.displayName
            this._user._data.email = resp.user.email
            this._user._data.photo = resp.user.photoURL

            this._user.on('datachange', user => {

                document.querySelector('title').innerHTML = `${user.name} - WhatsApp Clone`

                if(user.photo){
                    this.el.imgDefaultPanelEditProfile.hide()

                    let profilePhoto = this.el.myPhoto.querySelector('img')
                    profilePhoto.src = user.photo
                    profilePhoto.show()

                    let editProfilePhoto = this.el.photoContainerEditProfile.querySelector('img')
                    editProfilePhoto.src = user.photo
                    editProfilePhoto.show()
                    
                    let editProfileName = this.el.inputNamePanelEditProfile
                    editProfileName.innerHTML = user.name

                }

                this.el.app.css({ display: "block"})

                this.initContacts()

            })

        }).catch(error => {
            console.log(error)
        })
    }

    initContacts(){

        this._user.loadContacts()

        this._user.on('contactschange', docs => {
            this.el.contactsMessagesList.innerHTML = ''

            docs.forEach(doc => {

                let div = document.createElement('div')

                div.addClass('contact-item')

                div.innerHTML = `
                    <div class="dIyEr">
                        <div class="_1WliW" style="height: 49px; width: 49px;">
                            <img src="#" class="Qgzj8 gqwaM photo" style="display:none;">
                            <div class="_3ZW2E">
                                <span data-icon="default-user" class="">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212 212" width="212" height="212">
                                        <path fill="#DFE5E7" d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z"></path>
                                        <g fill="#FFF">
                                            <path d="M173.561 171.615a62.767 62.767 0 0 0-2.065-2.955 67.7 67.7 0 0 0-2.608-3.299 70.112 70.112 0 0 0-3.184-3.527 71.097 71.097 0 0 0-5.924-5.47 72.458 72.458 0 0 0-10.204-7.026 75.2 75.2 0 0 0-5.98-3.055c-.062-.028-.118-.059-.18-.087-9.792-4.44-22.106-7.529-37.416-7.529s-27.624 3.089-37.416 7.529c-.338.153-.653.318-.985.474a75.37 75.37 0 0 0-6.229 3.298 72.589 72.589 0 0 0-9.15 6.395 71.243 71.243 0 0 0-5.924 5.47 70.064 70.064 0 0 0-3.184 3.527 67.142 67.142 0 0 0-2.609 3.299 63.292 63.292 0 0 0-2.065 2.955 56.33 56.33 0 0 0-1.447 2.324c-.033.056-.073.119-.104.174a47.92 47.92 0 0 0-1.07 1.926c-.559 1.068-.818 1.678-.818 1.678v.398c18.285 17.927 43.322 28.985 70.945 28.985 27.678 0 52.761-11.103 71.055-29.095v-.289s-.619-1.45-1.992-3.778a58.346 58.346 0 0 0-1.446-2.322zM106.002 125.5c2.645 0 5.212-.253 7.68-.737a38.272 38.272 0 0 0 3.624-.896 37.124 37.124 0 0 0 5.12-1.958 36.307 36.307 0 0 0 6.15-3.67 35.923 35.923 0 0 0 9.489-10.48 36.558 36.558 0 0 0 2.422-4.84 37.051 37.051 0 0 0 1.716-5.25c.299-1.208.542-2.443.725-3.701.275-1.887.417-3.827.417-5.811s-.142-3.925-.417-5.811a38.734 38.734 0 0 0-1.215-5.494 36.68 36.68 0 0 0-3.648-8.298 35.923 35.923 0 0 0-9.489-10.48 36.347 36.347 0 0 0-6.15-3.67 37.124 37.124 0 0 0-5.12-1.958 37.67 37.67 0 0 0-3.624-.896 39.875 39.875 0 0 0-7.68-.737c-21.162 0-37.345 16.183-37.345 37.345 0 21.159 16.183 37.342 37.345 37.342z"></path>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="_3j7s9">
                        <div class="_2FBdJ">
                            <div class="_25Ooe">
                                <span dir="auto" title="${doc.name}" class="_1wjpf">${doc.name}</span>
                            </div>
                            <div class="_3Bxar">
                                <span class="_3T2VG">${doc.lastMessageTime}</span>
                            </div>
                        </div>
                        <div class="_1AwDx">
                            <div class="_itDl">
                                <span title="digitando…" class="vdXUe _1wjpf typing" style="display:none">digitando…</span>

                                <span class="_2_LEW last-message">
                                    <div class="_1VfKB">
                                        <span data-icon="status-dblcheck" class="">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18">
                                                <path fill="#263238" fill-opacity=".4" d="M17.394 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z"></path>
                                            </svg>
                                        </span>
                                    </div>
                                    <span dir="ltr" class="_1wjpf _3NFp9">${doc.lastMessage}</span>
                                    <div class="_3Bxar">
                                        <span>
                                            <div class="_15G96">
                                                <span class="OUeyt messages-count-new" style="display:none;">1</span>
                                            </div>
                                    </span></div>
                                    </span>
                            </div>
                        </div>
                    </div>
                    `

                    if(doc.photo){

                        let photo = div.querySelector('img')

                        photo.src = doc.photo
                        photo.show()
                    }

                    div.on('click', () => {

                        if(this._selectedContact){
                            Message.getRef(this._selectedContact.chatId).onSnapshot(() => {})
                        }

                        this.el.panelMessagesContainer.innerHTML = ''
                        
                        this.selectContact(doc)

                        this._selectedContact = doc

                        Message.getRef(this._selectedContact.chatId)
                        .orderBy('timeStamp')
                        .onSnapshot(docs => {
                            this.el.panelMessagesContainer.innerHTML = ''

                            let autoScroll = this.el.panelMessagesContainer.scrollHeight > this.el.panelMessagesContainer.offsetHeight ? true : false
                            let scrollTopMax = this.el.panelMessagesContainer.scrollTopMax
                            let scrollTop = this.el.panelMessagesContainer.scrollTop
                            let scrollHeight = this.el.panelMessagesContainer.scrollHeight

                            docs.forEach(doc => {  

                                var me = (doc.data().from == this._user.email) ? true : false

                                var message = new Message()

                                var docData = doc.data()

                                docData.id = `message${doc.id}`

                                message.on('datachange', () => {

                                    let view = message.getMessageView(me)

                                    this.el.panelMessagesContainer.appendChild(view)

                                })

                                if(!this.el.panelMessagesContainer.querySelector(`#message${doc.id}`)){

                                    message.fromJson(docData)

                                }else{
                                    
                                    if(me){

                                        

                                        this.el.panelMessagesContainer.querySelector(`#message${doc.id}`).parentElement.outerHTML = ''

                                        message.fromJson(docData)

                                    }

                                }

                                if(!me && docData['status'] == 'received'){
                                        
                                        Message.readMessage(this._selectedContact.chatId, doc.id).then(resp => {

                                            docData['status'] == 'read'

                                            message.status = 'read'

                                            let oldStatus = this.el.panelMessagesContainer.querySelector(`#message${doc.id}`)

                                        }).catch(error => {
                                            console.log(error)
                                        })
                                }

                            })

                            if((autoScroll && scrollTop >= scrollTopMax) || scrollHeight == this.el.panelMessagesContainer.offsetHeight){
                                this.el.panelMessagesContainer.scrollTop = this.el.panelMessagesContainer.scrollTopMax
                            }else{
                                this.el.panelMessagesContainer.scrollTop = scrollTop
                            }

                        })
                    })

                    this.el.contactsMessagesList.appendChild(div)

            })
        })

    }

    selectContact(doc){
        this.el.home.hide()

        if(doc.photo){
            let photo = this.el.main.querySelector('#active-photo')
            photo.src = doc.photo
            photo.show()
        }

        this.el.activeName.innerHTML = doc.name
        this.el.activeStatus.innerHTML = doc.status

        this.el.main.css({
            display: "flex"
        })
    }

    loadElements(){
        this.el = {}
        document.querySelectorAll('[id]').forEach(element => {
            this.el[Format.getCamelCase(element.id)] = element
        })

        this.el.searchconversationContact.value = ''
    }

    initEvents(){

        this.el.searchconversationContact.on('keyup', () => {
            if(this.el.searchconversationContact.value.length){
                this.el.searchconversationPlaceholder.hide()
            }else{
                this.el.searchconversationPlaceholder.show()
            }

            this._user.loadContacts(this.el.searchconversationContact.value).then(() => {})
            .catch(msg => {

                let noUsersFound = document.createElement('div')

                noUsersFound.css({
                    display: "flex",
                    "justify-content": "center"
                })

                noUsersFound.innerHTML = msg

                this.el.contactsMessagesList.appendChild(noUsersFound)
            })
        })

        this.el.myPhoto.on('click', event => {
            this.el.panelEditProfile.show()
            setTimeout(() => {
                this.el.panelEditProfile.addClass('open')
            }, 300)
        })

        this.el.btnClosePanelEditProfile.on('click', event => {
            this.el.panelEditProfile.removeClass('open')
            setTimeout(() => {
                this.el.panelEditProfile.hide()
            }, 300)
        })

        this.el.btnNewContact.on('click', event => {
            this.el.panelAddContact.show()
            setTimeout(() => {
                this.el.panelAddContact.addClass('open')
            }, 300)
        })

        this.el.btnClosePanelAddContact.on('click', event => {
            this.el.panelAddContact.removeClass('open')
            setTimeout(() => {
                this.el.panelAddContact.hide()
            }, 300)
        })

        this.el.photoContainerEditProfile.on('click', event => {
            this.el.inputProfilePhoto.click()
        })

        this.el.inputNamePanelEditProfile.on('keypress', event => {
            if(event.key == 'Enter'){
                event.preventDefault()

                this.el.btnSavePanelEditProfile.click()
            }
        })

        this.el.btnSavePanelEditProfile.on('click', event => {
            this.el.btnSavePanelEditProfile.disabled = true

            this._user.name = this.el.inputNamePanelEditProfile.textContent

            this._user.saveUserData().then(resp => {
                this.el.btnSavePanelEditProfile.disabled = false

                alert('User data successfully updated.')
            }).catch(error => {
                alert(error)
            })
        })

        this.el.formPanelAddContact.on('submit', event => {

            event.preventDefault()

            let data = new FormData(this.el.formPanelAddContact)

            let newUser = new User(data.get('email'))

            newUser.on('datachange', user => {

                this._user.addContact(user).then(resp => {

                    Chat.createIfNotExists(this._user.email, user.email).then(id => {

                        newUser.chatId = id
                        this._user.chatId = id

                        this._user.saveContactData(newUser.data).then(() => {
                            newUser.saveContactData(this._user.data).then(() => {
                                this.el.panelAddContact.hide()
                            })
                        }).catch(error => {
                            console.log(error)
                        })

                    }).catch(error => {
                        console.log(`error creating new chat: ${error}`)
                    })

                }).catch(error => {
                    alert(error)
                })
            })            
        })

        this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item => {
            item.on('click', () => {
                this.el.home.css({
                    display: "none"
                })

                this.el.main.css({
                    display: "flex"
                })
            })
        })

        this.el.btnAttach.on('click', event => {

            event.stopPropagation()

            this.el.menuAttach.addClass('open')

            this.closeMenuAttachHandler = this.closeMenuAttach.bind(this)

            document.addEventListener('click', this.closeMenuAttachHandler)

        })

        this.el.btnSendDocumentLoading.on('click', () => {
            alert('Aguarde o envio do arquivo.')
        })

        this.el.btnAttachPhoto.on('click', event => {
            
            this.el.inputPhoto.click()

            this.el.inputPhoto.on('change', event => {

                Array.from(this.el.inputPhoto.files).forEach(file => {
                    Message.sendPicture(this._selectedContact.chatId, this._user.email, 'image', file).then(data => {
                        
                        Message.receiveMessage(data.chatId, data.messageId).then(() => {}).catch(error => console.log(error))
                        
                    }).catch(error => {
                        console.log(error)
                    })
                })
            })

        })

        this.el.btnAttachCamera.on('click', () => {
            this.closeAllPanels()
            this.el.panelCamera.addClass('open')

            this.el.panelCamera.css({
                height: "100%"
            })

            this._camera = new CameraController(this.el.videoCamera)
        })

        this.el.btnClosePanelCamera.on('click', event => {
            this.closeAllPanels()
            this.el.panelMessagesContainer.show()
            this._camera.stop()
        })

        this.el.btnTakePicture.on('click', event => {
            this.el.btnSendPicture.css({
                display: "flex"
            })

            let dataUrl = this._camera.takePicture()
            
            this.el.pictureCamera.src = dataUrl.dataUrl
            this.el.pictureCamera.css({
                height: 'inherit'
            })

            this.el.containerTakePicture.hide()
            this.el.btnReshootPanelCamera.show()
            this.el.containerSendPicture.show()
            this.el.videoCamera.hide()
            this.el.pictureCamera.show()
        })

        this.el.btnReshootPanelCamera.on('click', event => {
            this.el.containerTakePicture.show()
            this.el.btnReshootPanelCamera.hide()
            this.el.containerSendPicture.hide()
            this.el.videoCamera.show()
            this.el.pictureCamera.hide()
        })

        this.el.btnAttachDocument.on('click', event => {

            this.closeAllPanels()

            this.el.inputDocument.click()

            this.el.inputDocument.on('change', event => {
                this._documentPreview = new DocumentPreviewController(this.el.inputDocument.files[0])

                this.el.panelDocumentPreview.addClass('open')
                this.el.panelDocumentPreview.show()

                this._documentPreview.getFilePreview().then(data => {
                    this.el.filePanelDocumentPreview.show()
                    this.el.infoPanelDocumentPreview.innerHTML = data.fileName
                    this.el.imgPanelDocumentPreview.src = data.src

                    switch(data.type){
                        case "application/pdf":
                            this.el.filePanelDocumentPreview.hide()
                            this.el.imagePanelDocumentPreview.show()
                        break;
                    }

                }).catch(error => {
                    console.log(error)
                })
            })
        })

        this.el.btnClosePanelDocumentPreview.on('click', event => {
            this.closeAllPanels()
            this.el.panelMessagesContainer.show()
        })

        this.el.btnAttachContact.on('click', event => {
            console.log('contact')
        })
        
        this.el.btnSendDocument.on('click', event => {

            this.el.btnSendDocument.css({
                display: "none"
            })
            this.el.btnSendDocumentLoading.css({
                display: "flex"
            })

            let file = this.el.inputDocument.files[0]

            let imgPreviewFile = Base64.toFile(this.el.imgPanelDocumentPreview.src)

            Message.sendDocument(this._selectedContact.chatId, this._user.email, file, this.el.infoPanelDocumentPreview.innerHTML.split(' ')[0], this.el.imgPanelDocumentPreview.src).then(data => {
                Message.receiveMessage(data.chatId, data.messageId).then(() => {
                    
                }).catch(error => console.log(error))
                this.el.btnSendDocumentLoading.css({
                    display: "none"
                })
                this.el.btnSendDocument.css({
                    display: "flex"
                })
                this.el.btnClosePanelDocumentPreview.click()
            }).catch(error => {
                this.el.btnSendDocumentLoading.hide()
                this.el.btnSendDocument.show()
                console.log(error)
            })
        })

        this.el.btnSendPicture.on('click', () => {

            this.el.btnSendPicture.hide()

            let image = new Image()

            image.src = this.el.pictureCamera.src

            let canvas = document.createElement('canvas')

            canvas.setAttribute('width', image.width)
            canvas.setAttribute('height', image.height)

            let ctx = canvas.getContext('2d')

            ctx.scale(-1, 1)

            ctx.drawImage(image, 0, 0, canvas.width*-1, canvas.height)

            let imgFile = Base64.toFile(canvas.toDataURL(), `${Date.now()}_camera`)

            Message.sendPicture(this._selectedContact.chatId, this._user.email, "image", imgFile).then(data => {
                Message.receiveMessage(data.chatId, data.messageId).then(() => {}).catch(error => console.log(error))
                this.el.btnClosePanelCamera.click()
                this._camera.stop()
                this.el.pictureCamera.hide()
                this.el.videoCamera.show()
                this.el.btnReshootPanelCamera.click()
            }).catch(error => {
                console.log(error)
            })
        })

        this.el.btnAttachContact.on('click', event => {
            this.el.modalContacts.show()
        })

        this.el.btnCloseModalContacts.on('click', event => {
            this.el.modalContacts.hide()
        })

        this.el.btnSendMicrophone.on('click', event => {
            this.el.recordMicrophone.show()
            this.el.btnSendMicrophone.hide()

            this._microphone = new MicrophoneController()

            this._microphone.on('ready', x => {
                this._microphone.startRecorder()
            })

            this._microphone.on('error', arg => {
                this.el.recordMicrophone.hide()
                this.el.btnSendMicrophone.show()
            })

            this._microphone.on('timer', duration => {

                this.el.recordMicrophoneTimer.innerHTML = Format.getTimeFromMilliseconds(duration)

            })

            this._microphone.on('stoptimer', () => {
                this.el.recordMicrophoneTimer.innerHTML = "00:00:00"
            })

        })

        this.el.btnCancelMicrophone.on('click', event => {
            this._microphone.stopRecorder()
            this.el.recordMicrophone.hide()
            this.el.btnSendMicrophone.show()
        })

        this.el.btnFinishMicrophone.on('click', event => {
            this._microphone.stopRecorder()
            this.el.recordMicrophone.hide()
            this.el.btnSendMicrophone.show()
        })

        this.el.inputText.on('keypress', event => {

            if(event.key == "Enter" && !event.ctrlKey){
                event.preventDefault()
                this.el.btnSend.click()
            }

        })

        this.el.btnSend.on('click', () => {

            if(this.el.inputText.innerHTML.replace(/\s/g, '').length && this.el.inputText.innerHTML.length){

                let message = this.el.inputText.innerHTML

                this.el.inputText.innerHTML = ''
                this.el.panelEmojis.removeClass('open')

                Message.send(this._selectedContact.chatId, message, this._user.email, 'text')
                .then(data => {
                    Chat.getRef().doc(data.chatId).collection('messages').doc(data.messageId).set({
                        status: 'received'
                    },{
                        merge: true
                    }).then(() => {}).catch(error => console.log(error))
                }).catch(error => {
                    console.log('error sending the message ', error)
                })

            }
            

        })

        this.el.inputText.on('keyup', event => {


            if(this.el.inputText.innerHTML == '<br>'){
                this.el.inputText.innerHTML = ''
            }

            if(this.el.inputText.innerHTML.length){
                this.el.inputPlaceholder.hide()
                this.el.btnSendMicrophone.hide()
                this.el.btnSend.show()
            }else{
                this.el.inputPlaceholder.show()
                this.el.btnSendMicrophone.show()
                this.el.btnSend.hide()
            }

        })

        this.el.btnEmojis.on('click', event => {
            this.el.panelEmojis.toggleClass('open')
        })

        this.el.panelEmojis.querySelectorAll('.emojik').forEach(emoji => {
            emoji.on('click', event => {
                let img = this.el.imgEmojiDefault.cloneNode(true)

                emoji.classList.forEach(className => {
                    img.classList.add(className)
                })

                img.style.cssText = emoji.style.cssText
                img.dataset.unicode = emoji.dataset.unicode
                img.dataset.emojiIndex = emoji.dataset.emojiIndex

                let cursor = document.getSelection()

                if(!cursor.focusNode || cursor.focusNode.id != 'input-text'){
                    this.el.inputText.focus()
                }

                let range = cursor.getRangeAt(0)

                range.deleteContents()

                let iconNode = document.createDocumentFragment()

                iconNode.appendChild(img)

                range.insertNode(iconNode)

                range.setStartAfter(img)

                this.el.inputText.dispatchEvent(new Event('keyup'))
            })
        })
    }

    closeAllPanels(){
        this.el.panelMessagesContainer.hide()
        this.el.panelDocumentPreview.removeClass('open')
        this.el.panelCamera.removeClass('open')
    }

    closeMenuAttach(){
        this.el.menuAttach.removeClass('open')
        document.removeEventListener('click', this.closeMenuAttachHandler)
    }

    loadElementPrototypeCustomizedEvents(){

        Element.prototype.on = function(events, fn){
            events.split(" ").forEach(event => {
                this.addEventListener(event, fn)
            })
            return this
        }

        Element.prototype.show = function(){
            this.style.display = "block"
            return this
        }

        Element.prototype.hide = function(){
            this.style.display = "none"
            return this
        }

        Element.prototype.toggle = function(){
            this.style.display = this.style.display == 'block' ? 'none' : 'block'
            return this
        }

        Element.prototype.addClass = function(className){
            this.classList.add(className)
            return this
        }

        Element.prototype.removeClass = function(className){
            this.classList.remove(className)
            return this
        }

        Element.prototype.hasClass = function(className){
            return this.classList.contains(className)
        }

        Element.prototype.toggleClass = function(className){
            this.hasClass(className) ? this.removeClass(className) : this.addClass(className)
        }

        Element.prototype.css = function(css){
            Object.keys(css).forEach(styleName => {
                this.style[styleName] = css[styleName]
            })

            return this
        }

        HTMLFormElement.prototype.getFormdata = function(){
            return new FormData(this)
        }

        HTMLFormElement.prototype.toJSON = function(){
            let json = {}

            this.getFormdata().forEach((key, value) => {
                json[key] = value
            })

            return json
        }
    }
}