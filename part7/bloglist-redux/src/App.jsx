import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import { initializeBlogs } from "./reducers/blogReducer";
import { initalizeUser, loginUser, logoutUser } from "./reducers/authReducer";
import { initializeUsers } from "./reducers/userReducer";

import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import UserList from "./components/UserList";
import { BlogList } from "./components/BlogList";
import { UserDetail } from "./components/UserDetail";

const App = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initalizeUser());
    dispatch(initializeUsers());
  }, [dispatch]);


  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    dispatch(loginUser({ username, password }));

    setUsername("");
    setPassword("");
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              id="username"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              id="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit" id="login-button">
            login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div id="content">
      <Router>
        <div>
          <Link to="/">blogs</Link>
          <Link to="/users">users</Link>
        </div>
        <h2>blogs</h2>
          <Notification />
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
        <Routes>
          <Route path="/users" element={<UserList />} />
          <Route path="/" element={<BlogList />} />
          <Route path="/users/:id" element={<UserDetail />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
