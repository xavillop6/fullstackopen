import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification: (state, action) => {
      return action.payload;
    },
    deleteNotification: () => {
      return "";
    },
  },
});

export const { setNotification, deleteNotification } =
  notificationSlice.actions;

let timeoutId = null;
export const showNotification = (content, time) => {
  return (dispatch) => {
    dispatch(setNotification(content));

    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      dispatch(deleteNotification());
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
