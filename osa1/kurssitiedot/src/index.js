import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const Header = (props) => {

    const object = props.parts;
    console.log(object.course);
    return(
        <>
        <h1 className="heading-one">
            {object.course}
        </h1>
        </>
    )
}

const Content = (props) => {

    const object = props.parts;
    let array = object.info;

    let componentArray = [];

    array.forEach(value => {

        componentArray.push(<Part name={value.name} quantity={value.practice} />);

    });

    return(
        <>
          {componentArray}
        </>
    )
    
    
}

const Part = (props) =>{
    return(
        <p className="paragraph">
            {props.name} and {props.quantity}
        </p>
    )
}

const Total = (props) => {

    const object = props.parts;
    const array = object.info;

    let total = 0;

    for (let i = 0; i < array.length; i++) {
        
        if(i === 0){
            console.log("total is :" + total);
            total = array[i].practice;
            console.log("total is :" + total);
        }else{
            total = total + array[i].practice;
            console.log("total is :" + total)
            console.log(array[i].practice)
        }
        
    }

    return(
        <>
        <p className="total">Number of exercises {total}</p>
        </>
    )
}

const App = () => {

    const parts = {

        course: "full stackki",

        info: [
        {
            name: "Reactia",
            practice: 5
        },
        {
            name: "Using the almighty props to generate content",
            practice: 6
        },
        {
            name: "React components state",
            practice: 15
        }
    ]
    }

    return(
        <div className="first">
            <Header parts={parts} />
            <Content parts = {parts} />
            <Total parts = {parts} />
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'));