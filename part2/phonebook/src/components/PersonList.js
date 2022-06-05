import React from 'react'
import Person from './Person'

const PersonList = ({ personsToShow }) =>
  <div>
    {personsToShow.map(person => <Person key={person.name} person={person} />)}
    </div>
  
export default PersonList;