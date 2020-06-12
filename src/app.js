const express = require('express')
const app = express()
const cors = require('cors')


app.use(express.json())
require('./db/mongoose')
app.use(cors())

const userRoute = require('./routes/userRoutes')
const departmentRoutes = require('./routes/departmentRoutes')
const courseRoutes = require('./routes/courseRoutes')
const videoRoutes = require('./routes/videoRoutes')
const unitRoutes = require('./routes/unitRoutes')
const pdfRoutes = require('./routes/pdfRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const subscriptionRoutes = require('./routes/subscriptions-routes')



app.use(userRoute)
app.use(departmentRoutes)
app.use(courseRoutes) 
app.use(videoRoutes)
app.use(unitRoutes)
app.use(pdfRoutes)
app.use(paymentRoutes)
app.use(subscriptionRoutes)



module.exports= app


