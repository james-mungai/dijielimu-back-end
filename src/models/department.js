const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const departmentSchema = new mongoose.Schema({
    blog:{
        type: String,
        trim: true,
    },
    title:{
        type: String,
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
    }
     
},{
    timestamps: true,
    toJSON: {virtuals: true}
})
departmentSchema.virtual('courses',{
    ref: 'Course',
    localField: '_id',
    foreignField: 'department'
})
const Department = mongoose.model(' Department',departmentSchema)

module.exports = Department

