import { Link, useNavigate, NavLink } from "react-router-dom";
import JLogAPI from "../api/JLogAPI";
import { Navbar, Container, Nav } from 'react-bootstrap'

function MyNavbar(props) {

  const navigate = useNavigate()

  const doLogout = async () => {
    const response = await JLogAPI.logout()
    if (response) {
      props.setUsername('')
      localStorage.clear()
      navigate('/')
    }
  }

  const authRender = () => {
    if (props.username === '') {
      return (
        <div className='auth-items'>
          {/* &nbsp;|&nbsp;
          <Link to="/login">Login</Link>
          &nbsp;|&nbsp;
          <Link to="/signup">Sign Up</Link> */}
          &nbsp;|&nbsp;
          <Nav.Link as={Link} to='/login'>Login</Nav.Link>
          &nbsp;|&nbsp;
          <Nav.Link as={Link} to='/signup'>Sign Up</Nav.Link>
        </div>
      )
    }

    return (
      <div className='auth-items'>
        &nbsp;|&nbsp;
        {/* <Link to="#" onClick={ doLogout } >Logout</Link> */}
        <Nav.Link onClick={ doLogout } >Logout</Nav.Link>
        <Nav.Link to='#'>{props.username}</Nav.Link>
      </div>
    )
  }

  return (
    <>
  <Navbar bg="dark" variant="dark" className='nav'>
    <Container>
    <Navbar.Brand href="/">JLog</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="/">DashBoard</Nav.Link>
    </Nav>
    <Nav className='ml-auto'>
      { authRender() }
    </Nav>
    </Container>
  </Navbar>
</>
  )

}

export default MyNavbar;