import { ClassEvents } from "../util/ClassEvents";

export class Model extends ClassEvents{
    constructor(){
        super()

        this._data = {}
    }

    fromJson(json){
        this._data = Object.assign(this._data, json)

        this.trigger('datachange', this.toJson())
    }

    toJson(){
        return this._data
    }

}