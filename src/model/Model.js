import { ClassEvents } from "../util/ClassEvents";

export class Model extends ClassEvents{
    constructor(){
        super()

        this._data = {}
    }

    toJson(json){
        this._data = Object.assign(this._data, json)

        this.trigger('datachange', this.fromJson())
    }

    fromJson(){
        return this._data
    }

}