import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import authorService from './services/authors'
import { Query, Mutation } from 'react-apollo'
import EditAuthor from './components/EditAuthor'


const App = () => {
  const [page, setPage] = useState('authors')
  const [authors, setAuthors] = useState('')

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>
      <Query query={authorService.allAuthors}>
        {(data) => {
          if(data.loading){
            return(
              <div className="loader">
                <p>Loading authors...</p>
              </div>
            )
          }else{
            console.log(page)
            setAuthors(data.data)
            return (
              <>
                  <Authors show={page === 'authors'} data={data.data}/>
                  
              </>
            )
      
          }
         
        }}
      </Query>

      <Mutation mutation={authorService.editAuthor} refetchQueries={[{query: authorService.allAuthors}]}>
        {(editAuthor) => {
          console.log(authors)
          if(typeof(authors) !== 'string'){

            console.log(authors)
            console.log('NOW')
            return(
              <EditAuthor show={page === 'authors'} authorEdit={editAuthor} authors={authors} />
            )
          }
          return null
      }}
      </Mutation>
      
      <Query query={authorService.allBooks}>
        {(data) => {
          if(data.loading){
            return(
            <div className="loader">
              <p>Loading books</p>
            </div>
            )
          }
          return(

            <Books show={page === 'books'} data={data.data}
          />
          )
        }}
      </Query>

      <Mutation mutation={authorService.addBook} refetchQueries={[{query: authorService.allAuthors}, {query:authorService.allBooks}]}>
        {(addBook) => <NewBook show={page === 'add'} bookAddition={addBook} />}
      </Mutation>
    
    </div>
  )
}

export default App