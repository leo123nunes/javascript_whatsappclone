class WhatsAppController{

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
        })

        this.el.btnClosePanelCamera.on('click', event => {
            this.closeAllPanels()
            this.el.panelMessagesContainer.show()
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
            return this.hasClass(className)
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