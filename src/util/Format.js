export class Format{
    static getCamelCase(text){
        var div = document.createElement('div')

        div.setAttribute(`data-${text}`, 'id')

        return Object.keys(div.dataset)[0]
    }

    static getTimeFromMilliseconds(milliseconds){
        let second = milliseconds / 1000
        let minute = second / 60
        let hour = minute / 60

        second = second >= 60 ? Math.floor(second % 60) : Math.floor(second)
        minute = minute >= 60 ? Math.floor(minute % 60) : Math.floor(minute)
        hour = hour >= 24 ? Math.floor(hour % 24) : Math.floor(hour)

        second = second == 0 ? '00' : second
        minute = minute == 0 ? '00' : minute
        hour = hour == 0 ? '00' : hour

        second = second > 0 && second < 10 ? `0${second}` : second
        minute = minute > 0 && minute < 10 ? `0${minute}` : minute
        hour = hour > 0 && hour < 10 ? `0${hour}` : hour

        return `${hour}:${minute}:${second}`

    }

    static timeStampToTime(date){
        return date.toDate().toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'})
    }
}