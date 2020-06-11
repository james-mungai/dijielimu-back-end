const express = require('express')
const Pdf = require('../models/pdf')
const Course = require('../models/course')
const User = require('../models/users')
const auth = require('../middleware/auth')
const router = express.Router()


router.post('/pdfs', auth, async (req, res)=>{
    const pdf = new Pdf(req.body)
    const unitId = pdf.unit
    
    const unit = await Unit.findById(unitId)
    const isUnitTutor = unit.tutor===req.user.id
    try{
        if (!isUnitTutor) {
            throw new Error('Not allowed')
        }
        
        const pdf = await pdf.save()
        res.status(201).send(pdf)
    }catch(e){
        res.status(500).send(e)
    }
    
})

router.patch('/pdfs/:pdfId', auth, async (req, res)=>{
    const pdf = new Pdf(req.body)
    const unitId = pdf.unit
    const pdfId = req.params.pdfId
    const unit = await Unit.findById(unitId)
    const isUnitTutor = unit.tutor===req.user.id
    try{
        if (!isUnitTutor) {
            throw new Error('Not allowed')
        }
        
        const pdf = await pdf.findByIdAndUpdate(pdfId)
        res.status(201).send(pdf)
    }catch(e){
        res.status(500).send(e)
    }
    
})

router.delete('/pdfs/:pdfId', auth, async (req, res)=>{
    const pdf = new Pdf(req.body)
    const unitId = pdf.unit
    const pdfId = req.params.pdfId
    const unit = await Unit.findById(unitId)
    const isUnitTutor = unit.tutor===req.user.id
    try{
        if (!isUnitTutor) {
            throw new Error('Not allowed')
        }
        
        const pdf = await pdf.findByIdAndDelete(pdfId)
        res.status(201).send(pdf)
    }catch(e){
        res.status(500).send(e)
    }
    
})

router.get('/pdfs', async (req, res)=>{
    
    try{
        const pdfs = await pdf.find()
        res.status(201).send(pdfs)
    }catch(e){
        res.status(500).send(e)
    }
    
})

module.exports = router