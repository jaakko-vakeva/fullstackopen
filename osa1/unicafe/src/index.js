import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>
      {text} {value}
    </td>
  </tr>

)


const Statistics = ({ good, bad, neutral }) => {
  const total = good + bad + neutral

  if (total === 0) {
    return (
    <div>
      <p>No feedback given</p>
    </div>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={(good - bad) / total} />
        <StatisticLine text="positive" value={(good / total)*100 + ' %'} />
      </tbody>
    </table>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleGoodClick = () => {
    setAll(allClicks.concat("good"))
    setGood(good + 1)
  }
  const handleBadClick = () => {
    setAll(allClicks.concat("bad"))
    setBad(bad + 1)
  }
  const handleNeutralClick = () => {
    setAll(allClicks.concat("neutral"))
    setNeutral(neutral + 1)
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <h1>statistics</h1>
      <Statistics 
      good={good}
      neutral={neutral}
      bad={bad}
      />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)