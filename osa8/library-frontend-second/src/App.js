import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import authorService from './services/authors'
import { Query, Mutation, useApolloClient } from 'react-apollo'
import EditAuthor from './components/EditAuthor'
import loginService from './services/login'
import Login from './components/Login'
import Recommendations from './components/Recommendations'
import { useSubscription } from '@apollo/react-hooks'

const App = () => {

  const cl = useApolloClient()

  const [page, setPage] = useState('')
  const [authors, setAuthors] = useState('')

  const [curr, setCurr] = useState(null)

  useEffect(()=>{

    const token = localStorage.getItem('user-token')

    if(token === null || token === undefined){
      setCurr(null)
    }else{
      setCurr(token)
      setPage('authors')
    }

  }, [])

  const logout = () => {
    setCurr(null)
    localStorage.clear()
    cl.resetStore()
  }

  useSubscription(authorService.BOOK_ADDED, {
    onSubscriptionData: ({subscriptionData}) => {
      console.log(subscriptionData)
      window.alert(`Book ${subscriptionData.data.bookAdded.title} added!`)
    }
  })

  if(curr === null || curr === undefined){
    return(
      <Mutation mutation={loginService.login}>
        {(login) => <Login show={page==='login'} loginEvent={login} setCur={setCurr} setPage={setPage}/>}
      </Mutation>
    )
  }else{
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommendations')}>recommendations</button>
          <button onClick={() => logout()}>logout</button>
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

        <Query query={authorService.allBooks}>
          {(data) => {
            if(data.loading){
              return(
              <div className="loader">
                <p>Loading recommendations</p>
              </div>
              )
            }
            return(
              <Recommendations show={page === 'recommendations'} data={data.data} token={curr} />
            )
          }}
        </Query>
  
        <Mutation mutation={authorService.addBook} refetchQueries={[{query: authorService.allAuthors}, {query:authorService.allBooks}]}>
          {(addBook) => <NewBook show={page === 'add'} bookAddition={addBook} />}
        </Mutation>    
      </div>
    )
  }

  
}

export default App