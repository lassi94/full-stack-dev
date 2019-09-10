import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header = ({header}) =>{
    return(
        <h1 className="header-one">{header}</h1>
    )
}

const Stats = ({valueProp}) =>{

    const object = valueProp;
    const components = [];
    const objectEntries = Object.entries(object)
    
    objectEntries.forEach((entry) =>{
        components.push(<Stat stattext={entry[0]} value={[entry[1]]}/>)

    })

    if(valueProp.All === 0){
        return(
            <>
                <p className="paragraph">No feedback given</p>
            </>
        )
    }else{
        return(
            <>
            <table className="stats-table">
                <tbody>
                    {components}
                </tbody>     
            </table>       
            </>
        )

    }
    
    
}

const Stat = ({stattext, value}) =>{
    return(
        <>
            <tr className="row">
                <td>{stattext}</td>
                <td>{value}</td>
            </tr>
        </>
    )
}

const Button = ({action, text}) =>{

    return(
        <>
            <button className="button" onClick={action}>{text}</button>
        </>
    )
    
}


const App = () =>{

    const headerOne = "Give feedback";
    const headerTwo = "Stats";
    const [option, setOptions] = useState({
        Good: 0,
        Neutral: 0,
        Bad: 0,
        All: 0,
        Average: 0,
        Positive: 0
    });

    const anecdotes = [
        "When I’m working on a problem, I never think about beauty. I think only how to solve the problem. But when I have finished, if the solution is not beautiful, I know it is wrong",
        "The Scrum idea of a separated Scrum Master is good for Scrum, but not appropriate for most projects. Good development requires not just talkers but doers.",
        "You can mass-produce hardware; you cannot mass-produce software; you cannot mass-produce the human mind.",
        "Measuring programming progress by lines of code is like measuring aircraft building progress by weight.",
        "Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live."
    ]

    /*const setAll = {
        ...option,
        All: option.Good + option.Neutral + option.Bad,
        Average: (option.Good - option.Bad)/option.All,
        Positive: option.Good/option.All
    }*/

    const handleGood = () =>{

        const setGood = {
            ...option,
            Good: option.Good + 1,
        }

        const setAll = {
            ...setGood,
            All: setGood.Good + setGood.Neutral + setGood.Bad,
            Average: (setGood.Good - setGood.Bad)/setGood.All,
            Positive: setGood.Good/setGood.All
        }

        console.log("ALL", option.All)
        console.log("Good", setGood.Good)
        return(
            
            setOptions(setAll)
            
        )
    }

    const handleNeutral = () =>{

        const setNeutral = {
            ...option,
            Neutral: option.Neutral + 1,
        
        }

        const setAll = {
            ...setNeutral,
            All: setNeutral.Good + setNeutral.Neutral + setNeutral.Bad,
            Average: (setNeutral.Good - setNeutral.Bad)/setNeutral.All,
            Positive: setNeutral.Good/setNeutral.All
        }


        console.log(option.All)

        return(
            
                setOptions(setAll)
                
        )
        
    }

    const handleBad = () =>{

        const setBad = {
            ...option,
            Bad: option.Bad + 1,
        }

        const setAll = {
            ...setBad,
            All: setBad.Good + setBad.Neutral + setBad.Bad,
            Average: (setBad.Good - setBad.Bad)/setBad.All,
            Positive: setBad.Good/setBad.All
        }




        console.log(option.All)

        return(
       
                setOptions(setAll)
            
        )
        
    }


    return(
        <div>
            <Header header={headerOne} />
            <div className="buttons">
                <Button action={()=>handleGood()} text="Good" />
                <Button action={()=>handleNeutral()} text="Neutral"/>
                <Button action={()=>handleBad()} text="Bad"/>
            </div>
            <Header header={headerTwo} />
            <div className="stats">
                <Stats valueProp={option} />
            </div>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

