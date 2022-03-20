"use strict"
const express = require('express');
const User = require('../models/index.js');

const router = express.Router();
const user = new User();
router
    .get('/', async(req, res, next)=>{
        const phoneNum = req.query.phoneNum;
        console.log(phoneNum)
        const data = await user.find(phoneNum);
        res.header("Content-Type: application/json")
        res.send(data);
    });
    router.post('/', async(req, res, next)=>{
        console.log("[User] post ")
        const body = req.body;
        await user.create(body.phoneNum, body.name, body.birth, body.email);
        
    })

module.exports = router;