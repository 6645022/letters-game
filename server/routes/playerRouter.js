"use strict";

const express  = require('express'),
      router   = express.Router();

import playerService from '../services/playerService'

router.get('/',(req,res)=>{
    let playerServiceInst = new playerService();
    playerServiceInst.getHighestScorePlayer().then((result)=>{
        res.status(200).json({status:true,data:result});
    },(err)=>{
        res.status(400).json({status:false,message:err});
    });
});
router.post('/',(req,res)=>{
    if(!req.body.name || !req.body.score){
        res.status(400).json({status:false,message:'Name and Score are required parameters'});
    };
    let playerServiceInst = new playerService();

    playerServiceInst.setPlayer(req.body).then((result)=>{
        res.status(200).json({status:true,data:result});
    },(err)=>{
        res.status(400).json({status:false,message:err});
    });
});

export {router as playerRouter};
