import { Link } from 'react-router-dom'

function LandingPage() {

  return (
  <div>
    <div className='header'>
      <img src={require('../assets/fistBump.jpeg')}></img>
    </div>
    <div className='header-content'>
    <p>Welcome to JLog! The premium Jiu Jitsu tracking experience, it appears you are not currently logged in. Please <Link to="/login">login</Link> or <Link to="/signup">signup</Link>.</p>
    </div>
  </div>
  
  )

}

export default LandingPage;