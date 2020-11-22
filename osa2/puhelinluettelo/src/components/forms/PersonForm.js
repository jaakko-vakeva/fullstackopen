import React from 'react'

const PersonForm = (props) => {
    return (
      <div>
        <h1>add a new</h1>
        <form onSubmit={props.onSubmit}>
          <div>
            name: <input value={props.nameValue} onChange={props.handleNameChange}/>
          </div>
          <div>
            number: <input value={props.numberValue} onChange={props.handleNumberChange} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
    )
  }

export default PersonForm