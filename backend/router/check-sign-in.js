const express = require('express')
const router = express();
const auth = require('../middleware/auth');

router.get('/api/checksignin',auth,async(req,res)=>{
    try {
        res.send({message:"your are login",userInfo:req.user})
    } catch (error) {
        console.log(error)
        res.status(500).send({error:error});
    }
});

module.exports = router;