const { ApolloServer, gql } = require('apollo-server')
const uuid = require('uuid/v1')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`

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
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
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
  }
`

const resolvers = {
  Query: {
    hello: () => { return "world" },
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {

      if(!args.author && !args.genre){
        return books
      }

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
      }
  
    },
    allAuthors: () => {
      return authors
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
    bookCount: (root) => {
      const array = books.filter(item => item.author === root.name)
      console.log(array.length)
      return array.length
    }
  },

  Mutation: {

    addAuthor: (root, args) => {
      const author = {...args, id: uuid()}
      authors.concat(author)
    },
    addBook: (root, args) => {
      
      const check = authors.find(item => item.name == args.author)
      const book = {...args, id: uuid()}

      console.log(check)
     
      if(check === null || check === undefined){

        const author = {
          name: args.author,
          id: uuid()
        }

        books = books.concat(book)
        authors = authors.concat(author)
        return book
      
      }else{
        books = books.concat(book)
        return book
      }
    },

    editAuthor: (root, args) => {
      const find = authors.find(item => args.name === item.name)

      console.log(find)

      if(find !== undefined){
        const obj = {
          name: args.name,
          born: args.setBornTo
        }

        authors = authors.map(item => item.name === find.name ? obj:item)

        return obj
      }else{
        return null
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})