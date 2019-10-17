import { gql } from 'apollo-boost'

//queries

const allAuthors = gql`
{
    allAuthors {
        name,
        born,
        bookCount
    }
}
`

const allBooks = gql`
{
    allBooks {
        title,
        author,
        published
    }
}
`

//mutations

const addBook = gql`
    mutation bookAddition($title: String!, $author: String!, $published: Int!, $genres: [String!]){
        addBook(
            title: $title,
            author: $author,
            published: $published,
            genres: $genres
        ){
            title, 
            author,
            published
        }
    }
`

const editAuthor = gql`
    mutation authorEdit($name: String!, $born: Int){
        editAuthor(
            name: $name,
            setBornTo: $born
        ){
            name,
            born
        }
    }
`

export default { allAuthors, allBooks, addBook, editAuthor }