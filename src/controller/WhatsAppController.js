import { CameraController } from './CameraController'
import { Format } from '../util/Format'

export class WhatsAppController{

    constructor(){

        this.loadElementPrototypeCustomizedEvents()

        this.loadElements()

        this.initEvents()

    }

    loadElements(){
        this.el = {}
        document.querySelectorAll('[id]').forEach(element => {
            this.el[Format.getCamelCase(element.id)] = element
        })
    }

    initEvents(){
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
            console.log(this.el.inputNamePanelEditProfile.innerHTML)
        })

        this.el.formPanelAddContact.on('submit', function(){
            console.log(this.toJSON())
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

        this.el.btnAttachPhoto.on('click', event => {
            
            this.el.inputPhoto.click()

            this.el.inputPhoto.on('change', event => {
                console.log(this.el.inputPhoto.files)


                Array.from(this.el.inputPhoto.files).forEach(item => {
                    console.log(item)
                })
            })

        })

        this.el.btnAttachCamera.on('click', event => {
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
            console.log('button take picture camera')
        })

        this.el.btnAttachDocument.on('click', event => {

            this.closeAllPanels()

            this.el.inputDocument.click()

            this.el.panelDocumentPreview.addClass('open')
            this.el.panelDocumentPreview.css({
                height: "100%"
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
            console.log('sending document...')
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
            this.startMicrophoneRecorderTimer()
        })

        this.el.btnCancelMicrophone.on('click', event => {
            this.el.recordMicrophone.hide()
            this.el.btnSendMicrophone.show()
            this.finishMicrophoneRecorderTimer()
        })

        this.el.btnFinishMicrophone.on('click', event => {
            this.el.recordMicrophone.hide()
            this.el.btnSendMicrophone.show()
            this.finishMicrophoneRecorderTimer()
        })

        this.el.inputText.on('keypress', event => {

            if(event.key == "Enter" && !event.ctrlKey){
                event.preventDefault()
                this.el.btnSend.click()
            }

        })

        this.el.btnSend.on('click', event => {
            console.log(this.el.inputText.innerHTML)
        })

        this.el.inputText.on('keyup', event => {

            if(this.el.inputText.firstChild.nodeName == 'BR'){
                this.el.inputText.removeChild(this.el.inputText.firstChild)
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

                // this.el.inputText.appendChild(img)

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

    startMicrophoneRecorderTimer(){
        var start = new Date()

        this._microphoneRecorderInterval = setInterval(() => {
            var duration = new Date() - start
            this.el.recordMicrophoneTimer.innerHTML = Format.getTimeFromMilliseconds(duration)
        }, 100)
    }

    finishMicrophoneRecorderTimer(){
        clearInterval(this._microphoneRecorderInterval)
        this.el.recordMicrophoneTimer.innerHTML = "00:00:00"
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