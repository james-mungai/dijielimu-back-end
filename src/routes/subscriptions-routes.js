const express = require('express')
const Subscription=require('../models/subscription')
const auth = require('../middleware/auth')
const router = express.Router()


router.post('/subscriptions', auth, async (req, res)=>{
    const subscription = new Subscription(req.body)
    const user = req.user
    
    try{
        if (!user.id===subscription.user) {
            throw new Error('anuthorized')
        }
        await subscription.save()
        res.status(201).send(subscription)
    }catch(e){
        res.status(500).send(e)
    }
    
})

router.get('/subscriptions/:subsId', async (req, res)=>{
    const subId = req.params.subId

    try{
        const sub = await Subscription.findById(subId)
        res.status(200).send(sub)
    }catch(e){
        res.status(500).send(e)
    }
    
})

module.exports = router