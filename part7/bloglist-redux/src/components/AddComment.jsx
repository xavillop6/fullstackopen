import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { commentBlog } from "../reducers/blogReducer"
import { setNotification } from "../reducers/notificationReducer"

const AddComment = ({ blog }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const handleAddComment = async (event) => {
    event.preventDefault()
    

    try {
      dispatch(commentBlog({ blog, comment}))
      setComment('')

      dispatch(
        setNotification(
          {
            message: `A new comment added`,
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
            message: "error when adding a comment",
            type: "error",
          },
          5,
        ),
      );
    }
  }
  return (
    <Form onSubmit={handleAddComment} className="mb-4">
      <Form.Control type="textarea" id="comment" placeholder="Enter new comment" value={comment} onChange={({ target }) => setComment(target.value)} />
      
      <Button className="mt-2" variant="primary" type="submit">
        Add comment
      </Button>
    </Form>
  )
}

export default AddComment