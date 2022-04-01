import React from 'react'
import * as ReactDOMClient from 'react-dom/client'

const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Part = (props) => {
  return <p>{props.title} { props.exercices }</p>
}

const Content = (props) => {
  console.log('parts', props);
  return (
    <div>
      <Part title={props.parts[0].title} exercices={props.parts[0].exercises} />
      <Part title={props.parts[1].title} exercices={props.parts[1].exercises} />
      <Part title={props.parts[2].title} exercices={props.parts[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  return <p>Number of exercises {props.parts[0].exercises + props.parts[0].exercises + props.parts[0].exercises}</p>
}

const App = () => {
  const course = {
    title: 'Half Stack application development',
    parts: [
      {
        title: 'Fundamentals of React',
        exercises: 10
      },
      {
        title: 'Using props to pass data',
        exercises: 7
      },
      {
        title: 'State of a component',
        exercises: 14
      },
    ]
  }

  return (
    <div>
      <Header course={course.title}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(<App />);