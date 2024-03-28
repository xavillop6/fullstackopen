import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAnecdotes, voteAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {

  const queryClient = useQueryClient() 
  const notificationDispatch = useNotificationDispatch()
  const voteAnecdoteMutation = useMutation(voteAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      const newAnecdotes = anecdotes.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote)
      queryClient.setQueryData('anecdotes', newAnecdotes)

      notificationDispatch({ type: 'SET', payload: `you voted for ${updatedAnecdote.content}` })
      
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 5000)
    }
  })
  const handleVote = (anecdote) => {
    anecdote.vote++;
    voteAnecdoteMutation.mutate(anecdote)
  }

  const result = useQuery(
    'anecdotes',
    getAnecdotes,
    {
      refetchOnWindowFocus: false,
      retry: false
    }
  )

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
