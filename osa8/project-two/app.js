const uuid = require('uuid/v1')
const { gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const config = require('./utils/config')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const token = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { PubSub } = require('apollo-server')

const sub = new PubSub()

//DB connection

mongoose.connect(config.MONGODB_URI, {useNewUrlParser:true}).then(()=>{
    console.log('Connected!')
}).catch(error => {
    console.log('Cannot connect to DB: ', error)
})

const typeDefs = gql`

  type Subscription {
    bookAdded: Book!
  }

  enum count {
    YES
  }

  type Query {
    hello: String!
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]
    authorBookCount: Int!
    me: User
  }

  type Book {
    title: String!
    published: Int!
    author: String
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]
    ):Book

    addAuthor(
      name: String!
      born: Int
    ): Author

    editAuthor(
      name: String
      setBornTo: Int
    ): Author

    createUser(
      username: String!
      password: String!
      favoriteGenre: String
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    hello: () => { return "world" },
    bookCount: async () => {
        const result = await Book.find({})
        return result.data.length
    },
    authorCount: async () => {
        const result = await Author.find({})
        return result.data.length
    },
    allBooks: async (root, args, context) => {
      const verify = context.current

      if(verify !== undefined){

        const result = await Book.find({})
        //console.log(result)
        return result
    
      /*
      else if(args.author && !args.genre){
        const allB = books.filter(item => item.author === args.author)
        return allB
      }

      else if(args.genre && !args.author){
        const allG = books.filter(item => item.genres.includes(args.genre))
        return allG
      }

      else if (args.genre && args.author){
        const allBo = books.filter(item => item.author === args.author)
        const allGe = allBo.filter(item => item.genres.includes(args.genre))
        console.log(allGe)
        return allGe
      }*/
      }
    },
    allAuthors: async (root, args, context) => {

      const verify = context.current

      if(verify !== undefined){

        const result = await Author.find({})
        //console.log(result)
        return result
      }
    },

    me: (root, args, context) => {
      const verify = context.current

      if(verify !== undefined){
        return context.current
      }
    }

  },

  Book: {
    title: (root) => root.title,
    published: (root) => root.published,
    author: (root) => root.author,
    genres: (root) => root.genres
  },

  Author: {
    name: (root) => root.name,
    born: (root) => {
      if(root.born === undefined || root.born === null){
        console.log(root.born)  
        return null
      }else{
        return root.born
      }
    },
    bookCount: async (root, args, context) => {
      const result = await context.loaders.book.load(root.name)
      if(result.length > 0){
        return result.length
      }
      return 0

    },

 
  },

  Mutation: {

    createUser: async (root, args) => {

      const hash = await bcrypt.hash(args.password, 10)

      const newUser = new User({
        username: args.username,
        password: hash,
        favoriteGenre: args.favoriteGenre
      })

      try{
        await newUser.save()
      }catch(error){
        throw new UserInputError(error.message, {invalidArgs: args})
      }
      
    },

    login: async (root, args) => {

      const user = await User.findOne({username: args.username})

      const compare = await bcrypt.compare(args.password, user.password)

      if(compare === true){

        const userToken = {
          username: user.username,
          id: user._id,
          favoriteGenre: user.favoriteGenre
        }

        return {value: token.sign(userToken, process.env.SECRET)}

      }else{
        throw new UserInputError('Authentication failed!')
      }


    },

    addAuthor: (root, args) => {
      const author = {...args, id: uuid()}
      authors.concat(author)
    },

    addBook: async (root, args, context) => {
      
      const verify = context.current

      console.log("verify", verify)

      if(verify !== undefined){
        const check = await Author.findOne({name: args.author})
        const book = new Book({...args, id: uuid()})
        
  
        console.log("Check", check)
       
        if(check === null){
  
          const author = new Author({
            name: args.author,
            id: uuid()
          })
          try{
              await book.save()
              await author.save()
          }catch(error){
              throw new UserInputError(error.message, {invalidArgs: args})
          }

          sub.publish('BOOK_ADDED', {bookAdded: book})
      
          return book
        
        }else{
          try{
              await book.save()
          }catch(error){
              throw new UserInputError(error.message, {invalidArgs: args})
          }

          sub.publish('BOOK_ADDED', {bookAdded: book})
          
          return book
        }
      }else{
        throw new AuthenticationError('You must auth first!')
      }

      
    },

    editAuthor: async (root, args, context) => {

      const verify = context.current

      if(verify !== undefined){

        const find = Author.findOne({name: args.name})

        console.log(find)

        if(find !== undefined){
          try{
              await Author.findOneAndUpdate({name: args.name}, {born: args.setBornTo}, {new: true})
          }catch(error){
              throw new UserInputError(error.message, {invalidArgs: args})
          }
        
          return find
        }else{
          return null
        }
      }else{
        throw new AuthenticationError('You must auth first!')
      }
    }
  },

  Subscription: {
    bookAdded: {
      subscribe : () => sub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

module.exports = { typeDefs, resolvers }