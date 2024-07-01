import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { logoutUser } from "../reducers/authReducer"
import { Button, Container, Nav, Navbar } from "react-bootstrap"

const Menu = () => {
  const user = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
      <Container>
      <Navbar.Brand>Blog App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />


      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/users">Users</Nav.Link>
        </Nav>
        </Navbar.Collapse>

        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {user.name} logged in <Button onClick={handleLogout} className="ml-4 btn btn-light">Logout</Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Menu