const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path')
app.use(cookieParser());


dotenv.config({path:'./config.env'})  

require("./backend/db/connect");
app.use(express.json());

app.use(require('./backend/router/sign-up'));
app.use(require('./backend/router/sign-in'));
app.use(require('./backend/router/upload-video'));
app.use(require('./backend/router/upload-thumbnail'));
app.use(require('./backend/router/video'));
app.use(require('./backend/router/check-sign-in'));
app.use(require('./backend/router/search-video'));

// -------- Deployment ------
const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1,"frontend","build")))
app.get('*',(req,res) =>{
    res.sendFile(path.resolve(__dirname1,"frontend","build","index.html"))
});
// app.get('/',(req,res)=>{
//     res.send("Hello world");
// });
// -------- Deployment ------

app.listen(5000,()=>{
    console.log('Site is live on http://localhost:5000')
})