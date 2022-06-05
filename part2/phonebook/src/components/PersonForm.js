import React from 'react'

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
  
  export default PersonForm