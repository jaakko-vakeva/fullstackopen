import React from 'react'

const Contact = ({ name, number, deletePerson}) => {
  return (
    <div>
      {name} {number}
      <button onClick={deletePerson}>delete</button>
    </div>
  )

}


export default Contact