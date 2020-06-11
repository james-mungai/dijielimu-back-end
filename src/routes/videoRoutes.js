const express = require('express')
const Video = require('../models/video')
const Unit = require('../models/unit')
const auth = require('../middleware/auth')
const router = express.Router()


router.post('/videos', auth, async (req, res)=>{
    const video = new Video(req.body)
    const unitId = video.unit
    
    const unit = await Unit.findById(unitId)
    const isUnitTutor = unit.tutor===req.user.id
    try{
        if (!isUnitTutor) {
            throw new Error('Not allowed')
        }
        
        const video = await video.save()
        res.status(201).send(video)
    }catch(e){
        res.status(500).send(e)
    }
    
})

router.patch('/videos/:videoId', auth, async (req, res)=>{
    const videoId = req.params.videoId
    const unitId = existingVideo.unit
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'url', 'unit']
    const isValidUpdate = updates.every((update)=>allowedUpdates.includes(update))
    if(!isValidUpdate){
        return res.status(404).send('only valid fields can be saved')
    }
    
    try{
        const unit = await Unit.findById(unitId)
        const isUnitTutor = unit.tutor===req.user.id
        if
         (!isUnitTutor) {
            throw new Error('Not authorised to update')
        }
        const existingVideo = await Video.findById(videoId)
        updates.forEach((update)=>existingVideo[update]= req.body[update])
        await existingVideo.save()
        res.status(200).send()
        
        const video = await video.findByIdAndUpdate(videoId)
        res.status(201).send(video)
    }catch(e){
        res.status(500).send(e)
    }
    
})

router.delete('/videos/:videoId', auth, async (req, res)=>{
    const videoId = req.params.videoId
    const video = await Video.findById(videoId)
    
    const unit = await Unit.findById(video.unit)
    const isUnitTutor = unit.tutor===req.user.id
    try{
        if (!isUnitTutor) {
            throw new Error('Not allowed')
        }
        
        const video = await video.remove()
        res.status(201).send()
    }catch(e){
        res.status(500).send(e)
    }
    
})

router.get('/videos', async (req, res)=>{
    
    try{
        const videos = await video.find()
        res.status(201).send(videos)
    }catch(e){
        res.status(500).send(e)
    }
    
})

router.get('/videos/:videoId',auth, async (req,res) => {
    const videoId = req.params.videoId
    const video = await Video.findById(videoId)
    const unit = await Unit.findById(video.unit)
    try {
        if (req.user.id!==unit.tutor) {
            throw new Error('unauthorized to get')
        }
        res.status(200).send(video)
    } catch (error) {
        res.status(500).send(error)
    }
    
}
)

module.exports = router