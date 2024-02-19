import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
    
    const anecdotes = useSelector(({anecdotes, filter}) => {
        let filteredAnecdotes = filter 
          ? anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
            : anecdotes
        
        
            return [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)
    })
    

    
    const dispatch = useDispatch();

    const vote = (id) => {
        dispatch(voteAnecdote(id))
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
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
  );
};

export default AnecdoteList;