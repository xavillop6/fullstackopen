import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlog(state, action) {
      return action.payload;
    },
    updateBlog(state, action) {
      const id = action.payload.id;
      const newState = state.map((blog) => (blog.id !== id ? blog : action.payload));
      return newState.sort((a, b) => b.likes - a.likes);
    },
    removeBlog(state, action) {
      const id = action.payload.id;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

export const { appendBlog, setBlog, updateBlog, removeBlog } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    blogs.sort((a, b) => b.likes - a.likes);
    dispatch(setBlog(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(appendBlog(newBlog));
  };
};

export const addLike = (blog) => {
  return async (dispatch) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 };
    const updatedBlog = await blogService.update(blog.id, likedBlog);
    dispatch(updateBlog(updatedBlog));
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id);
    dispatch(removeBlog(blog));
  };
};

export const commentBlog = ({blog, comment}) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.comment(blog.id, comment);
    dispatch(updateBlog(updatedBlog));
  };
}

export default blogSlice.reducer;
