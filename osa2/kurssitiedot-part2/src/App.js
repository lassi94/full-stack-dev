import React from 'react'
import Course from './components/Course'


const App = ({course}) =>{

    console.log(course)

    return(
        <div className="application">
            <Course course={course} />
        </div>
    )
}

export default App