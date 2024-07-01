import { createSlice } from '@reduxjs/toolkit'
import { clearNotification, setNotification } from './notificationReducer'
import blogService from '../services/blogs'
import loginService from '../services/login'

const authSlice = createSlice({
  name: 'auth',
  initialState: null,
  reducers: {
    login: (state, action) => action.payload,
    logout: () => null
  }
})

export const { login, logout } = authSlice.actions

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedBlogAppUser");
    dispatch(logout())
  }
}

export const initalizeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(login(user));
    }
  }
}

export const loginUser = ({username, password}) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      dispatch(login(user));
      dispatch(clearNotification());
    } catch (error) {
      const errorMessage = error.response.data.error;
      dispatch(setNotification({ message: errorMessage, type: "error" }, 5));
    }

  }
}

export default authSlice.reducer