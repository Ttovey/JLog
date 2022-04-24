import { useNavigate } from 'react-router-dom'
import JLogAPI from '../api/JLogAPI'
import {Form, Button} from 'react-bootstrap'

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
      <div className="auth-forms">
      <Form onSubmit={ handleSignUp } className='rounded p-4 p-sm-3 auth-page-form'>
        <h2>Sign Up</h2>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type='text' placeholder='enter username' name='username'/>
        </Form.Group>
        <Form.Group className="mb-3" controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='password' name='password'/>
        </Form.Group>
        <Form.Group className="mb-3" controlId='formBasicPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type='password' placeholder='confirm password' name='confirm-password'/>
        </Form.Group>
        <Button type="submit" variant='primary'>Sign Up</Button>
      </Form>
      </div>
    </div>
  )

}

export default SignUpPage;