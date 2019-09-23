const blogs = [
    {
        likes: 0,
        title: 'First note',
        author: 'Lehtinen',
        url: 'http://example.com',
        user: {
            username: 'Lehtinen',
            name: 'Valtteri',
            id: "5d8114097652b4278bb49107"
        },
        id: "5d811c5083611e29a628775d"
    },
    {
        likes: 0,
        title: "second note",
        author: "Lehtinen",
        url: "http://example.com",
        user: {
            username: "Lehtinen",
            name: "Valtteri",
            id: "5d8114097652b4278bb49107"
        },
        id: "5d812ee047313e2efce86193"
    },
]

const setJWT = (newJWT) => {
    const jwt = newJWT
    return jwt
}

const getAll = () => {
    return Promise.resolve(blogs)
}

export default { getAll, setJWT }