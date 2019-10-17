const { ApolloServer } = require('apollo-server')
const { typeDefs, resolvers }  = require('./app')
const jsonWebToken = require('jsonwebtoken')
const User = require('./models/user')
const DataLoader = require('dataloader')
const Book = require('./models/book')

const getBooks = async (keys) => {

  const books = await Book.find({})

  console.log(keys)

  console.log("keys", keys)
  console.log("books", books)

  return keys.map(key => books.filter(item => {
    //console.log("auth", item.author)
    //console.log("key", key)
    return item.author === key
  }))
}

const bookLoader = new DataLoader(keys => 
  {
    return getBooks(keys)
  }, { cache: false })

const server = new ApolloServer({
  cors: true,
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req ? req.headers.authorization : null

    if(token && token !== null && token !== undefined && token.toLowerCase().startsWith('bearer')){
        const decode = await jsonWebToken.verify(token.substring(7), process.env.SECRET)
        const current = await User.findById(decode.id)
        return {
          current,
          loaders: {
            book: bookLoader
        }
    }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Sub url: ${subscriptionsUrl}`)
})