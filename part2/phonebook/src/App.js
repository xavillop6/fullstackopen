import { useState, useEffect } from 'react'
import axios from 'axios'

const Persons = ({ personsToShow }) =>
  <div>
    {personsToShow.map(person => <Person key={person.name} person={person} />)}
  </div>

const Person = ({ person }) => <p>{person.name} {person.number}</p>
  
const PersonForm = ({ handleOnSubmit, handleNameChange, newName, handleNumberChange, newNumber }) => 
  <form onSubmit={ handleOnSubmit }>
    <div>
      Name: <input onChange={ handleNameChange } value={ newName } />
    </div>
    <div>
      Number: <input onChange={handleNumberChange} value={ newNumber } />
    </div>
    <div>
      <button type="submit">Add</button>
    </div>
  </form>

const Filter = ({ value, onChange }) =>
  <div>
    Filter shown with: <input onChange={ onChange } value={ value } />
  </div>


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
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
        id: persons.length + 1
      };
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("")
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
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App