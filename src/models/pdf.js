const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const pdfSchema = new mongoose.Schema({

    unit:{
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
    },
    title :{
        type: String,
        trim: true,
    },
    url: {
        type: String,
        trim: true,
    }
})

const Pdf = mongoose.model('Pdf',pdfSchema)

module.exports = Pdf