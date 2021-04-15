class WhatsAppController{

    constructor(){
        console.log('init whatsappcontroller...')

        this.loadElementPrototypeCustomizedEvents()

        this.loadElements()

        console.log(this.el)
    }

    loadElements(){
        this.el = {}
        document.querySelectorAll('[id]').forEach(element => {
            this.el[Format.getCamelCase(element.id)] = element
        })
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
    }
}