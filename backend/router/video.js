const express = require('express');
const router = express();
const Video = require('../model/videoSchem');
const auth = require('../middleware/auth')
const fs = require('fs');

router.post('/api/video', auth, async (req, res) => {
    try {
        req.body.from = req.user._id;
        req.body.fullname = req.user.fullname;
        const video = new Video(req.body);
        await video.save();
        res.send(video);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
});

router.get('/api/videos', async (req, res) => {
    try {
        let videos = await Video.find();
        res.send(videos);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error });
    }
});

router.get('/api/videos/:id', async (req, res) => {
    try {
        let videos = await Video.findOne({ _id: req.params.id });
        res.send(videos);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
});

router.put('/api/videos/:id', async (req, res) => {
    console.log(req.body)
    try {
        let video = await Video.findOne({ _id: req.params.id });
        const videofile = `../frontend/public/thumbnail/${video.thumbnailURL}`;
        fs.unlink(videofile, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
                return;
            }
        });
        let videos = await Video.findByIdAndUpdate({ _id: req.params.id }, req.body);
        res.send(videos);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
});

router.get('/api/uservideos', auth, async (req, res) => {
    try {
        let videos = await Video.find({ from: req.user._id });
        res.send(videos);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
});

router.delete('/api/videos/:id', auth, async (req, res) => {
    try {
        let video = await Video.findOne({ _id: req.params.id });
        const videofile = `../frontend/public/thumbnail/${video.thumbnailURL}`;
        fs.unlink(videofile, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
                return;
            }
        });
        const thumbnailfile = `../frontend/public/videos/${video.videoURL}`;
        fs.unlink(thumbnailfile, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
                return;
            }
        });
        await Video.findByIdAndDelete({_id:req.params.id});
        res.send({ message: "Video has be deleted" });
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
});

module.exports = router;