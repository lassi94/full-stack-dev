import React, { useState } from 'react'
import EditAuthor from './EditAuthor'
import authorService from '../services/authors'
import { Mutation } from 'react-apollo'


const Authors = (props) => {
  if (!props.show) {
    return null
  }
  const authors = [props.data]

  console.log(authors[0].allAuthors)

  if(authors[0].allAuthors === undefined){
    return(
      <div className="no-authors">
        <p>No authors</p>
      </div>
    )
  }
    return (
      <div>
        <h2>authors</h2>
          <table>
            <tbody>
              <tr>
              <th></th>
              <th>
                born
              </th>
              <th>
                books
              </th>
              </tr>
              {authors[0].allAuthors.map(a =>
              <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
              </tr>
              )}
            </tbody>
          </table>
      </div>
    )
}

export default Authors