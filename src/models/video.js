
    const mongoose = require('mongoose')
    const validator = require('validator')
    
    const videoSchema = new mongoose.Schema({
    title :{
        type: String,
        trim: true,
    },
    url :{
        type: String,
        trim: true
    },
    unit :{
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
    },
    })

    
    const Video = mongoose.model('Video',videoSchema)
    
    module.exports = Video
   