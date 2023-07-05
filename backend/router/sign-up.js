const express = require('express')
const router = express();
const User = require("../model/userSchem");
const bcrypt = require('bcrypt');

router.post("/api/signup",async (req,res)=>{
   try {
        req.body.password = await bcrypt.hash(req.body.password,10);
        let user = new User(req.body);
        user = await user.save();
        res.send(user)
   } catch (error) {
     
        res.status(500).send({"error":error});
   }
})

module.exports = router;