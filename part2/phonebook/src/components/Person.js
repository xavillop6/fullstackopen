import React from 'react'

const Person = ({ person, handleDeletePerson }) => <p>{person.name} {person.number} <button onClick={() => handleDeletePerson(person)}>Delete</button></p>

export default Person