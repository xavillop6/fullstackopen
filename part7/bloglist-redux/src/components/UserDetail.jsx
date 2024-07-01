import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const UserDetail = () => {
  const users = useSelector(state => state.user)
  const id = useParams().id

  const user = users.find(user => user.id === id)

  if (!user) {
    return null
  }
  
  return (
    <div>
      <h2>{user.name}</h2>
      <div>added blogs</div>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
}