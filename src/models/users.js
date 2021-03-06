const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    secondName:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: false,
        trim: true,
        valdate(value){
            if(age<0){
                return new Error('enter a valid age')
            }
        }
    }, 
    email:{
        type: String,
        required: true,
        unique:true,
        trim: true,
        validate(value){
            if(validator.isEmail(value)){
                return new Error('invalid email')
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value.includes('password')){
                throw new Error('password cannot contain the word password')
            }else if(value.length<6){
                throw new Error('password must be minimum 6 characters')
            }
        }
    },
    
    avatar:{
        type: Buffer,
        required: false
    },
    isStudent:{
        type: Boolean,
        required: true,
        default: false
    },
    isTutor:{
        type: Boolean,
        required: true,
        default: false
    },
    isAdmin:{
        type: String,
        required: true,
        default: false
    }
},{
    timestamps: true,
    toJSON: {virtuals: true}
})
userSchema.virtual('mySubscriptions',{
    ref: 'Subscription',
    localField: '_id',
    foreignField: 'user'
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = await jwt.sign({_id:user._id}, process.env.JSON_WEB_TOKEN_SECRET_KEY)
    
    return token
}
// userSchema.methods.toJSON = async function() {
//     const userObject = this.toObject()
//     delete userObject.password
//     delete userObject.avatar
//     delete userObject.tokens
//     return userObject
// }
userSchema.statics.findByCredentials = async(email, password)=>{
    
    const user = await User.findOne({email})
    if (!user) {
        throw new Error('unable to login')
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error('unable to login')
    }
    return user
    
}
userSchema.pre('save', async function(next) {
    if(this.isModified('password')){
        this.password =await bcrypt.hash(this.password, 8)
    }
})

const User = mongoose.model('User',userSchema)

module.exports = User
