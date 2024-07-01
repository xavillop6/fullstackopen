import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import { initializeBlogs } from "./reducers/blogReducer";
import { initalizeUser, loginUser, logoutUser } from "./reducers/authReducer";
import { initializeUsers } from "./reducers/userReducer";

import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import UserList from "./components/UserList";
import { UserDetail } from "./components/UserDetail";
import BlogList from "./components/BlogList";
import BlogDetail from "./components/BlogDetail";
import Menu from "./components/Menu";
import { Button, Container, Form } from "react-bootstrap";

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


  const handleLogin = async (event) => {
    event.preventDefault();

    dispatch(loginUser({ username, password }));

    setUsername("");
    setPassword("");
  };

  if (user === null) {
    return (
      <Container>
        <h2>Log in to application</h2>
        <Notification />
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text"
              id="username"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              id="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)} />
          </Form.Group>
          
          <Button type="submit" id="login-button">
            Login
          </Button>
        </Form>
      </Container>
    );
  }

  return (
    <div id="container">
      <Router>
        <Menu />
        <Container className="mt-4 pb-4">
            <Notification />
            <Routes>
              <Route path="/users" element={<UserList />} />
              <Route path="/" element={<BlogList />} />
              <Route path="/users/:id" element={<UserDetail />} />
              <Route path="/blogs/:id" element={<BlogDetail />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
