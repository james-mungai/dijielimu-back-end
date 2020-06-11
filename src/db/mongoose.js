const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true

}).then((result)=>{
    console.log('connected successfully')
}).catch((error)=>{
    console.log('could not connect to database'+error)
})



