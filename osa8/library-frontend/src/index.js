import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const cl = new ApolloClient({
    uri: 'http://localhost:4000'
  })


ReactDOM.render(
    <ApolloProvider client={cl}>
        <App />
    </ApolloProvider>,
 document.getElementById('root'))