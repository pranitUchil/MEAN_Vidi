const express = require('express')
const router = express();
const User = require("../model/userSchem");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')

router.post('/api/signin',async(req,res)=>{
    try {
        let user = await User.findOne({email:req.body.email})    
        if(!user){
            res.status(401).send({'error':"Invalid login"})
            return
        };
        let password = await bcrypt.compare(req.body.password, user.password);
        if(password){
          const token = await jwt.sign({...user}, process.env.SECREDT_KEY);
          res.cookie('vidiAuthToken',token, { maxAge: 8640000, httpOnly: true });
          res.status(200).send({messag:'You login in',data:user});
        }
        else{
          res.status(401).send({'error':"Invalid login"})
        }
    } catch (error) {
        res.status(500).send({error:error})
    }
});

module.exports = router;