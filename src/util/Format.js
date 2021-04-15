class Format{
    static getCamelCase(text){
        var div = document.createElement('div')

        div.setAttribute(`data-${text}`, 'id')

        return Object.keys(div.dataset)[0]
    }
}