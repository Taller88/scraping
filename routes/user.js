"use strict"
const express = require('express');
const User = require('../models/index.js');

const router = express.Router();
const user = new User();
router
    .get('/', async(req, res, next)=>{
        const phoneNum = req.query.phoneNum;
        console.log(phoneNum)
        const result = await user.select(phoneNum);
        res.header("Content-Type: application/json");
        if(result['resultCode']===-1){
            let error = {};
            error['msg']="존재하지 않는 사용자";
            return res.send(error);
        }else{
            let success = {};
            success['msg']=result['data'];
            return res.send(success);
        }
    });
    router.post('/', async(req, res, next)=>{
        console.log("[User] post ")
        const body = req.body;
        const result = await user.insert(body.phoneNum, body.name, body.birth, body.email);
        console.log(result);
        res.header("Content-Type: application/json");
        if(result['resultCode'] === -1){
            let error = {};
            error["msg"]="존재하는 사용자"
            return res.send(error);
        }else{
            let success = {};
            success["msg"]="insert Completed!"
            return res.send(success);
        }
    })

module.exports = router;