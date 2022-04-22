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
        <Nav className='auth-items ml-auto'>
          &nbsp;|&nbsp;
          <Nav.Link as={Link} to='/login'>Login</Nav.Link>
          &nbsp;|&nbsp;
          <Nav.Link as={Link} to='/signup'>Sign Up</Nav.Link>
        </Nav>
      )
    }

    return (
      <div className='auth-items'>
        &nbsp;|&nbsp;
        <Nav className='ml-auto'>
          <Nav.Link onClick={ doLogout } >Logout</Nav.Link>
          <Nav.Link to='#'>{props.username}</Nav.Link>
        </Nav>
      </div>
    )
  }

  const regRender = () => {
    if (props.username !== '') {
      return (
        <Nav className="me-auto">
        <Nav.Link as={Link} to='/'>DashBoard</Nav.Link>
        <Nav.Link as={Link} to='/activities'>Activites</Nav.Link>
        </Nav>
      )
    }
  }

  return (
    <>
  <Navbar bg="dark" variant="dark" className='nav'>
    <Container>
    <Navbar.Brand href="#">JLog</Navbar.Brand>

    { regRender() }
    { authRender() }
    
    </Container>
  </Navbar>
</>
  )

}

export default MyNavbar;