import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { WebSocketLink } from 'apollo-link-ws'
import { createHttpLink } from 'apollo-link-http'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'  
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

const ws = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: { 
    reconnect: true
  },
  timeout: 60000
})

const http = createHttpLink({
  uri: 'http://localhost:4000/'
})

const auth = setContext((_,{ headers }) => {
  const t = localStorage.getItem('user-token')
  return {
    headers: {
      ...headers,
      Authorization: t ? `Bearer ${t}` : undefined
    }
  }
})

const link = split(
  ({query}) => {
    const {kind, operation} = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  ws,
  auth.concat(http)
)

const cache = new InMemoryCache()

const cl = new ApolloClient({
    link: link,
    cache: cache
  })


ReactDOM.render(
    <ApolloProvider client={cl}>
        <App />
    </ApolloProvider>,
 document.getElementById('root'))