const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/users')
const {userOne, userOneId, setUpDb}= require('./fixtures/db')


beforeEach(setUpDb)
test('testing creation of a neew user', async ()=>{
   await request(app).post('/users').send({
        name: 'james',
        email: 'jamesmungai.code@gmail.com',
        password: 'farakana',
        age: 34
    }).expect(201)
})

test('testing login of an existing user', async ()=>{
   const response= await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
    const user = await User.findById(userOneId)
    expect(user.tokens[1].token===response.body.token).toBe(true)
})

test('Cant login invalid credentials', async()=>{
    await request(app).post('/users/login').send({
        email: 'invalidemail@invalid.com',
        password: 'invalid'
    }).expect(500)
})

test('test get request of user profile that requires auth', async ()=>{
    await request(app).get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})
test('testing logout all', async ()=>{
    await request(app).post('/users/logout-all')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('cannot get a user with wrong credentials', async ()=>{
    await request(app).get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}3`)
        .send()
        .expect(401)
})

test('delete user', async ()=>{
    await request(app).delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test(' cannot delete user without credentials', async ()=>{
    await request(app).delete('/users/me')
        .send()
        .expect(401)
})

test('upload avatar', async()=>{
    await request(app).post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.png')
        expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('update required fields', async ()=>{
    await request(app).patch('/users')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'james'
        })
        .expect(200)
    const user = await User.findById(userOneId)
    
    expect(user.name==='james').toBe(true)
})

test('update wrong fields and get denied', async ()=>{
    await request(app).patch('/users')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'kenya'
        })
        .expect(404)
        
})