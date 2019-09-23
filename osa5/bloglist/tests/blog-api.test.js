const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')


const api = supertest(app)

const blogposts = [
    {
        title :"hello",
        author :"Lehtinen",
        url :"http://example.com",
        likes :6
    },
    {
        title :"helloAgain",
        author :"Lehtinen",
        url :"http://example.com",
        likes :8
    },
    {
        title :"hello you stranger",
        author :"Virtanen",
        url :"http://example.com",
        likes :6
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})

    const array = blogposts.map(async (item) => {
        let obj = new Blog(item)
        await obj.save()
    })

    await Promise.all(array)
})

describe('API tests', () => {
    test('Test GET blogposts', async () => {
        await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
    })
    test('Check that application returns the right amount of blogposts', async () => {
        const result = await api.get('/api/blogs')
        expect(result.body.length).toBe(3)
    })
    test('Test post', async () => {
        const result = await api.get('/api/blogs')

        const newPost = {
            title: "Something",
            author: "Virtanen",
            url: "http://example.com",
        }

        await api.post('/api/blogs').send(newPost).expect(201).expect('Content-Type', /application\/json/)

        const resultAfterUpdate = await api.get('/api/blogs')

        expect(resultAfterUpdate.body.length).toBe(result.body.length+1)
        expect(resultAfterUpdate.body[resultAfterUpdate.body.length-1]).toMatchObject(newPost)
    })
    test('Check id', async () => {
        const result = await api.get('/api/blogs')
        
        console.log('Checking that id field is present in all array elements...')
        result.body.forEach(element => {
            expect(element.id).toBeDefined()
        });
        console.log('Done!')

    })
    test('Check if likes are not given then 0', async () => {
        const newPost = new Blog({
            title: "Uusi blogposti",
            author: "Virtasen Peksi",
            url: "http://example.com"
        })

        await newPost.save()

        const result = await api.get('/api/blogs')

        const lastElement = result.body[result.body.length-1]

        expect(lastElement.likes).toBe(0)

    })

    test('Check that title and url, if not response status is 400', async ()=>{
    
            const newBlog = new Blog({
                author: "test",
                likes: 7,
                })
    
                await api  
                    .post('/api/blogs')
                    .send(newBlog)
                    .expect(400)
    
        
        //expect(result.status()).toBe(400)
    })

    test('Test document update', async () => {

            const result = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)

            const update = {
                likes: 100
            }

            await api.put(`/api/blogs/${result.body[0].id}`).send(update)

            const check = await api.get(`/api/blogs/${result.body[0].id}`).expect(200).expect('Content-Type', /application\/json/)
            
            expect(check.body.likes).toBe(100)
        
    })

    test('Test document delete', async () =>  {

        const result = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)

        console.log(result.body[0].id)

        await api.delete(`/api/blogs/${result.body[0].id}`).expect(200)

        const after = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)

        expect(after.body.length).toBe(result.body.length-1)
    })
   
})

afterAll(()=>{
    mongoose.connection.close()
}) 