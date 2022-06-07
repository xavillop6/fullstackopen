import { useState, useEffect } from 'react'
import { create as createPerson, getAll as getAllPersons, remove as removePerson, update as updatePerson } from './services/persons'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({type: null, message: null})

  useEffect(() => {
    getAllPersons()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }, [])
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setFilter(newFilter);
  }

  const handleDeletePerson = (person) => {
    const name = person.name;
    if (window.confirm(`Delete ${name}?`)) {
      removePerson(person.id)
      .then(response => {
        setPersons((prevPersons) => prevPersons.filter(p => p.id !== person.id));
      })
      .catch(error => {
        setNotification({type: 'error', message: `Information of ${name} has already been removed from server.`})
      })
    }
  }

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const newPerson = persons.filter((person) =>
        person.name === newName
    )
    if (newPerson.length !== 0) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personObject = {
          name: newPerson[0].name,
          number: newNumber,
          id: newPerson[0].id
        };

        updatePerson(personObject)
          .then(updatePerson => {
            setPersons((prevPersons) => prevPersons.map(p => p.id === updatePerson.id ? updatePerson : p));
            setNewName("");
            setNewNumber("")
            setNotification({ type: 'success', message: `Updated ${newName}` })
          }).catch(error => {
            setNotification({ type: 'error', message: `Information of ${newName} has already been removed from server.` })
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        //id: persons.length + 1
      };

      createPerson(personObject)
      .then(newPerson => {
          
        setPersons((prevPersons) => prevPersons.concat(newPerson));
        setNewName("");
        setNewNumber("")
        setNotification({type: 'success', message: `Added ${newName}`})
      })
      
    }
  }

  const regex = new RegExp(filter, 'i');
  const personsToShow = persons.filter((person) => {
    return person.name.match(regex);
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type={ notification.type } message={ notification.message } />
      <Filter value={ filter } onChange={ handleFilterChange } />
      <h2>Phonebook</h2>
      <PersonForm handleOnSubmit={handleOnSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={ newName } newNumber={ newNumber } />
      <h2>Numbers</h2>
      <PersonList personsToShow={personsToShow} handleDeletePerson={ handleDeletePerson } />
    </div>
  )
}

export default App