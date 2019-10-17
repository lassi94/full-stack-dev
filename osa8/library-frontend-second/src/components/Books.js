import React, {useState} from 'react'

const Books = (props) => {

  const [genre, setGenre] = useState('all')

  if (!props.show) {
    return null
  }

  const filtered = genre === 'all' ? props.data.allBooks : props.data.allBooks.filter(item => item.genres.includes(genre))

  if(filtered.length > 0){
    return (
      <div>
        <h2>books</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                author
              </th>
              <th>
                published
              </th>
            </tr>
            {filtered.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author}</td>
                <td>{a.published}</td>
              </tr>
            )}
          </tbody>
        </table>
        <div>
            <button onClick={() => setGenre('crime')}>crime</button>
            <button onClick={() => setGenre('refactoring')}>refactoring</button>
            <button onClick={() => setGenre('agile')}>agile</button>
            <button onClick={() => setGenre('design')}>design</button>
            <button onClick={() => setGenre('all')}>all</button>
          </div>
      </div>
    )
  }

  return (
    <div>
      <h2>Books</h2>
      <p>no books to display</p>
      <div>
          <button onClick={() => setGenre('crime')}>crime</button>
          <button onClick={() => setGenre('refactoring')}>refactoring</button>
          <button onClick={() => setGenre('agile')}>agile</button>
          <button onClick={() => setGenre('design')}>design</button>
          <button onClick={() => setGenre('all')}>all</button>
        </div>
    </div>
  )
}

export default Books