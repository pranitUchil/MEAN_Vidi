const mongoose = require('mongoose');
const DB = process.env.DATABASE;
console.log(DB)  
mongoose.connect(DB,{autoIndex: true, }).then(()=>{
    console.log('DB is connected');
}).catch((err)=>console.log(err));  