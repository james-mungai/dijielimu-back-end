const mongoose = require('mongoose')

const subscriptionSchema = new mongoose.Schema({
user:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    rel: 'User'
},
course:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    rel: 'Course'
},
amount :{
    type: Number
},
isPaid: {
    type: Boolean,
    default: false
}
},{
    timestamps: true
})


let Subscription = mongoose.model('Subscription', subscriptionSchema)


module.exports = Subscription


