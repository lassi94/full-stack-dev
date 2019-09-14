import React from 'react'
import Header from './Header'
import Content from './Content'

const Course = ({course}) =>{

    const loopCourses = () =>{
        
        const array = []

        course.forEach(element => {
            array.push(<Header name={element.name} />)
            array.push(<Content courseparts={element.parts} />)
        });

        return(
            array
        )

    }

    console.log("Course", course)

    return(
        <>
            {loopCourses()}
        </>
    )
}

export default Course;