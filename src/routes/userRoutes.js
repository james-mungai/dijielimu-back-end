const express = require('express')
const multer = require('multer')
const User=require('../models/users')
const auth = require('../middleware/auth')
const router = express.Router()
const Subscriptions = require('../models/subscription')



router.post('/users',async (req, res)=>{
    const user = new User(req.body)
    try{
        const token = await user.generateAuthToken()
        await user.save()
        res.status(201).send({user, token})
       
        
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
    
})

router.post('/users/login', async (req, res)=>{
    
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const mySubscriptions = await Subscriptions.find({user: user._id})
        const token = await user.generateAuthToken()
        user.mySubscriptions = mySubscriptions
        res.status(200).send({user,token})
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users/profile', auth, async (req, res)=>{
    
    try {
        const user = req.user
        const mySubscriptions = await Subscriptions.find({user: user._id})
        const token = await user.generateAuthToken()
        user.mySubscriptions = mySubscriptions
        res.status(200).send({user,token})
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users/logout',auth,async(req, res)=>{
    try {
       req.user.tokens = req.user.tokens.filter((token)=>{
           return token.token!==req.token
       })
       console.log(req.user)
       await req.user.save()
       res.status(200).send()
    } catch (error) {
        res.status(500).send()
    }
    
})

router.post('/users/logout-all',auth, async (req,res)=>{
   try {
       req.user.tokens = []
       await req.user.save()
       res.status(200).send()
   } catch (error) {
       res.status(500).send()
   }
})
router.get('/users/me', auth,(req,res)=>{
    try {
        res.status(200).send(req.user)
    } catch (error) {
        res.status(401).send()
    }    
})

router.get('/users/:id',(req,res)=>{
    const _id = req.params.id
    User.findById(_id).then((user)=>{
        res.status(200).send(user)
    }).catch((e)=>{
        console.log(e)
    })
})
router.patch('/users/', auth, async (req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidUpdate = updates.every((update)=>allowedUpdates.includes(update))
    if(!isValidUpdate){
        return res.status(404).send('only valid fields can be saved')
    }
    
    try {
        updates.forEach((update)=>req.user[update]= req.body[update])
        await req.user.save()
        res.status(200).send()
    } catch (error) {
        res.status(500).send('oops')
    }
   
})

router.delete('/users/me',auth, async (req,res)=>{
    try {
        const user = req.user
        await user.remove()
        res.send(user)
    } catch (error) {
        res.status(500).send()
    }
})
const upload = multer({
    
    limit: {
        fileSize:2000000
    },
    fileFilter(req, file, cb){
        if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
            return cb(new Error('only jpg, jpeg, png extensions allowed'))
        } 
        cb(undefined, true)
    }
})
router.post('/users/me/avatar',auth, upload.single('avatar') ,async (req,res)=>{
    req.user.avatar = req.file.buffer
    await req.user.save()
    res.send()
},(error, req,res,next)=>{
    
    res.status(404).send({Error: error.message})
    
})
router.delete('/users/me/avatar', auth, async(req, res)=>{
   const user= await User.findOne({_id: req.user._id})
   user.avatar = undefined
   await user.save()
   res.send()
})

router.get('/users/:id/avatar',async(req,res)=>{
    try {
      
        const user = await User.findById(req.params.id)
        console.log(user)
        if (!user||!user.avatar) {
            throw new Error('not found')
        }
        res.set('Content-Type', 'image/jpg')
        res.send(user.avatar)
    } catch (error) {
        res.status(404).send(error)
    }
})
module.exports = router