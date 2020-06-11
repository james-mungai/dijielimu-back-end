const mongoose = require('mongoose')


const courseSchema = new mongoose.Schema(
{
    name:{
        type: String,
        trim: true,
        required: true
    },
    approved:{
        type: Boolean,
        default: false,
        required: true
    },
    published:{
        type: Boolean,
        default: false
    },
    imageUrl:{
        type: String,
        trim: true,
        default: ''
    },
    blog:{
        type: String,
        trim: true,
        maxlength: 500
    },
    price :{
        type: Number,
        trim: true,
    },
    tutor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    department:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Department'
    }
},
{
    timestamps: true,
    toJSON: {virtuals: true}
})

courseSchema.virtual('students',{
    ref: 'User',
    localField: '_id',
    foreignField: 'myCourses'
})
courseSchema.virtual(`units`,{
    ref: 'Unit',
    localField: '_id',
    foreignField: 'course'
})



module.exports = mongoose.model('Course', courseSchema)


// data
