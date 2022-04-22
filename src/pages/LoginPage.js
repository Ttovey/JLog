import { Navigate, useNavigate } from "react-router-dom"
import JLogAPI from "../api/JLogAPI"

function LoginPage(props) {

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    const userData = {}
    userData.username = e.target.elements['username'].value
    userData.password = e.target.elements['password'].value

    const response = await JLogAPI.login(userData)
    if (response) {
      //notify state of logged in user and userid
      props.setUsername(userData.username)
      props.setUserId(response.userId)
      //load user and userid into local storage to persist the data
      localStorage.setItem('user', userData.username)
      localStorage.setItem('userId', response.userId)
      navigate('/')
    }

  }

  return (
    <div>
      <h2>Login Page</h2>
      <br />

      <form onSubmit={ handleLogin }> 
        <label>Username</label>
        <input type='text' name='username' placeholder='username'></input>
        <br />
        <label>Password</label>
        <input type='text' name='password' placeholder='password'></input>
        <br />
        <button type="submit">Login</button>
      </form>

    </div>
  )

}

export default LoginPage;