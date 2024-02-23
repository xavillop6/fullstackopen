import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const getAnecdote = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const addVote = async (anecdote) => {
  anecdote = await getAnecdote(anecdote.id);
  const votes = { votes: anecdote.votes + 1 };
  const response = await axios.patch(`${baseUrl}/${anecdote.id}`, votes);
  return response.data;
};

export default { getAll, createNew, getAnecdote, addVote };
