import { Card } from "react-bootstrap"

const CommentCard = ({ comment }) => {
  return (
    <Card className="mb-2">
      <Card.Body>
        <Card.Text>{comment}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default CommentCard