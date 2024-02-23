import { useDispatch, useSelector } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const dispatch = useDispatch();
    
    const anecdotes = useSelector(({anecdotes, filter}) => {
        let filteredAnecdotes = filter 
          ? anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
            : anecdotes
        
        
            return [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)
    })

    const vote = (anecdote) => {
        dispatch(addVote(anecdote))
        dispatch(showNotification(`you voted for '${anecdotes.find(a => a.id === id).content}'`, 5))
    }
    

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
  );
};

export default AnecdoteList;