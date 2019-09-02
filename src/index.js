const express = require('express')
const app = express()

const port = process.env.PORT
app.use(express.json())
require('./db/mongoose')


const userRoute = require('./routes/userRoutes')
const taskRoutes = require('./routes/taskRoutes')



app.use(userRoute)
app.use(taskRoutes)




app.listen(port, ()=>{
    console.log('listening to port '+port)
    
})
const jwt = require('jsonwebtoken')

