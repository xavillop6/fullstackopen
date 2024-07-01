import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLike, deleteBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import { Col, ListGroup } from "react-bootstrap";


const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const [showDetails, setShowDetails] = useState(false);
  const toggleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleLike = () => {
    try {
      dispatch(addLike(blog));
    } catch (error) {
      dispatch(
        setNotification(
          { message: "error when updating a blog", type: "error" },
          5,
        ),
      );
    }
  };

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        dispatch(deleteBlog(blog));
      } catch (error) {
        dispatch(
          setNotification(
            { message: "error when removing a blog", type: "error" },
            5,
          ),
        );
      }
    }
  };

  return (
    <Col key={blog.id}>
      <Card className="blog">
        <Card.Header has="h4">{blog.title}</Card.Header>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Author: {blog.author}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Card.Link>
            <Link to={`/blogs/${blog.id}`}>View more</Link>
          </Card.Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Blog;
