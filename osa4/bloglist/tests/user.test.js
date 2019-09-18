const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

const users = [
    {
        username: "Lehtinen",
        name: "Valtteri",
        password: "erittain_salainen"
    },
    {
        username: "Lehtinen2",
        name: "Valtteri1",
        password: "salainen_passu"
    }
]

beforeEach( async () => {

    await User.deleteMany({})

    const promises = users.map(async item => {
        let hash = await bcrypt.hash(item.password, 10)
        let userToBeAdded = new User({
            ...item,
            passwordHash: hash
        })
        await userToBeAdded.save()
    })

    await Promise.all(promises)
});

describe('User tests', () => {
    test('Get all users', async () => {
        const result = await api.get('/api/users').expect(200)
        console.log(result.body)
        expect(result.body.length).toBe(2)
    })
    test('Validate user post', async () => {

        const first = await User.find({})
        
        const newUser = {
            username: "uusi_kayttaja",
            name: "uusi_nimi",
            password: "salainen"
        }

        await api.post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const second = await User.find({})

        expect(first.length).toBe(second.length-1)

        const check = second.map(item => {
            return item.username   
        })

        expect(check).toContain(newUser.username)
    })
})

afterAll(()=>{
    mongoose.connection.close()
})