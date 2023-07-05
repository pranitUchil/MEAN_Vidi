const express = require('express')
const router = express();
const User = require("../model/userSchem");
const multer = require("multer");
const auth = require('../middleware/auth');
const generateRandomString = require("../middleware/generate-random-string");
// const upload = multer({ dest: "../../frontend/public/videos" });
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Specify the destination directory for uploaded files
      cb(null, '../frontend/build/videos');
    },
    filename: function (req, file, cb) {
      // Specify a unique filename for the uploaded file
      cb(null, `${generateRandomString}.mp4`);
    }
  });
  
  const upload = multer({
    storage: storage
  });

router.post('/api/uploadvideo',auth,upload.array("video"),(req,res)=>{
    try {
        res.send({ message: "Successfully uploaded files",url:generateRandomString })
    } catch (error) {
        res.json({error});
    }
});

module.exports = router;