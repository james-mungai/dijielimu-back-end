const jwt = require('jsonwebtoken')
const app = require('../src/app')
const Task = require('../src/models/Task')
const request = require('supertest')
const {userOne, userTwo, userTwoId, userOneId, setUpDb}= require('./fixtures/db')


beforeEach(
    setUpDb
)
test('testing posting new task', async ()=>{
   const response= await request(app).post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            task: 'go to the market',
            completion: true
        })
        .expect(201)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
})

test('get tasks and make assertions', async ()=>{
    const response= await request(app).get('/tasks')
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .expect(200)

    expect(response.body.length).toBe(2)
})

test('get a failure response deleting others\'s tasks', async ()=>{
    await request(app).delete(`/tasks/${userTwoId}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(404)
    const task1 = await Task.findOne({author: userOneId})
    expect(task1).not.toBeNull()
})