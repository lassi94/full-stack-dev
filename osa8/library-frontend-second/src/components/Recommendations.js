import React from 'react'

const Recommendations = (props) => {

    if (!props.show) {
        return null
    }
    console.log(props.data.allBooks)
   
    const token = JSON.parse(atob(props.token.split('.')[1]))
    console.log(token)
    const filtered = props.data.allBooks.filter(item => item.genres.includes(token.favoriteGenre))

    return(
        <>
        <div className="favorite-genre">
            <h2>Recommendations</h2>
            <div>
                <table>
                    <tbody>
                    <tr>
                    <th>
                        name
                    </th>
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
            </div>
        </div>
        </>
    )
}

export default Recommendations