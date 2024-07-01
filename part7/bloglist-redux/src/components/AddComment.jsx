import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { commentBlog } from "../reducers/blogReducer"

const AddComment = ({ blog }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const handleAddComment = async (event) => {
    event.preventDefault()
    dispatch(commentBlog({ blog, comment}))
    setComment('')
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