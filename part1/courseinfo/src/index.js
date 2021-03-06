import ReactDOM from 'react-dom'

const Header = (props) => {
  return <h1>{props.course.title}</h1>
}

const Part = (props) => {
  return <p>{props.title} { props.exercices }</p>
}

const Content = (props) => {
  return (
    <div>
      <Part title={props.parts[0].title} exercices={props.parts[0].exercises} />
      <Part title={props.parts[1].title} exercices={props.parts[1].exercises} />
      <Part title={props.parts[2].title} exercices={props.parts[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  return <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
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
      <Header course={course}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)