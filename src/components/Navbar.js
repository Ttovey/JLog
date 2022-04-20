import { Link, Navigate, useNavigate } from "react-router-dom";
import JLogAPI from "../api/JLogAPI";

function Navbar(props) {

  const navigate = useNavigate()

  const doLogout = async () => {
    console.log('log out')
  }

  const authRender = () => {
    if (props.username === '') {
      return (
        <>
          &nbsp;|&nbsp;
          <Link to="/login">Login</Link>
          &nbsp;|&nbsp;
          <Link to="/signup">Sign Up</Link>
        </>
      )
    }

    return (
      <>
        &nbsp;|&nbsp;
        <Link to="#" onClick={ doLogout } >Logout</Link>
      </>
    )
  }

  return (
    <div id='header'>
      <div id='header-title'>
        <h1>JLog: Jiu Jitsu Tracker</h1>
      </div>
      <div id='header-menu'>
        <Link to='/'>DashBoard</Link>
        { authRender() }
      </div>

    </div>
  )

}

export default Navbar;