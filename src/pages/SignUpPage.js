import { useNavigate } from 'react-router-dom'
import JLogAPI from '../api/JLogAPI'

function SignUpPage(props) {
  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()



    const userData = {}
    userData.username = e.target.elements['username'].value
    userData.password = e.target.elements['password'].value
    userData.confirmPassword = e.target.elements['confirm-password'].value

    if (userData.password !== userData.confirmPassword) {
      alert('Passwords do not match, please try again!')
      return
    }

    const response = await JLogAPI.signUp(userData)
    if (response) {
      navigate('/login')
    }

  }

  return (
    <div>
      <h2>Sign Up Page</h2>
      <br />

      <form onSubmit={ handleSignUp }> 
        <label>Username</label>
        <input type='text' name='username' placeholder='username'></input>
        <br />
        <label>Password</label>
        <input type='text' name='password' placeholder='password'></input>
        <br />
        <label>Confirm Password</label>
        <input type='text' name='confirm-password' placeholder='confirm password'></input>
        <br />
        <button type="submit">Login</button>
      </form>

    </div>
  )

}

export default SignUpPage;