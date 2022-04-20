import { useNavigate } from "react-router-dom"
import JLogAPI from "../api/JLogAPI"

function LoginPage() {

  const handleLogin = async (e) => {
    e.preventDefault()

    const userData = {}
    userData.username = e.target.elements['username'].value
    userData.password = e.target.elements['password'].value

    console.log(userData)

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
        <input type='text' name='username' placeholder='username'></input>
        <button type="submit">Login</button>
      </form>

    </div>
  )

}

export default LoginPage;