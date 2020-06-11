const express = require('express')
const router = express.Router()

const Task = require('../models/Task')
const auth = require('../middleware/auth')


router.post('/tasks',auth, async (req,res)=>{
    const task = new Task(req.body)
    
    try {
        task.author = req.user._id
        await task.save()
        
        res.status(201).send(task)
    } catch (error) {
        res.send(error)
    }
    
})

router.get('/tasks/', auth, async (req,res)=>{
    const match = {}
    const sort ={}
    if (req.query.completion) {
        match.completion = req.query.completion==='true'
    }
    if(req.query.sortBy){
        const parts= req.query.sortBy.split(':')
        console.log(parts)
        sort[parts[0]]=parts[1]==='desce'?-1:1
        
    }
    
    try {
        
        await req.user.populate({
            path: 'tasks',
            match,
            options:{
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            },
        }).execPopulate()
        
       
        // const tasks = await Task.find({author: req.user._id})
        // if(!tasks){
        //     return res.status(400).send()
        // }
        
        res.status(200).send(req.user.tasks)
        
    } catch (error) {
        res.status(500).send()
    }
    
})
router.get('/tasks/:id',auth, async (req,res)=>{
    const _id = req.params.id
    try {
        const task = await Task.findOne({_id, author: req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
        
    } catch (error) {
        res.sendStatus(500).send()
    }
    
   
})


router.patch('/tasks/:id', auth, async(req, res)=>{
    const allowedUpdates = ['task', 'completion']
    const myUpdates = Object.keys(req.body)
    const isValidUpdate = myUpdates.every((update)=>allowedUpdates.includes(update))
    if (!isValidUpdate) {
        
        return res.status(404).send('please send valid updates only')
    }
    
    try {
        const _id = req.params.id
        const task =await  Task.findOne({_id, author: req.user._id})
        myUpdates.forEach((update)=>task[update]=req.body[update])
        await task.save()
        res.status(201).send('updated accordingly')
    //    const task= await Task.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators: true})
    //    if (!task) {
    //        return res.status(404).send()
    //    }
    //    res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})

router.delete('/tasks/:id',auth, async (req, res) =>{

    try {
        const task = await Task.findOneAndRemove({_id:req.params.id, author:req.user._id})
        if (!task) {
            res.status(404).send()
        }
        
        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router