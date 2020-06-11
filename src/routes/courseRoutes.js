const express = require('express')
const Course=require('../models/course')
const auth = require('../middleware/auth')
const router = express.Router()


router.post('/courses', auth, async (req, res)=>{
    const course = new Course(req.body)
    const user = req.user
    try{
        if (!user.isTutor||!user.isAdmin) {
            throw new Error('Not allowed')
        }
        if (user.isTutor) {
            course.tutor = req.user._id
        }
        await course.save()
        res.status(201).send(course)
    }catch(e){        
        res.status(500).send(e)
    }
    
})

router.patch('/courses/:courseId', auth, async (req,res) => {
    const allowedUpdates = ['name',
        'approved',
        'published',
        'imageUrl',
        'blog',
        'price',
        'tutor',
        'department']
    const myUpdates = Object.keys(req.body)
    const isValidUpdate = myUpdates.every((update)=>allowedUpdates.includes(update))
    if (!isValidUpdate) {
        
        return res.status(404).send('please send valid updates only')
    }
    
    try {
        const _id = req.params.id
        const course = await  Course.findOne({_id, tutor: req.user._id})
        myUpdates.forEach((update)=>course[update]=req.body[update])
        await course.save()
        res.status(201).send('updated successfully')
    } catch (error) {
        res.status(500).send(error)
    }
}
)

router.get('/courses/:courseId', auth, async (req, res)=>{
    const courseId = req.params.courseId
    Course.findById(courseId).populate({
        path: 'units',
        select: '_id blog name tutor'
    }).exec(function (err, course) {
        if (err) {
            res.status(500).send(err)
        }
        res.status(200).send(course)
    })
    
})

module.exports = router