import React from 'react'

const Header = (props) => {
    console.log(props)
    return (
      <div>
        <h2> {props.course.name} </h2>
      </div>
    )
  }
  
  const Content = (props) => {
    console.log(props)
    return (
      <div>
        <div>
          {props.parts.map(part =>
            <Part key={part.id} part={part.name} exercises={part.exercises} /> 
            )}
        </div>
      </div>
    )
  }
  
  
  const Part = (props) => {
    console.log(props)
    return (
      <div>
        <p>
          {props.part} {props.exercises}
        </p>
      </div>
    )
  }
  
  const Total = (props) => {
    const total = props.parts.reduce( 
      (accumulator, currentValue) => console.log('accumulator:', accumulator, 'currentValue:', currentValue) || 
       accumulator + currentValue.exercises, 0)
    return (
      <strong>
        total of {total} exercises
      </strong>
    )
  }
  
  
  const Course = (props) => {
    return (
      <div>
        <Header course={props.course} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
      </div>
    )
  }

  export default Course