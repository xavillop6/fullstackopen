import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Blog from "./Blog";
import { Row } from "react-bootstrap";

export const UserDetail = () => {
  const users = useSelector(state => state.user)
  const id = useParams().id

  const user = users.find(user => user.id === id)

  if (!user) {
    return null
  }

  const blogs = user.blogs;
  
  return (
    <div>
      <h2>{user.name}</h2>
      <Row xs={1} md={2} className="g-4">
      {blogs &&
          blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
        </Row>
    </div>
  );
}