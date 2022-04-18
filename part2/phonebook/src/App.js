import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const Person = ({ person }) => <p>{person.name}</p>
  
  const handleOnChange = (event) => {
    setNewName(event.target.value)
  }

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName
    };
    setPersons(persons.concat(personObject));
    setNewName("");
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={ handleOnSubmit }>
        <div>
          Name: <input onChange={ handleOnChange } value={ newName } />
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