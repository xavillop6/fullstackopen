import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const Person = ({ person }) => <p>{person.name} { person.number }</p>
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      };
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("")
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <Person key={ person.name } person={ person } />) }
      </div>
    </div>
  )
}

export default App