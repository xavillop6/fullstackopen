const Header = ({ text }) => <h1>{text}</h1>

const Total = ({ parts }) => {
    const sum = parts.reduce((accumulator, part) => {
        return accumulator + part.exercises;
    }, 0);
    
    return <p><b>Number of exercises {sum}</b></p>
}

const Part = ({ part }) => {
    return <p>
        {part.name} {part.exercises}
    </p>
}

const Content = ({ parts }) => {
    return <div>
        {parts.map((part, i) =>
            <Part key={part.id} part={ part } />
        )}
    </div>
 }
  
export const Course = ({ course }) => {
    return <div>
      <Header text={course.name} />
        <Content parts={course.parts} />
        <Total parts={ course.parts } />
    </div>
}