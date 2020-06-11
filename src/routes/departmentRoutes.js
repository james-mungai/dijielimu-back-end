const express = require('express')
const Department=require('../models/department')
const auth = require('../middleware/auth')
const router = express.Router()


router.post('/departments', auth, async (req, res)=>{
    const department = new Department(req.body)
    const user = req.user
    
    try{
        if (user.isAdmin) {
            department.admin = req.user._id
        }
        await department.save()
        res.status(201).send(department)
    }catch(e){
        res.status(500).send()
    }
    
})

router.get('/departments', async (req, res)=>{
    Department.find().populate('courses').exec(function (err, departments) {
        if (err) {
            res.status(500).send(err)
        }
        res.status(200).send(departments)
    })
    
    // try{
    //     const departments = await Department.find().populate('courses').exec(function (err, departments) {
    //         if (err) {
    //             res.status(500).send(e)
    //         }
    //         res.status(200).send(departments)
    //     })
        
        
    // }catch(e){
    //     res.status(500).send(e)
    // }
    
})

router.delete('/departments/:departmentId', auth, async (req, res)=>{
    const departmentId = req.params.delete
    const department = await Department.findById(departmentId)
    try{
        if (!department.admin===req.user.id) {
            throw new Error('unauthorized')
        }
        await department.remove()
        res.status(200).send('successfully deleted')
    }catch(e){
        res.status(500).send(e)
    } 
})

router.patch('/departments/:departmentId', auth, async (req,res) => {
    const allowedUpdates = ["blog", "title", "admin"]
    const myUpdates = Object.keys(req.body)
    const isValidUpdate = myUpdates.every((update)=>allowedUpdates.includes(update))
    if (!isValidUpdate) {
        
        return res.status(404).send('please send valid updates only')
    }
    
    try {
        const _id = req.params.id
        const department =await  Department.findOne({_id, admin: req.user._id})
        myUpdates.forEach((update)=>department[update]=req.body[update])
        await department.save()
        res.status(201).send('updated accordingly')
    } catch (error) {
        res.status(500).send(error)
    }
}
)
router.get('/departments/:departmentId', async (req,res) => {
    const departmentId = req.params.departmentId
    Department.findOne({_id: departmentId}).populate('courses').exec((err, department) => {
        if (err) {
            res.status(500).send(err)
        }
        res.status(200).send(department)
    })
}
)

module.exports = router