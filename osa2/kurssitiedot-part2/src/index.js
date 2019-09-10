import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


const course = [
    {
    name: 'Application development',
    parts: [
      {
        name: 'Fundamentals of React',
        ex: 10,
        id: 1
      },
      {
        name: 'Fundamentals of CSS',
        ex: 4,
        id: 2
      },
      {
        name: 'Fundamentals of HTML',
        ex: 12,
        id: 3
      },
      {
        name: 'Fundamentals of JavaScript',
        ex: 20,
        id: 4
      }
    ]
    },
    {
    name: 'NodeJS and Express',
    parts: [
      {
        name: 'Fundamentals of Nodejs',
        ex: 18,
        id: 1
      },
      {
        name: 'Fundamentals of Express',
        ex: 6,
        id: 2
      },
      {
        name: 'Fundamentals of Backend development',
        ex: 13,
        id: 3
      },
      {
        name: 'JavaScript',
        ex: 22,
        id: 4
      }
    ]
    }
    
]
    

/*
const course = {
    name: 'Application development',
    parts: [
      {
        name: 'Fundamentals of React',
        ex: 10,
        id: 1
      },
      {
        name: 'Fundamentals of CSS',
        ex: 4,
        id: 2
      },
      {
        name: 'Fundamentals of HTML',
        ex: 12,
        id: 3
      },
      {
        name: 'Fundamentals of JavaScript',
        ex: 20,
        id: 4
      }
    ]
  }*/

ReactDOM.render(<App course={course} />, document.getElementById('root'));

