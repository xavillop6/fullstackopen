import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ title }) => <h1>{title}</h1>

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const Statistics = ({ click }) => {
  const total_clicks = click.good + click.neutral + click.bad
  const average = (click.good * 1 + click.bad * -1) / total_clicks
  const positive = click.good * (100 / total_clicks)
  
  if (total_clicks === 0) {
    return <div>No feedback given</div>
  }
  return (
    <div>
      <table>
        <tbody>
          <Statistic text="Good" value={ click.good } />
          <Statistic text="Neutral" value={ click.neutral } />
          <Statistic text="Bad" value={ click.bad } />
          <Statistic text="All" value={ total_clicks } />
          <Statistic text="Average" value={ average } />
          <Statistic text="Positive" value={ positive } />
        </tbody>
      </table>
    </div>
  )
}

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}:</td>
      <td>{value}:</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [click, setClick] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })
  const handleGoodClick = () => {
    setClick({...click, good: click.good +1})
  }

  const handleNeutralClick = () => {
    setClick({...click, neutral: click.neutral +1})
  }

  const handleBadClick = () => {
    setClick({...click, bad: click.bad +1})
  }

  return (
    <div>
      <Header title="Give feedback" />
      <Button text="Good" onClick={ handleGoodClick } />
      <Button text="Neutral" onClick={ handleNeutralClick } />
      <Button text="Bad" onClick={handleBadClick} />
      <Header title="Statistics" />
      <Statistics click={ click } />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)