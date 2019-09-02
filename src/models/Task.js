const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const taskSchema = new mongoose.Schema({
    task:{
        type: String,
        trim: true,
    },
    completion:{
        type: Boolean,
        default: false,
        required: false
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        rel: 'User'
    }
},{
    timestamps: true
})
taskSchema.pre(['save'], async function (next) {
    

})
const Task = mongoose.model('Task',taskSchema)

module.exports = Task