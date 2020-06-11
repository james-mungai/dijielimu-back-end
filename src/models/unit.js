const mongoose = require('mongoose')


const unitSchema = new mongoose.Schema({

    name:{
        type: String,
        trim: true,
    },
    blog:{
        type: String,
        trim: true,
        maxlength: 750,
        minlength: 500
    },
    course:{
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
    },
    tutor: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
    }
},{
    timestamps: true,
    toJSON: {virtuals: true}
})
unitSchema.virtual('videos',{
    ref: 'Video',
    localField: '_id',
    foreignField: 'unit'
})
unitSchema.virtual('pdfs',{
    ref: 'Pdf',
    localField: '_id',
    foreignField: 'unit'
})

const Unit = mongoose.model('Unit',unitSchema)

module.exports = Unit