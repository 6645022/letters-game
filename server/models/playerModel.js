"use strict";
const mongoose = require('mongoose');
export default class playerSchema{
    constructor(){
        let schema = new mongoose.Schema({
                name        : {type:String,required:true},
                score       : {type:Number,required:true,index:true},
                createdDate : {type:Date,default: Date.now}
        });
        return mongoose.model('player',schema)
    };
};