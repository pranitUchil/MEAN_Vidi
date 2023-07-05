const mongoose = require('mongoose');

const videoSchem = new mongoose.Schema({
    videoTitle :{
        type:String,
        require:true
    },
    videoDescription :{
        type:String,
        require:true
    },
    videoURL :{
        type:String,
        require:true
    },
    thumbnailURL :{
        type:String,
        require:true
    },
    from :{
        type:String,
        require:true
    },
    fullname :{
        type:String,
        require:true
    },
    time:{
        type:String,
        default:new Date().toLocaleDateString()
    }
});

const Video = mongoose.model("Video",videoSchem);

module.exports = Video;