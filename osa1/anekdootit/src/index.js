import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
     {text}
  </button>
)


const Display = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
      {props.anecdote} 
      <br></br>
      has {props.votes} votes
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(initVotes)



  const handleClickNext = () => (
    setSelected(Math.floor(Math.random() * (anecdotes.length)))
  )

  const handleClickVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVote(copy)
  }

  const maxVotes = Math.max(...votes)
  const indexOfMax = votes.findIndex(v => v === maxVotes)
  const bestAnecdote = props.anecdotes[indexOfMax]
  
  console.log({selected})
  console.log(votes)
  return (
    <div>
      <Display  text="Anecdote of the day"
                anecdote={anecdotes[selected]}
                votes= {votes[selected]} />
      <div>
        <Button text="vote" onClick={handleClickVote} />
        <Button text="next anecdote" onClick={handleClickNext} />
      </div>
      <Display  text="Anecdote with most votes"
                anecdote={bestAnecdote}
                votes={maxVotes} />
    </div>
  )

}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const initVotes = Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0)

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)