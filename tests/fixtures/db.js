const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/users')
const Task = require('../../src/models/Task')


const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'john',
    email: 'john@yahoo.com',
    password: 'kikulacho',
    age: 23,
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JSON_WEB_TOKEN_SECRET_KEY)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'javan',
    email: 'john@yaho.com',
    password: 'kikulacho',
    age: 23,
    tokens: [{
        token: jwt.sign({_id: userTwoId}, process.env.JSON_WEB_TOKEN_SECRET_KEY)
    }]
}

const task1 ={
    task: 'buy new charger',
    completion: 'true',
    _id: new mongoose.Types.ObjectId(),
    author: userOneId
}
const task2 ={
    task: 'wash babycase',
    completion: 'false',
    _id: new mongoose.Types.ObjectId(),
    author: userTwoId
}
const task3 ={
    task: 'shoot my brains out',
    completion: 'false',
    _id: new mongoose.Types.ObjectId(),
    author: userTwoId
}

const setUpDb = async ()=>{
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(task1).save()
    await new Task(task2).save()
    await new Task(task3).save()
}


module.exports = {
    userOne, userTwo, userOneId, userTwoId, setUpDb
}