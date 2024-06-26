import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setNotification } from "../reducers/notificationReducer";
import { addLike } from "../reducers/blogReducer";
import { Button, Card } from "react-bootstrap";
import CommentCard from "./CommentCard";
import AddComment from "./AddComment";

const BlogDetail = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))

  if (!blog) {
    return null
  }

  const comments = blog.comments ? blog.comments : []

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

  return (
    <>
    <Card>
      <Card.Header as="h4">{blog.title} <Button id="likeButton" className="float-end" onClick={handleLike}>Like</Button></Card.Header>
      <Card.Body>
        <Card.Text>{blog.likes} likes</Card.Text>
        <Card.Link href={blog.url}>{blog.url}</Card.Link>
      </Card.Body>
      <Card.Footer>{blog.author}</Card.Footer>
      </Card>  
      
      <div className="mt-4">
        <h3>Comments</h3>
        <AddComment blog={blog} />
        {comments && comments.map((comment, index) => <CommentCard key={index} comment={comment} />)}
      </div>
    </>
  )
}

export default BlogDetail