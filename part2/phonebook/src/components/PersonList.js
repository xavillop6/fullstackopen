import React from 'react'
import Person from './Person'

const PersonList = ({ personsToShow, handleDeletePerson }) =>
  <div>
    {personsToShow.map(person => <Person handleDeletePerson={ handleDeletePerson } key={person.name} person={person} />)}
    </div>
  
export default PersonList;