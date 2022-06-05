import { useState, useEffect } from 'react'
import { create as createPerson, getAll as getAllPersons } from './services/persons'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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


  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        //id: persons.length + 1
      };

      createPerson(personObject)
      .then(newPerson => {
          
        setPersons((prevPersons) => persons.concat(newPerson));
        setNewName("");
        setNewNumber("")
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
      <Filter value={ filter } onChange={ handleFilterChange } />
      <h2>Phonebook</h2>
      <PersonForm handleOnSubmit={handleOnSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={ newName } newNumber={ newNumber } />
      <h2>Numbers</h2>
      <PersonList personsToShow={personsToShow} />
    </div>
  )
}

export default App