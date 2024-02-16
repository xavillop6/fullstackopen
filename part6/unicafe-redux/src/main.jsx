import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const goodHandler = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const badHandler = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const okHandler = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const resetHandler = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <button onClick={goodHandler}>good</button> 
      <button onClick={okHandler}>ok</button> 
      <button onClick={badHandler}>bad</button>
      <button onClick={resetHandler}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok { store.getState().ok }</div>
      <div>bad { store.getState().bad }</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
