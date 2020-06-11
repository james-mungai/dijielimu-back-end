const express = require('express')
const Unit = require('../models/unit')
const Course = require('../models/course')
const auth = require('../middleware/auth')
const router = express.Router()


router.post('/units', auth, async (req, res)=>{
    const unit = new Unit(req.body)
    const courseId = unit.course
    const course = await Course.findById(courseId)
    const isUnitTutor = course.tutor===req.user.id
    
    
    try{
        if (!isUnitTutor) {
            throw new Error('Not allowed')
        }
       unit.tutor = courseId
       await unit.save()
        res.status(201).send(unit)
    }catch(e){
        res.status(500).send(e)
    }
    
})

router.delete('/units/:unitId', auth, async (req, res)=>{
    const unitId = req.params.unitId
    const courseId = unit.course
    const course = await Course.findById(courseId)
    const isUnitTutor = course.tutor===req.user.id
    
    
    try{
        if (!isUnitTutor) {
            throw new Error('Not allowed')
        }
        const unit = await Unit.findByIdAndDelete(unitId)
        res.status(201).send(unit)
    }catch(e){
        res.status(500).send(e)
    }
    
})

router.get('/units/:unitId', async (req, res)=>{
    const unitId = req.params.unitId
    Unit.findById(unitId).populate({
            path: 'pdfs',
            select: '_id title url'
        })
        .populate({
            path: 'videos',
            select: '_id title url'
        }).exec((err, unit) => {
            if (err) {
                res.status(500).send(err) 
            }
            res.status(201).send(unit)

        }
        )
})

module.exports = router