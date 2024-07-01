import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import AddBlogForm from "./components/AddBlogForm";
import Notification from "./components/Notification";
import { initializeBlogs } from "./reducers/blogReducer";
import { initalizeUser, loginUser, logoutUser } from "./reducers/authReducer";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    dispatch(initalizeUser());
  }, []);

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
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <AddBlogForm />
      {blogs &&
        blogs.map((blog) => <Blog key={blog.id} blog={blog} user={user} />)}
    </div>
  );
};

export default App;
