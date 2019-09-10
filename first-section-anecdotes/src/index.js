import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const Anecdote = ({anecdoteArray, anecdote}) =>{

    const array = anecdoteArray;
    return(
        <>
        <p>{array[anecdote].sentence}</p>
        <Votes num={array[anecdote].votes}/>
        </>
    )
}

const MostVotes = ({anecdoteArray}) =>{

    const sentenceNum = Math.max.apply(Math, anecdoteArray.map((highest)=>{
        return highest.votes;
    }));

    const object = anecdoteArray.reduce((previous, current)=>{
        return (previous.votes > current.votes) ? previous: current
    })

    return(
        <>
        <p>{object.sentence}</p>
        <Votes num={sentenceNum}/>
        </>
    )
}

const Votes = ({num}) =>{
    return(
        <p className="vote">The anecdote has {num} votes</p>
    )
}

const Button = ({action, text}) =>{
    return(
        <button className="button" onClick={action}>
            {text}
        </button>
    )
}

const Header = ({header}) =>{
    return(
        <h1 className="header">
            {header}
        </h1>
    )
}

const App = ({anecdotes}) => {

    const arrayAnec = [...anecdotes];

    console.log("arrararara ", arrayAnec)

    const [place, setPlace] = useState(0);
    const [lines, setVote] = useState(
        arrayAnec
    );

    console.log("lines", [...lines])

    const handleVote = (num) => {

        const copyAr = [...lines]

        return(
            ()=>setVote(copyAr.map(item => item.id === num ? {
                ...item,
                votes: item.votes + 1
            }: item))
        )
    }

    const handlePlace = () =>{

        const index = Math.floor(Math.random() * lines.length)
               
        return(
            () => {
                setPlace(index)
            }
        )

    }

    return(
        <div className="anecdotes">
            <Header header="Anecdote of the day" />
            <Anecdote anecdoteArray={lines} anecdote={place} />
            <div className="buttons">
                <Button action={handleVote(place)} text="Vote" />
                <Button action={handlePlace()} text="Next" />
            </div>
            <Header header="Anecdote with the most votes" />
            <MostVotes anecdoteArray={lines} />
        </div>  
    )

}

let anecdotes = [
    {
        id: 0,
        sentence: "When I’m working on a problem, I never think about beauty. I think only how to solve the problem. But when I have finished, if the solution is not beautiful, I know it is wrong.",
        votes: 0
    },
    {
        id: 1,
        sentence: "The Scrum idea of a separated Scrum Master is good for Scrum, but not appropriate for most projects. Good development requires not just talkers but doers.",
        votes: 0
    },
    {
        id: 2,
        sentence: "You can mass-produce hardware; you cannot mass-produce software; you cannot mass-produce the human mind.",
        votes: 0
    },
    {
        id: 3,
        sentence: "Measuring programming progress by lines of code is like measuring aircraft building progress by weight.",
        votes: 0
    },
    {
        id: 4,
        sentence: "Learn from yesterday, live for today, hope for tomorrow. The important thing is not to stop questioning.",
        votes: 0
    },
    {
        id: 5,
        sentence: "I have always wished for my computer to be as easy to use as my telephone; my wish has come true because I can no longer figure out how to use my telephone.",
        votes: 0
    }
]



ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));

