import React, { useState, useEffect } from 'react'
import Contact from './components/Contact'
import PersonForm from './components/forms/PersonForm'
import FilterForm from './components/forms/FilterForm'
import axios from 'axios'
import personService from './services/persons'


const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterValue, setFilterValue] = useState('')
  const [alertMessage, setAlertMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
  }

  
  const deletePerson = (id) => {

    if (window.confirm(`Delete ${persons.find(p => p.id === id).name} ?`)) {
      const personObject = persons.find(p => p.id === id)
      personService
          .remove(id)
          .then(response => {
            setPersons(persons.filter(p => p.id !== id))
          })
      setAlertMessage(
          `${personObject.name} has been removed from the phonebook`
        )
        setTimeout(() => {
          setAlertMessage(null)
        }, 5000)
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked')
    const personObject = {
      name: newName,
      key: newName,
      number: newNumber
    }

    // A person with that name already exists -> update the number
    if (persons.filter(w => w.name === personObject.name).length > 0) {
      const personToUpdate = persons.find(p => p.name === personObject.name)
      if (window.confirm(`${personObject.name} is already added to phonebook, replace old number with a new one?`)) {
        personService
          .update(personToUpdate.id, personObject)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== personToUpdate.id ? person : returnedPerson))
              setNewName('')
              setNewNumber('')
              setAlertMessage(
                `The number of ${personObject.name} has been changed succesfully`
              )
              setTimeout(() => {
                setAlertMessage(null)
              }, 5000)    
            })
            .catch(error => {
              setErrorMessage(`Information of ${personToUpdate.name} has already been removed from server`)
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            })
      }
        
    }
    // A person is added succesfully
    else {
      personService
        .create(personObject)
          .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          })
      setAlertMessage(
          `${personObject.name} has been added to the phonebook`
        )
        setTimeout(() => {
          setAlertMessage(null)
        }, 5000)
    }
  }

  const filtered = persons.filter((str) => {
    return str.name.toLowerCase().concat(str.number).indexOf(filterValue.toLowerCase()) >= 0;
  })

  

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={alertMessage} type="alert" />
      <Notification message={errorMessage} type="error" />

      <FilterForm filterValue={filterValue} handleFilterChange={handleFilterChange} />

      <PersonForm 
        onSubmit={addPerson}
        nameValue={newName}
        numberValue={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />


      <div>
        {filtered.map(person =>
          <Contact
            name={person.name}
            number={person.number}
            key={person.id}
            deletePerson={() => deletePerson(person.id)}
          />
        )}
      </div>

    </div>
  )
  

}

export default App