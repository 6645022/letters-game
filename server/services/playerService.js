"use strict";

import playerSchema from '../models/playerModel';
let playerModel = new playerSchema(),
    promise = require('bluebird');

export default class playerService{
    getHighestScorePlayer(){
         return new promise((resolve,reject)=>{
             playerModel.find({})
                        .sort({'score': -1})
                        .limit(10)
                        .exec((err, result)=> {
                             if(err) reject(err);

                             resolve(result);
             });
         })
    }
     setPlayer(data){
        let newPlayer = playerModel();

         newPlayer.name = data.name;
         newPlayer.score = data.score;

        return new promise((resolve,reject)=>{
            newPlayer.save((err,result)=>{
                 if(err) reject(err);
                 resolve(result);
             });
        });
    }
}