import { Navigate, useNavigate } from "react-router-dom"
import { Form, Button } from 'react-bootstrap'
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
      <div className="auth-forms">
      <Form onSubmit={ handleLogin } className='rounded p-4 p-sm-3 auth-page-form'>
        <h2>Log In</h2>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type='text' placeholder='enter username' name='username'/>
        </Form.Group>
        <Form.Group className="mb-3" controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='password' name='password'/>
        </Form.Group>
        <Button type="submit" variant='primary'>Log In</Button>
      </Form>
      </div>
     

    </div>
  )

}

export default LoginPage;