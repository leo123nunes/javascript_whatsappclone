class WhatsAppController{
    constructor(){
        console.log('init whatsappcontroller...')

        this.loadElements()

        console.log(this.el)
    }

    loadElements(){
        this.el = {}
        document.querySelectorAll('[id]').forEach(element => {
            this.el[Format.getCamelCase(element.id)] = element
        })
    }
}