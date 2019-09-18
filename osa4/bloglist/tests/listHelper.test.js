const listHelper = require('../utils/list_helper')

test('dummy returns one', () =>{
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('likes', () => {
    
    test('count likes', () => {
        const blogs = [
            {
              _id: '5a422aa71b54a676234d17f8',
              title: 'Go To Statement Considered Harmful',
              author: 'Edsger W. Dijkstra',
              url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
              likes: 5,
              __v: 0
            },
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
              },
              {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
              },
              {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
              },
              {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
              },
          ]
    
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(25)
    })

    test('count likes if only one item in array', () => {
        const blog = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
              }
        ]
        const result = listHelper.totalLikes(blog)

        expect(result).toBe(5)
    })

    test('empty bloglist value is zero', () => {
        const blog = []

        const result = listHelper.totalLikes(blog)
        expect(result).toBe(0)
    })
})

describe('favorite blogpost', ()=>{
    test('most likes', () => {
        const blogs = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
              },
              {
                  _id: '5a422aa71b54a676234d17f8',
                  title: 'Go To Statement Considered Harmful',
                  author: 'Edsger W. Dijkstra',
                  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                  likes: 7,
                  __v: 0
                },
                {
                  _id: '5a422aa71b54a676234d17f8',
                  title: 'Go To Statement Considered Harmful',
                  author: 'Edsger W. Dijkstra',
                  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                  likes: 10,
                  __v: 0
                },
                {
                  _id: '5a422aa71b54a676234d17f8',
                  title: 'Go To Statement Considered Harmful',
                  author: 'Edsger W. Dijkstra',
                  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                  likes: 18,
                  __v: 0
                },
                {
                  _id: '5a422aa71b54a676234d17f8',
                  title: 'Go To Statement Considered Harmful',
                  author: 'Edsger W. Dijkstra',
                  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                  likes: 5,
                  __v: 0
                },
        ]

        const result = listHelper.favoriteBlog(blogs)

        console.log(result)

        const expected = {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 18,
            __v: 0
          }

        expect(result).toEqual(expected)
    })
})

describe('Author with most posts', () => {

    test('Author with most posts', ()=>{
        const blogs = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Pekka bääkkäri',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
              },
              {
                  _id: '5a422aa71b54a676234d17f8',
                  title: 'Go To Statement Considered Harmful',
                  author: 'Edsger W. Dijkstra',
                  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                  likes: 7,
                  __v: 0
                },
                {
                  _id: '5a422aa71b54a676234d17f8',
                  title: 'Go To Statement Considered Harmful',
                  author: 'Pekka koodari',
                  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                  likes: 10,
                  __v: 0
                },
                {
                  _id: '5a422aa71b54a676234d17f8',
                  title: 'Go To Statement Considered Harmful',
                  author: 'Edsger W. Dijkstra',
                  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                  likes: 18,
                  __v: 0
                },
                {
                  _id: '5a422aa71b54a676234d17f8',
                  title: 'Go To Statement Considered Harmful',
                  author: 'Edsger W. Dijkstra',
                  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                  likes: 5,
                  __v: 0
                }
        ]
    
        const expected = { 'Edsger W. Dijkstra': '3' }
    
        const result = listHelper.mostBlogs(blogs)
        console.log(result)
        expect(result).toEqual(expected)
    })

    test('Author with most likes', ()=>{
        const blogs = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Pekka bääkkäri',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
              },
              {
                  _id: '5a422aa71b54a676234d17f8',
                  title: 'Go To Statement Considered Harmful',
                  author: 'Edsger W. Dijkstra',
                  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                  likes: 7,
                  __v: 0
                },
                {
                  _id: '5a422aa71b54a676234d17f8',
                  title: 'Go To Statement Considered Harmful',
                  author: 'Pekka koodari',
                  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                  likes: 10,
                  __v: 0
                },
                {
                  _id: '5a422aa71b54a676234d17f8',
                  title: 'Go To Statement Considered Harmful',
                  author: 'Edsger W. Dijkstra',
                  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                  likes: 18,
                  __v: 0
                },
                {
                  _id: '5a422aa71b54a676234d17f8',
                  title: 'Go To Statement Considered Harmful',
                  author: 'Edsger W. Dijkstra',
                  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                  likes: 5,
                  __v: 0
                }
        ]

        const result = listHelper.mostLikes(blogs)
        const expected = { author: 'Edsger W. Dijkstra', likes: 30 }
        console.log(result)
        expect(result).toEqual(expected)
    })
    
})
