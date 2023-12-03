const express = require("express");
const router = express();
const multer = require("multer");
const auth = require('../middleware/auth');
// const generateRandomString = require("../middleware/generate-random-string");
const generateRandomString = () => {
  let length = 8;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
  }

  return result;
}
let url 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Specify the destination directory for uploaded files
      cb(null, '../MERN_Vidi/frontend/build/thumbnail');
    },
    filename: function (req, file, cb) {
      // Specify a unique filename for the uploaded file
       url =  generateRandomString();
      cb(null, `${url}.jpg`);
    }
  });
  
  const upload = multer({
    storage: storage
  });

router.post('/api/uploadthumbnail',auth,upload.array("thumbnail"),(req,res)=>{
    try {
        res.send({ message: "Successfully uploaded files",url:url });
    } catch (error) {
        res.json({error});
    }
});

module.exports = router;