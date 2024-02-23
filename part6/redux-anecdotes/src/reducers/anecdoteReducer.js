import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";
import anecdotes from "../services/anecdotes";

const anectodeSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes: (state, action) => {
      return action.payload;
    },
    appendAnecdote: (state, action) => {
      state.push(action.payload);
    },
    updateAnecdote: (state, action) => {
      const changedAnecdote = action.payload;
      const { id } = changedAnecdote;
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    },
  },
});

export const { appendAnecdote, updateAnecdote, setAnecdotes } =
  anectodeSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotes.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const addVote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdotes.addVote(anecdote);
    dispatch(updateAnecdote(updatedAnecdote));
  };
};
export default anectodeSlice.reducer;
