import React from 'react'
import Part from './Part'
import Total from './Total'


const Content = ({courseparts}) =>{

    console.log("content", courseparts)

    const loopParts = (course) =>{

        const array = []

        course.forEach(element => {
            console.log(element)
            array.push(<Part key={element.id} courseProps={element}/>)
        });

        console.log(array)
        return(
            array
        )


    }

    const total = (course) =>{
        
        //let total = 0


        const total = course.reduce((sum, {ex}) => sum + ex, 0)

        console.log(total)


        for (let index = 0; index < course.length; index++) {
            //total += course[index].ex

            
        }

        return(
            <Total total={total} />
        )
    }

    return(
        <>
        <div className="parts">
            {loopParts(courseparts)}
        </div>
        <div className="total">
            {total(courseparts)}
        </div>
        </>
    )
}

export default Content;