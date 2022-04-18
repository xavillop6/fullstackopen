import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setFilter(newFilter);
    const regex = new RegExp(newFilter, 'i');
    const filteredPersons = persons.filter((person) => {
      return person.name.match(regex);
    })
    setPersonsToShow(filteredPersons);
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
      <Filter value={ filter } onChange={ handleFilterChange } />
      <h2>Phonebook</h2>
      <PersonForm handleOnSubmit={handleOnSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={ newName } newNumber={ newNumber } />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App