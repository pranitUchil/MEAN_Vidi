const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path')
app.use(cookieParser());


dotenv.config({path:'./config.env'})  

require("./db/connect");
app.use(express.json());

app.use(require('./router/sign-up'));
app.use(require('./router/sign-in'));
app.use(require('./router/upload-video'));
app.use(require('./router/upload-thumbnail'));
app.use(require('./router/video'));
app.use(require('./router/check-sign-in'));
app.use(require('./router/search-video'));

// -------- Deployment ------
const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1,"../","frontend","build")))
app.get('*',(req,res) =>{
    res.sendFile(path.resolve(__dirname1,"../","frontend","build","index.html"))
});
// app.get('/',(req,res)=>{
//     res.send("Hello world");
// });
// -------- Deployment ------

app.listen(5000,()=>{
    console.log('Site is live on http://localhost:5000')
})