import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserList = () => {

  const users = useSelector(state => state.user)
  
  return (
    <div>
      <h3>Users</h3>
      <Table bordered hover>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default UserList