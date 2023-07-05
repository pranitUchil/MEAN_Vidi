const express = require("express");
const router = express();
const multer = require("multer");
const auth = require('../middleware/auth');
const Video = require("../model/videoSchem")

router.post('/api/searchvideo',async(req,res)=>{
    try {
        let text = [];
        let arr = req.body.title.split(' ');
        arr.forEach(element => {
            text.push({videoTitle: RegExp(element, 'i')})
        });
        let videos = await Video.find({
            $or:text
        });
        res.send([...videos]);
    } catch (error) {
        
        console.log(error)
        res.status(500).json(`${error}`);
    }
});

module.exports = router;

