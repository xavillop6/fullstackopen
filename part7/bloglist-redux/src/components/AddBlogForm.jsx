import { useRef, useState } from "react";
import Togglable from "./Togglable";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer";
import { Button, Card, Form } from "react-bootstrap";

const AddBlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  const blogFormRef = useRef();

  const handleAddBlog = (event) => {
    event.preventDefault();
    try {
      const newBlog = { title, author, url };
      blogFormRef.current.toggleVisibility();
      dispatch(createBlog(newBlog));

      dispatch(
        setNotification(
          {
            message: `a new blog ${title} by ${author} added`,
            type: "success",
          },
          5,
        ),
      );
    } catch (error) {
      console.log(error);
      dispatch(
        setNotification(
          {
            message: "error when adding a new blog",
            type: "error",
          },
          5,
        ),
      );
    }
  };

  return (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <Card>
        <Card.Body>
        <Card.Title>Add a new blog</Card.Title>
        <Form onSubmit={handleAddBlog}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control type="password" placeholder="Password" id="title"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)} />
        </Form.Group>
        
        <Form.Group className="mb-3">
        <Form.Label>Author</Form.Label>
        <Form.Control type="password" placeholder="Password" id="author"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)} />
        </Form.Group>
        
        <Form.Group className="mb-3">
        <Form.Label>Url</Form.Label>
        <Form.Control type="password" placeholder="Password" id="url"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)} />
      </Form.Group>
      
        <Button id="create" type="submit">
          Create
        </Button>
      </Form>
        </Card.Body>
      </Card>      
    </Togglable>
  );
};

export default AddBlogForm;
